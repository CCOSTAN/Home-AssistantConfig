"""
Sensor to check the status of a Minecraft server.

"""
import logging
from homeassistant.helpers.entity import Entity
ATTR_PING = 'Ping'
ATTR_USERS = 'Users Online'
ATTR_MOTD = 'MOTD'
ATTR_VERSION = 'Version'
ICON = 'mdi:minecraft'
REQUIREMENTS = ['mcstatus==2.1']

# pylint: disable=unused-argument
def setup_platform(hass, config, add_devices, discovery_info=None):
    """Setup the Minecraft server platform."""
    from mcstatus import MinecraftServer as mcserver
    logger = logging.getLogger(__name__)

    server = config.get('server')
    name = config.get('name')

    if server is None:
        logger.error('No server specified')
        return False
    elif name is None:
        logger.error('No name specified')
        return False

    add_devices([
        MCServerSensor(server, name, mcserver)
    ])


class MCServerSensor(Entity):
    """A class for the Minecraft server."""

    # pylint: disable=abstract-method
    def __init__(self, server, name, mcserver):
        """Initialize the sensor."""
        self._mcserver = mcserver
        self._server = server
        self._name = name
        self.update()

    @property
    def name(self):
        """Return the name of the server."""
        return self._name

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    # pylint: disable=no-member
    def update(self):
        """Update device state."""
        status = self._mcserver.lookup(self._server).status()
        query = self._mcserver.lookup(self._server).query()
        self._state = str(status.players.online) + '/' + str(status.players.max)
        self._ping = status.latency
        self._users = query.players.names
        self._motd = query.motd
        self._version = query.software.version


    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return {
       ATTR_PING: self._ping,
       ATTR_USERS: self._users,
       ATTR_MOTD: self._motd,
       ATTR_VERSION: self._version
        }

    @property
    def icon(self):
        """Return the icon to use in the frontend."""
        return ICON
