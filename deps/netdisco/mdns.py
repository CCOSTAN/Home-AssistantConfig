"""Add support for discovering mDNS services."""
import zeroconf


class MDNS(object):
    """Base class to discover mDNS services."""

    def __init__(self):
        """Initialize the discovery."""
        self.zeroconf = None
        self.services = []
        self._browsers = []

    def register_service(self, service):
        """Register a mDNS service."""
        self.services.append(service)

    def start(self):
        """Start discovery."""
        self.zeroconf = zeroconf.Zeroconf()

        for service in self.services:
            self._browsers.append(
                zeroconf.ServiceBrowser(self.zeroconf, service.typ, service))

    def stop(self):
        """Stop discovering."""
        while self._browsers:
            self._browsers.pop().cancel()

        for service in self.services:
            service.reset()

        self.zeroconf.close()
        self.zeroconf = None

    @property
    def entries(self):
        """Return all entries in the cache."""
        return self.zeroconf.cache.entries()
