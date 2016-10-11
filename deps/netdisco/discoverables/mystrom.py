"""Discover myStrom devices."""
from . import MDNSDiscoverable


# pylint: disable=too-few-public-methods
class Discoverable(MDNSDiscoverable):
    """Add support for discovering myStrom switches."""

    def __init__(self, nd):
        super(Discoverable, self).__init__(nd, '_hap._tcp.local.')

    def info_from_entry(self, entry):
        """Return the most important info from mDNS entries."""
        return (entry.properties.get(b'md').decode('utf-8'),
                'http://{}'.format(self.ip_from_host(entry.server)),
                entry.properties.get(b'id').decode('utf-8'))

    def get_info(self):
        """Get details from myStrom devices."""
        return [self.info_from_entry(entry) for entry in self.get_entries()]
