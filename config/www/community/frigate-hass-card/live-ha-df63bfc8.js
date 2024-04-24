import{di as e,cL as t,y as s,dj as a,dk as r,dl as i,dm as h,bj as o,dn as l,bk as n,bn as d,s as u,cP as c,cS as y,bl as p}from"./card-555679fd.js";import{getStateObjOrDispatchError as m}from"./live-e0c9196c.js";import{c as _,i as v}from"./ha-hls-player-aef987da.js";import{m as f}from"./audio-557099cb.js";import{s as $,h as g,M as b}from"./lazyload-c2d6254a.js";import"./media-layout-8e0c974f.js";customElements.whenDefined("ha-web-rtc-player").then((()=>{let u=class extends(customElements.get("ha-web-rtc-player")){async play(){return this._video?.play()}async pause(){this._video?.pause()}async mute(){this._video&&(this._video.muted=!0)}async unmute(){this._video&&(this._video.muted=!1)}isMuted(){return this._video?.muted??!0}async seek(e){this._video&&(this._video.currentTime=e)}async setControls(e){this._video&&$(this._video,e??this.controls)}isPaused(){return this._video?.paused??!0}async getScreenshotURL(){return this._video?e(this._video):null}render(){return this._error?t(this,`${this._error} (${this.entityid})`):s`
        <video
          id="remote-stream"
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          @loadedmetadata=${()=>{this.controls&&g(this._video,b)}}
          @loadeddata=${e=>{a(this,e,{player:this,capabilities:{supportsPause:!0,hasAudio:f(this._video)}})}}
          @volumechange=${()=>r(this)}
          @play=${()=>i(this)}
          @pause=${()=>h(this)}
        ></video>
      `}static get styles(){return[super.styles,o(_),l`
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `]}};n([v("#remote-stream")],u.prototype,"_video",void 0),u=n([d("frigate-card-ha-web-rtc-player")],u)})),customElements.whenDefined("ha-camera-stream").then((()=>{let e=class extends(customElements.get("ha-camera-stream")){async play(){return this._player?.play()}async pause(){this._player?.pause()}async mute(){this._player?.mute()}async unmute(){this._player?.unmute()}isMuted(){return this._player?.isMuted()??!0}async seek(e){this._player?.seek(e)}async setControls(e){this._player&&this._player.setControls(e??this.controls)}isPaused(){return this._player?.isPaused()??!0}async getScreenshotURL(){return this._player?await this._player.getScreenshotURL():null}render(){return this.stateObj?this._shouldRenderMJPEG?s`
          <img
            @load=${e=>{a(this,e,{player:this})}}
            .src=${void 0===this._connected||this._connected?(e=this.stateObj,`/api/camera_proxy_stream/${e.entity_id}?token=${e.attributes.access_token}`):""}
          />
        `:"hls"===this.stateObj.attributes.frontend_stream_type?this._url?s` <frigate-card-ha-hls-player
              id="player"
              ?autoplay=${!1}
              playsinline
              .allowExoPlayer=${this.allowExoPlayer}
              .muted=${this.muted}
              .controls=${this.controls}
              .hass=${this.hass}
              .url=${this._url}
            ></frigate-card-ha-hls-player>`:s``:"web_rtc"===this.stateObj.attributes.frontend_stream_type?s`<frigate-card-ha-web-rtc-player
          id="player"
          ?autoplay=${!1}
          playsinline
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
        ></frigate-card-ha-web-rtc-player>`:void 0:s``;var e}static get styles(){return[super.styles,o(_),l`
          :host {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `]}};n([v("#player")],e.prototype,"_player",void 0),e=n([d("frigate-card-ha-camera-stream")],e)}));let w=class extends u{constructor(){super(...arguments),this.controls=!0,this._playerRef=c()}async play(){return this._playerRef.value?.play()}async pause(){this._playerRef.value?.pause()}async mute(){this._playerRef.value?.mute()}async unmute(){this._playerRef.value?.unmute()}isMuted(){return this._playerRef.value?.isMuted()??!0}async seek(e){this._playerRef.value?.seek(e)}async setControls(e){this._playerRef.value?.setControls(e??this.controls)}isPaused(){return this._playerRef.value?.isPaused()??!0}async getScreenshotURL(){return await(this._playerRef.value?.getScreenshotURL())??null}render(){if(!this.hass)return;const e=m(this,this.hass,this.cameraConfig);return e?s` <frigate-card-ha-camera-stream
      ${y(this._playerRef)}
      .hass=${this.hass}
      .stateObj=${e}
      .controls=${this.controls}
      .muted=${!0}
    >
    </frigate-card-ha-camera-stream>`:void 0}static get styles(){return o(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n  --video-max-height: none;\n}")}};n([p({attribute:!1})],w.prototype,"hass",void 0),n([p({attribute:!1})],w.prototype,"cameraConfig",void 0),n([p({attribute:!0,type:Boolean})],w.prototype,"controls",void 0),w=n([d("frigate-card-live-ha")],w);export{w as FrigateCardLiveHA};
