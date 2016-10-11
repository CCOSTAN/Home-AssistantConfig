"""Discover PlexMediaServer."""
from . import GDMDiscoverable


class Discoverable(GDMDiscoverable):
    """Add support for discovering Plex Media Server."""

    def info_from_entry(self, entry):
        """Return most important info from a GDM entry."""
        return (entry['data']['Name'],
                'https://%s:%s' % (entry['from'][0], entry['data']['Port']))

    def get_entries(self):
        """Return all PMS entries."""
        return self.find_by_data({'Content-Type': 'plex/media-server'})
