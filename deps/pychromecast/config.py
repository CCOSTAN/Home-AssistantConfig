"""
Data and methods to retrieve app specific configuration
"""
import json

import requests

APP_BACKDROP = "E8C28D3C"
APP_YOUTUBE = "YouTube"
APP_MEDIA_RECEIVER = "CC1AD845"
APP_PLEX = "06ee44ee-e7e3-4249-83b6-f5d0b6f07f34_1"


def get_possible_app_ids():
    """ Returns all possible app ids. """

    try:
        req = requests.get(
            "https://clients3.google.com/cast/chromecast/device/baseconfig")
        data = json.loads(req.text[4:])

        return [app['app_id'] for app in data['applications']] + \
            data["enabled_app_ids"]

    except ValueError:
        # If json fails to parse
        return []


def get_app_config(app_id):
    """ Get specific configuration for 'app_id'. """
    try:
        req = requests.get(
            ("https://clients3.google.com/"
             "cast/chromecast/device/app?a={}").format(app_id))

        return json.loads(req.text[4:]) if req.status_code == 200 else {}

    except ValueError:
        # If json fails to parse
        return {}
