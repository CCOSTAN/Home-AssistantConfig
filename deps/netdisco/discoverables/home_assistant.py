"""Discover Home Assistant servers."""
from . import MDNSDiscoverable


# pylint: disable=too-few-public-methods
class Discoverable(MDNSDiscoverable):
    """Add support for discovering Home Assistant instances."""

    def __init__(self, nd):
        super(Discoverable, self).__init__(nd, '_home-assistant._tcp.local.')

    def info_from_entry(self, entry):
        """Returns most important info from mDNS entries."""
        return (entry.properties.get(b'base_url').decode('utf-8'),
                entry.properties.get(b'version').decode('utf-8'),
                entry.properties.get(b'requires_api_password'))

    def get_info(self):
        """Get details from Home Assistant instances."""
        return [self.info_from_entry(entry) for entry in self.get_entries()]
