import{dm as e,cQ as t,db as i,x as s,dx as a,dy as o,dz as r,dw as d,r as n,eM as h,_ as l,t as u}from"./card-45855f1f.js";import{m as c}from"./audio-cf3a75aa.js";import{h as v,s as p,c as y}from"./media-1a34ac2c.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function _(e,t){return(i,s,a)=>{const o=t=>t.renderRoot?.querySelector(e)??null;if(t){const{get:e,set:t}="object"==typeof s?i:a??(()=>{const e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return m(i,s,{get(){let i=e.call(this);return void 0===i&&(i=o(this),(null!==i||this.hasUpdated)&&t.call(this,i)),i}})}return m(i,s,{get(){return o(this)}})}}var f="img,\nvideo {\n  object-fit: var(--frigate-card-media-layout-fit, contain);\n  object-position: var(--frigate-card-media-layout-position-x, 50%) var(--frigate-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--frigate-card-media-layout-view-box-top, 0%) var(--frigate-card-media-layout-view-box-right, 0%) var(--frigate-card-media-layout-view-box-bottom, 0%) var(--frigate-card-media-layout-view-box-left, 0%));\n}";customElements.whenDefined("ha-hls-player").then((()=>{let m=class extends(customElements.get("ha-hls-player")){async play(){return this._video?.play()}async pause(){this._video?.pause()}async mute(){this._video&&(this._video.muted=!0)}async unmute(){this._video&&(this._video.muted=!1)}isMuted(){return this._video?.muted??!0}async seek(e){this._video&&(v(this._video),this._video.currentTime=e)}async setControls(e){this._video&&p(this._video,e??this.controls)}isPaused(){return this._video?.paused??!0}async getScreenshotURL(){return this._video?e(this._video):null}render(){if(this._error){if(this._errorIsFatal)return t(this,this._error);i(this._error,console.error)}return s`
        <video
          id="video"
          .poster=${this.posterUrl}
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          @loadedmetadata=${()=>{this.controls&&v(this._video,y)}}
          @loadeddata=${e=>this._loadedDataHandler(e)}
          @volumechange=${()=>a(this)}
          @play=${()=>o(this)}
          @pause=${()=>r(this)}
        ></video>
      `}_loadedDataHandler(e){super._loadedData(),d(this,e,{player:this,capabilities:{supportsPause:!0,hasAudio:c(this._video)},technology:["hls"]})}static get styles(){return[super.styles,n(f),h`
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `]}};l([_("#video")],m.prototype,"_video",void 0),m=l([u("frigate-card-ha-hls-player")],m)}));export{f as c,_ as e};
