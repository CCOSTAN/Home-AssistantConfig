"""Module that implements SSDP protocol."""
import re
import select
import socket
import logging
from datetime import datetime, timedelta
import threading
import xml.etree.ElementTree as ElementTree

import requests

from netdisco.util import etree_to_dict, interface_addresses

DISCOVER_TIMEOUT = 5
SSDP_MX = 1
SSDP_TARGET = ("239.255.255.250", 1900)

RESPONSE_REGEX = re.compile(r'\n(.*)\: (.*)\r')

MIN_TIME_BETWEEN_SCANS = timedelta(seconds=59)

# Devices and services
ST_ALL = "ssdp:all"

# Devices only, some devices will only respond to this query
ST_ROOTDEVICE = "upnp:rootdevice"


class SSDP(object):
    """Control the scanning of uPnP devices and services and caches output."""

    def __init__(self):
        """Initialize the discovery."""
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
        with self._lock:
            self.update()

            return list(self.entries)

    # pylint: disable=invalid-name
    def find_by_st(self, st):
        """Return a list of entries that match the ST."""
        with self._lock:
            self.update()

            return [entry for entry in self.entries
                    if entry.st == st]

    def find_by_device_description(self, values):
        """Return a list of entries that match the description.

        Pass in a dict with values to match against the device tag in the
        description.
        """
        with self._lock:
            self.update()

            return [entry for entry in self.entries
                    if entry.match_device_description(values)]

    def update(self, force_update=False):
        """Scan for new uPnP devices and services."""
        with self._lock:
            if self.last_scan is None or force_update or \
               datetime.now()-self.last_scan > MIN_TIME_BETWEEN_SCANS:

                self.remove_expired()

                # Wemo does not respond to a query for all devices+services
                # but only to a query for just root devices.
                self.entries.extend(
                    entry for entry in scan() + scan(ST_ROOTDEVICE)
                    if entry not in self.entries)

                self.last_scan = datetime.now()

    def remove_expired(self):
        """Filter out expired entries."""
        with self._lock:
            self.entries = [entry for entry in self.entries
                            if not entry.is_expired]


class UPNPEntry(object):
    """Found uPnP entry."""

    DESCRIPTION_CACHE = {'_NO_LOCATION': {}}

    def __init__(self, values):
        """Initialize the discovery."""
        self.values = values
        self.created = datetime.now()

        if 'cache-control' in self.values:
            cache_seconds = int(self.values['cache-control'].split('=')[1])

            self.expires = self.created + timedelta(seconds=cache_seconds)
        else:
            self.expires = None

    @property
    def is_expired(self):
        """Return if the entry is expired or not."""
        return self.expires is not None and datetime.now() > self.expires

    # pylint: disable=invalid-name
    @property
    def st(self):
        """Return ST value."""
        return self.values.get('st')

    @property
    def location(self):
        """Return Location value."""
        return self.values.get('location')

    @property
    def description(self):
        """Return the description from the uPnP entry."""
        url = self.values.get('location', '_NO_LOCATION')

        if url not in UPNPEntry.DESCRIPTION_CACHE:
            try:
                xml = requests.get(url).text

                tree = ElementTree.fromstring(xml)

                UPNPEntry.DESCRIPTION_CACHE[url] = \
                    etree_to_dict(tree).get('root', {})
            except requests.RequestException:
                logging.getLogger(__name__).error(
                    "Error fetching description at %s", url)

                UPNPEntry.DESCRIPTION_CACHE[url] = {}

            except ElementTree.ParseError:
                logging.getLogger(__name__).error(
                    "Found malformed XML at %s: %s", url, xml)

                UPNPEntry.DESCRIPTION_CACHE[url] = {}

        return UPNPEntry.DESCRIPTION_CACHE[url]

    def match_device_description(self, values):
        """Fetch description and matches against it.

        Values should only contain lowercase keys.
        """
        device = self.description.get('device')

        if device is None:
            return False

        return all(device.get(key) in val
                   if isinstance(val, list)
                   else val == device.get(key)
                   for key, val in values.items())

    @classmethod
    def from_response(cls, response):
        """Create a uPnP entry from a response."""
        return UPNPEntry({key.lower(): item for key, item
                          in RESPONSE_REGEX.findall(response)})

    def __eq__(self, other):
        """Return the comparison."""
        return (self.__class__ == other.__class__ and
                self.values == other.values)

    def __repr__(self):
        """Return the entry."""
        return "<UPNPEntry {} - {}>".format(
            self.values.get('st', ''), self.values.get('location', ''))


# pylint: disable=invalid-name,too-many-locals
def scan(st=None, timeout=DISCOVER_TIMEOUT, max_entries=None):
    """Send a message over the network to discover uPnP devices.

    Inspired by Crimsdings
    https://github.com/crimsdings/ChromeCast/blob/master/cc_discovery.py

    Protocol explanation:
    https://embeddedinn.wordpress.com/tutorials/upnp-device-architecture/
    """
    # pylint: disable=too-many-nested-blocks,too-many-branches
    ssdp_st = st or ST_ALL
    ssdp_request = "\r\n".join([
        'M-SEARCH * HTTP/1.1',
        'HOST: 239.255.255.250:1900',
        'MAN: "ssdp:discover"',
        'MX: {:d}'.format(SSDP_MX),
        'ST: {}'.format(ssdp_st),
        '', '']).encode('utf-8')

    stop_wait = datetime.now() + timedelta(0, timeout)

    sockets = []
    for addr in interface_addresses():
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

            # Set the time-to-live for messages for local network
            sock.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 1)
            sock.bind((addr, 0))

            sockets.append(sock)
        except socket.error:
            pass

    entries = []
    for sock in [s for s in sockets]:
        try:
            sock.sendto(ssdp_request, SSDP_TARGET)
            sock.setblocking(False)
        except socket.error:
            sockets.remove(sock)
            sock.close()

    try:
        while sockets:
            time_diff = stop_wait - datetime.now()
            seconds_left = time_diff.total_seconds()
            if seconds_left <= 0:
                break

            ready = select.select(sockets, [], [], seconds_left)[0]

            for sock in ready:
                try:
                    response = sock.recv(1024).decode("utf-8")
                except socket.error:
                    logging.getLogger(__name__).exception(
                        "Socket error while discovering SSDP devices")
                    sockets.remove(sock)
                    sock.close()
                    continue

                entry = UPNPEntry.from_response(response)

                if (st is None or entry.st == st) and entry not in entries:
                    entries.append(entry)

                    if max_entries and len(entries) == max_entries:
                        raise StopIteration

    except StopIteration:
        pass

    finally:
        for s in sockets:
            s.close()

    return entries


def main():
    """Test SSDP discovery."""
    from pprint import pprint

    pprint("Scanning SSDP..")
    pprint(scan())

if __name__ == "__main__":
    main()
