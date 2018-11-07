"""
Support to interface with Alexa Devices.

For more details about this platform, please refer to the documentation at
https://community.home-assistant.io/t/echo-devices-alexa-as-media-player-testers-needed/58639
VERSION 0.9.5
"""
import logging

from datetime import timedelta

import requests
import voluptuous as vol

from homeassistant import util
from homeassistant.components.media_player import (
    MEDIA_TYPE_MUSIC, PLATFORM_SCHEMA, SUPPORT_NEXT_TRACK,
    SUPPORT_PAUSE, SUPPORT_PLAY, SUPPORT_PREVIOUS_TRACK,
    SUPPORT_STOP, SUPPORT_TURN_OFF, SUPPORT_VOLUME_MUTE,
    SUPPORT_PLAY_MEDIA, SUPPORT_VOLUME_SET,
    MediaPlayerDevice, DOMAIN, MEDIA_PLAYER_SCHEMA,
    SUPPORT_SELECT_SOURCE)
from homeassistant.const import (
    CONF_EMAIL, CONF_PASSWORD, CONF_URL,
    STATE_IDLE, STATE_STANDBY, STATE_PAUSED,
    STATE_PLAYING)
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.service import extract_entity_ids
from homeassistant.helpers.event import track_utc_time_change
# from homeassistant.util.json import load_json, save_json
# from homeassistant.util import dt as dt_util

SUPPORT_ALEXA = (SUPPORT_PAUSE | SUPPORT_PREVIOUS_TRACK |
                 SUPPORT_NEXT_TRACK | SUPPORT_STOP |
                 SUPPORT_VOLUME_SET | SUPPORT_PLAY |
                 SUPPORT_PLAY_MEDIA | SUPPORT_TURN_OFF |
                 SUPPORT_VOLUME_MUTE | SUPPORT_PAUSE |
                 SUPPORT_SELECT_SOURCE)
_CONFIGURING = []
_LOGGER = logging.getLogger(__name__)

REQUIREMENTS = ['beautifulsoup4==4.6.0', 'simplejson==3.16.0']

MIN_TIME_BETWEEN_SCANS = timedelta(seconds=15)
MIN_TIME_BETWEEN_FORCED_SCANS = timedelta(seconds=1)

ALEXA_DATA = "alexa_media"

SERVICE_ALEXA_TTS = 'alexa_tts'

ATTR_MESSAGE = 'message'
ALEXA_TTS_SCHEMA = MEDIA_PLAYER_SCHEMA.extend({
    vol.Required(ATTR_MESSAGE): cv.string,
})

CONF_DEBUG = 'debug'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_EMAIL): cv.string,
    vol.Required(CONF_PASSWORD): cv.string,
    vol.Required(CONF_URL): cv.string,
    vol.Optional(CONF_DEBUG, default=False): cv.boolean,
})


def request_configuration(hass, config, setup_platform_callback,
                          status=None):
    """Request configuration steps from the user."""
    configurator = hass.components.configurator

    async def configuration_callback(callback_data):
        """Handle the submitted configuration."""
        hass.async_add_job(setup_platform_callback, callback_data)

    # Get Captcha
    if (status and 'captcha_image_url' in status and
            status['captcha_image_url'] is not None):
        config_id = configurator.request_config(
            "Alexa Media Player - Captcha", configuration_callback,
            description=('Please enter the text for the captcha.'
                         ' Please enter anything if the image is missing.'
                         ),
            description_image=status['captcha_image_url'],
            submit_caption="Confirm",
            fields=[{'id': 'captcha', 'name': 'Captcha'}]
        )
    elif (status and 'securitycode_required' in status and
            status['securitycode_required']):  # Get 2FA code
        config_id = configurator.request_config(
            "Alexa Media Player - 2FA", configuration_callback,
            description=('Please enter your Two-Factor Security code.'),
            submit_caption="Confirm",
            fields=[{'id': 'securitycode', 'name': 'Security Code'}]
        )
    elif (status and 'claimspicker_required' in status and
            status['claimspicker_required']):  # Get picker method
        options = status['claimspicker_message']
        config_id = configurator.request_config(
            "Alexa Media Player - Verification Method", configuration_callback,
            description=('Please select the verification method. '
                         '(e.g., sms or email).<br />{}').format(
                         options
                         ),
            submit_caption="Confirm",
            fields=[{'id': 'claimsoption', 'name': 'Option'}]
        )
    elif (status and 'verificationcode_required' in status and
            status['verificationcode_required']):  # Get picker method
        config_id = configurator.request_config(
            "Alexa Media Player - Verification Code", configuration_callback,
            description=('Please enter received verification code.'),
            submit_caption="Confirm",
            fields=[{'id': 'verificationcode', 'name': 'Verification Code'}]
        )
    else:  # Check login
        config_id = configurator.request_config(
            "Alexa Media Player - Begin", configuration_callback,
            description=('Please hit confirm to begin login attempt.'),
            submit_caption="Confirm",
            fields=[]
        )
    _CONFIGURING.append(config_id)
    if (len(_CONFIGURING) > 0 and 'error_message' in status
            and status['error_message']):
        configurator.notify_errors(  # use sync to delay next pop
            _CONFIGURING[len(_CONFIGURING)-1], status['error_message'])
    if (len(_CONFIGURING) > 1):
        configurator.async_request_done(_CONFIGURING.pop(0))


def setup_platform(hass, config, add_devices_callback,
                   discovery_info=None):
    """Set up the Alexa platform."""
    if ALEXA_DATA not in hass.data:
        hass.data[ALEXA_DATA] = {}

    email = config.get(CONF_EMAIL)
    password = config.get(CONF_PASSWORD)
    url = config.get(CONF_URL)

    login = AlexaLogin(url, email, password, hass.config.path,
                       config.get(CONF_DEBUG))

    async def setup_platform_callback(callback_data):
        _LOGGER.debug(("Status: {} got captcha: {} securitycode: {}"
                      " Claimsoption: {} VerificationCode: {}").format(
            login.status,
            callback_data.get('captcha'),
            callback_data.get('securitycode'),
            callback_data.get('claimsoption'),
            callback_data.get('verificationcode')))
        login.login(captcha=callback_data.get('captcha'),
                    securitycode=callback_data.get('securitycode'),
                    claimsoption=callback_data.get('claimsoption'),
                    verificationcode=callback_data.get('verificationcode'))
        testLoginStatus(hass, config, add_devices_callback, login,
                        setup_platform_callback)

    testLoginStatus(hass, config, add_devices_callback, login,
                    setup_platform_callback)


def testLoginStatus(hass, config, add_devices_callback, login,
                    setup_platform_callback):
    """Test the login status."""
    if 'login_successful' in login.status and login.status['login_successful']:
        _LOGGER.debug("Setting up Alexa devices")
        hass.async_add_job(setup_alexa, hass, config,
                           add_devices_callback, login)
        return
    elif ('captcha_required' in login.status and
          login.status['captcha_required']):
        _LOGGER.debug("Creating configurator to request captcha")
    elif ('securitycode_required' in login.status and
            login.status['securitycode_required']):
        _LOGGER.debug("Creating configurator to request 2FA")
    elif ('claimspicker_required' in login.status and
            login.status['claimspicker_required']):
        _LOGGER.debug("Creating configurator to select verification option")
    elif ('verificationcode_required' in login.status and
            login.status['verificationcode_required']):
        _LOGGER.debug("Creating configurator to enter verification code")
    elif ('login_failed' in login.status and
            login.status['login_failed']):
        _LOGGER.debug("Creating configurator to start new login attempt")
    hass.async_add_job(request_configuration, hass, config,
                       setup_platform_callback,
                       login.status)


def setup_alexa(hass, config, add_devices_callback, login_obj):
    """Set up a alexa api based on host parameter."""
    alexa_clients = hass.data[ALEXA_DATA]
    # alexa_sessions = {}
    track_utc_time_change(hass, lambda now: update_devices(), second=30)

    url = config.get(CONF_URL)

    @util.Throttle(MIN_TIME_BETWEEN_SCANS, MIN_TIME_BETWEEN_FORCED_SCANS)
    def update_devices():
        """Update the devices objects."""
        devices = AlexaAPI.get_devices(url, login_obj._session)
        bluetooth = AlexaAPI.get_bluetooth(url, login_obj._session)

        if ((devices is None or bluetooth is None)
                and len(_CONFIGURING) == 0):
            _LOGGER.debug("Alexa API disconnected; attempting to relogin")
            login_obj.login_with_cookie()

        new_alexa_clients = []
        available_client_ids = []
        for device in devices:

            for b_state in bluetooth['bluetoothStates']:
                if device['serialNumber'] == b_state['deviceSerialNumber']:
                    device['bluetooth_state'] = b_state

            available_client_ids.append(device['serialNumber'])

            if device['serialNumber'] not in alexa_clients:
                new_client = AlexaClient(config, login_obj._session, device,
                                         update_devices, url)
                alexa_clients[device['serialNumber']] = new_client
                new_alexa_clients.append(new_client)
            elif device['online']:
                alexa_clients[device['serialNumber']].refresh(device)

        if new_alexa_clients:
            def tts_handler(call):
                for alexa in service_to_entities(call):
                    if call.service == SERVICE_ALEXA_TTS:
                        message = call.data.get(ATTR_MESSAGE)
                        alexa.send_tts(message)

            def service_to_entities(call):
                """Return the known devices that a service call mentions."""
                entity_ids = extract_entity_ids(hass, call)
                if entity_ids:
                    entities = [entity for entity in new_alexa_clients
                                if entity.entity_id in entity_ids]
                else:
                    entities = None

                return entities

            hass.services.register(DOMAIN, SERVICE_ALEXA_TTS, tts_handler,
                                   schema=ALEXA_TTS_SCHEMA)
            add_devices_callback(new_alexa_clients)

    update_devices()
    # Clear configurator. We delay till here to avoid leaving a modal orphan
    global _CONFIGURING
    for config_id in _CONFIGURING:
        configurator = hass.components.configurator
        configurator.async_request_done(config_id)
    _CONFIGURING = []


class AlexaClient(MediaPlayerDevice):
    """Representation of a Alexa device."""

    def __init__(self, config, session, device, update_devices, url):
        """Initialize the Alexa device."""
        # Class info
        self.alexa_api = AlexaAPI(self, session, url)

        self.update_devices = update_devices
        # Device info
        self._device = None
        self._device_name = None
        self._device_serial_number = None
        self._device_type = None
        self._device_family = None
        self._device_owner_customer_id = None
        self._software_version = None
        self._available = None
        self._capabilities = []
        # Media
        self._session = None
        self._media_duration = None
        self._media_image_url = None
        self._media_title = None
        self._media_pos = None
        self._media_album_name = None
        self._media_artist = None
        self._player_state = None
        self._media_is_muted = None
        self._media_vol_level = None
        self._previous_volume = None
        self._source = None
        self._source_list = []
        self.refresh(device)

    def _clear_media_details(self):
        """Set all Media Items to None."""
        # General
        self._media_duration = None
        self._media_image_url = None
        self._media_title = None
        self._media_pos = None
        self._media_album_name = None
        self._media_artist = None
        self._media_player_state = None
        self._media_is_muted = None
        self._media_vol_level = None

    def refresh(self, device):
        """Refresh key device data."""
        self._device = device
        self._device_name = device['accountName']
        self._device_family = device['deviceFamily']
        self._device_type = device['deviceType']
        self._device_serial_number = device['serialNumber']
        self._device_owner_customer_id = device['deviceOwnerCustomerId']
        self._software_version = device['softwareVersion']
        self._available = device['online']
        self._capabilities = device['capabilities']
        self._bluetooth_state = device['bluetooth_state']
        self._source = self._get_source()
        self._source_list = self._get_source_list()
        session = self.alexa_api.get_state()

        self._clear_media_details()
        # update the session if it exists; not doing relogin here
        if session is not None:
            self._session = session
        if 'playerInfo' in self._session:
            self._session = self._session['playerInfo']
            if self._session['state'] is not None:
                self._media_player_state = self._session['state']
                self._media_pos = (self._session['progress']['mediaProgress']
                                   if (self._session['progress'] is not None
                                       and 'mediaProgress' in
                                       self._session['progress'])
                                   else None)
                self._media_is_muted = (self._session['volume']['muted']
                                        if (self._session['volume'] is not None
                                            and 'muted' in
                                            self._session['volume'])
                                        else None)
                self._media_vol_level = (self._session['volume']
                                                      ['volume'] / 100
                                         if(self._session['volume'] is not None
                                             and 'volume' in
                                             self._session['volume'])
                                         else None)
                self._media_title = (self._session['infoText']['title']
                                     if (self._session['infoText'] is not None
                                         and 'title' in
                                         self._session['infoText'])
                                     else None)
                self._media_artist = (self._session['infoText']['subText1']
                                      if (self._session['infoText'] is not None
                                          and 'subText1' in
                                          self._session['infoText'])
                                      else None)
                self._media_album_name = (self._session['infoText']['subText2']
                                          if (self._session['infoText'] is not
                                              None and 'subText2' in
                                              self._session['infoText'])
                                          else None)
                self._media_image_url = (self._session['mainArt']['url']
                                         if (self._session['mainArt'] is not
                                             None and 'url' in
                                             self._session['mainArt'])
                                         else None)
                self._media_duration = (self._session['progress']
                                                     ['mediaLength']
                                        if (self._session['progress'] is not
                                            None and 'mediaLength' in
                                            self._session['progress'])
                                        else None)

    @property
    def source(self):
        """Return the current input source."""
        return self._source

    @property
    def source_list(self):
        """List of available input sources."""
        return self._source_list

    def select_source(self, source):
        """Select input source."""
        if source == 'Local Speaker':
            self.alexa_api.disconnect_bluetooth()
            self._source = 'Local Speaker'
        elif self._bluetooth_state['pairedDeviceList'] is not None:
            for devices in self._bluetooth_state['pairedDeviceList']:
                if devices['friendlyName'] == source:
                    self.alexa_api.set_bluetooth(devices['address'])
                    self._source = source

    def _get_source(self):
        source = 'Local Speaker'
        if self._bluetooth_state['pairedDeviceList'] is not None:
            for device in self._bluetooth_state['pairedDeviceList']:
                if device['connected'] is True:
                    return device['friendlyName']
        return source

    def _get_source_list(self):
        sources = []
        if self._bluetooth_state['pairedDeviceList'] is not None:
            for devices in self._bluetooth_state['pairedDeviceList']:
                sources.append(devices['friendlyName'])
        return ['Local Speaker'] + sources

    @property
    def available(self):
        """Return the availability of the client."""
        return self._available

    @property
    def unique_id(self):
        """Return the id of this Alexa client."""
        return self.device_serial_number

    @property
    def name(self):
        """Return the name of the device."""
        return self._device_name

    @property
    def device_serial_number(self):
        """Return the machine identifier of the device."""
        return self._device_serial_number

    @property
    def device(self):
        """Return the device, if any."""
        return self._device

    @property
    def session(self):
        """Return the session, if any."""
        return self._session

    @property
    def state(self):
        """Return the state of the device."""
        if self._media_player_state == 'PLAYING':
            return STATE_PLAYING
        elif self._media_player_state == 'PAUSED':
            return STATE_PAUSED
        elif self._media_player_state == 'IDLE':
            return STATE_IDLE
        return STATE_STANDBY

    def update(self):
        """Get the latest details."""
        self.update_devices(no_throttle=True)

    @property
    def media_content_type(self):
        """Return the content type of current playing media."""
        if self.state in [STATE_PLAYING, STATE_PAUSED]:
            return MEDIA_TYPE_MUSIC
        return STATE_STANDBY

    @property
    def media_artist(self):
        """Return the artist of current playing media, music track only."""
        return self._media_artist

    @property
    def media_album_name(self):
        """Return the album name of current playing media, music track only."""
        return self._media_album_name

    @property
    def media_duration(self):
        """Return the duration of current playing media in seconds."""
        return self._media_duration

    @property
    def media_image_url(self):
        """Return the image URL of current playing media."""
        return self._media_image_url

    @property
    def media_title(self):
        """Return the title of current playing media."""
        return self._media_title

    @property
    def device_family(self):
        """Return the make of the device (ex. Echo, Other)."""
        return self._device_family

    @property
    def supported_features(self):
        """Flag media player features that are supported."""
        return SUPPORT_ALEXA

    def set_volume_level(self, volume):
        """Set volume level, range 0..1."""
        if not (self.state in [STATE_PLAYING, STATE_PAUSED]
                and self.available):
            return
        self.alexa_api.set_volume(volume)
        self._media_vol_level = volume

    @property
    def volume_level(self):
        """Return the volume level of the client (0..1)."""
        return self._media_vol_level

    @property
    def is_volume_muted(self):
        """Return boolean if volume is currently muted."""
        if self.volume_level == 0:
            return True
        return False

    def mute_volume(self, mute):
        """Mute the volume.

        Since we can't actually mute, we'll:
        - On mute, store volume and set volume to 0
        - On unmute, set volume to previously stored volume
        """
        if not (self.state == STATE_PLAYING and self.available):
            return

        self._media_is_muted = mute
        if mute:
            self._previous_volume = self.volume_level
            self.alexa_api.set_volume(0)
        else:
            if self._previous_volume is not None:
                self.alexa_api.set_volume(self._previous_volume)
            else:
                self.alexa_api.set_volume(50)

    def media_play(self):
        """Send play command."""
        if not (self.state in [STATE_PLAYING, STATE_PAUSED]
                and self.available):
            return
        self.alexa_api.play()

    def media_pause(self):
        """Send pause command."""
        if not (self.state in [STATE_PLAYING, STATE_PAUSED]
                and self.available):
            return
        self.alexa_api.pause()

    def turn_off(self):
        """Turn the client off."""
        # Fake it since we can't turn the client off
        self.media_pause()

    def media_next_track(self):
        """Send next track command."""
        if not (self.state in [STATE_PLAYING, STATE_PAUSED]
                and self.available):
            return
        self.alexa_api.next()

    def media_previous_track(self):
        """Send previous track command."""
        if not (self.state in [STATE_PLAYING, STATE_PAUSED]
                and self.available):
            return
        self.alexa_api.previous()

    def send_tts(self, message):
        """Send TTS to Device NOTE: Does not work on WHA Groups."""
        self.alexa_api.send_tts(message)

    def play_media(self, media_type, media_id, **kwargs):
        """Send the play_media command to the media player."""
        if media_type == "music":
            self.alexa_api.send_tts("Sorry, text to speech can only be called "
                                    " with the media player alexa tts service")
        else:
            self.alexa_api.play_music(media_type, media_id)

    @property
    def device_state_attributes(self):
        """Return the scene state attributes."""
        attr = {
            'available': self._available,
        }
        return attr


class AlexaLogin():
    """Class to handle login connection to Alexa."""

    def __init__(self, url, email, password, configpath, debug=False):
        """Set up initial connection and log in."""
        self._url = url
        self._email = email
        self._password = password
        self._session = None
        self._data = None
        self.status = {}
        self._cookiefile = configpath("{}.pickle".format(ALEXA_DATA))
        self._debugpost = configpath("{}post.html".format(ALEXA_DATA))
        self._debugget = configpath("{}get.html".format(ALEXA_DATA))
        self._lastreq = None
        self._debug = debug

        self.login_with_cookie()

    def login_with_cookie(self):
        """Attempt to login after loading cookie."""
        import pickle
        cookies = None

        if (self._cookiefile):
            try:
                _LOGGER.debug(
                    "Trying cookie from file {}".format(
                        self._cookiefile))
                with open(self._cookiefile, 'rb') as myfile:
                    cookies = pickle.load(myfile)
                    _LOGGER.debug("cookie loaded: {}".format(cookies))
            except Exception as ex:
                template = ("An exception of type {0} occurred."
                            " Arguments:\n{1!r}")
                message = template.format(type(ex).__name__, ex.args)
                _LOGGER.debug(
                    "Error loading pickled cookie from {}: {}".format(
                        self._cookiefile, message))

        self.login(cookies=cookies)

    def reset_login(self):
        """Remove data related to existing login."""
        self._session = None
        self._data = None
        self._lastreq = None
        self.status = {}

    def get_inputs(self, soup, searchfield={'name': 'signIn'}):
        """Parse soup for form with searchfield."""
        data = {}
        form = soup.find('form', searchfield)
        for field in form.find_all('input'):
            try:
                data[field['name']] = ""
                data[field['name']] = field['value']
            except:  # noqa: E722 pylint: disable=bare-except
                pass
        return data

    def test_loggedin(self, cookies=None):
        """Function that will test the connection is logged in.

        Attempts to get device list, and if unsuccessful login failed
        """
        if self._session is None:
            '''initiate session'''

            self._session = requests.Session()

            '''define session headers'''
            self._session.headers = {
                'User-Agent': ('Mozilla/5.0 (Windows NT 6.3; Win64; x64) '
                               'AppleWebKit/537.36 (KHTML, like Gecko) '
                               'Chrome/68.0.3440.106 Safari/537.36'),
                'Accept': ('text/html,application/xhtml+xml, '
                           'application/xml;q=0.9,*/*;q=0.8'),
                'Accept-Language': '*'
            }
            self._session.cookies = cookies

        get_resp = self._session.get('https://alexa.' + self._url +
                                     '/api/devices-v2/device')
        # with open(self._debugget, mode='wb') as localfile:
        #     localfile.write(get_resp.content)

        try:
            from json.decoder import JSONDecodeError
            from simplejson import JSONDecodeError as SimpleJSONDecodeError
            # Need to catch both as Python 3.5 appears to use simplejson
        except ImportError:
            JSONDecodeError = ValueError
        try:
            get_resp.json()
        except (JSONDecodeError, SimpleJSONDecodeError) as ex:
            # ValueError is necessary for Python 3.5 for some reason
            template = ("An exception of type {0} occurred."
                        " Arguments:\n{1!r}")
            message = template.format(type(ex).__name__, ex.args)
            _LOGGER.debug("Not logged in: {}".format(message))
            return False
        _LOGGER.debug("Logged in.")
        return True

    def login(self, cookies=None, captcha=None, securitycode=None,
              claimsoption=None, verificationcode=None):
        """Login to Amazon."""
        from bs4 import BeautifulSoup
        import pickle

        if (cookies is not None and self.test_loggedin(cookies)):
            _LOGGER.debug("Using cookies to log in")
            self.status = {}
            self.status['login_successful'] = True
            _LOGGER.debug("Log in successful with cookies")
            return
        else:
            _LOGGER.debug("No valid cookies for log in; using credentials")
        #  site = 'https://www.' + self._url + '/gp/sign-in.html'
        #  use alexa site instead
        site = 'https://alexa.' + self._url + '/api/devices-v2/device'
        if self._session is None:
            '''initiate session'''

            self._session = requests.Session()

            '''define session headers'''
            self._session.headers = {
                'User-Agent': ('Mozilla/5.0 (Windows NT 6.3; Win64; x64) '
                               'AppleWebKit/537.36 (KHTML, like Gecko) '
                               'Chrome/68.0.3440.106 Safari/537.36'),
                'Accept': ('text/html,application/xhtml+xml, '
                           'application/xml;q=0.9,*/*;q=0.8'),
                'Accept-Language': '*'
            }

        if self._lastreq is not None:
            site = self._lastreq.url
            _LOGGER.debug("Loaded last request to {} ".format(site))
            html = self._lastreq.text
            '''get BeautifulSoup object of the html of the login page'''
            if self._debug:
                with open(self._debugget, mode='wb') as localfile:
                    localfile.write(self._lastreq.content)

            soup = BeautifulSoup(html, 'html.parser')
            site = soup.find('form').get('action')
            if site is None:
                site = self._lastreq.url
            elif site == 'verify':
                import re
                site = re.search(r'(.+)/(.*)',
                                 self._lastreq.url).groups()[0] + "/verify"

        if self._data is None:
            resp = self._session.get(site)
            self._lastreq = resp
            if resp.history:
                _LOGGER.debug("Get to {} was redirected to {}".format(
                    site,
                    resp.url))
                self._session.headers['Referer'] = resp.url
            else:
                _LOGGER.debug("Get to {} was not redirected".format(site))
                self._session.headers['Referer'] = site

            html = resp.text
            '''get BeautifulSoup object of the html of the login page'''
            if self._debug:
                with open(self._debugget, mode='wb') as localfile:
                    localfile.write(resp.content)

            soup = BeautifulSoup(html, 'html.parser')
            '''scrape login page to get all the inputs required for login'''
            self._data = self.get_inputs(soup)
            site = soup.find('form', {'name': 'signIn'}).get('action')

        # _LOGGER.debug("Init Form Data: {}".format(self._data))

        '''add username and password to the data for post request'''
        '''check if there is an input field'''
        if "email" in self._data:
            self._data['email'] = self._email.encode('utf-8')
        if "password" in self._data:
            self._data['password'] = self._password.encode('utf-8')
        if "rememberMe" in self._data:
            self._data['rememberMe'] = "true".encode('utf-8')

        status = {}
        _LOGGER.debug(("Preparing post to {} Captcha: {}"
                       " SecurityCode: {} Claimsoption: {} "
                       "VerificationCode: {}").format(
            site,
            captcha,
            securitycode,
            claimsoption,
            verificationcode
            ))
        if (captcha is not None and 'guess' in self._data):
            self._data['guess'] = captcha.encode('utf-8')
        if (securitycode is not None and 'otpCode' in self._data):
            self._data['otpCode'] = securitycode.encode('utf-8')
            self._data['rememberDevice'] = ""
        if (claimsoption is not None and 'option' in self._data):
            self._data['option'] = claimsoption.encode('utf-8')
        if (verificationcode is not None and 'code' in self._data):
            self._data['code'] = verificationcode.encode('utf-8')
        self._session.headers['Content-Type'] = ("application/x-www-form-"
                                                 "urlencoded; charset=utf-8")
        self._data.pop('', None)

        if self._debug:
            _LOGGER.debug("Cookies: {}".format(self._session.cookies))
            _LOGGER.debug("Submit Form Data: {}".format(self._data))
            _LOGGER.debug("Header: {}".format(self._session.headers))

        '''submit post request with username/password and other needed info'''
        post_resp = self._session.post(site, data=self._data)
        self._session.headers['Referer'] = site

        self._lastreq = post_resp
        if self._debug:
            with open(self._debugpost, mode='wb') as localfile:
                localfile.write(post_resp.content)

        post_soup = BeautifulSoup(post_resp.content, 'html.parser')

        login_tag = post_soup.find('form', {'name': 'signIn'})
        captcha_tag = post_soup.find(id="auth-captcha-image")

        '''another login required and no captcha request? try once more.
        This is a necessary hack as the first attempt always fails.
        TODO: Figure out how to remove this hack
        '''
        if (login_tag is not None and captcha_tag is None):
            login_url = login_tag.get("action")
            _LOGGER.debug("Performing second login to: {}".format(
                login_url))
            post_resp = self._session.post(login_url,
                                           data=self._data)
            if self._debug:
                with open(self._debugpost, mode='wb') as localfile:
                    localfile.write(post_resp.content)
            post_soup = BeautifulSoup(post_resp.content, 'html.parser')
            login_tag = post_soup.find('form', {'name': 'signIn'})
            captcha_tag = post_soup.find(id="auth-captcha-image")

        securitycode_tag = post_soup.find(id="auth-mfa-otpcode")
        errorbox = (post_soup.find(id="auth-error-message-box")
                    if post_soup.find(id="auth-error-message-box") else
                    post_soup.find(id="auth-warning-message-box"))
        claimspicker_tag = post_soup.find('form', {'name': 'claimspicker'})
        verificationcode_tag = post_soup.find('form', {'action': 'verify'})

        '''pull out Amazon error message'''

        if errorbox:
            error_message = errorbox.find('h4').string
            for li in errorbox.findAll('li'):
                error_message += li.find('span').string
            _LOGGER.debug("Error message: {}".format(error_message))
            status['error_message'] = error_message

        if captcha_tag is not None:
            _LOGGER.debug("Captcha requested")
            status['captcha_required'] = True
            status['captcha_image_url'] = captcha_tag.get('src')
            self._data = self.get_inputs(post_soup)

        elif securitycode_tag is not None:
            _LOGGER.debug("2FA requested")
            status['securitycode_required'] = True
            self._data = self.get_inputs(post_soup, {'id': 'auth-mfa-form'})

        elif claimspicker_tag is not None:
            claims_message = ""
            options_message = ""
            for div in claimspicker_tag.findAll('div', 'a-row'):
                claims_message += "{}\n".format(div.string)
            for label in claimspicker_tag.findAll('label'):
                value = (label.find('input')['value']) if label.find(
                    'input') else ""
                message = (label.find('span').string) if label.find(
                    'span') else ""
                valuemessage = ("Option: {} = `{}`.\n".format(
                    value, message)) if value != "" else ""
                options_message += valuemessage
            _LOGGER.debug("Verification method requested: {}".format(
                claims_message, options_message))
            status['claimspicker_required'] = True
            status['claimspicker_message'] = options_message
            self._data = self.get_inputs(post_soup, {'name': 'claimspicker'})
        elif verificationcode_tag is not None:
            _LOGGER.debug("Verification code requested:")
            status['verificationcode_required'] = True
            self._data = self.get_inputs(post_soup, {'action': 'verify'})
        elif login_tag is not None:
            login_url = login_tag.get("action")
            _LOGGER.debug("Another login requested to: {}".format(
                login_url))
            status['login_failed'] = True

        else:
            _LOGGER.debug("Captcha/2FA not requested; confirming login.")
            if self.test_loggedin():
                _LOGGER.debug("Login confirmed; saving cookie to {}".format(
                        self._cookiefile))
                status['login_successful'] = True
                with open(self._cookiefile, 'wb') as myfile:
                    try:
                        pickle.dump(self._session.cookies, myfile)
                    except Exception as ex:
                        template = ("An exception of type {0} occurred."
                                    " Arguments:\n{1!r}")
                        message = template.format(type(ex).__name__, ex.args)
                        _LOGGER.debug(
                            "Error saving pickled cookie to {}: {}".format(
                                self._cookiefile,
                                message))
            else:
                _LOGGER.debug("Login failed; check credentials")
                status['login_failed'] = True

        self.status = status


class AlexaAPI():
    """Class for accessing Alexa."""

    def __init__(self, device, session, url):
        """Initialize Alexa device."""
        self._device = device
        self._session = session
        self._url = 'https://alexa.' + url

        csrf = self._session.cookies.get_dict()['csrf']
        self._session.headers['csrf'] = csrf

    def _post_request(self, uri, data):
        try:
            self._session.post(self._url + uri, json=data)
        except Exception as ex:
            template = ("An exception of type {0} occurred."
                        " Arguments:\n{1!r}")
            message = template.format(type(ex).__name__, ex.args)
            _LOGGER.error("An error occured accessing the API: {}".format(
                message))

    def _get_request(self, uri, data=None):
        try:
            return self._session.get(self._url + uri, json=data)
        except Exception as ex:
            template = ("An exception of type {0} occurred."
                        " Arguments:\n{1!r}")
            message = template.format(type(ex).__name__, ex.args)
            _LOGGER.error("An error occured accessing the API: {}".format(
                message))
            return None

    def play_music(self, provider_id, search_phrase):
        """Play Music based on search."""
        data = {
            "behaviorId": "PREVIEW",
            "sequenceJson": "{\"@type\": \
            \"com.amazon.alexa.behaviors.model.Sequence\", \
            \"startNode\":{\"@type\": \
            \"com.amazon.alexa.behaviors.model.OpaquePayloadOperationNode\", \
            \"type\":\"Alexa.Music.PlaySearchPhrase\",\"operationPayload\": \
            {\"deviceType\":\"" + self._device._device_type + "\", \
            \"deviceSerialNumber\":\"" + self._device.unique_id +
            "\",\"locale\":\"en-US\", \
            \"customerId\":\"" + self._device._device_owner_customer_id +
            "\", \"searchPhrase\": \"" + search_phrase + "\", \
             \"sanitizedSearchPhrase\": \"" + search_phrase + "\", \
             \"musicProviderId\": \"" + provider_id + "\"}}}",
            "status": "ENABLED"
        }
        self._post_request('/api/behaviors/preview',
                           data=data)

    def send_tts(self, message):
        """Send message for TTS at speaker."""
        data = {
            "behaviorId": "PREVIEW",
            "sequenceJson": "{\"@type\": \
            \"com.amazon.alexa.behaviors.model.Sequence\", \
            \"startNode\":{\"@type\": \
            \"com.amazon.alexa.behaviors.model.OpaquePayloadOperationNode\", \
            \"type\":\"Alexa.Speak\",\"operationPayload\": \
            {\"deviceType\":\"" + self._device._device_type + "\", \
            \"deviceSerialNumber\":\"" + self._device.unique_id +
            "\",\"locale\":\"en-US\", \
            \"customerId\":\"" + self._device._device_owner_customer_id +
            "\", \"textToSpeak\": \"" + message + "\"}}}",
            "status": "ENABLED"
        }
        self._post_request('/api/behaviors/preview',
                           data=data)

    def set_media(self, data):
        """Select the media player."""
        self._post_request('/api/np/command?deviceSerialNumber=' +
                           self._device.unique_id + '&deviceType=' +
                           self._device._device_type, data=data)

    def previous(self):
        """Play previous."""
        self.set_media({"type": "PreviousCommand"})

    def next(self):
        """Play next."""
        self.set_media({"type": "NextCommand"})

    def pause(self):
        """Pause."""
        self.set_media({"type": "PauseCommand"})

    def play(self):
        """Play."""
        self.set_media({"type": "PlayCommand"})

    def set_volume(self, volume):
        """Set volume."""
        self.set_media({"type": "VolumeLevelCommand",
                        "volumeLevel": volume*100})

    def get_state(self):
        """Get state."""
        try:
            response = self._get_request('/api/np/player?deviceSerialNumber=' +
                                         self._device.unique_id +
                                         '&deviceType=' +
                                         self._device._device_type +
                                         '&screenWidth=2560')
            return response.json()
        except Exception as ex:
            template = ("An exception of type {0} occurred."
                        " Arguments:\n{1!r}")
            message = template.format(type(ex).__name__, ex.args)
            _LOGGER.error("An error occured accessing the API: {}".format(
                message))
            return None

    @staticmethod
    def get_bluetooth(url, session):
        """Get paired bluetooth devices."""
        try:

            response = session.get('https://alexa.' + url +
                                   '/api/bluetooth?cached=false')
            return response.json()
        except Exception as ex:
            template = ("An exception of type {0} occurred."
                        " Arguments:\n{1!r}")
            message = template.format(type(ex).__name__, ex.args)
            _LOGGER.error("An error occured accessing the API: {}".format(
                message))
            return None

    def set_bluetooth(self, mac):
        """Pair with bluetooth device with mac address."""
        self._post_request('/api/bluetooth/pair-sink/' +
                           self._device._device_type + '/' +
                           self._device.unique_id,
                           data={"bluetoothDeviceAddress": mac})

    def disconnect_bluetooth(self):
        """Disconnect all bluetooth devices."""
        self._post_request('/api/bluetooth/disconnect-sink/' +
                           self._device._device_type + '/' +
                           self._device.unique_id, data=None)

    @staticmethod
    def get_devices(url, session):
        """Identify all Alexa devices."""
        try:
            response = session.get('https://alexa.' + url +
                                   '/api/devices-v2/device')
            return response.json()['devices']
        except Exception as ex:
            template = ("An exception of type {0} occurred."
                        " Arguments:\n{1!r}")
            message = template.format(type(ex).__name__, ex.args)
            _LOGGER.error("An error occured accessing the API: {}".format(
                message))
            return None