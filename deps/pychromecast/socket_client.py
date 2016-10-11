"""
Module to interact with the ChromeCast via protobuf-over-socket.

Big thanks goes out to Fred Clift <fred@clift.org> who build the first
version of this code: https://github.com/minektur/chromecast-python-poc.
Without him this would not have been possible.
"""
# Pylint does not understand the protobuf objects correctly
# pylint: disable=no-member

import logging
import select
import socket
import ssl
import json
import threading
import time
from collections import namedtuple
from struct import pack, unpack
import sys

from . import cast_channel_pb2
from .dial import CAST_TYPE_CHROMECAST, CAST_TYPE_AUDIO, CAST_TYPE_GROUP
from .controllers import BaseController
from .controllers.media import MediaController
from .error import (
    ChromecastConnectionError,
    UnsupportedNamespace,
    NotConnected,
    PyChromecastStopped,
    LaunchError,
)

NS_CONNECTION = 'urn:x-cast:com.google.cast.tp.connection'
NS_RECEIVER = 'urn:x-cast:com.google.cast.receiver'
NS_HEARTBEAT = 'urn:x-cast:com.google.cast.tp.heartbeat'

PLATFORM_DESTINATION_ID = "receiver-0"

MESSAGE_TYPE = 'type'
TYPE_PING = "PING"
TYPE_RECEIVER_STATUS = "RECEIVER_STATUS"
TYPE_PONG = "PONG"
TYPE_CONNECT = "CONNECT"
TYPE_CLOSE = "CLOSE"
TYPE_GET_STATUS = "GET_STATUS"
TYPE_LAUNCH = "LAUNCH"
TYPE_LAUNCH_ERROR = "LAUNCH_ERROR"
TYPE_LOAD = "LOAD"

# The socket connection is being setup
CONNECTION_STATUS_CONNECTING = "CONNECTING"
# The socket connection was complete
CONNECTION_STATUS_CONNECTED = "CONNECTED"
# The socket connection has been disconnected
CONNECTION_STATUS_DISCONNECTED = "DISCONNECTED"
# Connecting to socket failed (after a CONNECTION_STATUS_CONNECTING)
CONNECTION_STATUS_FAILED = "FAILED"
# The socket connection was lost and needs to be retried
CONNECTION_STATUS_LOST = "LOST"

APP_ID = 'appId'
REQUEST_ID = "requestId"
SESSION_ID = "sessionId"
ERROR_REASON = 'reason'

HB_PING_TIME = 10
HB_PONG_TIME = 10
POLL_TIME = 5
TIMEOUT_TIME = 30
RETRY_TIME = 5


class InterruptLoop(Exception):
    """ The chromecast has been manually stopped. """
    pass


def _json_from_message(message):
    """ Parses a PB2 message into JSON format. """
    return json.loads(message.payload_utf8)


def _message_to_string(message, data=None):
    """ Gives a string representation of a PB2 message. """
    if data is None:
        data = _json_from_message(message)

    return "Message {} from {} to {}: {}".format(
        message.namespace, message.source_id, message.destination_id, data)


if sys.version_info >= (3, 0):
    def _json_to_payload(data):
        """ Encodes a python value into JSON format. """
        return json.dumps(data, ensure_ascii=False).encode("utf8")
else:
    def _json_to_payload(data):
        """ Encodes a python value into JSON format. """
        return json.dumps(data, ensure_ascii=False)


def _is_ssl_timeout(exc):
    """ Returns True if the exception is for an SSL timeout """
    return exc.message in ("The handshake operation timed out",
                           "The write operation timed out",
                           "The read operation timed out")


NetworkAddress = namedtuple('NetworkAddress',
                            ['address', 'port'])


ConnectionStatus = namedtuple('ConnectionStatus',
                              ['status', 'address'])


CastStatus = namedtuple('CastStatus',
                        ['is_active_input', 'is_stand_by', 'volume_level',
                         'volume_muted', 'app_id', 'display_name',
                         'namespaces', 'session_id', 'transport_id',
                         'status_text'])


LaunchFailure = namedtuple('LaunchStatus',
                           ['reason', 'app_id', 'request_id'])


# pylint: disable=too-many-instance-attributes
class SocketClient(threading.Thread):
    """
    Class to interact with a Chromecast through a socket.

    :param port: The port to use when connecting to the device, set to None to
                 use the default of 8009. Special devices such as Cast Groups
                 may return a different port number so we need to use that.
    :param cast_type: The type of chromecast to connect to, see
                      dial.CAST_TYPE_* for types.
    :param tries: Number of retries to perform if the connection fails.
                  None for inifinite retries.
    :param retry_wait: A floating point number specifying how many seconds to
                       wait between each retry. None means to use the default
                       which is 5 seconds.
    """

    def __init__(self, host, port=None, cast_type=CAST_TYPE_CHROMECAST,
                 **kwargs):
        tries = kwargs.pop('tries', None)
        timeout = kwargs.pop('timeout', None)
        retry_wait = kwargs.pop('retry_wait', None)

        super(SocketClient, self).__init__()

        self.daemon = True

        self.logger = logging.getLogger(__name__)

        self._force_recon = False

        self.cast_type = cast_type
        self.tries = tries
        self.timeout = timeout or TIMEOUT_TIME
        self.retry_wait = retry_wait or RETRY_TIME
        self.host = host
        self.port = port or 8009

        self.source_id = "sender-0"
        self.stop = threading.Event()

        self.app_namespaces = []
        self.destination_id = None
        self.session_id = None
        self._request_id = 0
        # dict mapping requestId on threading.Event objects
        self._request_callbacks = {}
        self._open_channels = []

        self.connecting = True
        self.socket = None

        # dict mapping namespace on Controller objects
        self._handlers = {}
        self._connection_listeners = []

        self.receiver_controller = ReceiverController(cast_type)
        self.media_controller = MediaController()
        self.heartbeat_controller = HeartbeatController()

        self.register_handler(self.heartbeat_controller)
        self.register_handler(ConnectionController())
        self.register_handler(self.receiver_controller)
        self.register_handler(self.media_controller)

        self.receiver_controller.register_status_listener(self)

        try:
            self.initialize_connection()
        except ChromecastConnectionError:
            self._report_connection_status(
                ConnectionStatus(CONNECTION_STATUS_DISCONNECTED,
                                 NetworkAddress(self.host, self.port)))
            raise

    def initialize_connection(self):
        """Initialize a socket to a Chromecast, retrying as necessary."""
        tries = self.tries

        if self.socket is not None:
            self.socket.close()
            self.socket = None

        # Make sure nobody is blocking.
        for callback in self._request_callbacks.values():
            callback['event'].set()

        self.app_namespaces = []
        self.destination_id = None
        self.session_id = None
        self._request_id = 0
        self._request_callbacks = {}
        self._open_channels = []

        self.connecting = True
        retry_log_fun = self.logger.exception

        while not self.stop.is_set() and (tries is None or tries > 0):
            try:
                self.socket = ssl.wrap_socket(socket.socket())
                self.socket.settimeout(self.timeout)
                self._report_connection_status(
                    ConnectionStatus(CONNECTION_STATUS_CONNECTING,
                                     NetworkAddress(self.host, self.port)))
                self.socket.connect((self.host, self.port))
                self.connecting = False
                self._force_recon = False
                self._report_connection_status(
                    ConnectionStatus(CONNECTION_STATUS_CONNECTED,
                                     NetworkAddress(self.host, self.port)))
                self.receiver_controller.update_status()
                self.heartbeat_controller.ping()
                self.heartbeat_controller.reset()

                self.logger.debug("Connected!")
                break
            except socket.error:
                self.connecting = True
                if self.stop.is_set():
                    self.logger.exception(
                        "Failed to connect, aborting due to stop signal.")
                    raise ChromecastConnectionError("Failed to connect")

                self._report_connection_status(
                    ConnectionStatus(CONNECTION_STATUS_FAILED,
                                     NetworkAddress(self.host, self.port)))
                retry_log_fun("Failed to connect, retrying in %fs",
                              self.retry_wait)
                retry_log_fun = self.logger.debug

                time.sleep(self.retry_wait)
                if tries:
                    tries -= 1
        else:
            self.stop.set()
            self.logger.error("Failed to connect. No retries.")
            raise ChromecastConnectionError("Failed to connect")

    def disconnect(self):
        """ Disconnect socket connection to Chromecast device """
        self.stop.set()

    def register_handler(self, handler):
        """ Register a new namespace handler. """
        self._handlers[handler.namespace] = handler

        handler.registered(self)

    def new_cast_status(self, cast_status):
        """ Called when a new cast status has been received. """
        new_channel = self.destination_id != cast_status.transport_id

        if new_channel:
            self._disconnect_channel(self.destination_id)

        self.app_namespaces = cast_status.namespaces
        self.destination_id = cast_status.transport_id
        self.session_id = cast_status.session_id

        if new_channel:
            # If any of the namespaces of the new app are supported
            # we will automatically connect to it to receive updates
            for namespace in self.app_namespaces:
                if namespace in self._handlers:
                    self._ensure_channel_connected(self.destination_id)
                    self._handlers[namespace].channel_connected()

    def _gen_request_id(self):
        """ Generates a unique request id. """
        self._request_id += 1

        return self._request_id

    @property
    def is_connected(self):
        """
        Returns True if the client is connected, False if it is stopped
        (or trying to connect).
        """
        return not self.connecting

    @property
    def is_stopped(self):
        """
        Returns True if the connection has been stopped, False if it is
        running.
        """
        return self.stop.is_set()

    def run(self):
        """ Start polling the socket. """
        # pylint: disable=too-many-branches
        self.heartbeat_controller.reset()
        self._force_recon = False
        while not self.stop.is_set():

            try:
                if not self._check_connection():
                    continue
            except ChromecastConnectionError:
                break

            # poll the socket
            can_read, _, _ = select.select([self.socket], [], [], POLL_TIME)

            # read messages from chromecast
            message = data = None
            if self.socket in can_read and not self._force_recon:
                try:
                    message = self._read_message()
                except InterruptLoop as exc:
                    if self.stop.is_set():
                        self.logger.info(
                            "Stopped while reading message, disconnecting.")
                        break
                    else:
                        self.logger.exception(
                            "Interruption caught without being stopped %s",
                            exc)
                        break
                except ssl.SSLError as exc:
                    if exc.errno == ssl.SSL_ERROR_EOF:
                        if self.stop.is_set():
                            break
                    raise
                except socket.error:
                    self._force_recon = True
                    self.logger.info('Error reading from socket.')
                else:
                    data = _json_from_message(message)
            if not message:
                continue

            # If we are stopped after receiving a message we skip the message
            # and tear down the connection
            if self.stop.is_set():
                break

            # See if any handlers will accept this message
            self._route_message(message, data)

            if REQUEST_ID in data:
                callback = self._request_callbacks.pop(data[REQUEST_ID], None)
                if callback is not None:
                    event = callback['event']
                    callback['response'] = data

                    event.set()

        # Clean up
        self._cleanup()

    def _check_connection(self):
        """
        Checks if the connection is active, and if not reconnect

        :return: True if the connection is active, False if the connection was
                 reset.
        """
        # check if connection is expired
        reset = False
        if self._force_recon:
            self.logger.warning(
                "Error communicating with socket, resetting connection")
            reset = True

        elif self.heartbeat_controller.is_expired():
            self.logger.warning("Heartbeat timeout, resetting connection")
            reset = True

        if reset:
            self._report_connection_status(
                ConnectionStatus(CONNECTION_STATUS_LOST,
                                 NetworkAddress(self.host, self.port)))
            try:
                self.initialize_connection()
            except ChromecastConnectionError:
                self.stop.set()
            return False
        return True

    def _route_message(self, message, data):
        """ Route message to any handlers on the message namespace """
        # route message to handlers
        if message.namespace in self._handlers:

            # debug messages
            if message.namespace != NS_HEARTBEAT:
                self.logger.debug(
                    "Received: %s", _message_to_string(message, data))

            # message handlers
            try:
                handled = \
                    self._handlers[message.namespace].receive_message(
                        message, data)

                if not handled:
                    if data.get(REQUEST_ID) not in self._request_callbacks:
                        self.logger.debug(
                            "Message unhandled: %s",
                            _message_to_string(message, data))
            except Exception:  # pylint: disable=broad-except
                self.logger.exception(
                    (u"Exception caught while sending message to "
                     u"controller %s: %s"),
                    type(self._handlers[message.namespace]).__name__,
                    _message_to_string(message, data))

        else:
            self.logger.debug(
                "Received unknown namespace: %s",
                _message_to_string(message, data))

    def _cleanup(self):
        """ Cleanup open channels and handlers """
        for channel in self._open_channels:
            try:
                self._disconnect_channel(channel)
            except Exception:  # pylint: disable=broad-except
                pass

        for handler in self._handlers.values():
            try:
                handler.tear_down()
            except Exception:  # pylint: disable=broad-except
                pass

        self.socket.close()
        self._report_connection_status(
            ConnectionStatus(CONNECTION_STATUS_DISCONNECTED,
                             NetworkAddress(self.host, self.port)))
        self.connecting = True

    def _report_connection_status(self, status):
        """ Report a change in the connection status to any listeners """
        for listener in self._connection_listeners:
            try:
                self.logger.debug("connection listener: %x (%s)",
                                  id(listener), type(listener).__name__)
                listener.new_connection_status(status)
            except Exception:  # pylint: disable=broad-except
                pass

    def _read_bytes_from_socket(self, msglen):
        """ Read bytes from the socket. """
        chunks = []
        bytes_recd = 0
        while bytes_recd < msglen:
            if self.stop.is_set():
                raise InterruptLoop("Stopped while reading from socket")
            try:
                chunk = self.socket.recv(min(msglen - bytes_recd, 2048))
                if chunk == b'':
                    raise socket.error("socket connection broken")
                chunks.append(chunk)
                bytes_recd += len(chunk)
            except socket.timeout:
                continue
            except ssl.SSLError as exc:
                # Support older ssl implementations which does not raise
                # socket.timeout on timeouts
                if _is_ssl_timeout(exc):
                    continue
                raise
        return b''.join(chunks)

    def _read_message(self):
        """ Reads a message from the socket and converts it to a message. """
        # first 4 bytes is Big-Endian payload length
        payload_info = self._read_bytes_from_socket(4)
        read_len = unpack(">I", payload_info)[0]

        # now read the payload
        payload = self._read_bytes_from_socket(read_len)

        # pylint: disable=no-member
        message = cast_channel_pb2.CastMessage()
        message.ParseFromString(payload)

        return message

    # pylint: disable=too-many-arguments
    def send_message(self, destination_id, namespace, data,
                     inc_session_id=False, wait_for_response=False,
                     no_add_request_id=False, force=False):
        """ Send a message to the Chromecast. """

        # namespace is a string containing namespace
        # data is a dict that will be converted to json
        # wait_for_response only works if we have a request id

        # If channel is not open yet, connect to it.
        self._ensure_channel_connected(destination_id)

        request_id = None
        if not no_add_request_id:
            request_id = self._gen_request_id()
            data[REQUEST_ID] = request_id

        if inc_session_id:
            data[SESSION_ID] = self.session_id

        # pylint: disable=no-member
        msg = cast_channel_pb2.CastMessage()

        msg.protocol_version = msg.CASTV2_1_0
        msg.source_id = self.source_id
        msg.destination_id = destination_id
        msg.payload_type = cast_channel_pb2.CastMessage.STRING
        msg.namespace = namespace
        msg.payload_utf8 = _json_to_payload(data)

        # prepend message with Big-Endian 4 byte payload size
        be_size = pack(">I", msg.ByteSize())

        # Log all messages except heartbeat
        if msg.namespace != NS_HEARTBEAT:
            self.logger.debug("Sending: %s", _message_to_string(msg, data))

        if not force and self.stop.is_set():
            raise PyChromecastStopped("Socket client's thread is stopped.")
        if not self.connecting and not self._force_recon:
            try:
                self.socket.sendall(be_size + msg.SerializeToString())
            except socket.error:
                self._force_recon = True
                self.logger.info('Error writing to socket.')
        else:
            raise NotConnected("Chromecast is connecting...")

        response = None
        if not no_add_request_id and wait_for_response:
            callback = self._request_callbacks[request_id] = {
                'event': threading.Event(),
                'response': None,
            }
            callback['event'].wait()
            response = callback.get('response')
        return response

    def send_platform_message(self, namespace, message, inc_session_id=False,
                              wait_for_response=False):
        """ Helper method to send a message to the platform. """
        return self.send_message(PLATFORM_DESTINATION_ID, namespace, message,
                                 inc_session_id, wait_for_response)

    def send_app_message(self, namespace, message, inc_session_id=False,
                         wait_for_response=False):
        """ Helper method to send a message to current running app. """
        if namespace not in self.app_namespaces:
            raise UnsupportedNamespace(
                ("Namespace {} is not supported by current app. "
                 "Supported are {}").format(namespace,
                                            ", ".join(self.app_namespaces)))

        return self.send_message(self.destination_id, namespace, message,
                                 inc_session_id, wait_for_response)

    def register_connection_listener(self, listener):
        """ Register a connection listener for when the socket connection
            changes. Listeners will be called with
            listener.new_connection_status(status) """
        self._connection_listeners.append(listener)

    def _ensure_channel_connected(self, destination_id):
        """ Ensure we opened a channel to destination_id. """
        if destination_id not in self._open_channels:
            self._open_channels.append(destination_id)

            self.send_message(
                destination_id, NS_CONNECTION,
                {MESSAGE_TYPE: TYPE_CONNECT,
                 'origin': {},
                 'userAgent': 'PyChromecast',
                 'senderInfo': {
                     'sdkType': 2,
                     'version': '15.605.1.3',
                     'browserVersion': "44.0.2403.30",
                     'platform': 4,
                     'systemVersion': 'Macintosh; Intel Mac OS X10_10_3',
                     'connectionType': 1}},
                no_add_request_id=True)

    def _disconnect_channel(self, destination_id):
        """ Disconnect a channel with destination_id. """
        if destination_id in self._open_channels:
            self.send_message(
                destination_id, NS_CONNECTION,
                {MESSAGE_TYPE: TYPE_CLOSE, 'origin': {}},
                no_add_request_id=True, force=True)

            self._open_channels.remove(destination_id)

            self.handle_channel_disconnected()

    def handle_channel_disconnected(self):
        """ Handles a channel being disconnected. """
        for namespace in self.app_namespaces:
            if namespace in self._handlers:
                self._handlers[namespace].channel_disconnected()

        self.app_namespaces = []
        self.destination_id = None
        self.session_id = None


class ConnectionController(BaseController):
    """ Controller to respond to connection messages. """

    def __init__(self):
        super(ConnectionController, self).__init__(NS_CONNECTION)

    def receive_message(self, message, data):
        """ Called when a connection message is received. """
        if self._socket_client.is_stopped:
            return True

        if data[MESSAGE_TYPE] == TYPE_CLOSE:
            self._socket_client.handle_channel_disconnected()

            return True

        else:
            return False


class HeartbeatController(BaseController):
    """ Controller to respond to heartbeat messages. """

    def __init__(self):
        super(HeartbeatController, self).__init__(
            NS_HEARTBEAT, target_platform=True)
        self.last_ping = 0
        self.last_pong = time.time()

    def receive_message(self, message, data):
        """ Called when a heartbeat message is received. """
        if self._socket_client.is_stopped:
            return True

        if data[MESSAGE_TYPE] == TYPE_PING:
            try:
                self._socket_client.send_message(
                    PLATFORM_DESTINATION_ID, self.namespace,
                    {MESSAGE_TYPE: TYPE_PONG}, no_add_request_id=True)
            except PyChromecastStopped:
                self._socket_client.logger.exception(
                    "Heartbeat error when sending response, "
                    "Chromecast connection has stopped")

            return True

        elif data[MESSAGE_TYPE] == TYPE_PONG:
            self.reset()
            return True

        else:
            return False

    def ping(self):
        """ Send a ping message. """
        self.last_ping = time.time()
        try:
            self.send_message({MESSAGE_TYPE: TYPE_PING})
        except NotConnected:
            self._socket_client.logger.error("Chromecast is disconnected. " +
                                             "Cannot ping until reconnected.")

    def reset(self):
        """ Reset expired counter. """
        self.last_pong = time.time()

    def is_expired(self):
        """ Indicates if connection has expired. """
        if time.time() - self.last_ping > HB_PING_TIME:
            self.ping()

        return (time.time() - self.last_pong) > HB_PING_TIME + HB_PONG_TIME


class ReceiverController(BaseController):
    """
    Controller to interact with the Chromecast platform.

    :param cast_type: Type of Chromecast device.
    """

    def __init__(self, cast_type=CAST_TYPE_CHROMECAST):
        super(ReceiverController, self).__init__(
            NS_RECEIVER, target_platform=True)

        self.status = None
        self.launch_failure = None
        self.app_to_launch = None
        self.cast_type = cast_type
        self.app_launch_event = threading.Event()

        self._status_listeners = []
        self._launch_error_listeners = []

    @property
    def app_id(self):
        """ Convenience method to retrieve current app id. """
        return self.status.app_id if self.status else None

    def receive_message(self, message, data):
        """ Called when a receiver-message has been received. """
        if data[MESSAGE_TYPE] == TYPE_RECEIVER_STATUS:
            self._process_get_status(data)

            return True

        elif data[MESSAGE_TYPE] == TYPE_LAUNCH_ERROR:
            self._process_launch_error(data)

            return True

        else:
            return False

    def register_status_listener(self, listener):
        """ Register a status listener for when a new Chromecast status
            has been received. Listeners will be called with
            listener.new_cast_status(status) """
        self._status_listeners.append(listener)

    def register_launch_error_listener(self, listener):
        """ Register a listener for when a new launch error message
            has been received. Listeners will be called with
            listener.new_launch_error(launch_failure) """
        self._launch_error_listeners.append(listener)

    def update_status(self, blocking=False):
        """ Sends a message to the Chromecast to update the status. """
        self.logger.debug("Receiver:Updating status")
        self.send_message({MESSAGE_TYPE: TYPE_GET_STATUS},
                          wait_for_response=blocking)

    def launch_app(self, app_id, force_launch=False, block_till_launched=True):
        """ Launches an app on the Chromecast.

            Will only launch if it is not currently running unless
            force_launch=True. """
        # If this is called too quickly after launch, we don't have the info.
        # We need the info if we are not force launching to check running app.
        if not force_launch and self.app_id is None:
            self.update_status(True)

        if force_launch or self.app_id != app_id:
            self.logger.info("Receiver:Launching app %s", app_id)

            # If we are blocking we need to wait for the status update or
            # launch failure before returning
            self.launch_failure = None
            if block_till_launched:
                self.app_to_launch = app_id
                self.app_launch_event.clear()

            response = self.send_message({MESSAGE_TYPE: TYPE_LAUNCH,
                                          APP_ID: app_id},
                                         wait_for_response=block_till_launched)

            if block_till_launched:
                is_app_started = False
                if response:
                    response_type = response[MESSAGE_TYPE]
                    if response_type == TYPE_RECEIVER_STATUS:
                        new_status = self._parse_status(response,
                                                        self.cast_type)
                        new_app_id = new_status.app_id
                        if new_app_id == app_id:
                            is_app_started = True
                            self.app_to_launch = None
                            self.app_launch_event.clear()
                    elif response_type == TYPE_LAUNCH_ERROR:
                        self.app_to_launch = None
                        self.app_launch_event.clear()
                        launch_error = self._parse_launch_error(response)
                        raise LaunchError(
                            "Failed to launch app: {}, Reason: {}".format(
                                app_id, launch_error.reason))

                if not is_app_started:
                    self.app_launch_event.wait()
                    if self.launch_failure:
                        raise LaunchError(
                            "Failed to launch app: {}, Reason: {}".format(
                                app_id, self.launch_failure.reason))
        else:
            self.logger.info(
                "Not launching app %s - already running", app_id)

    def stop_app(self, block_till_stopped=True):
        """ Stops the current running app on the Chromecast. """
        self.logger.info("Receiver:Stopping current app '%s'", self.app_id)
        return self.send_message(
            {MESSAGE_TYPE: 'STOP'},
            inc_session_id=True, wait_for_response=block_till_stopped)

    def set_volume(self, volume):
        """ Allows to set volume. Should be value between 0..1.
        Returns the new volume.

        """
        volume = min(max(0, volume), 1)
        self.logger.info("Receiver:setting volume to %.1f", volume)
        self.send_message({MESSAGE_TYPE: 'SET_VOLUME',
                           'volume': {'level': volume}})
        return volume

    def set_volume_muted(self, muted):
        """ Allows to mute volume. """
        self.send_message(
            {MESSAGE_TYPE: 'SET_VOLUME',
             'volume': {'muted': muted}})

    @staticmethod
    def _parse_status(data, cast_type):
        """
        Parses a STATUS message and returns a CastStatus object.

        :type data: dict
        :param cast_type: Type of Chromecast.
        :rtype: CastStatus
        """
        data = data.get('status', {})

        volume_data = data.get('volume', {})

        try:
            app_data = data['applications'][0]
        except KeyError:
            app_data = {}

        is_audio = cast_type in (CAST_TYPE_AUDIO, CAST_TYPE_GROUP)

        status = CastStatus(
            data.get('isActiveInput', None if is_audio else False),
            data.get('isStandBy', None if is_audio else True),
            volume_data.get('level', 1.0),
            volume_data.get('muted', False),
            app_data.get(APP_ID),
            app_data.get('displayName'),
            [item['name'] for item in app_data.get('namespaces', [])],
            app_data.get(SESSION_ID),
            app_data.get('transportId'),
            app_data.get('statusText', '')
            )
        return status

    def _process_get_status(self, data):
        """ Processes a received STATUS message and notifies listeners. """
        status = self._parse_status(data, self.cast_type)
        is_new_app = self.app_id != status.app_id and self.app_to_launch
        self.status = status

        if is_new_app and self.app_to_launch == self.app_id:
            self.app_to_launch = None
            self.app_launch_event.set()

        self.logger.debug("Received status: %s", self.status)

        self._report_status()

    def _report_status(self):
        """ Reports the current status to all listeners. """
        for listener in self._status_listeners:
            try:
                listener.new_cast_status(self.status)
            except Exception:  # pylint: disable=broad-except
                pass

    @staticmethod
    def _parse_launch_error(data):
        """
        Parses a LAUNCH_ERROR message and returns a LaunchFailure object.

        :type data: dict
        :rtype: LaunchFailure
        """
        return LaunchFailure(
            data.get(ERROR_REASON, None),
            data.get(APP_ID),
            data.get(REQUEST_ID),
        )

    def _process_launch_error(self, data):
        """
        Processes a received LAUNCH_ERROR message and notifies listeners.
        """
        launch_failure = self._parse_launch_error(data)
        self.launch_failure = launch_failure

        if self.app_to_launch:
            self.app_to_launch = None
            self.app_launch_event.set()

        self.logger.debug("Launch status: %s", launch_failure)

        for listener in self._launch_error_listeners:
            try:
                listener.new_launch_error(launch_failure)
            except Exception:  # pylint: disable=broad-except
                pass

    def tear_down(self):
        """ Called when controller is destroyed. """
        super(ReceiverController, self).tear_down()

        self.status = None
        self.launch_failure = None
        self.app_to_launch = None
        self.app_launch_event.clear()
        self._report_status()

        self._status_listeners[:] = []
