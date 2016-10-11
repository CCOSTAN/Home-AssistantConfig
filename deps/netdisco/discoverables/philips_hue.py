"""Discover Philips Hue bridges."""
from . import SSDPDiscoverable


class Discoverable(SSDPDiscoverable):
    """Add support for discovering Philips Hue bridges."""

    def info_from_entry(self, entry):
        """Return the most important info from a uPnP entry."""
        desc = entry.description

        return desc['device']['friendlyName'], desc['URLBase']

    def get_entries(self):
        """Get all the Hue bridge uPnP entries."""
        # Hub models for year 2012 and 2015
        return self.find_by_device_description({
            "manufacturer": "Royal Philips Electronics",
            "modelNumber": ["929000226503", "BSB002"]
        })
