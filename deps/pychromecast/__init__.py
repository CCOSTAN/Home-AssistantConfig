"""
PyChromecast: remote control your Chromecast
"""
from __future__ import print_function

import sys
import logging
import fnmatch

# pylint: disable=wildcard-import
import threading
from .config import *  # noqa
from .error import *  # noqa
from . import socket_client
from .discovery import discover_chromecasts
from .dial import get_device_status, reboot, DeviceStatus, CAST_TYPES, \
    CAST_TYPE_CHROMECAST
from .controllers.media import STREAM_TYPE_BUFFERED  # noqa

__all__ = (
    '__version__', '__version_info__',
    'get_chromecasts', 'get_chromecasts_as_dict', 'get_chromecast',
    'Chromecast'
)
__version_info__ = ('0', '7', '1')
__version__ = '.'.join(__version_info__)

IDLE_APP_ID = 'E8C28D3C'
IGNORE_CEC = []
# For Python 2.x we need to decode __repr__ Unicode return values to str
NON_UNICODE_REPR = sys.version_info < (3, )


def _get_all_chromecasts(tries=None, retry_wait=None, timeout=None):
    """
    Returns a list of all chromecasts on the network as PyChromecast
    objects.
    """
    hosts = discover_chromecasts()
    cc_list = []
    for ip_address, port, uuid, model_name, friendly_name in hosts:
        try:
            # Build device status from the mDNS info, this information is
            # the primary source and the remaining will be fetched
            # later on.
            cast_type = CAST_TYPES.get(model_name.lower(),
                                       CAST_TYPE_CHROMECAST)
            device = DeviceStatus(
                friendly_name=friendly_name, model_name=model_name,
                manufacturer=None, api_version=None,
                uuid=uuid, cast_type=cast_type,
            )
            cc_list.append(Chromecast(host=ip_address, port=port,
                                      device=device,
                                      tries=tries, timeout=timeout,
                                      retry_wait=retry_wait))
        except ChromecastConnectionError:  # noqa
            pass
    return cc_list


def get_chromecasts(tries=None, retry_wait=None, timeout=None, **filters):
    """
    Searches the network and returns a list of Chromecast objects.
    Filter is a list of options to filter the chromecasts by.

    ex: get_chromecasts(friendly_name="Living Room")

    May return an empty list if no chromecasts were found matching
    the filter criteria

    Filters include DeviceStatus items:
        friendly_name, model_name, manufacturer, api_version
    Or AppStatus items:
        app_id, description, state, service_url, service_protocols (list)
    Or ip address:
        ip

    Tries is specified if you want to limit the number of times the
    underlying socket associated with your Chromecast objects will
    retry connecting if connection is lost or it fails to connect
    in the first place. The number of seconds spent between each retry
    can be defined by passing the retry_wait parameter, the default is
    to wait 5 seconds.
    """
    logger = logging.getLogger(__name__)

    cc_list = set(_get_all_chromecasts(tries, retry_wait, timeout))
    excluded_cc = set()

    if not filters:
        return list(cc_list)

    if 'ip' in filters:
        for chromecast in cc_list:
            if chromecast.host != filters['ip']:
                excluded_cc.add(chromecast)
        filters.pop('ip')

    for key, val in filters.items():
        for chromecast in cc_list:
            for tup in [chromecast.device, chromecast.status]:
                if hasattr(tup, key) and val != getattr(tup, key):
                    excluded_cc.add(chromecast)

    filtered_cc = cc_list - excluded_cc

    for cast in excluded_cc:
        logger.debug("Stopping excluded chromecast %s", cast)
        cast.socket_client.stop.set()

    return list(filtered_cc)


def get_chromecasts_as_dict(tries=None, retry_wait=None, timeout=None,
                            **filters):
    """
    Returns a dictionary of chromecasts with the friendly name as
    the key.  The value is the pychromecast object itself.

    Tries is specified if you want to limit the number of times the
    underlying socket associated with your Chromecast objects will
    retry connecting if connection is lost or it fails to connect
    in the first place. The number of seconds spent between each retry
    can be defined by passing the retry_wait parameter, the default is
    to wait 5 seconds.
    """
    return {cc.device.friendly_name: cc
            for cc in get_chromecasts(tries=tries, retry_wait=retry_wait,
                                      timeout=timeout,
                                      **filters)}


def get_chromecast(strict=False, tries=None, retry_wait=None, timeout=None,
                   **filters):
    """
    Same as get_chromecasts but only if filter matches exactly one
    ChromeCast.

    Returns a Chromecast matching exactly the fitler specified.

    If strict, return one and only one chromecast

    Tries is specified if you want to limit the number of times the
    underlying socket associated with your Chromecast objects will
    retry connecting if connection is lost or it fails to connect
    in the first place. The number of seconds spent between each retry
    can be defined by passing the retry_wait parameter, the default is
    to wait 5 seconds.

    :type retry_wait: float or None
    """

    # If we have filters or are operating in strict mode we have to scan
    # for all Chromecasts to ensure there is only 1 matching chromecast.
    # If no filters given and not strict just use the first dicsovered one.
    if filters or strict:
        results = get_chromecasts(tries=tries, retry_wait=retry_wait,
                                  timeout=timeout,
                                  **filters)
    else:
        results = _get_all_chromecasts(tries, retry_wait)

    if len(results) > 1:
        if strict:
            raise MultipleChromecastsFoundError(  # noqa
                'More than one Chromecast was found specifying '
                'the filter criteria: {}'.format(filters))
        else:
            return results[0]

    elif not results:
        if strict:
            raise NoChromecastFoundError(  # noqa
                'No Chromecasts matching filter critera were found:'
                ' {}'.format(filters))
        else:
            return None

    else:
        return results[0]


# pylint: disable=too-many-instance-attributes
class Chromecast(object):
    """
    Class to interface with a ChromeCast.

    :param port: The port to use when connecting to the device, set to None to
                 use the default of 8009. Special devices such as Cast Groups
                 may return a different port number so we need to use that.
    :param device: DeviceStatus with initial information for the device.
    :type device: pychromecast.dial.DeviceStatus
    :param tries: Number of retries to perform if the connection fails.
                  None for inifinite retries.
    :param timeout: A floating point number specifying the socket timeout in
                    seconds. None means to use the default which is 30 seconds.
    :param retry_wait: A floating point number specifying how many seconds to
                       wait between each retry. None means to use the default
                       which is 5 seconds.
    """

    def __init__(self, host, port=None, device=None, **kwargs):
        tries = kwargs.pop('tries', None)
        timeout = kwargs.pop('timeout', None)
        retry_wait = kwargs.pop('retry_wait', None)

        self.logger = logging.getLogger(__name__)

        # Resolve host to IP address
        self.host = host
        self.port = port or 8009

        self.logger.info("Querying device status")
        self.device = device
        if device:
            dev_status = get_device_status(self.host)
            if dev_status:
                # Values from `device` have priority over `dev_status`
                # as they come from the dial information.
                # `dev_status` may add extra information such as `manufacturer`
                # which dial does not supply
                self.device = DeviceStatus(
                    friendly_name=(device.friendly_name or
                                   dev_status.friendly_name),
                    model_name=(device.model_name or
                                dev_status.model_name),
                    manufacturer=(device.manufacturer or
                                  dev_status.manufacturer),
                    api_version=(device.api_version or
                                 dev_status.api_version),
                    uuid=(device.uuid or
                          dev_status.uuid),
                    cast_type=(device.cast_type or
                               dev_status.cast_type),
                )
            else:
                self.device = device
        else:
            self.device = get_device_status(self.host)

        if not self.device:
            raise ChromecastConnectionError(  # noqa
                "Could not connect to {}:{}".format(self.host, self.port))

        self.status = None
        self.status_event = threading.Event()

        self.socket_client = socket_client.SocketClient(
            host, port=port, cast_type=self.device.cast_type,
            tries=tries, timeout=timeout, retry_wait=retry_wait)

        receiver_controller = self.socket_client.receiver_controller
        receiver_controller.register_status_listener(self)

        # Forward these methods
        self.set_volume = receiver_controller.set_volume
        self.set_volume_muted = receiver_controller.set_volume_muted
        self.play_media = self.socket_client.media_controller.play_media
        self.register_handler = self.socket_client.register_handler
        self.register_status_listener = \
            receiver_controller.register_status_listener
        self.register_launch_error_listener = \
            receiver_controller.register_launch_error_listener
        self.register_connection_listener = \
            self.socket_client.register_connection_listener

        self.socket_client.start()

    @property
    def ignore_cec(self):
        """ Returns whether the CEC data should be ignored. """
        return self.device is not None and \
            any([fnmatch.fnmatchcase(self.device.friendly_name, pattern)
                 for pattern in IGNORE_CEC])

    @property
    def is_idle(self):
        """ Returns if there is currently an app running. """
        return (self.status is None or
                self.app_id in (None, IDLE_APP_ID) or
                (not self.status.is_active_input and not self.ignore_cec))

    @property
    def uuid(self):
        """ Returns the unique UUID of the Chromecast device. """
        return self.device.uuid

    @property
    def name(self):
        """
        Returns the friendly name set for the Chromecast device.
        This is the name that the end-user chooses for the cast device.
        """
        return self.device.friendly_name

    @property
    def model_name(self):
        """ Returns the model name of the Chromecast device. """
        return self.device.model_name

    @property
    def cast_type(self):
        """
        Returns the type of the Chromecast device.
        This is one of CAST_TYPE_CHROMECAST for regular Chromecast device,
        CAST_TYPE_AUDIO for Chromecast devices that only support audio
        and CAST_TYPE_GROUP for virtual a Chromecast device that groups
        together two or more cast (Audio for now) devices.

        :rtype: str
        """
        return self.device.cast_type

    @property
    def app_id(self):
        """ Returns the current app_id. """
        return self.status.app_id if self.status else None

    @property
    def app_display_name(self):
        """ Returns the name of the current running app. """
        return self.status.display_name if self.status else None

    @property
    def media_controller(self):
        """ Returns the media controller. """
        return self.socket_client.media_controller

    def new_cast_status(self, status):
        """ Called when a new status received from the Chromecast. """
        self.status = status
        if status:
            self.status_event.set()

    def start_app(self, app_id):
        """ Start an app on the Chromecast. """
        self.logger.info("Starting app %s", app_id)

        self.socket_client.receiver_controller.launch_app(app_id)

    def quit_app(self):
        """ Tells the Chromecast to quit current app_id. """
        self.logger.info("Quiting current app")

        self.socket_client.receiver_controller.stop_app()

    def reboot(self):
        """ Reboots the Chromecast. """
        reboot(self.host)

    def volume_up(self):
        """ Increment volume by 0.1 unless it is already maxed.
        Returns the new volume.

        """
        volume = round(self.status.volume_level, 1)
        return self.set_volume(volume + 0.1)

    def volume_down(self):
        """ Decrement the volume by 0.1 unless it is already 0.
        Returns the new volume.
        """
        volume = round(self.status.volume_level, 1)
        return self.set_volume(volume - 0.1)

    def wait(self, timeout=None):
        """
        Waits until the cast device is ready for communication. The device
        is ready as soon a status message has been received.

        If the status has already been received then the method returns
        immediately.

        :param timeout: a floating point number specifying a timeout for the
                        operation in seconds (or fractions thereof). Or None
                        to block forever.
        """
        self.status_event.wait(timeout=timeout)

    def disconnect(self, timeout=None, blocking=True):
        """
        Disconnects the chromecast and waits for it to terminate.

        :param timeout: a floating point number specifying a timeout for the
                        operation in seconds (or fractions thereof). Or None
                        to block forever.
        :param blocking: If True it will block until the disconnection is
                         complete, otherwise it will return immediately.
        """
        self.socket_client.disconnect()
        if blocking:
            self.join(timeout=timeout)

    def join(self, timeout=None):
        """
        Blocks the thread of the caller until the chromecast connection is
        stopped.

        :param timeout: a floating point number specifying a timeout for the
                        operation in seconds (or fractions thereof). Or None
                        to block forever.
        """
        self.socket_client.join(timeout=timeout)

    def __del__(self):
        try:
            self.socket_client.stop.set()
        except AttributeError:
            pass

    def __repr__(self):
        txt = u"Chromecast({!r}, port={!r}, device={!r})".format(
            self.host, self.port, self.device)
        # Python 2.x does not work well with unicode returned from repr
        if NON_UNICODE_REPR:
            return txt.encode('utf-8')
        return txt

    def __unicode__(self):
        return u"Chromecast({}, {}, {}, {}, {}, api={}.{})".format(
            self.host, self.port, self.device.friendly_name,
            self.device.model_name, self.device.manufacturer,
            self.device.api_version[0], self.device.api_version[1])
