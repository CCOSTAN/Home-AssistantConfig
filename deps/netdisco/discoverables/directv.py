"""Discover DirecTV Receivers."""
from netdisco.util import urlparse
from . import SSDPDiscoverable


class Discoverable(SSDPDiscoverable):
    """Add support for discovering DirecTV Receivers."""

    def info_from_entry(self, entry):
        """Return the most important info from a uPnP entry."""
        url = urlparse(entry.values['location'])

        device = entry.description['device']

        return url.hostname, device['serialNumber']

    def get_entries(self):
        """Get all the DirecTV uPnP entries."""
        return self.find_by_device_description({
            "manufacturer": "DIRECTV",
            "deviceType": "urn:schemas-upnp-org:device:MediaServer:1"
        })
