import{a,cR as e,x as s,cV as t,r as i,d2 as r,_ as m,n as g,t as n}from"./card-c642ee74.js";import{g as u}from"./index-0a012f43.js";import"./image-cbfd7ccb.js";import"./media-6eadcd60.js";let o=class extends a{constructor(){super(...arguments),this._refImage=e()}async play(){await(this._refImage.value?.play())}async pause(){await(this._refImage.value?.pause())}async mute(){await(this._refImage.value?.mute())}async unmute(){await(this._refImage.value?.unmute())}isMuted(){return!!this._refImage.value?.isMuted()}async seek(a){await(this._refImage.value?.seek(a))}async setControls(a){await(this._refImage.value?.setControls(a))}isPaused(){return this._refImage.value?.isPaused()??!0}async getScreenshotURL(){return await(this._refImage.value?.getScreenshotURL())??null}render(){if(this.hass&&this.cameraConfig)return u(this,this.hass,this.cameraConfig),s`
      <frigate-card-image
        ${t(this._refImage)}
        .hass=${this.hass}
        .imageConfig=${this.cameraConfig.image}
        .cameraConfig=${this.cameraConfig}
      >
      </frigate-card-image>
    `}static get styles(){return i(r)}};m([g({attribute:!1})],o.prototype,"hass",void 0),m([g({attribute:!1})],o.prototype,"cameraConfig",void 0),o=m([n("frigate-card-live-image")],o);export{o as FrigateCardLiveImage};
