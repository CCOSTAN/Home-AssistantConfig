"""
Provides controllers to handle specific namespaces in Chromecast communication.
"""
import logging

from ..error import UnsupportedNamespace, ControllerNotRegistered


class BaseController(object):
    """ ABC for namespace controllers. """

    def __init__(self, namespace, supporting_app_id=None,
                 target_platform=False):
        """
        Initialize the controller.

        namespace:         the namespace this controller will act on
        supporting_app_id: app to be launched if app is running with
                           unsupported namespace.
        target_platform:   set to True if you target the platform instead of
                           current app.
        """
        self.namespace = namespace
        self.supporting_app_id = supporting_app_id
        self.target_platform = target_platform

        self._socket_client = None
        self._message_func = None

        self.logger = logging.getLogger(__name__)

    @property
    def is_active(self):
        """ True if the controller is connected to a socket client and the
            Chromecast is running an app that supports this controller. """
        return (self._socket_client is not None and
                self.namespace in self._socket_client.app_namespaces)

    def launch(self):
        """ If set, launches app related to the controller. """
        self._check_registered()

        self._socket_client.receiver_controller.launch_app(
            self.supporting_app_id)

    def registered(self, socket_client):
        """ Called when a controller is registered. """
        self._socket_client = socket_client

        if self.target_platform:
            self._message_func = self._socket_client.send_platform_message
        else:
            self._message_func = self._socket_client.send_app_message

    def channel_connected(self):
        """ Called when a channel has been openend that supports the
            namespace of this controller. """
        pass

    def channel_disconnected(self):
        """ Called when a channel is disconnected. """
        pass

    def send_message(self, data, inc_session_id=False,
                     wait_for_response=False):
        """
        Send a message on this namespace to the Chromecast.

        Will raise a NotConnected exception if not connected.
        """
        self._check_registered()

        if not self.target_platform and \
           self.namespace not in self._socket_client.app_namespaces:
            if self.supporting_app_id is not None:
                self.launch()

            else:
                raise UnsupportedNamespace(
                    ("Namespace {} is not supported by running"
                     "application.").format(self.namespace))

        return self._message_func(
            self.namespace, data, inc_session_id, wait_for_response)

    # pylint: disable=unused-argument,no-self-use
    def receive_message(self, message, data):
        """
        Called when a message is received that matches the namespace.
        Returns boolean indicating if message was handled.
        """
        return False

    def tear_down(self):
        """ Called when we are shutting down. """
        self._socket_client = None
        self._message_func = None

    def _check_registered(self):
        """ Helper method to see if we are registered with a Cast object. """
        if self._socket_client is None:
            raise ControllerNotRegistered((
                "Trying to use the controller without it being registered "
                "with a Cast object."))
