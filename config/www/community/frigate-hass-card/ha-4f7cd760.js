import{di as e,cP as t,x as s,cZ as a,dt as i,du as r,dv as o,ds as d,r as h,eJ as l,_ as n,t as c,eM as p,eN as u,cL as y,a as m,cM as _,cQ as f,n as v}from"./card-320adb66.js";import{c as g,e as $}from"./ha-hls-player-b195eaa1.js";import{s as b,d as w,h as L,c as R}from"./dispatch-live-error-c649b480.js";import{m as P}from"./audio-cf3a75aa.js";customElements.whenDefined("ha-web-rtc-player").then((()=>{let p=class extends(customElements.get("ha-web-rtc-player")){async play(){return this._video?.play()}async pause(){this._video?.pause()}async mute(){this._video&&(this._video.muted=!0)}async unmute(){this._video&&(this._video.muted=!1)}isMuted(){return this._video?.muted??!0}async seek(e){this._video&&(this._video.currentTime=e)}async setControls(e){this._video&&b(this._video,e??this.controls)}isPaused(){return this._video?.paused??!0}async getScreenshotURL(){return this._video?e(this._video):null}render(){return this._error?(w(this),t({type:"error",message:this._error,context:{entity_id:this.entityid}})):s`
        <video
          id="remote-stream"
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          poster=${a(this.posterUrl)}
          @loadedmetadata=${()=>{this.controls&&L(this._video,R)}}
          @loadeddata=${e=>this._loadedDataHandler(e)}
          @volumechange=${()=>i(this)}
          @play=${()=>r(this)}
          @pause=${()=>o(this)}
        ></video>
      `}_loadedDataHandler(e){super._loadedData(),d(this,e,{player:this,capabilities:{supportsPause:!0,hasAudio:P(this._video)},technology:["webrtc"]})}static get styles(){return[super.styles,h(g),l`
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `]}};n([$("#remote-stream")],p.prototype,"_video",void 0),p=n([c("frigate-card-ha-web-rtc-player")],p)})),customElements.whenDefined("ha-camera-stream").then((()=>{const e="web_rtc",t="mjpeg";let a=class extends(customElements.get("ha-camera-stream")){constructor(){super(...arguments),this._mediaLoadedInfoPerStream={},this._mediaLoadedInfoDispatched=null}async play(){return this._player?.play()}async pause(){this._player?.pause()}async mute(){this._player?.mute()}async unmute(){this._player?.unmute()}isMuted(){return this._player?.isMuted()??!0}async seek(e){this._player?.seek(e)}async setControls(e){this._player&&this._player.setControls(e??this.controls)}isPaused(){return this._player?.isPaused()??!0}async getScreenshotURL(){return this._player?await this._player.getScreenshotURL():null}_storeMediaLoadedInfoHandler(e,t){this._storeMediaLoadedInfo(e,t.detail),t.stopPropagation()}_storeMediaLoadedInfo(e,t){this._mediaLoadedInfoPerStream[e]=t,this.requestUpdate()}_renderStream(a){return this.stateObj?a.type===t?s`
          <img
            @load=${e=>this._storeMediaLoadedInfo(t,u(e,{player:this,technology:["mjpeg"]}))}
            .src=${void 0===this._connected||this._connected?(i=this.stateObj,`/api/camera_proxy_stream/${i.entity_id}?token=${i.attributes.access_token}`):this._posterUrl||""}
          />
        `:"hls"===a.type?s` <frigate-card-ha-hls-player
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
          class="player ${a.visible?"":"hidden"}"
        ></frigate-card-ha-hls-player>`:a.type===e?s`<frigate-card-ha-web-rtc-player
          ?autoplay=${!1}
          playsinline
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @frigate-card:media:loaded=${t=>this._storeMediaLoadedInfoHandler(e,t)}
          @streams=${this._handleWebRtcStreams}
          class="player ${a.visible?"":"hidden"}"
        ></frigate-card-ha-web-rtc-player>`:p:p;var i}updated(e){super.updated(e);const t=this._streams(this._capabilities?.frontend_stream_types,this._hlsStreams,this._webRtcStreams).find((e=>e.visible))??null;if(t){const e=this._mediaLoadedInfoPerStream[t.type];e&&e!==this._mediaLoadedInfoDispatched&&(this._mediaLoadedInfoDispatched=e,y(this,e))}}static get styles(){return[super.styles,h(g),l`
          :host {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `]}};n([$(".player:not(.hidden)")],a.prototype,"_player",void 0),a=n([c("frigate-card-ha-camera-stream")],a)}));let I=class extends m{constructor(){super(...arguments),this.controls=!1,this._playerRef=_()}async play(){return this._playerRef.value?.play()}async pause(){this._playerRef.value?.pause()}async mute(){this._playerRef.value?.mute()}async unmute(){this._playerRef.value?.unmute()}isMuted(){return this._playerRef.value?.isMuted()??!0}async seek(e){this._playerRef.value?.seek(e)}async setControls(e){this._playerRef.value?.setControls(e??this.controls)}isPaused(){return this._playerRef.value?.isPaused()??!0}async getScreenshotURL(){return await(this._playerRef.value?.getScreenshotURL())??null}render(){if(this.hass)return s` <frigate-card-ha-camera-stream
      ${f(this._playerRef)}
      .hass=${this.hass}
      .stateObj=${this.cameraConfig?.camera_entity?this.hass.states[this.cameraConfig.camera_entity]:void 0}
      .controls=${this.controls}
      .muted=${!0}
    >
    </frigate-card-ha-camera-stream>`}static get styles(){return h(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}")}};n([v({attribute:!1})],I.prototype,"hass",void 0),n([v({attribute:!1})],I.prototype,"cameraConfig",void 0),n([v({attribute:!0,type:Boolean})],I.prototype,"controls",void 0),I=n([c("frigate-card-live-ha")],I);export{I as FrigateCardLiveHA};
