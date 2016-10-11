"""Discover Tellstick devices."""
from . import BaseDiscoverable


class Discoverable(BaseDiscoverable):
    """Add support for discovering a Tellstick device."""

    def __init__(self, netdis):
        """Initialize the Tellstick discovery."""
        self._netdis = netdis

    def get_entries(self):
        """Get all the Tellstick details."""
        return self._netdis.tellstick.entries
