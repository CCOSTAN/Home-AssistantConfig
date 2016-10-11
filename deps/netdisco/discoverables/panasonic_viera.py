"""Discover Panasonic Viera TV devices."""
from netdisco.util import urlparse
from . import SSDPDiscoverable


# pylint: disable=too-few-public-methods
class Discoverable(SSDPDiscoverable):
    """Add support for discovering Viera TV devices."""

    def info_from_entry(self, entry):
        """Return the most important info from a uPnP entry."""
        parsed = urlparse(entry.values['location'])
        return '{}:{}'.format(parsed.hostname, parsed.port)

    def get_entries(self):
        """Get all the Viera TV device uPnP entries."""
        return self.find_by_st("urn:panasonic-com:service:p00NetworkControl:1")
