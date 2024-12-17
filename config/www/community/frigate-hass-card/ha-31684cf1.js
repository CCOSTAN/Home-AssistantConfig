import{dm as e,cQ as t,x as s,dw as a,dx as i,dy as r,dz as o,r as h,eM as d,_ as n,t as l,cN as c,eP as p,cP as u,a as y,cR as m,cU as _,l as f,cV as v,n as g}from"./card-c642ee74.js";import{c as $,e as b}from"./ha-hls-player-abb86874.js";import{m as w}from"./audio-cf3a75aa.js";import{s as R,h as L,c as P}from"./media-6eadcd60.js";import{g as I}from"./index-0a012f43.js";customElements.whenDefined("ha-web-rtc-player").then((()=>{let c=class extends(customElements.get("ha-web-rtc-player")){async play(){return this._video?.play()}async pause(){this._video?.pause()}async mute(){this._video&&(this._video.muted=!0)}async unmute(){this._video&&(this._video.muted=!1)}isMuted(){return this._video?.muted??!0}async seek(e){this._video&&(this._video.currentTime=e)}async setControls(e){this._video&&R(this._video,e??this.controls)}isPaused(){return this._video?.paused??!0}async getScreenshotURL(){return this._video?e(this._video):null}render(){return this._error?t(this,`${this._error} (${this.entityid})`):s`
        <video
          id="remote-stream"
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          @loadedmetadata=${()=>{this.controls&&L(this._video,P)}}
          @loadeddata=${e=>{a(this,e,{player:this,capabilities:{supportsPause:!0,hasAudio:w(this._video)},technology:["webrtc"]})}}
          @volumechange=${()=>i(this)}
          @play=${()=>r(this)}
          @pause=${()=>o(this)}
        ></video>
      `}static get styles(){return[super.styles,h($),d`
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `]}};n([b("#remote-stream")],c.prototype,"_video",void 0),c=n([l("frigate-card-ha-web-rtc-player")],c)})),customElements.whenDefined("ha-camera-stream").then((()=>{const e="web_rtc",t="mjpeg";let a=class extends(customElements.get("ha-camera-stream")){constructor(){super(...arguments),this._mediaLoadedInfoPerStream={},this._mediaLoadedInfoDispatched=null}async play(){return this._player?.play()}async pause(){this._player?.pause()}async mute(){this._player?.mute()}async unmute(){this._player?.unmute()}isMuted(){return this._player?.isMuted()??!0}async seek(e){this._player?.seek(e)}async setControls(e){this._player&&this._player.setControls(e??this.controls)}isPaused(){return this._player?.isPaused()??!0}async getScreenshotURL(){return this._player?await this._player.getScreenshotURL():null}_storeMediaLoadedInfoHandler(e,t){this._storeMediaLoadedInfo(e,t.detail),t.stopPropagation()}_storeMediaLoadedInfo(e,t){this._mediaLoadedInfoPerStream[e]=t,this.requestUpdate()}_renderStream(a){return this.stateObj?a.type===t?s`
          <img
            @load=${e=>this._storeMediaLoadedInfo(t,p(e,{player:this,technology:["mjpeg"]}))}
            .src=${void 0===this._connected||this._connected?(i=this.stateObj,`/api/camera_proxy_stream/${i.entity_id}?token=${i.attributes.access_token}`):this._posterUrl||""}
          />
        `:"hls"===a.type?s` <frigate-card-ha-hls-player
          id="player"
          ?autoplay=${!1}
          playsinline
          .allowExoPlayer=${this.allowExoPlayer}
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @frigate-card:media:loaded=${e=>this._storeMediaLoadedInfoHandler("hls",e)}
          @streams=${this._handleHlsStreams}
          class=${a.visible?"":"hidden"}
        ></frigate-card-ha-hls-player>`:a.type===e?s`<frigate-card-ha-web-rtc-player
          id="player"
          ?autoplay=${!1}
          playsinline
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @frigate-card:media:loaded=${t=>this._storeMediaLoadedInfoHandler(e,t)}
          @streams=${this._handleWebRtcStreams}
          class=${a.visible?"":"hidden"}
        ></frigate-card-ha-web-rtc-player>`:c:c;var i}updated(e){super.updated(e);const t=this._streams(this._capabilities?.frontend_stream_types,this._hlsStreams,this._webRtcStreams).find((e=>e.visible))??null;if(t){const e=this._mediaLoadedInfoPerStream[t.type];e&&e!==this._mediaLoadedInfoDispatched&&(this._mediaLoadedInfoDispatched=e,u(this,e))}}static get styles(){return[super.styles,h($),d`
          :host {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `]}};n([b("#player")],a.prototype,"_player",void 0),a=n([l("frigate-card-ha-camera-stream")],a)}));let S=class extends y{constructor(){super(...arguments),this.controls=!0,this._playerRef=m()}async play(){return this._playerRef.value?.play()}async pause(){this._playerRef.value?.pause()}async mute(){this._playerRef.value?.mute()}async unmute(){this._playerRef.value?.unmute()}isMuted(){return this._playerRef.value?.isMuted()??!0}async seek(e){this._playerRef.value?.seek(e)}async setControls(e){this._playerRef.value?.setControls(e??this.controls)}isPaused(){return this._playerRef.value?.isPaused()??!0}async getScreenshotURL(){return await(this._playerRef.value?.getScreenshotURL())??null}render(){if(!this.hass)return;const e=I(this,this.hass,this.cameraConfig);return e?"unavailable"===e.state?_({message:f("error.live_camera_unavailable"),type:"error",icon:"mdi:connection",context:this.cameraConfig}):s` <frigate-card-ha-camera-stream
      ${v(this._playerRef)}
      .hass=${this.hass}
      .stateObj=${e}
      .controls=${this.controls}
      .muted=${!0}
    >
    </frigate-card-ha-camera-stream>`:void 0}static get styles(){return h(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}")}};n([g({attribute:!1})],S.prototype,"hass",void 0),n([g({attribute:!1})],S.prototype,"cameraConfig",void 0),n([g({attribute:!0,type:Boolean})],S.prototype,"controls",void 0),S=n([l("frigate-card-live-ha")],S);export{S as FrigateCardLiveHA};
