"""Discover Roku players."""
from netdisco.util import urlparse
from . import SSDPDiscoverable


class Discoverable(SSDPDiscoverable):
    """Add support for discovering Roku media players."""

    def info_from_entry(self, entry):
        """Return the most important info from a uPnP entry."""
        info = urlparse(entry.location)
        return info.hostname, info.port

    def get_entries(self):
        """Get all the Roku entries."""
        return self.find_by_st("roku:ecp")
