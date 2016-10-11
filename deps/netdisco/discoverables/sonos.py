"""Discover Sonos devices."""
from netdisco.util import urlparse
from . import SSDPDiscoverable


# pylint: disable=too-few-public-methods
class Discoverable(SSDPDiscoverable):
    """Add support for discovering Sonos devices."""

    def info_from_entry(self, entry):
        """Return the most important info from a uPnP entry."""
        return urlparse(entry.values['location']).hostname

    def get_entries(self):
        """Get all the Sonos device uPnP entries."""
        return self.find_by_st("urn:schemas-upnp-org:device:ZonePlayer:1")
