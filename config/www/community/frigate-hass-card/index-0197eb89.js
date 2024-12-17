import{_ as e,n as i,b as t,t as a,a as r,cR as s,dm as o,dn as n,da as d,dp as l,dq as g,dr as h,ds as c,dt as u,du as m,dv as v,db as p,cT as C,x as w,c_ as f,dl as I,cV as M,dw as y,dx as _,dy as b,dz as A,r as D,cW as x,cI as k,dA as j,s as $,dB as T,l as z,c$ as N,d1 as L,d2 as E,cU as P}from"./card-c642ee74.js";import"./ha-hls-player-abb86874.js";import{p as Z,h as V,s as G,u as S,i as W,c as F,M as O,A as R,a as U,b as Y}from"./media-6eadcd60.js";import{m as B}from"./audio-cf3a75aa.js";import{V as Q}from"./media-c9012082.js";let q=class extends r{constructor(){super(...arguments),this.load=!1,this._refFrigateCardMediaPlayer=s(),this._refVideoProvider=s(),this._refImageProvider=s(),this._url=null}async play(){await Z(this,this._refFrigateCardMediaPlayer.value??this._refVideoProvider.value)}async pause(){(this._refFrigateCardMediaPlayer.value||this._refVideoProvider.value)?.pause()}async mute(){this._refFrigateCardMediaPlayer.value?this._refFrigateCardMediaPlayer.value?.mute():this._refVideoProvider.value&&(this._refVideoProvider.value.muted=!0)}async unmute(){this._refFrigateCardMediaPlayer.value?this._refFrigateCardMediaPlayer.value?.mute():this._refVideoProvider.value&&(this._refVideoProvider.value.muted=!1)}isMuted(){return this._refFrigateCardMediaPlayer.value?this._refFrigateCardMediaPlayer.value?.isMuted()??!0:!this._refVideoProvider.value||this._refVideoProvider.value.muted}async seek(e){if(this._refFrigateCardMediaPlayer.value)return this._refFrigateCardMediaPlayer.value.seek(e);this._refVideoProvider.value&&(V(this._refVideoProvider.value),this._refVideoProvider.value.currentTime=e)}async setControls(e){if(this._refFrigateCardMediaPlayer.value)return this._refFrigateCardMediaPlayer.value.setControls(e);this._refVideoProvider.value&&G(this._refVideoProvider.value,e??this.viewerConfig?.controls.builtin??!0)}isPaused(){return this._refFrigateCardMediaPlayer.value?this._refFrigateCardMediaPlayer.value.isPaused():!this._refVideoProvider.value||this._refVideoProvider.value.paused}async getScreenshotURL(){return this._refFrigateCardMediaPlayer.value?await this._refFrigateCardMediaPlayer.value.getScreenshotURL():this._refVideoProvider.value?o(this._refVideoProvider.value):this._refImageProvider.value?this._refImageProvider.value.src:null}async _switchToRelatedClipView(){const e=this.viewManagerEpoch?.manager.getView();if(!(this.hass&&e&&this.cameraManager&&this.media&&n.isEvent(this.media)&&d.areEventQueries(e.query)))return;const i=e.query.clone();i.convertToClipsQueries();i.getQueries()&&await(this.viewManagerEpoch?.manager.setViewByParametersWithExistingQuery({params:{view:"media",query:i},queryExecutorOptions:{selectResult:{id:this.media.getID()??void 0},rejectResults:e=>!e.hasSelectedResult()}}))}async _setURL(){const e=this.media?.getContentID();if(!this.media||!e||!this.hass||this.viewerConfig?.lazy_load&&!this.load)return;let i=this.resolvedMediaCache?.get(e)??null;if(i||(i=await l(this.hass,e,this.resolvedMediaCache)),!i)return;const t=i.url;if(g(t))return void(this._url=h(this.hass,t));const a=this.cameraManager?.getStore().getCamera(this.media.getCameraID()),r=a?.getProxyConfig();if(r&&c(this.hass,r,"media")){if(r.dynamic){const e=t.split(/#/)[0];await u(this.hass,e,{sslVerification:r.ssl_verification,sslCiphers:r.ssl_ciphers,openLimit:0})}try{this._url=await m(this.hass,v(t))}catch(e){p(e)}}else this._url=t}willUpdate(e){if((e.has("load")||e.has("media")||e.has("viewerConfig")||e.has("resolvedMediaCache")||e.has("hass"))&&this._setURL().then((()=>{this.requestUpdate()})),e.has("viewerConfig")&&this.viewerConfig?.zoomable&&import("./zoomer-725f087c.js"),e.has("media")||e.has("cameraManager")){const e=this.media?.getCameraID(),i=e?this.cameraManager?.getStore().getCameraConfig(e):null;S(this,i?.dimensions?.layout),this.style.aspectRatio=C({ratio:i?.dimensions?.aspect_ratio})}}_useZoomIfRequired(e){if(!this.media)return e;const i=this.media.getCameraID(),t=this.media.getID()??void 0,a=this.cameraManager?.getStore().getCameraConfig(i),r=this.viewManagerEpoch?.manager.getView();return this.viewerConfig?.zoomable?w` <frigate-card-zoomer
          .defaultSettings=${W([a?.dimensions?.layout],(()=>a?.dimensions?.layout?{pan:a.dimensions.layout.pan,zoom:a.dimensions.layout.zoom}:void 0))}
          .settings=${t?r?.context?.zoom?.[t]?.requested:void 0}
          @frigate-card:zoom:zoomed=${()=>this.setControls(!1)}
          @frigate-card:zoom:unzoomed=${()=>this.setControls()}
          @frigate-card:zoom:change=${e=>f(e,this.viewManagerEpoch?.manager,t)}
        >
          ${e}
        </frigate-card-zoomer>`:e}render(){if(this.load&&this.media&&this.hass&&this.viewerConfig)return this._url?this._useZoomIfRequired(w`
      ${n.isVideo(this.media)?this.media.getVideoContentType()===Q.HLS?w`<frigate-card-ha-hls-player
              ${M(this._refFrigateCardMediaPlayer)}
              allow-exoplayer
              aria-label="${this.media.getTitle()??""}"
              ?autoplay=${!1}
              controls
              muted
              playsinline
              title="${this.media.getTitle()??""}"
              url=${this._url}
              .hass=${this.hass}
              ?controls=${this.viewerConfig.controls.builtin}
            >
            </frigate-card-ha-hls-player>`:w`
              <video
                ${M(this._refVideoProvider)}
                aria-label="${this.media.getTitle()??""}"
                title="${this.media.getTitle()??""}"
                muted
                playsinline
                crossorigin="anonymous"
                ?autoplay=${!1}
                ?controls=${this.viewerConfig.controls.builtin}
                @loadedmetadata=${e=>{e.target&&this.viewerConfig?.controls.builtin&&V(e.target,F)}}
                @loadeddata=${e=>{y(this,e,{player:this,capabilities:{supportsPause:!0,hasAudio:B(e.target)},technology:["hls"]})}}
                @volumechange=${()=>_(this)}
                @play=${()=>b(this)}
                @pause=${()=>A(this)}
              >
                <source src=${this._url} type="video/mp4" />
              </video>
            `:w`<img
            ${M(this._refImageProvider)}
            aria-label="${this.media.getTitle()??""}"
            src="${this._url}"
            title="${this.media.getTitle()??""}"
            @click=${()=>{this.viewerConfig?.snapshot_click_plays_clip&&this._switchToRelatedClipView()}}
            @load=${e=>{y(this,e,{player:this,technology:["jpg"]})}}
          />`}
    `):I({cardWideConfig:this.cardWideConfig})}static get styles(){return D(':host {\n  background-color: var(--primary-background-color);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKGIwYTg0ODY1NDEsIDIwMjItMTItMDEpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJjYW1lcmEtaXJpcy5zdmciCiAgIGlkPSJzdmc0IgogICB2ZXJzaW9uPSIxLjEiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzOCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9Im5hbWVkdmlldzYiCiAgICAgcGFnZWNvbG9yPSIjYjkzZTNlIgogICAgIGJvcmRlcmNvbG9yPSIjMDAwMDAwIgogICAgIGJvcmRlcm9wYWNpdHk9IjAuMjUiCiAgICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuNjA3ODQzMTQiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6ZGVza2NvbG9yPSIjZDFkMWQxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSIyNi42MjUwNiIKICAgICBpbmtzY2FwZTpjeD0iLTEuOTM0MjY4IgogICAgIGlua3NjYXBlOmN5PSIxNS42ODA3MTYiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIzODQwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjE1MjciCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjEwODAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIyNyIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQiIC8+CiAgPGcKICAgICBpZD0iZzExMTkiCiAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eTowLjA1O2ZpbGw6I2ZmZmZmZiI+CiAgICA8Y2lyY2xlCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eTowLjA1O3N0cm9rZS13aWR0aDoxLjM5NzI5IgogICAgICAgaWQ9InBhdGgxNzAiCiAgICAgICBjeD0iMTIiCiAgICAgICBjeT0iMTIiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iV2hpdGUgQmFja2dyb3VuZCIKICAgICAgIHI9IjExLjI1IiAvPgogICAgPHBhdGgKICAgICAgIGQ9Ik0gMTMuNzMwMDAxLDE1IDkuODMwMDAwMywyMS43NiBDIDEwLjUzLDIxLjkxIDExLjI1LDIyIDEyLDIyIGMgMi40MDAwMDEsMCA0LjYsLTAuODUgNi4zMiwtMi4yNSBMIDE0LjY2MDAwMSwxMy40IE0gMi40NjAwMDAzLDE1IGMgMC45MiwyLjkyIDMuMTUsNS4yNiA1Ljk5LDYuMzQgTCAxMi4xMiwxNSBtIC0zLjU3OTk5OTcsLTMgLTMuOSwtNi43NDk5OTk2IGMgLTEuNjQsMS43NDk5OTkgLTIuNjQsNC4xMzk5OTkzIC0yLjY0LDYuNzQ5OTk5NiAwLDAuNjggMC4wNywxLjM1IDAuMiwyIGggNy40OSBNIDIxLjgsOS45OTk5OTk3IEggMTQuMzEwMDAxIEwgMTQuNjAwMDAxLDEwLjUgMTkuMzYsMTguNzUgQyAyMSwxNi45NyAyMiwxNC42IDIyLDEyIDIyLDExLjMxIDIxLjkzLDEwLjY0IDIxLjgsOS45OTk5OTk3IG0gLTAuMjYsLTEgQyAyMC42Miw2LjA3MDAwMDUgMTguMzksMy43NDAwMDAyIDE1LjU1MDAwMSwyLjY2MDAwMDIgTCAxMS44OCw4Ljk5OTk5OTcgTSA5LjQwMDAwMDMsMTAuNSAxNC4xNzAwMDEsMi4yNDAwMDAyIGMgLTAuNywtMC4xNSAtMS40MjAwMDEsLTAuMjQgLTIuMTcwMDAxLC0wLjI0IC0yLjM5OTk5OTcsMCAtNC41OTk5OTk3LDAuODQgLTYuMzE5OTk5NywyLjI1MDAwMDMgbCAzLjY2LDYuMzQ5OTk5NSB6IgogICAgICAgaWQ9InBhdGgyIgogICAgICAgaW5rc2NhcGU6bGFiZWw9IklyaXMiCiAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjAuMDU7ZmlsbDojZmZmZmZmIiAvPgogIDwvZz4KPC9zdmc+Cg==");\n  background-size: 10%;\n  background-position: center;\n}\n\n:host {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\nimg,\nvideo,\nfrigate-card-ha-hls-player {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: var(--frigate-card-media-layout-fit, contain);\n  object-position: var(--frigate-card-media-layout-position-x, 50%) var(--frigate-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--frigate-card-media-layout-view-box-top, 0%) var(--frigate-card-media-layout-view-box-right, 0%) var(--frigate-card-media-layout-view-box-bottom, 0%) var(--frigate-card-media-layout-view-box-left, 0%));\n}\n\nfrigate-card-progress-indicator {\n  padding: 30px;\n  box-sizing: border-box;\n}')}};e([i({attribute:!1})],q.prototype,"hass",void 0),e([i({attribute:!1})],q.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],q.prototype,"media",void 0),e([i({attribute:!1})],q.prototype,"viewerConfig",void 0),e([i({attribute:!1})],q.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],q.prototype,"load",void 0),e([i({attribute:!1})],q.prototype,"cameraManager",void 0),e([i({attribute:!1})],q.prototype,"cardWideConfig",void 0),e([t()],q.prototype,"_url",void 0),q=e([a("frigate-card-viewer-provider")],q);let H=class extends r{constructor(){super(...arguments),this.showControls=!0,this._selected=0,this._media=null,this._mediaActionsController=new O,this._player=null,this._refCarousel=s()}updated(e){super.updated(e),e.has("viewManagerEpoch")&&this.viewManagerEpoch?.manager.getView()?.context?.mediaViewer!==this.viewManagerEpoch?.oldView?.context?.mediaViewer&&this._seekHandler(),!this._mediaActionsController.hasRoot()&&this._refCarousel.value&&this._mediaActionsController.initialize(this._refCarousel.value)}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){this._mediaActionsController.destroy(),super.disconnectedCallback()}_getTransitionEffect(){return this.viewerConfig?.transition_effect??k.media_viewer.transition_effect}_getPlugins(){return[R({...this.viewerConfig?.lazy_load&&{lazyLoadCallback:(e,i)=>this._lazyloadSlide(i)}}),U(),Y()]}_getMediaNeighbors(){const e=this._media?.length??0;if(!this._media)return null;const i=this._selected>0?this._selected-1:null,t=this._selected+1<e?this._selected+1:null;return{...null!==i&&{previous:{index:i,media:this._media[i]}},...null!==t&&{next:{index:t,media:this._media[t]}}}}_setViewSelectedIndex(e){const i=this.viewManagerEpoch?.manager.getView();if(!this._media||!i)return;if(this._selected===e)return;const t=i?.queryResults?.clone().selectIndex(e,this.viewFilterCameraID);if(!t)return;const a=t.getSelectedResult(this.viewFilterCameraID)?.getCameraID();this.viewManagerEpoch?.manager.setViewByParameters({params:{queryResults:t,...a&&{camera:a}},modifiers:[new j("mediaViewer","seek")]})}_lazyloadSlide(e){e instanceof HTMLSlotElement&&(e=e.assignedElements({flatten:!0})[0]);const i=e?.querySelector("frigate-card-viewer-provider");i&&(i.load=!0)}_getSlides(){if(!this._media)return[];const e=[];for(let i=0;i<this._media.length;++i){const t=this._media[i];if(t){const a=this._renderMediaItem(t);a&&(e[i]=a)}}return e}willUpdate(e){if(e.has("viewerConfig")&&this._mediaActionsController.setOptions({playerSelector:"frigate-card-viewer-provider",...this.viewerConfig?.auto_play&&{autoPlayConditions:this.viewerConfig.auto_play},...this.viewerConfig?.auto_pause&&{autoPauseConditions:this.viewerConfig.auto_pause},...this.viewerConfig?.auto_mute&&{autoMuteConditions:this.viewerConfig.auto_mute},...this.viewerConfig?.auto_unmute&&{autoUnmuteConditions:this.viewerConfig.auto_unmute}}),e.has("viewManagerEpoch")){const e=this.viewManagerEpoch?.manager.getView(),i=e?.queryResults?.getResults(this.viewFilterCameraID)??null,t=e?.queryResults?.getSelectedIndex(this.viewFilterCameraID)??0,a=e?.context?.mediaViewer?.seek;i===this._media&&t===this._selected&&a||($(this,!1,"unseekable"),this._media=i,this._selected=t),i?.length?this.viewFilterCameraID?this._mediaActionsController.setTarget(t,e?.camera===this.viewFilterCameraID):this._mediaActionsController.setTarget(t,!0):this._mediaActionsController.unsetTarget()}}render(){const e=this._media?.length??0;if(!this._media||!e)return T(this,z("common.no_media"),"info",{icon:"mdi:multimedia"});const i=this._media[this._selected]??this._media[e-1];if(!this.hass||!this.cameraManager||!i)return;const t=this._getMediaNeighbors(),a=e=>{if(!t||!this._media)return;const i=("previous"===e?t.previous?.index:t.next?.index)??null;null!==i&&this._setViewSelectedIndex(i)},r=this.viewManagerEpoch?.manager.getView();return w`
      <frigate-card-carousel
        ${M(this._refCarousel)}
        .dragEnabled=${this.viewerConfig?.draggable??!0}
        .plugins=${W([this.viewerConfig,this._media],this._getPlugins.bind(this))}
        .selected=${this._selected}
        transitionEffect=${this._getTransitionEffect()}
        @frigate-card:carousel:select=${e=>{this._setViewSelectedIndex(e.detail.index)}}
        @frigate-card:media:loaded=${e=>{this._player=e.detail.player??null,this._seekHandler()}}
        @frigate-card:media:unloaded=${()=>{this._player=null}}
      >
        ${this.showControls?w` <frigate-card-next-previous-control
              slot="previous"
              .hass=${this.hass}
              .direction=${"previous"}
              .controlConfig=${this.viewerConfig?.controls.next_previous}
              .thumbnail=${t?.previous?.media.getThumbnail()??void 0}
              .label=${t?.previous?.media.getTitle()??""}
              ?disabled=${!t?.previous}
              @click=${e=>{a("previous"),N(e)}}
            ></frigate-card-next-previous-control>`:""}
        ${W([this._media,r],(()=>this._getSlides()))}
        ${this.showControls?w` <frigate-card-next-previous-control
              slot="next"
              .hass=${this.hass}
              .direction=${"next"}
              .controlConfig=${this.viewerConfig?.controls.next_previous}
              .thumbnail=${t?.next?.media.getThumbnail()??void 0}
              .label=${t?.next?.media.getTitle()??""}
              ?disabled=${!t?.next}
              @click=${e=>{a("next"),N(e)}}
            ></frigate-card-next-previous-control>`:""}
      </frigate-card-carousel>
      ${r?w` <frigate-card-ptz
            .config=${this.viewerConfig?.controls.ptz}
            .forceVisibility=${r?.context?.ptzControls?.enabled}
          >
          </frigate-card-ptz>`:""}
      <div class="seek-warning">
        <ha-icon title="${z("media_viewer.unseekable")}" icon="mdi:clock-remove">
        </ha-icon>
      </div>
    `}async _seekHandler(){const e=this.viewManagerEpoch?.manager.getView(),i=e?.context?.mediaViewer?.seek;if(!(this.hass&&i&&this._media&&this._player))return;const t=this._media[this._selected];if(!t)return;const a=t.includesTime(i);$(this,!a,"unseekable"),a||this._player.isPaused()?a&&this._player.isPaused()&&this._player.play():this._player.pause();const r=await(this.cameraManager?.getMediaSeekTime(t,i))??null;null!==r&&this._player.seek(r)}_renderMediaItem(e){const i=this.viewManagerEpoch?.manager.getView();return this.hass&&i&&this.viewerConfig?w` <div class="embla__slide">
      <frigate-card-viewer-provider
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .media=${e}
        .viewerConfig=${this.viewerConfig}
        .resolvedMediaCache=${this.resolvedMediaCache}
        .cameraManager=${this.cameraManager}
        .load=${!this.viewerConfig.lazy_load}
        .cardWideConfig=${this.cardWideConfig}
      ></frigate-card-viewer-provider>
    </div>`:null}static get styles(){return D(":host {\n  position: relative;\n  --video-max-height: none;\n}\n\n:host([unselected]) frigate-card-carousel,\n:host([unselected]) .seek-warning {\n  pointer-events: none;\n}\n\n:host([unseekable]) frigate-card-carousel {\n  filter: brightness(50%);\n}\n\n:host([unseekable]) .seek-warning {\n  display: block;\n}\n\n.seek-warning {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  color: white;\n}\n\n.embla__slide {\n  height: 100%;\n  flex: 0 0 100%;\n}")}};e([i({attribute:!1})],H.prototype,"hass",void 0),e([i({attribute:!1})],H.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],H.prototype,"viewFilterCameraID",void 0),e([i({attribute:!1,hasChanged:x})],H.prototype,"viewerConfig",void 0),e([i({attribute:!1})],H.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],H.prototype,"cardWideConfig",void 0),e([i({attribute:!1})],H.prototype,"cameraManager",void 0),e([i({attribute:!1})],H.prototype,"showControls",void 0),e([t()],H.prototype,"_selected",void 0),H=e([a("frigate-card-viewer-carousel")],H);let X=class extends r{_renderCarousel(e){const i=this.viewManagerEpoch?.manager.getView()?.camera;return w`
      <frigate-card-viewer-carousel
        grid-id=${L(e)}
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .viewFilterCameraID=${e}
        .viewerConfig=${this.viewerConfig}
        .resolvedMediaCache=${this.resolvedMediaCache}
        .cameraManager=${this.cameraManager}
        .cardWideConfig=${this.cardWideConfig}
        .showControls=${!e||i===e}
      >
      </frigate-card-viewer-carousel>
    `}willUpdate(e){e.has("viewManagerEpoch")&&this._needsGrid()&&import("./media-grid-3082f0ad.js")}_needsGrid(){const e=this.viewManagerEpoch?.manager.getView(),i=e?.queryResults?.getCameraIDs();return!!e?.isGrid()&&!!e?.supportsMultipleDisplayModes()&&(i?.size??0)>1}_gridSelectCamera(e){const i=this.viewManagerEpoch?.manager.getView();this.viewManagerEpoch?.manager.setViewByParameters({params:{camera:e,queryResults:i?.queryResults?.clone().promoteCameraSelectionToMainSelection(e)}})}render(){const e=this.viewManagerEpoch?.manager.getView(),i=e?.queryResults?.getCameraIDs();return i&&this._needsGrid()?w`
      <frigate-card-media-grid
        .selected=${e?.camera}
        .displayConfig=${this.viewerConfig?.display}
        @frigate-card:media-grid:selected=${e=>this._gridSelectCamera(e.detail.selected)}
      >
        ${[...i].map((e=>this._renderCarousel(e)))}
      </frigate-card-media-grid>
    `:this._renderCarousel()}static get styles(){return D(E)}};e([i({attribute:!1})],X.prototype,"hass",void 0),e([i({attribute:!1})],X.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],X.prototype,"viewerConfig",void 0),e([i({attribute:!1})],X.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],X.prototype,"cardWideConfig",void 0),e([i({attribute:!1})],X.prototype,"cameraManager",void 0),X=e([a("frigate-card-viewer-grid")],X);let J=class extends r{render(){if(this.hass&&this.viewManagerEpoch&&this.viewerConfig&&this.cameraManager&&this.cardWideConfig){if(!this.viewManagerEpoch.manager.getView()?.queryResults?.hasResults()){const e=!!this.viewManagerEpoch.manager.getView()?.context?.loading?.query;return P({type:"info",message:z(e?"error.awaiting_media":"common.no_media"),icon:"mdi:multimedia",dotdotdot:e})}return w` <frigate-card-viewer-grid
      .hass=${this.hass}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .viewerConfig=${this.viewerConfig}
      .resolvedMediaCache=${this.resolvedMediaCache}
      .cameraManager=${this.cameraManager}
      .cardWideConfig=${this.cardWideConfig}
    >
    </frigate-card-viewer-grid>`}}static get styles(){return D(":host {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\nfrigate-card-viewer-carousel {\n  flex: 1;\n  min-height: 0;\n}")}};e([i({attribute:!1})],J.prototype,"hass",void 0),e([i({attribute:!1})],J.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],J.prototype,"viewerConfig",void 0),e([i({attribute:!1})],J.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],J.prototype,"cameraManager",void 0),e([i({attribute:!1})],J.prototype,"cardWideConfig",void 0),J=e([a("frigate-card-viewer")],J);export{J as FrigateCardViewer};
