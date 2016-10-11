"""
Support for discovery using GDM (Good Day Mate), multicast protocol by Plex.

Inspired by
  hippojay's plexGDM:
  https://github.com/hippojay/script.plexbmc.helper/resources/lib/plexgdm.py
  iBaa's PlexConnect: https://github.com/iBaa/PlexConnect/PlexAPI.py
"""
import threading
import socket


class GDM(object):
    """Base class to discover GDM services."""

    def __init__(self):
        self.entries = []
        self.last_scan = None
        self._lock = threading.RLock()

    def scan(self):
        """Scan the network."""
        with self._lock:
            self.update()

    def all(self):
        """Return all found entries.

        Will scan for entries if not scanned recently.
        """
        self.scan()
        return list(self.entries)

    def find_by_content_type(self, value):
        """Return a list of entries that match the content_type."""
        self.scan()
        return [entry for entry in self.entries
                if value in entry['data']['Content_Type']]

    def find_by_data(self, values):
        """Return a list of entries that match the search parameters."""
        self.scan()
        return [entry for entry in self.entries
                if all(item in entry['data'].items()
                       for item in values.items())]

    def update(self):
        """Scan for new GDM services.

        Example of the dict list returned by this function:
        [{'data': 'Content-Type: plex/media-server'
                  'Host: 53f4b5b6023d41182fe88a99b0e714ba.plex.direct'
                  'Name: myfirstplexserver'
                  'Port: 32400'
                  'Resource-Identifier: 646ab0aa8a01c543e94ba975f6fd6efadc36b7'
                  'Updated-At: 1444852697'
                  'Version: 0.9.12.13.1464-4ccd2ca'
          'from': ('10.10.10.100', 32414)}]
        """

        gdm_ip = '239.0.0.250'  # multicast to PMS
        gdm_port = 32414
        gdm_msg = 'M-SEARCH * HTTP/1.0'.encode('ascii')
        gdm_timeout = 1

        self.entries = []

        # setup socket for discovery -> multicast message
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(gdm_timeout)

        # Set the time-to-live for messages for local network
        sock.setsockopt(socket.IPPROTO_IP,
                        socket.IP_MULTICAST_TTL,
                        gdm_timeout)

        try:
            # Send data to the multicast group
            sock.sendto(gdm_msg, (gdm_ip, gdm_port))

            # Look for responses from all recipients
            while True:
                try:
                    data, server = sock.recvfrom(1024)
                    data = data.decode('utf-8')
                    if '200 OK' in data.splitlines()[0]:
                        data = {k: v.strip() for (k, v) in (
                            line.split(':') for line in
                            data.splitlines() if ':' in line)}
                        self.entries.append({'data': data,
                                             'from': server})
                except socket.timeout:
                    break
        finally:
            sock.close()


def main():
    """Test GDM discovery."""
    # pylint: disable=invalid-name
    from pprint import pprint

    gdm = GDM()

    pprint("Scanning GDM...")
    gdm.update()
    pprint(gdm.entries)

if __name__ == "__main__":
    main()
