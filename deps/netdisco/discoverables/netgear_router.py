"""Discover Netgear routers."""
from netdisco.util import urlparse
from . import SSDPDiscoverable


class Discoverable(SSDPDiscoverable):
    """Add support for discovering Netgear routers."""

    def info_from_entry(self, entry):
        """Return the most important info from a uPnP entry."""
        url = urlparse(entry.values['location'])

        return (entry.description['device']['modelNumber'], url.hostname)

    def get_entries(self):
        """Get all the Netgear uPnP entries."""
        return self.find_by_device_description({
            "manufacturer": "NETGEAR, Inc.",
            "deviceType": "urn:schemas-upnp-org:device:InternetGatewayDevice:1"
        })
