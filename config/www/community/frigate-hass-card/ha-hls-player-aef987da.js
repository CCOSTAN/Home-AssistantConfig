import{di as e,cL as t,y as i,dj as s,dk as o,dl as r,dm as a,bj as n,dn as d,bk as l,bn as h}from"./card-555679fd.js";import{m as u}from"./audio-557099cb.js";import{h as c,s as v,M as y}from"./lazyload-c2d6254a.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p=({finisher:e,descriptor:t})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,r=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(r.finisher=function(t){e(t,s)}),r}{const o=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(o,s)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function m(e,t){return p({descriptor:i=>{const s={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[t]&&(this[t]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==s?s:null),this[t]}}return s}})}var _="img, video {\n  object-fit: var(--frigate-card-media-layout-fit, contain);\n  object-position: var(--frigate-card-media-layout-position-x, 50%) var(--frigate-card-media-layout-position-y, 50%);\n}";customElements.whenDefined("ha-hls-player").then((()=>{let p=class extends(customElements.get("ha-hls-player")){async play(){return this._video?.play()}async pause(){this._video?.pause()}async mute(){this._video&&(this._video.muted=!0)}async unmute(){this._video&&(this._video.muted=!1)}isMuted(){return this._video?.muted??!0}async seek(e){this._video&&(c(this._video),this._video.currentTime=e)}async setControls(e){this._video&&v(this._video,e??this.controls)}isPaused(){return this._video?.paused??!0}async getScreenshotURL(){return this._video?e(this._video):null}render(){if(this._error){if(this._errorIsFatal)return t(this,this._error);console.error(this._error)}return i`
        <video
          id="video"
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          @loadedmetadata=${()=>{this.controls&&c(this._video,y)}}
          @loadeddata=${e=>{s(this,e,{player:this,capabilities:{supportsPause:!0,hasAudio:u(this._video)}})}}
          @volumechange=${()=>o(this)}
          @play=${()=>r(this)}
          @pause=${()=>a(this)}
        ></video>
      `}static get styles(){return[super.styles,n(_),d`
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `]}};l([m("#video")],p.prototype,"_video",void 0),p=l([h("frigate-card-ha-hls-player")],p)}));export{_ as c,m as i};
