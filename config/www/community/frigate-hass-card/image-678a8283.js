import{a as e,cM as a,x as t,cQ as s,r as i,c_ as r,_ as u,n as g,t as m}from"./card-320adb66.js";import"./image-88fcb8ac.js";let n=class extends e{constructor(){super(...arguments),this._refImage=a()}async play(){await(this._refImage.value?.play())}async pause(){await(this._refImage.value?.pause())}async mute(){await(this._refImage.value?.mute())}async unmute(){await(this._refImage.value?.unmute())}isMuted(){return!!this._refImage.value?.isMuted()}async seek(e){await(this._refImage.value?.seek(e))}async setControls(e){await(this._refImage.value?.setControls(e))}isPaused(){return this._refImage.value?.isPaused()??!0}async getScreenshotURL(){return await(this._refImage.value?.getScreenshotURL())??null}render(){if(this.hass&&this.cameraConfig)return t`
      <frigate-card-image
        ${s(this._refImage)}
        .hass=${this.hass}
        .imageConfig=${this.cameraConfig.image}
        .cameraConfig=${this.cameraConfig}
      >
      </frigate-card-image>
    `}static get styles(){return i(r)}};u([g({attribute:!1})],n.prototype,"hass",void 0),u([g({attribute:!1})],n.prototype,"cameraConfig",void 0),n=u([m("frigate-card-live-image")],n);export{n as FrigateCardLiveImage};
