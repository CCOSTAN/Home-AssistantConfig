/*
Floorplan Fully Kiosk for Home Assistant
Version: 1.0.7.25
https://github.com/pkozul/ha-floorplan
*/

'use strict';

if (typeof window.FullyKiosk !== 'function') {
  class FullyKiosk {
    constructor(floorplan) {
      this.version = '1.0.7.25';

      this.floorplan = floorplan;
      this.authToken = (window.localStorage && window.localStorage.authToken) ? window.localStorage.authToken : '';
    }

    init() {
      this.logInfo(`Fully Kiosk v${this.version}`);

      if (typeof fully === "undefined") {
        this.logInfo(`Fully Kiosk application is not running on this device`);
        return;
      }

      let macAddress = fully.getMacAddress().toLowerCase();

      let device = this.floorplan.config && this.floorplan.config.fully_kiosk &&
        this.floorplan.config.fully_kiosk.find(x => x.address.toLowerCase() == macAddress);
      if (!device)
        return;

      this.subscribeEvents();

      this.kioskInfo = {
        motionBinarySensorEntityId: device.motion_sensor,
        pluggedBinarySensorEntityId: device.plugged_sensor,
        mediaPlayerEntityId: device.media_player,
        startUrl: fully.getStartUrl(),
        currentLocale: fully.getCurrentLocale(),
        ipAddressv4: fully.getIp4Address(),
        ipAddressv6: fully.getIp6Address(),
        macAddress: fully.getMacAddress(),
        wifiSSID: fully.getWifiSsid(),
        serialNumber: fully.getSerialNumber(),
        deviceId: fully.getDeviceId(),
        batteryLevel: fully.getBatteryLevel(),
        screenBrightness: fully.getScreenBrightness(),
        isScreenOn: fully.getScreenOn(),
        isPluggedIn: fully.isPlugged(),
        isMotionDetected: false,
      };

      this.addEventHandlers();

      this.audio = new Audio();
      this.isAudioPlaying = false;
      this.audio.addEventListener('play', this.onAudioPlay.bind(this));
      this.audio.addEventListener('playing', this.onAudioPlaying.bind(this));
      this.audio.addEventListener('pause', this.onAudioPause.bind(this));
      this.audio.addEventListener('ended', this.onAudioEnded.bind(this));
      this.audio.addEventListener('volumechange', this.onAudioVolumeChange.bind(this));

      this.sendMotionState();
      this.sendPluggedState();
      this.sendMediaPlayerState();
    }

    addEventHandlers() {
      window['onFullyEvent'] = (e) => { window.dispatchEvent(new Event(e)); }

      window.addEventListener('fully.screenOn', this.onFullyScreenOn.bind(this));
      window.addEventListener('fully.screenOff', this.onFullyScreenOff.bind(this));
      window.addEventListener('fully.networkDisconnect', this.onFullyNetworkDisconnect.bind(this));
      window.addEventListener('fully.networkReconnect', this.onFullyNetworkReconnect.bind(this));
      window.addEventListener('fully.internetDisconnect', this.onFullyInternetDisconnect.bind(this));
      window.addEventListener('fully.internetReconnect', this.onFullyInternetReconnect.bind(this));
      window.addEventListener('fully.unplugged', this.onFullyUnplugged.bind(this));
      window.addEventListener('fully.pluggedAC', this.onFullyPluggedAC.bind(this));
      window.addEventListener('fully.pluggedUSB', this.onFullyPluggedUSB.bind(this));
      window.addEventListener('fully.onMotion', this.onFullyMotion.bind(this));

      fully.bind('screenOn', 'onFullyEvent("fully.screenOn");')
      fully.bind('screenOff', 'onFullyEvent("fully.screenOff");')
      fully.bind('networkDisconnect', 'onFullyEvent("fully.networkDisconnect");')
      fully.bind('networkReconnect', 'onFullyEvent("fully.networkReconnect");')
      fully.bind('internetDisconnect', 'onFullyEvent("fully.internetDisconnect");')
      fully.bind('internetReconnect', 'onFullyEvent("fully.internetReconnect");')
      fully.bind('unplugged', 'onFullyEvent("fully.unplugged");')
      fully.bind('pluggedAC', 'onFullyEvent("fully.pluggedAC");')
      fully.bind('pluggedUSB', 'onFullyEvent("fully.pluggedUSB");')
      fully.bind('onMotion', 'onFullyEvent("fully.onMotion");') // Max. one per second
    }

    onFullyScreenOn() {
      this.logDebug('FULLY_KIOSK', 'Screen turned on');
    }

    onFullyScreenOff() {
      this.logDebug('FULLY_KIOSK', 'Screen turned off');
    }

    onFullyNetworkDisconnect() {
      this.logDebug('FULLY_KIOSK', 'Network disconnected');
    }

    onFullyNetworkReconnect() {
      this.logDebug('FULLY_KIOSK', 'Network reconnected');
    }

    onFullyInternetDisconnect() {
      this.logDebug('FULLY_KIOSK', 'Internet disconnected');
    }

    onFullyInternetReconnect() {
      this.logDebug('FULLY_KIOSK', 'Internet reconnected');
    }

    onFullyUnplugged() {
      this.kioskInfo.isPluggedIn = false;
      this.sendPluggedState();
    }

    onFullyPluggedAC() {
      this.kioskInfo.isPluggedIn = true;
      this.sendPluggedState();
    }

    onFullyPluggedUSB() {
      this.logDebug('FULLY_KIOSK', 'Device plugged into USB');
    }

    onFullyMotion() {
      this.kioskInfo.isMotionDetected = true;
      this.sendMotionState();
    }

    sendMotionState() {
      if (!this.kioskInfo.motionBinarySensorEntityId) {
        return;
      }

      clearTimeout(this.sendMotionStateTimer);
      let timeout = this.kioskInfo.isMotionDetected ? 5000 : 10000;

      let state = this.kioskInfo.isMotionDetected ? "on" : "off";
      this.sendState(`/api/states/${this.kioskInfo.motionBinarySensorEntityId}`, this.newPayload(state), () => {
        this.sendMotionStateTimer = setTimeout(() => {
          this.kioskInfo.isMotionDetected = false;
          this.sendMotionState();
        }, timeout);
      });
    }

    sendPluggedState() {
      if (!this.kioskInfo.pluggedBinarySensorEntityId) {
        return;
      }

      let state = this.kioskInfo.isPluggedIn ? "on" : "off";
      this.sendState(`/api/states/${this.kioskInfo.pluggedBinarySensorEntityId}`, this.newPayload(state));
    }

    newPayload(state) {
      return {
        state: state,
        attributes: {
          volume_level: this.audio.volume,
          media_content_id: this.audio.src,
          address: this.kioskInfo.macAddress,
          //'motionBinarySensorEntityId': 'binary_sensor.entry_motion',
          //'pluggedBinarySensorEntityId': 'binary_sensor.entry_plugged',
          //'mediaPlayerEntityId': 'media_player.entry_alarm_panel',
          //'startUrl': 'https: //petar.kozul.net: 8123/floorplan',
          //'currentLocale': 'en_US',
          //'ipAddressv4': '192.168.30.104',
          //'ipAddressv6': 'FE80: : 8A71: E5FF: FE60: A2A8',
          mac_address: this.kioskInfo.macAddress,
          //'wifiSSID': '"Finity"',
          serial_number: 'G0W0MA0771941EJU',
          device_id: '6ac37a44-802cb151',
          battery_level: 16,
          screen_brightness: 255,
          //'isScreenOn': True,
          //'isPluggedIn': True,
          //'isMotionDetected': False,
        }
      };
    }

    onAudioPlay() {
      this.isAudioPlaying = true;
      this.sendMediaPlayerState();
    }

    onAudioPlaying() {
      this.isAudioPlaying = true;
      this.sendMediaPlayerState();
    }

    onAudioPause() {
      this.isAudioPlaying = false;
      this.sendMediaPlayerState();
    }

    onAudioEnded() {
      this.isAudioPlaying = false;
      this.sendMediaPlayerState();
    }

    onAudioVolumeChange() {
      this.sendMediaPlayerState();
    }

    sendMediaPlayerState() {
      if (!this.kioskInfo.mediaPlayerEntityId) {
        return;
      }

      let state = this.isAudioPlaying ? "playing" : "idle";
      this.sendState(`/api/fully_kiosk/media_player/${this.kioskInfo.mediaPlayerEntityId}`, this.newPayload(state));
    }

    playTextToSpeech(text) {
      fully.textToSpeech(text);
    }

    playMedia(mediaUrl) {
      this.audio.src = mediaUrl;

      this.logDebug('FULLY_KIOSK', `Playing media: ${this.audio.src}`);
      this.audio.play();
    }

    pauseMedia() {
      this.logDebug('FULLY_KIOSK', `Pausing media: ${this.audio.src}`);
      this.audio.pause();
    }

    setVolume(level) {
      this.audio.volume = level;
    }

    sendState(url, payload, onSuccess) {
      let options = {
        type: 'POST',
        url: url,
        headers: { "X-HA-Access": this.authToken },
        data: JSON.stringify(payload),
        success: function (result) {
          this.logDebug('FULLY_KIOSK', `Posted state: ${url} ${JSON.stringify(payload)}`);
          if (onSuccess) {
            onSuccess();
          }
        }.bind(this),
        error: function (error) {
          this.handleError(new URIError(`Error posting state: ${url}`));
        }.bind(this)
      };

      jQuery.ajax(options);
    }

    subscribeEvents() {
      this.floorplan.hass.connection.subscribeEvents((event) => {
        if (!this.kioskInfo || !this.kioskInfo.mediaPlayerEntityId) {
          return;
        }

        if (event.data.domain === 'media_player') {
          let targetEntityId;
          let serviceEntityId = event.data.service_data.entity_id;

          if (Array.isArray(serviceEntityId)) {
            targetEntityId = serviceEntityId.find(entityId => (entityId === this.kioskInfo.mediaPlayerEntityId));
          }
          else {
            targetEntityId = (serviceEntityId === this.kioskInfo.mediaPlayerEntityId) ? serviceEntityId : undefined;
          }

          if (targetEntityId) {
            switch (event.data.service) {
              case 'play_media':
                this.playMedia(event.data.service_data.media_content_id);
                break;

              case 'media_play':
                this.playMedia();
                break;

              case 'media_pause':
              case 'media_stop':
                this.pauseMedia();
                break;

              case 'volume_set':
                this.setVolume(event.data.service_data.volume_level);
                break;

              default:
                this.logDebug('FULLY_KIOSK', `Service not supported: ${event.data.service}`);
                break;
            }
          }
        }

        /*
        if ((event.data.domain === 'tts') && (event.data.service === 'google_say')) {
          if (this.kioskInfo.mediaPlayerEntityId === event.data.service_data.entity_id) {
            this.logDebug('FULLY_KIOSK', 'Playing TTS using Fully Kiosk');
            this.playTextToSpeech(event.data.service_data.message);
          }
        }
        */
      },
        'call_service');
    }

    handleError(message) {
      this.floorplan.handleError(message);
    }

    logError(message) {
      this.floorplan.logError(message);
    }

    logWarning(message) {
      this.floorplan.logWarning(message);
    }

    logInfo(message) {
      this.floorplan.logInfo(message);
    }

    logDebug(area, message) {
      this.floorplan.logDebug(area, message);
    }
  }

  window.FullyKiosk = FullyKiosk;
}
