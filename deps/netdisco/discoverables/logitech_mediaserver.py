"""Discover Logitech Media Server."""
from . import BaseDiscoverable


class Discoverable(BaseDiscoverable):
    """Add support for discovering Logitech Media Server."""

    def __init__(self, netdis):
        """Initialize Logitech Media Server discovery."""
        self.netdis = netdis

    def get_entries(self):
        """Get all the Logitech Media Server details."""
        return [entry['from'] for entry in self.netdis.lms.entries]
