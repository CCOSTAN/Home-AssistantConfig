"""Discover myStrom devices."""
from . import MDNSDiscoverable


# pylint: disable=too-few-public-methods
class Discoverable(MDNSDiscoverable):
    """Add support for discovering myStrom switches."""

    def __init__(self, nd):
        super(Discoverable, self).__init__(nd, '_hap._tcp.local.')

    def info_from_entry(self, entry):
        """Return the most important info from mDNS entries."""
        info = {key.decode('utf-8'): value.decode('utf-8')
                for key, value in entry.properties.items()}
        info['host'] = 'http://{}'.format(self.ip_from_host(entry.server))
        return info

    def get_info(self):
        """Get details from myStrom devices."""
        return [self.info_from_entry(entry) for entry in self.get_entries()]
