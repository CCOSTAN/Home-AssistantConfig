"""Discover Belkin Wemo devices."""
from . import SSDPDiscoverable


class Discoverable(SSDPDiscoverable):
    """Add support for discovering Belkin WeMo platform devices."""

    def info_from_entry(self, entry):
        """Return most important info from a uPnP entry."""
        device = entry.description['device']

        return (device['friendlyName'], device['modelName'],
                entry.values['location'], device.get('macAddress', ''),
                device['serialNumber'])

    def get_entries(self):
        """Return all Belkin Wemo entries."""
        return self.find_by_device_description(
            {'manufacturer': 'Belkin International Inc.'})
