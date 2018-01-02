"""
Support for Floorplan Speaker

"""
import voluptuous as vol

from homeassistant.components.media_player import (
    ENTITY_ID_FORMAT,
    SUPPORT_PLAY_MEDIA,
    SUPPORT_VOLUME_SET,
    PLATFORM_SCHEMA,
    MediaPlayerDevice)
from homeassistant.const import (
    CONF_NAME, STATE_IDLE, STATE_PLAYING)
from homeassistant.components import http
from homeassistant.components.http import HomeAssistantView
from homeassistant.helpers.entity import async_generate_entity_id
import homeassistant.helpers.config_validation as cv

import logging

import os
import re
import sys
import time
import asyncio
import json

DEFAULT_NAME = 'Floorplan Speaker'
DEFAULT_VOLUME = 1.0

SUPPORT_FLOORPLAN_SPEAKER = SUPPORT_PLAY_MEDIA | SUPPORT_VOLUME_SET

CONF_ADDRESS = 'address'

ATTR_ADDRESS = 'address'
ATTR_BATTERY_LEVEL = 'battery_level'
ATTR_SCREEN_BRIGHTNESS = 'screen_brightness'
ATTR_DEVICE_ID = 'device_id'
ATTR_SERIAL_NUMBER = 'serial_number'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
})

_LOGGER = logging.getLogger(__name__)

def setup_platform(hass, config, add_devices, discovery_info=None):
    name = config.get(CONF_NAME)
    address = config.get(CONF_ADDRESS)

    device = FloorplanSpeakerDevice(hass, name, address)

    """Set up an endpoint for the media player."""
    hass.http.register_view(device)

    add_devices([device])

    return True

class FloorplanSpeakerDevice(MediaPlayerDevice, http.HomeAssistantView):
    def __init__(self, hass, name, address):
        self._hass = hass
        self._name = name
        self.entity_id = async_generate_entity_id(ENTITY_ID_FORMAT, name, hass=hass)
        self._state = STATE_IDLE
        self._media_content_id = None
        self._address = address
        self._volume = DEFAULT_VOLUME
        self._battery_level = None
        self._screen_brightness = None
        self._device_id = None
        self._serial_number = None
        self.url = '/api/fully_kiosk/media_player/' + self.entity_id
        _LOGGER.info('Setting endpoint: %s', self.url)

    @asyncio.coroutine
    def post(self, request):
        body = yield from request.text()
        try:
            data = json.loads(body) if body else None
        except ValueError:
            return self.json_message('Event data should be valid JSON', HTTP_BAD_REQUEST)

        if data is not None and not isinstance(data, dict):
            return self.json_message('Event data should be a JSON object', HTTP_BAD_REQUEST)

        data = json.loads(body) if body else None

        _LOGGER.info("Received from Fully Kiosk: %s: %s", self.url, data)

        self._state = data['state']
        self._media_content_id = data['attributes']['media_content_id']
        self._volume = data['attributes']['volume_level']
        self._address = data['attributes'][ATTR_ADDRESS]
        self._battery_level = data['attributes'][ATTR_BATTERY_LEVEL]
        self._screen_brightness = data['attributes'][ATTR_SCREEN_BRIGHTNESS]
        self._device_id = data['attributes'][ATTR_DEVICE_ID]
        self._serial_number = data['attributes'][ATTR_SERIAL_NUMBER]

    @property
    def name(self):
        return self._name

    @property
    def state(self):
        return self._state

    @property
    def supported_features(self):
        return SUPPORT_FLOORPLAN_SPEAKER

    @property
    def address(self):
        return self._address

    @property
    def volume_level(self):
        return self._volume

    @property
    def media_content_id(self):
        return self._media_content_id

    @property
    def battery_level(self):
        return self._battery_level

    @property
    def device_id(self):
        return self._device_id

    @property
    def serial_number(self):
        return self._serial_number

    @property
    def device_state_attributes(self):
        return {
            ATTR_ADDRESS: self._address,
            ATTR_BATTERY_LEVEL: self._battery_level,
            ATTR_SCREEN_BRIGHTNESS: self._screen_brightness,
            ATTR_DEVICE_ID: self._device_id,
            ATTR_SERIAL_NUMBER: self._serial_number,
        }

    def set_volume_level(self, volume):
        self._volume = volume

    def play_media(self, media_type, media_id, **kwargs):
        _LOGGER.info('play_media: %s', media_id)

    def media_play(self):
        _LOGGER.info('media_play')

    def media_pause(self):
        _LOGGER.info('media_pause')

    def media_stop(self):
        _LOGGER.info('media_stop')
