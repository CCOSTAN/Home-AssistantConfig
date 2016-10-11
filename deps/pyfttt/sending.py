# -*- coding: utf-8 -*-

"""Handle sending API requests to the IFTTT Maker Channel"""

import requests

def send_event(api_key, event, value1=None, value2=None, value3=None):
    """Send an event to the IFTTT maker channel"""
    url = "https://maker.ifttt.com/trigger/{e}/with/key/{k}/".format(e=event,
                                                                     k=api_key)
    payload = {'value1': value1, 'value2': value2, 'value3': value3}
    return requests.post(url, data=payload)

