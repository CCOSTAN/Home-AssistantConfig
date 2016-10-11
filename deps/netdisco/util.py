"""Util functions used by Netdisco."""
from collections import defaultdict

# pylint: disable=unused-import, import-error, no-name-in-module
try:
    # Py2
    from urlparse import urlparse  # noqa
except ImportError:
    # Py3
    from urllib.parse import urlparse  # noqa
import netifaces


# Taken from http://stackoverflow.com/a/10077069
# pylint: disable=invalid-name
def etree_to_dict(t):
    """Convert an ETree object to a dict."""
    # strip namespace
    tag_name = t.tag[t.tag.find("}")+1:]

    d = {tag_name: {} if t.attrib else None}
    children = list(t)
    if children:
        dd = defaultdict(list)
        for dc in map(etree_to_dict, children):
            for k, v in dc.items():
                dd[k].append(v)
        d = {tag_name: {k: v[0] if len(v) == 1 else v for k, v in dd.items()}}
    if t.attrib:
        d[tag_name].update(('@' + k, v) for k, v in t.attrib.items())
    if t.text:
        text = t.text.strip()
        if children or t.attrib:
            if text:
                d[tag_name]['#text'] = text
        else:
            d[tag_name] = text
    return d


def interface_addresses(family=netifaces.AF_INET):
    """Return local addresses of any associated network.

    Gathering of addresses which are bound to a local interface that has
    broadcast (and probably multicast) capability.
    """
    # pylint: disable=no-member
    return [addr['addr']
            for i in netifaces.interfaces()
            for addr in netifaces.ifaddresses(i).get(family) or []
            if 'broadcast' in addr]
