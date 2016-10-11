"""
Implements the DIAL-protocol to communicate with the Chromecast
"""
import xml.etree.ElementTree as ET
from collections import namedtuple
from uuid import UUID

import requests
import six

XML_NS_UPNP_DEVICE = "{urn:schemas-upnp-org:device-1-0}"

FORMAT_BASE_URL = "http://{}:8008"

CC_SESSION = requests.Session()
CC_SESSION.headers['content-type'] = 'application/json'

# Regular chromecast, supports video/audio
CAST_TYPE_CHROMECAST = 'cast'
# Cast Audio device, supports only audio
CAST_TYPE_AUDIO = 'audio'
# Cast Audio group device, supports only audio
CAST_TYPE_GROUP = 'group'

CAST_TYPES = {
    u'chromecast': CAST_TYPE_CHROMECAST,
    u'chromecast audio': CAST_TYPE_AUDIO,
    u'google cast group': CAST_TYPE_GROUP,
}


def reboot(host):
    """ Reboots the chromecast. """
    CC_SESSION.post(FORMAT_BASE_URL.format(host) + "/setup/reboot",
                    data='{"params":"now"}', timeout=10)


def get_device_status(host):
    """
    :param host: Hostname or ip to fetch status from
    :type host: str
    :return: The device status as a named tuple.
    :rtype: pychromecast.dial.DeviceStatus or None
    """

    try:
        req = CC_SESSION.get(
            FORMAT_BASE_URL.format(host) + "/ssdp/device-desc.xml",
            timeout=10)

        # The Requests library will fall back to guessing the encoding in case
        # no encoding is specified in the response headers - which is the case
        # for the Chromecast.
        # The standard mandates utf-8 encoding, let's fall back to that instead
        # if no encoding is provided, since the autodetection does not always
        # provide correct results.
        if req.encoding is None:
            req.encoding = 'utf-8'

        status_el = ET.fromstring(req.text.encode("UTF-8"))

        device_info_el = status_el.find(XML_NS_UPNP_DEVICE + "device")
        api_version_el = status_el.find(XML_NS_UPNP_DEVICE + "specVersion")

        friendly_name = _read_xml_element(device_info_el, XML_NS_UPNP_DEVICE,
                                          "friendlyName", "Unknown Chromecast")
        model_name = _read_xml_element(device_info_el, XML_NS_UPNP_DEVICE,
                                       "modelName", "Unknown model name")
        manufacturer = _read_xml_element(device_info_el, XML_NS_UPNP_DEVICE,
                                         "manufacturer",
                                         "Unknown manufacturer")
        udn = _read_xml_element(device_info_el, XML_NS_UPNP_DEVICE,
                                "UDN",
                                None)

        api_version = (int(_read_xml_element(api_version_el,
                                             XML_NS_UPNP_DEVICE, "major", -1)),
                       int(_read_xml_element(api_version_el,
                                             XML_NS_UPNP_DEVICE, "minor", -1)))

        cast_type = CAST_TYPES.get(model_name.lower(),
                                   CAST_TYPE_CHROMECAST)

        uuid = None
        if udn and udn.startswith('uuid:'):
            uuid = UUID(udn[len('uuid:'):].replace("-", ""))

        return DeviceStatus(friendly_name, model_name, manufacturer,
                            api_version, uuid, cast_type)

    except (requests.exceptions.RequestException, ET.ParseError):
        return None


def _read_xml_element(element, xml_ns, tag_name, default=""):
    """ Helper method to read text from an element. """
    try:
        text = element.find(xml_ns + tag_name).text
        if isinstance(text, six.text_type):
            return text
        else:
            return text.decode('utf-8')

    except AttributeError:
        return default


DeviceStatus = namedtuple("DeviceStatus",
                          ["friendly_name", "model_name",
                           "manufacturer", "api_version",
                           "uuid", "cast_type"])
