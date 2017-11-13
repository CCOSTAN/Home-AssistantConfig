"""
Support for TTS on a Floorplan Speaker
Version: 1.0.7.6
date: 11/13/2017

"""
"""
Support for Floorplan Speaker

"""
import voluptuous as vol

from homeassistant.components.media_player import (
    SUPPORT_PLAY_MEDIA,
    SUPPORT_VOLUME_SET,
    PLATFORM_SCHEMA,
    MediaPlayerDevice)
from homeassistant.const import (
    CONF_NAME, STATE_OFF, STATE_PLAYING)
import homeassistant.helpers.config_validation as cv

import logging

import os
import re
import sys
import time

DEFAULT_NAME = 'Floorplan Speaker'
DEFAULT_VOLUME = 1.0

SUPPORT_FLOORPLAN_SPEAKER = SUPPORT_PLAY_MEDIA | SUPPORT_VOLUME_SET

CONF_ADDRESS = 'address'
CONF_VOLUME = 'volume'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
    vol.Optional(CONF_VOLUME, default=DEFAULT_VOLUME):
        vol.All(vol.Coerce(float), vol.Range(min=0, max=1)),
})

_LOGGER = logging.getLogger(__name__)

def setup_platform(hass, config, add_devices, discovery_info=None):
    """Setup the Floorplan Speaker platform."""
    name = config.get(CONF_NAME)
    address = config.get(CONF_ADDRESS)
    volume = float(config.get(CONF_VOLUME))

    add_devices([FloorplanSpeakerDevice(hass, name, address, volume)])
    return True

class FloorplanSpeakerDevice(MediaPlayerDevice):
    """Representation of a Floorplan Speaker on the network."""

    def __init__(self, hass, name, address, volume):
        """Initialize the device."""
        self._hass = hass
        self._name = name
        self._is_standby = True
        self._current = None
        self._address = address
        self._volume = volume

    def update(self):
        """Retrieve latest state."""
        if self._is_standby:
            self._current = None
        else:
            self._current = True

    @property
    def name(self):
        """Return the name of the device."""
        return self._name

    # MediaPlayerDevice properties and methods
    @property
    def state(self):
        """Return the state of the device."""
        if self._is_standby:
            return STATE_OFF
        else:
            return STATE_PLAYING

    @property
    def supported_features(self):
        """Flag media player features that are supported."""
        return SUPPORT_FLOORPLAN_SPEAKER

    @property
    def volume_level(self):
        """Volume level of the media player (0..1)."""
        return self._volume

    def set_volume_level(self, volume):
        """Set volume level, range 0..1."""
        # self._vlc.audio_set_volume(int(volume * 100))
        self._volume = volume

    def play_media(self, media_type, media_id, **kwargs):
        """Send play commmand."""
        _LOGGER.info('play_media: %s', media_id)
        self._is_standby = False

        volume = str(self._volume * 100)

        self._is_standby = True