/*
Floorplan Fully Kiosk for Home Assistant
Version: 1.0.7.18
https://github.com/pkozul/ha-floorplan
*/

'use strict';

if (typeof window.FullyKiosk !== 'function') {
  class FullyKiosk {
    constructor(floorplan) {
      this.version = '1.0.7.18';

      this.floorplan = floorplan;
      this.authToken = (window.localStorage && window.localStorage.authToken) ? window.localStorage.authToken : '';

      this.logInfo(`Full Kiosk v${this.version}`);
    }

    init() {
      if (typeof fully === "undefined") {
        //this.logError("Fully Kiosk not detected");
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

      this.sendMotionState();
      this.sendPluggedState();
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
      clearTimeout(this.sendMotionStateTimer);

      if (!this.kioskInfo.motionBinarySensorEntityId)
        return;

      let payload = {
        "state": this.kioskInfo.isMotionDetected ? "on" : "off",
        "mac_address": fully.macAddress
      };

      let timeout = this.kioskInfo.isMotionDetected ? 5000 : 10000;

      jQuery.ajax({
        type: 'POST',
        url: `/api/states/${this.kioskInfo.motionBinarySensorEntityId}`,
        headers: { "X-HA-Access": this.authToken },
        data: JSON.stringify(payload),
        success: function (result) {
          this.logDebug('FULLY_KIOSK', 'Sent kiosk motion state: ' + JSON.stringify(payload));
          this.sendMotionStateTimer = setTimeout(() => {
            this.kioskInfo.isMotionDetected = false;
            this.sendMotionState();
          }, timeout);
        }.bind(this),
        error: function (err) {
          this.logError('Error setting kiosk motion state');
          this.sendMotionStateTimer = setTimeout(() => {
            this.kioskInfo.isMotionDetected = false;
            this.sendMotionState();
          }, timeout);
        }.bind(this)
      });
    }

    sendPluggedState(isOn) {
      if (!this.kioskInfo.pluggedBinarySensorEntityId)
        return;

      let payload = {
        "state": this.kioskInfo.isPluggedIn ? "on" : "off",
        "mac_address": fully.macAddress
      };;

      jQuery.ajax({
        type: 'POST',
        url: `/api/states/${this.kioskInfo.pluggedBinarySensorEntityId}`,
        headers: { "X-HA-Access": this.authToken },
        data: JSON.stringify(payload),
        success: function (result) {
          this.logDebug('FULLY_KIOSK', 'Sent kiosk plugged state: ' + JSON.stringify(payload));
        }.bind(this),
        error: function (err) {
          this.logError('Error setting kiosk plugged state');
        }.bind(this)
      });
    }

    playTextToSpeech(text) {
      fully.textToSpeech(text);
    }

    playMedia(mediaUrl) {
      let audio = new Audio(mediaUrl);
      audio.volume = 1.0;
      audio.play();
    }

    subscribeEvents() {
      this.floorplan.hass.connection.subscribeEvents((event) => {
        if (!this.kioskInfo || !this.kioskInfo.mediaPlayerEntityId) {
          return;
        }

        if ((event.data.domain === 'media_player') && (event.data.service === 'play_media')) {
          let targetEntityId = event.data.service_data.entity_id.find(entityId => (entityId === this.kioskInfo.mediaPlayerEntityId));
          if (targetEntityId) {
            this.logDebug('FULLY_KIOSK', `Playing media: ${event.data.service_data.media_content_id}`);
            this.playMedia(event.data.service_data.media_content_id);
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
