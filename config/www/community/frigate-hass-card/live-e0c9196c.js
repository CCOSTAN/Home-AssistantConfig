import{cH as e,cI as i,cJ as t,cK as a,cL as r,l as s,cM as o,s as n,cN as d,y as l,bj as h,bk as c,bl as g,cO as u,bm as m,bn as v,cP as p,bQ as f,cQ as _,cR as C,cS as b,cT as $,cU as y,cV as w,o as P}from"./card-555679fd.js";import{L as M,A as S,i as k,w as x,a as L,p as I}from"./lazyload-c2d6254a.js";import{u as z}from"./media-layout-8e0c974f.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=e(class extends i{constructor(){super(...arguments),this.key=t}render(e,i){return this.key=e,i}update(e,[i,t]){return i!==this.key&&(a(e),this.key=i),t}});const R="frigate-card-live-provider",O=(e,i,t)=>{if(!t?.camera_entity)return r(e,s("error.no_live_camera"),{context:t}),null;const a=i.states[t.camera_entity];return a?"unavailable"===a.state?(o(e,s("error.live_camera_unavailable"),"info",{icon:"mdi:connection",context:t}),null):a:(r(e,s("error.live_camera_not_found"),{context:t}),null)};let V=class extends n{constructor(){super(),this._inBackground=!1,this._lastMediaLoadedInfo=null,this._messageReceivedPostRender=!1,this._renderKey=0,this._intersectionObserver=new IntersectionObserver(this._intersectionHandler.bind(this))}_intersectionHandler(e){this._inBackground=!e.some((e=>e.isIntersecting)),this._inBackground||this._messageReceivedPostRender||!this._lastMediaLoadedInfo||d(this._lastMediaLoadedInfo.source,this._lastMediaLoadedInfo.mediaLoadedInfo),this._messageReceivedPostRender&&!this._inBackground&&this.requestUpdate()}shouldUpdate(e){return!this._inBackground||!this._messageReceivedPostRender}connectedCallback(){this._intersectionObserver.observe(this),super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._intersectionObserver.disconnect()}render(){if(!(this.hass&&this.liveConfig&&this.cameraManager&&this.view))return;const e=l`${E(this._renderKey,l`
        <frigate-card-live-carousel
          .hass=${this.hass}
          .view=${this.view}
          .liveConfig=${this.liveConfig}
          .inBackground=${this._inBackground}
          .conditionControllerEpoch=${this.conditionControllerEpoch}
          .liveOverrides=${this.liveOverrides}
          .cardWideConfig=${this.cardWideConfig}
          .cameraManager=${this.cameraManager}
          .microphoneStream=${this.microphoneStream}
          @frigate-card:message=${e=>{this._renderKey++,this._messageReceivedPostRender=!0,this._inBackground&&e.stopPropagation()}}
          @frigate-card:media:loaded=${e=>{this._lastMediaLoadedInfo={source:e.composedPath()[0],mediaLoadedInfo:e.detail},this._inBackground&&e.stopPropagation()}}
          @frigate-card:view:change=${e=>{this._inBackground&&e.stopPropagation()}}
        >
        </frigate-card-live-carousel>
      `)}`;return this._messageReceivedPostRender=!1,e}static get styles(){return h(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}")}};c([g({attribute:!1})],V.prototype,"conditionControllerEpoch",void 0),c([g({attribute:!1})],V.prototype,"hass",void 0),c([g({attribute:!1})],V.prototype,"view",void 0),c([g({attribute:!1})],V.prototype,"liveConfig",void 0),c([g({attribute:!1,hasChanged:u})],V.prototype,"liveOverrides",void 0),c([g({attribute:!1})],V.prototype,"cameraManager",void 0),c([g({attribute:!1})],V.prototype,"cardWideConfig",void 0),c([g({attribute:!1})],V.prototype,"microphoneStream",void 0),c([m()],V.prototype,"_inBackground",void 0),V=c([v("frigate-card-live")],V);let j=class extends n{constructor(){super(...arguments),this._cameraToSlide={},this._refMediaCarousel=p()}updated(e){super.updated(e),e.has("inBackground")&&this.updateComplete.then((async()=>{const e=this._refMediaCarousel.value;e&&(await e.updateComplete,this.inBackground?(e.autoPause(),e.autoMute()):(e.autoPlay(),e.autoUnmute()))}))}_getTransitionEffect(){return this.liveConfig?.transition_effect??f.live.transition_effect}_getSelectedCameraIndex(){const e=this.cameraManager?.getStore().getVisibleCameraIDs();return e&&this.view?Math.max(0,Array.from(e).indexOf(this.view.camera)):0}_getOptions(){return{draggable:this.liveConfig?.draggable,loop:!0}}_getPlugins(){const e=this.cameraManager?.getStore().getVisibleCameraIDs();return[...e&&e.size>1?[_({forceWheelAxis:"y"})]:[],M({...this.liveConfig?.lazy_load&&{lazyLoadCallback:(e,i)=>this._lazyloadOrUnloadSlide("load",e,i)},lazyUnloadCondition:this.liveConfig?.lazy_unload,lazyUnloadCallback:(e,i)=>this._lazyloadOrUnloadSlide("unload",e,i)}),S({playerSelector:R,...this.liveConfig?.auto_play&&{autoPlayCondition:this.liveConfig.auto_play},...this.liveConfig?.auto_pause&&{autoPauseCondition:this.liveConfig.auto_pause},...this.liveConfig?.auto_mute&&{autoMuteCondition:this.liveConfig.auto_mute},...this.liveConfig?.auto_unmute&&{autoUnmuteCondition:this.liveConfig.auto_unmute}})]}_getLazyLoadCount(){return!1===this.liveConfig?.lazy_load?null:0}_getSlides(){const e=this.cameraManager?.getStore().getVisibleCameras();if(!e)return[[],{}];const i=[],t={};for(const[a,r]of e){const e=this.view?.context?.live?.overrides?.get(a)??a,s=a===e?r:this.cameraManager?.getStore().getCameraConfig(e),o=s?this._renderLive(e,s,i.length):null;o&&(t[a]=i.length,i.push(o))}return[i,t]}_setViewHandler(e){const i=this.cameraManager?.getStore().getVisibleCameras();i&&e.detail.index!==this._getSelectedCameraIndex()&&this._setViewCameraID(Array.from(i.keys())[e.detail.index])}_setViewCameraID(e){e&&this.view?.evolve({camera:e,query:null,queryResults:null}).mergeInContext({thumbnails:{fetch:!1}}).dispatchChangeEvent(this)}_lazyloadOrUnloadSlide(e,i,t){t instanceof HTMLSlotElement&&(t=t.assignedElements({flatten:!0})[0]);const a=t?.querySelector(R);a&&(a.disabled="load"!==e)}_renderLive(e,i,t){if(!(this.liveConfig&&this.hass&&this.cameraManager&&this.conditionControllerEpoch))return;const a=C(this.conditionControllerEpoch.controller,this.liveConfig,this.liveOverrides,{camera:e}),r=this.cameraManager.getCameraMetadata(this.hass,e);return l`
      <div class="embla__slide">
        <frigate-card-live-provider
          ?disabled=${this.liveConfig.lazy_load}
          .microphoneStream=${this.view?.camera===e?this.microphoneStream:void 0}
          .cameraConfig=${i}
          .cameraEndpoints=${k([this.cameraManager,e],(()=>this.cameraManager?.getCameraEndpoints(e)??void 0))}
          .label=${r?.title??""}
          .liveConfig=${a}
          .hass=${this.hass}
          .cardWideConfig=${this.cardWideConfig}
          @frigate-card:media:loaded=${e=>{x(t,e)}}
          @frigate-card:media:unloaded=${e=>{L(t,e)}}
        >
        </frigate-card-live-provider>
      </div>
    `}_getCameraIDsOfNeighbors(){const e=this.cameraManager?.getStore().getVisibleCameras();if(!e||!this.view||!this.hass)return[null,null];const i=Array.from(e.keys()),t=i.indexOf(this.view.camera);return t<0||e.size<=1?[null,null]:[i[t>0?t-1:e.size-1],i[t+1<e.size?t+1:0]]}render(){if(!(this.liveConfig&&this.view&&this.hass&&this.cameraManager))return;const[e,i]=this._getSlides();if(this._cameraToSlide=i,!e.length)return;const[t,a]=this._getCameraIDsOfNeighbors(),r=e=>this.view?.context?.live?.overrides?.get(e)??e,o=t?this.cameraManager.getCameraMetadata(this.hass,r(t)):null,n=this.cameraManager.getCameraMetadata(this.hass,r(this.view.camera)),d=a?this.cameraManager.getCameraMetadata(this.hass,r(a)):null;return l`
      <frigate-card-media-carousel
        ${b(this._refMediaCarousel)}
        .carouselOptions=${k([this.cameraManager,this.liveConfig],this._getOptions.bind(this))}
        .carouselPlugins=${k([this.cameraManager,this.liveConfig],this._getPlugins.bind(this))}
        .label="${n?`${s("common.live")}: ${n.title}`:""}"
        .logo="${n?.engineLogo}"
        .titlePopupConfig=${this.liveConfig.controls.title}
        .selected=${this._getSelectedCameraIndex()}
        transitionEffect=${this._getTransitionEffect()}
        @frigate-card:media-carousel:select=${this._setViewHandler.bind(this)}
        @frigate-card:carousel:settle=${()=>{$(this,{thumbnails:{fetch:!0}})}}
      >
        <frigate-card-next-previous-control
          slot="previous"
          .hass=${this.hass}
          .direction=${"previous"}
          .controlConfig=${this.liveConfig.controls.next_previous}
          .label=${o?.title??""}
          .icon=${o?.icon}
          ?disabled=${null===t}
          @click=${e=>{this._setViewCameraID(t),y(e)}}
        >
        </frigate-card-next-previous-control>
        ${e}
        <frigate-card-next-previous-control
          slot="next"
          .hass=${this.hass}
          .direction=${"next"}
          .controlConfig=${this.liveConfig.controls.next_previous}
          .label=${d?.title??""}
          .icon=${d?.icon}
          ?disabled=${null===a}
          @click=${e=>{this._setViewCameraID(a),y(e)}}
        >
        </frigate-card-next-previous-control>
      </frigate-card-media-carousel>
    `}static get styles(){return h(".embla__slide {\n  height: 100%;\n  flex: 0 0 100%;\n}")}};c([g({attribute:!1})],j.prototype,"hass",void 0),c([g({attribute:!1})],j.prototype,"view",void 0),c([g({attribute:!1})],j.prototype,"liveConfig",void 0),c([g({attribute:!1,hasChanged:u})],j.prototype,"liveOverrides",void 0),c([g({attribute:!1})],j.prototype,"inBackground",void 0),c([g({attribute:!1})],j.prototype,"conditionControllerEpoch",void 0),c([g({attribute:!1})],j.prototype,"cardWideConfig",void 0),c([g({attribute:!1})],j.prototype,"cameraManager",void 0),c([g({attribute:!1})],j.prototype,"microphoneStream",void 0),j=c([v("frigate-card-live-carousel")],j);let B=class extends n{constructor(){super(...arguments),this.disabled=!1,this.label="",this._isVideoMediaLoaded=!1,this._refProvider=p(),this._importPromises=[]}async play(){await this.updateComplete,await(this._refProvider.value?.updateComplete),await I(this,this._refProvider.value)}async pause(){await this.updateComplete,await(this._refProvider.value?.updateComplete),await(this._refProvider.value?.pause())}async mute(){await this.updateComplete,await(this._refProvider.value?.updateComplete),await(this._refProvider.value?.mute())}async unmute(){await this.updateComplete,await(this._refProvider.value?.updateComplete),await(this._refProvider.value?.unmute())}isMuted(){return this._refProvider.value?.isMuted()??!0}async seek(e){await this.updateComplete,await(this._refProvider.value?.updateComplete),await(this._refProvider.value?.seek(e))}async setControls(e){await this.updateComplete,await(this._refProvider.value?.updateComplete),await(this._refProvider.value?.setControls(e))}isPaused(){return this._refProvider.value?.isPaused()??!0}async getScreenshotURL(){return await this.updateComplete,await(this._refProvider.value?.updateComplete),await(this._refProvider.value?.getScreenshotURL())??null}_getResolvedProvider(){return"auto"===this.cameraConfig?.live_provider?this.cameraConfig?.webrtc_card?.entity||this.cameraConfig?.webrtc_card?.url?"webrtc-card":this.cameraConfig?.camera_entity?"low"===this.cardWideConfig?.performance?.profile?"image":"ha":this.cameraConfig?.frigate.camera_name?"jsmpeg":f.cameras.live_provider:this.cameraConfig?.live_provider||"image"}_shouldShowImageDuringLoading(){return!!this.cameraConfig?.camera_entity&&!!this.hass&&!!this.liveConfig?.show_image_during_load}disconnectedCallback(){this._isVideoMediaLoaded=!1}_videoMediaShowHandler(){this._isVideoMediaLoaded=!0}willUpdate(e){if(e.has("disabled")&&this.disabled&&(this._isVideoMediaLoaded=!1,w(this)),e.has("liveConfig")&&(z(this,this.liveConfig?.layout),this.liveConfig?.show_image_during_load&&this._importPromises.push(import("./live-image-c8850fc4.js")),this.liveConfig?.zoomable&&this._importPromises.push(import("./zoomer-1857311a.js"))),e.has("cameraConfig")){const e=this._getResolvedProvider();"jsmpeg"===e?this._importPromises.push(import("./live-jsmpeg-9c767737.js")):"ha"===e?this._importPromises.push(import("./live-ha-df63bfc8.js")):"webrtc-card"===e?this._importPromises.push(import("./live-webrtc-card-dfc8f852.js")):"image"===e?this._importPromises.push(import("./live-image-c8850fc4.js")):"go2rtc"===e&&this._importPromises.push(import("./live-go2rtc-0795a62f.js"))}}async getUpdateComplete(){const e=await super.getUpdateComplete();return await Promise.all(this._importPromises),this._importPromises=[],e}_useZoomIfRequired(e){return this.liveConfig?.zoomable?l` <frigate-card-zoomer
          @frigate-card:zoom:zoomed=${()=>this.setControls(!1)}
          @frigate-card:zoom:unzoomed=${()=>this.setControls()}
        >
          ${e}
        </frigate-card-zoomer>`:e}render(){if(this.disabled||!this.hass||!this.liveConfig||!this.cameraConfig)return;this.title=this.label,this.ariaLabel=this.label;const e=this._getResolvedProvider(),i=!this._isVideoMediaLoaded&&this._shouldShowImageDuringLoading(),t={hidden:i};return this._useZoomIfRequired(l`
      ${i||"image"===e?l` <frigate-card-live-image
            ${b(this._refProvider)}
            .hass=${this.hass}
            .cameraConfig=${this.cameraConfig}
            @frigate-card:media:loaded=${i=>{"image"===e?this._videoMediaShowHandler():i.stopPropagation()}}
          >
          </frigate-card-live-image>`:l``}
      ${"ha"===e?l` <frigate-card-live-ha
            ${b(this._refProvider)}
            class=${P(t)}
            .hass=${this.hass}
            .cameraConfig=${this.cameraConfig}
            ?controls=${this.liveConfig.controls.builtin}
            @frigate-card:media:loaded=${this._videoMediaShowHandler.bind(this)}
          >
          </frigate-card-live-ha>`:"go2rtc"===e?l`<frigate-card-live-go2rtc
              ${b(this._refProvider)}
              class=${P(t)}
              .hass=${this.hass}
              .cameraConfig=${this.cameraConfig}
              .cameraEndpoints=${this.cameraEndpoints}
              .microphoneStream=${this.microphoneStream}
              .microphoneConfig=${this.liveConfig.microphone}
              ?controls=${this.liveConfig.controls.builtin}
              @frigate-card:media:loaded=${this._videoMediaShowHandler.bind(this)}
            >
            </frigate-card-live-webrtc-card>`:"webrtc-card"===e?l`<frigate-card-live-webrtc-card
            ${b(this._refProvider)}
            class=${P(t)}
            .hass=${this.hass}
            .cameraConfig=${this.cameraConfig}
            .cameraEndpoints=${this.cameraEndpoints}
            .cardWideConfig=${this.cardWideConfig}
            ?controls=${this.liveConfig.controls.builtin}
            @frigate-card:media:loaded=${this._videoMediaShowHandler.bind(this)}
          >
          </frigate-card-live-webrtc-card>`:"jsmpeg"===e?l` <frigate-card-live-jsmpeg
            ${b(this._refProvider)}
            class=${P(t)}
            .hass=${this.hass}
            .cameraConfig=${this.cameraConfig}
            .cameraEndpoints=${this.cameraEndpoints}
            .cardWideConfig=${this.cardWideConfig}
            @frigate-card:media:loaded=${this._videoMediaShowHandler.bind(this)}
          >
          </frigate-card-live-jsmpeg>`:l``}
    `)}static get styles(){return h(":host {\n  display: block;\n  height: 100%;\n  width: 100;\n}\n\n.hidden {\n  display: none;\n}")}};c([g({attribute:!1})],B.prototype,"hass",void 0),c([g({attribute:!1})],B.prototype,"cameraConfig",void 0),c([g({attribute:!1})],B.prototype,"cameraEndpoints",void 0),c([g({attribute:!1})],B.prototype,"liveConfig",void 0),c([g({attribute:!0,type:Boolean})],B.prototype,"disabled",void 0),c([g({attribute:!1})],B.prototype,"label",void 0),c([g({attribute:!1})],B.prototype,"cardWideConfig",void 0),c([g({attribute:!1})],B.prototype,"microphoneStream",void 0),c([m()],B.prototype,"_isVideoMediaLoaded",void 0),B=c([v(R)],B);export{V as FrigateCardLive,j as FrigateCardLiveCarousel,B as FrigateCardLiveProvider,O as getStateObjOrDispatchError};
