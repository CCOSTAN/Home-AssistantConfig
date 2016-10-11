"""Discover DLNA services."""
from . import SSDPDiscoverable


# pylint: disable=too-few-public-methods
class Discoverable(SSDPDiscoverable):
    """Add support for discovering DLNA services."""

    def get_entries(self):
        """Get all the DLNA service uPnP entries."""
        return self.find_by_st("urn:schemas-upnp-org:device:MediaServer:1")
