"""
Sensor for checking the size of your HA database file. 

For more details about this platform, please refer to the documentation at
https://home-assistant.io/components/sensor.database
"""
import logging
import os

from homeassistant.helpers.entity import Entity

_LOGGER = logging.getLogger(__name__)

PATH = "/config/home-assistant_v2.db"


def setup_platform(hass, config, add_devices, discovery_info=None):
    """Set up the database sensor."""
    db = Database(PATH)
    add_devices([db], True)


class Database(Entity):
    """Representation of the HA database."""
    ICON = 'mdi:harddisk'

    def __init__(self, path):
        """Initialize the data object."""
        self._path = path   # Need to check its a valid path
        self._size = None
        self._name = "Database_sensor"
        self._attributes = {}
        self._unit_of_measurement = 'MB'
        self.update()

    def update(self):
        """Get the size of the database."""
        self._size = self.get_db_size(self._path)

    def get_db_size(self, path):
        statinfo = os.stat(path)
        decimals = 2
        db_size = round(statinfo.st_size/1e6, decimals)
        return db_size

    @property
    def name(self):
        """Return the name of the sensor."""
        return self._name

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._size

    @property
    def icon(self):
        """Icon to use in the frontend, if any."""
        return self.ICON

    @property
    def device_state_attributes(self):
        """Attributes."""
        return self._attributes

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement of this entity, if any."""
        return self._unit_of_measurement