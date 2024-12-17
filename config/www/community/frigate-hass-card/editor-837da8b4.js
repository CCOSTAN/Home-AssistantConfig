import{i as e,s as a,_ as t,n as i,t as n,a as s,x as o,e as r,l,r as c,b as d,c as m,d as u,p as h,f as _,g,h as b,j as p,k as v,C as f,m as $,o as y,q as w,u as S,v as x,w as M,y as I,z as k,A as O,B as C,D as z,E as A,F as N,G as T,H as B,I as E,J as P,K as H,L,M as V,N as K,O as U,P as j,Q as q,R,S as D,T as F,U as G,V as J,W as Q,X as W,Y as X,Z as Y,$ as Z,a0 as ee,a1 as ae,a2 as te,a3 as ie,a4 as ne,a5 as se,a6 as oe,a7 as re,a8 as le,a9 as ce,aa as de,ab as me,ac as ue,ad as he,ae as _e,af as ge,ag as be,ah as pe,ai as ve,aj as fe,ak as $e,al as ye,am as we,an as Se,ao as xe,ap as Me,aq as Ie,ar as ke,as as Oe,at as Ce,au as ze,av as Ae,aw as Ne,ax as Te,ay as Be,az as Ee,aA as Pe,aB as He,aC as Le,aD as Ve,aE as Ke,aF as Ue,aG as je,aH as qe,aI as Re,aJ as De,aK as Fe,aL as Ge,aM as Je,aN as Qe,aO as We,aP as Xe,aQ as Ye,aR as Ze,aS as ea,aT as aa,aU as ta,aV as ia,aW as na,aX as sa,aY as oa,aZ as ra,a_ as la,a$ as ca,b0 as da,b1 as ma,b2 as ua,b3 as ha,b4 as _a,b5 as ga,b6 as ba,b7 as pa,b8 as va,b9 as fa,ba as $a,bb as ya,bc as wa,bd as Sa,be as xa,bf as Ma,bg as Ia,bh as ka,bi as Oa,bj as Ca,bk as za,bl as Aa,bm as Na,bn as Ta,bo as Ba,bp as Ea,bq as Pa,br as Ha,bs as La,bt as Va,bu as Ka,bv as Ua,bw as ja,bx as qa,by as Ra,bz as Da,bA as Fa,bB as Ga,bC as Ja,bD as Qa,bE as Wa,bF as Xa,bG as Ya,bH as Za,bI as et,bJ as at,bK as tt,bL as it,bM as nt,bN as st,bO as ot,bP as rt,bQ as lt,bR as ct,bS as dt,bT as mt,bU as ut,bV as ht,bW as _t,bX as gt,bY as bt,bZ as pt,b_ as vt,b$ as ft,c0 as $t,c1 as yt,c2 as wt,c3 as St,c4 as xt,c5 as Mt,c6 as It,c7 as kt,c8 as Ot,c9 as Ct,ca as zt,cb as At,cc as Nt,cd as Tt,ce as Bt,cf as Et,cg as Pt,ch as Ht,ci as Lt,cj as Vt,ck as Kt,cl as Ut,cm as jt,cn as qt,co as Rt,cp as Dt,cq as Ft,cr as Gt,cs as Jt,ct as Qt,cu as Wt,cv as Xt,cw as Yt,cx as Zt,cy as ei,cz as ai,cA as ti,cB as ii,cC as ni,cD as si,cE as oi,cF as ri,cG as li,cH as ci,cI as di,cJ as mi,cK as ui}from"./card-09c4bade.js";class hi{constructor(e){this._assigning=!1,this._value=null,this._blurEventHandler=()=>{this._setAssigning(!1)},this._keydownEventHandler=e=>{e.key&&!["Control","Alt","Shift","Meta"].includes(e.key)&&(this.setValue({key:e.key,ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey}),this._setAssigning(!1))},this._host=e,this._host.addController(this)}setValue(a){e(a,this._value)||(this._value=a,this._host.requestUpdate(),this._host.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this._value}})))}getValue(){return this._value}hasValue(){return!!this._value}isAssigning(){return this._assigning}toggleAssigning(){this._setAssigning(!this._assigning)}_setAssigning(e){this._assigning=e,a(this._host,this._assigning,"assigning"),this._assigning?this._host.addEventListener("keydown",this._keydownEventHandler):this._host.removeEventListener("keydown",this._keydownEventHandler),this._host.requestUpdate()}hostConnected(){this._host.addEventListener("blur",this._blurEventHandler)}hostDisconnected(){this._host.removeEventListener("blur",this._blurEventHandler)}}let _i=class extends s{constructor(){super(...arguments),this._controller=new hi(this)}willUpdate(e){e.has("value")&&this._controller.setValue(this.value??null)}render(){if(!this.label)return;const e=e=>o`<div class="key">
        <div class="key-inner">${e}</div>
      </div>`;return o`
      <div class="label">${this.label}</div>
      <ha-button
        class="assign"
        @click=${()=>{this._controller.toggleAssigning()}}
      >
        <ha-icon icon="mdi:keyboard-settings"></ha-icon>
        <span class="${r({dotdotdot:this._controller.isAssigning()})}">
          ${this._controller.isAssigning()?l("key_assigner.assigning"):l("key_assigner.assign")}
        </span>
      </ha-button>
      ${this._controller.hasValue()?o`<ha-button
              @click=${()=>{this._controller.setValue(null)}}
            >
              <ha-icon icon="mdi:keyboard-off"></ha-icon>
              <span> ${l("key_assigner.unassign")} </span>
            </ha-button>`:""}
      <div class="key-row">
        ${this.value?.ctrl?e(l("key_assigner.modifiers.ctrl")):""}
        ${this.value?.shift?e(l("key_assigner.modifiers.shift")):""}
        ${this.value?.meta?e(l("key_assigner.modifiers.meta")):""}
        ${this.value?.alt?e(l("key_assigner.modifiers.alt")):""}
        ${this.value?.key?e(this.value.key):""}
      </div>
      </span>`}static get styles(){return c('.dotdotdot:after {\n  animation: dots 2s linear infinite;\n  content: "";\n  display: inline-block;\n  width: 3em;\n}\n@keyframes dots {\n  0%, 20% {\n    content: ".";\n  }\n  40% {\n    content: "..";\n  }\n  60% {\n    content: "...";\n  }\n  90%, 100% {\n    content: "";\n  }\n}\n\n:host {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 10px;\n  height: 56px;\n  border: 1px solid var(--divider-color);\n}\n\n:host([assigning]) ha-button.assign span,\n:host([assigning]) ha-button.assign ha-icon {\n  color: var(--warning-color);\n}\n\nha-icon {\n  padding: 10px;\n}\n\ndiv.label {\n  width: 100px;\n  margin-left: 4px;\n}\n\ndiv.key-row {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\ndiv.key {\n  display: flex;\n  align-items: center;\n  height: 90%;\n  width: min-content;\n  margin-left: 5px;\n  margin-right: 5px;\n}\n\ndiv.key-inner {\n  height: 100%;\n  width: 100%;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 4px;\n  padding-right: 4px;\n  border: 2px;\n  border-radius: 4px;\n  border-style: outset;\n  border-color: var(--divider-color);\n  font-family: monospace;\n  text-transform: capitalize;\n}\n\ndiv.unassigned {\n  font-style: italic;\n}\n\ndiv.key + div.key:before {\n  display: flex;\n  align-items: center;\n  margin-right: 5px;\n  content: " + ";\n}')}};t([i({attribute:!1})],_i.prototype,"label",void 0),t([i({attribute:!1})],_i.prototype,"value",void 0),_i=t([n("frigate-card-key-assigner")],_i);const gi="cameras",bi="options",pi={cameras:{icon:"video",name:l("editor.cameras"),secondary:l("editor.cameras_secondary")},view:{icon:"eye",name:l("editor.view"),secondary:l("editor.view_secondary")},menu:{icon:"menu",name:l("editor.menu"),secondary:l("editor.menu_secondary")},status_bar:{icon:"sign-text",name:l("editor.status_bar"),secondary:l("editor.status_bar_secondary")},live:{icon:"cctv",name:l("editor.live"),secondary:l("editor.live_secondary")},media_gallery:{icon:"grid",name:l("editor.media_gallery"),secondary:l("editor.media_gallery_secondary")},media_viewer:{icon:"filmstrip",name:l("editor.media_viewer"),secondary:l("editor.media_viewer_secondary")},image:{icon:"image",name:l("editor.image"),secondary:l("editor.image_secondary")},timeline:{icon:"chart-gantt",name:l("editor.timeline"),secondary:l("editor.timeline_secondary")},dimensions:{icon:"aspect-ratio",name:l("editor.dimensions"),secondary:l("editor.dimensions_secondary")},performance:{icon:"speedometer",name:l("editor.performance"),secondary:l("editor.performance_secondary")},profiles:{icon:"folder-wrench-outline",name:l("editor.profiles"),secondary:l("editor.profiles_secondary")},overrides:{icon:"file-replace",name:l("editor.overrides"),secondary:l("editor.overrides_secondary")}};let vi=class extends s{constructor(){super(...arguments),this._defaults=m(di),this._initialized=!1,this._configUpgradeable=!1,this._expandedMenus={},this._viewModes=[{value:"",label:""},{value:"live",label:l("config.view.views.live")},{value:"clips",label:l("config.view.views.clips")},{value:"snapshots",label:l("config.view.views.snapshots")},{value:"recordings",label:l("config.view.views.recordings")},{value:"clip",label:l("config.view.views.clip")},{value:"snapshot",label:l("config.view.views.snapshot")},{value:"recording",label:l("config.view.views.recording")},{value:"image",label:l("config.view.views.image")},{value:"timeline",label:l("config.view.views.timeline")}],this._cameraSelectViewModes=[...this._viewModes,{value:"current",label:l("config.view.views.current")}],this._filterModes=[{value:"",label:""},{value:"none",label:l("config.common.controls.filter.modes.none")},{value:"left",label:l("config.common.controls.filter.modes.left")},{value:"right",label:l("config.common.controls.filter.modes.right")}],this._menuStyles=[{value:"",label:""},{value:"none",label:l("config.menu.styles.none")},{value:"hidden",label:l("config.menu.styles.hidden")},{value:"overlay",label:l("config.menu.styles.overlay")},{value:"hover",label:l("config.menu.styles.hover")},{value:"hover-card",label:l("config.menu.styles.hover-card")},{value:"outside",label:l("config.menu.styles.outside")}],this._menuPositions=[{value:"",label:""},{value:"left",label:l("config.menu.positions.left")},{value:"right",label:l("config.menu.positions.right")},{value:"top",label:l("config.menu.positions.top")},{value:"bottom",label:l("config.menu.positions.bottom")}],this._menuAlignments=[{value:"",label:""},{value:"left",label:l("config.menu.alignments.left")},{value:"right",label:l("config.menu.alignments.right")},{value:"top",label:l("config.menu.alignments.top")},{value:"bottom",label:l("config.menu.alignments.bottom")}],this._nextPreviousControlStyles=[{value:"",label:""},{value:"chevrons",label:l("config.common.controls.next_previous.styles.chevrons")},{value:"icons",label:l("config.common.controls.next_previous.styles.icons")},{value:"none",label:l("config.common.controls.next_previous.styles.none")},{value:"thumbnails",label:l("config.common.controls.next_previous.styles.thumbnails")}],this._aspectRatioModes=[{value:"",label:""},{value:"dynamic",label:l("config.dimensions.aspect_ratio_modes.dynamic")},{value:"static",label:l("config.dimensions.aspect_ratio_modes.static")},{value:"unconstrained",label:l("config.dimensions.aspect_ratio_modes.unconstrained")}],this._thumbnailModes=[{value:"",label:""},{value:"none",label:l("config.common.controls.thumbnails.modes.none")},{value:"above",label:l("config.common.controls.thumbnails.modes.above")},{value:"below",label:l("config.common.controls.thumbnails.modes.below")},{value:"left",label:l("config.common.controls.thumbnails.modes.left")},{value:"right",label:l("config.common.controls.thumbnails.modes.right")}],this._thumbnailMediaTypes=[{value:"",label:""},{value:"events",label:l("config.common.controls.thumbnails.media_types.events")},{value:"recordings",label:l("config.common.controls.thumbnails.media_types.recordings")}],this._thumbnailEventsMediaTypes=[{value:"",label:""},{value:"clips",label:l("config.common.controls.thumbnails.events_media_types.clips")},{value:"snapshots",label:l("config.common.controls.thumbnails.events_media_types.snapshots")}],this._transitionEffects=[{value:"",label:""},{value:"none",label:l("config.media_viewer.transition_effects.none")},{value:"slide",label:l("config.media_viewer.transition_effects.slide")}],this._imageModes=[{value:"",label:""},{value:"camera",label:l("config.common.image.modes.camera")},{value:"entity",label:l("config.common.image.modes.entity")},{value:"screensaver",label:l("config.common.image.modes.screensaver")},{value:"url",label:l("config.common.image.modes.url")}],this._timelineEventsMediaTypes=[{value:"",label:""},{value:"all",label:l("config.common.timeline.events_media_types.all")},{value:"clips",label:l("config.common.timeline.events_media_types.clips")},{value:"snapshots",label:l("config.common.timeline.events_media_types.snapshots")}],this._timelineStyleTypes=[{value:"",label:""},{value:"ribbon",label:l("config.common.timeline.styles.ribbon")},{value:"stack",label:l("config.common.timeline.styles.stack")}],this._darkModes=[{value:"",label:""},{value:"on",label:l("config.view.dark_modes.on")},{value:"off",label:l("config.view.dark_modes.off")},{value:"auto",label:l("config.view.dark_modes.auto")}],this._mediaActionNegativeConditions=[{value:"",label:""},{value:"unselected",label:l("config.common.media_action_conditions.unselected")},{value:"hidden",label:l("config.common.media_action_conditions.hidden")}],this._mediaActionPositiveConditions=[{value:"",label:""},{value:"selected",label:l("config.common.media_action_conditions.selected")},{value:"visible",label:l("config.common.media_action_conditions.visible")}],this._mediaLiveUnmuteConditions=[...this._mediaActionPositiveConditions,{value:"microphone",label:l("config.common.media_action_conditions.microphone_unmute")}],this._mediaLiveMuteConditions=[...this._mediaActionNegativeConditions,{value:"microphone",label:l("config.common.media_action_conditions.microphone_mute")}],this._layoutFits=[{value:"",label:""},{value:"contain",label:l("config.cameras.dimensions.layout.fits.contain")},{value:"cover",label:l("config.cameras.dimensions.layout.fits.cover")},{value:"fill",label:l("config.cameras.dimensions.layout.fits.fill")}],this._miniTimelineModes=[{value:"",label:""},{value:"none",label:l("config.common.controls.timeline.modes.none")},{value:"above",label:l("config.common.controls.timeline.modes.above")},{value:"below",label:l("config.common.controls.timeline.modes.below")}],this._profiles=[{value:"",label:""},{value:"casting",label:l("config.profiles.casting")},{value:"low-performance",label:l("config.profiles.low-performance")},{value:"scrubbing",label:l("config.profiles.scrubbing")}],this._go2rtcModes=[{value:"",label:""},{value:"mse",label:l("config.cameras.go2rtc.modes.mse")},{value:"webrtc",label:l("config.cameras.go2rtc.modes.webrtc")},{value:"mp4",label:l("config.cameras.go2rtc.modes.mp4")},{value:"mjpeg",label:l("config.cameras.go2rtc.modes.mjpeg")}],this._microphoneButtonTypes=[{value:"",label:""},{value:"momentary",label:l("config.menu.buttons.types.momentary")},{value:"toggle",label:l("config.menu.buttons.types.toggle")}],this._displayModes=[{value:"",label:""},{value:"single",label:l("display_modes.single")},{value:"grid",label:l("display_modes.grid")}],this._castMethods=[{value:"",label:""},{value:"standard",label:l("config.cameras.cast.methods.standard")},{value:"dashboard",label:l("config.cameras.cast.methods.dashboard")}],this._ptzModes=[{value:"",label:""},{value:"on",label:l("config.live.controls.ptz.modes.on")},{value:"off",label:l("config.live.controls.ptz.modes.off")}],this._ptzOrientations=[{value:"",label:""},{value:"vertical",label:l("config.live.controls.ptz.orientations.vertical")},{value:"horizontal",label:l("config.live.controls.ptz.orientations.horizontal")}],this._ptzPositions=[{value:"",label:""},{value:"top-left",label:l("config.live.controls.ptz.positions.top-left")},{value:"top-right",label:l("config.live.controls.ptz.positions.top-right")},{value:"bottom-left",label:l("config.live.controls.ptz.positions.bottom-left")},{value:"bottom-right",label:l("config.live.controls.ptz.positions.bottom-right")}],this._triggersActionsInteractionModes=[{value:"",label:""},{value:"all",label:l("config.view.triggers.actions.interaction_modes.all")},{value:"inactive",label:l("config.view.triggers.actions.interaction_modes.inactive")},{value:"active",label:l("config.view.triggers.actions.interaction_modes.active")}],this._triggersActionsTrigger=[{value:"",label:""},{value:"default",label:l("config.view.triggers.actions.triggers.default")},{value:"live",label:l("config.view.triggers.actions.triggers.live")},{value:"media",label:l("config.view.triggers.actions.triggers.media")},{value:"none",label:l("config.view.triggers.actions.triggers.none")}],this._triggersActionsUntrigger=[{value:"",label:""},{value:"default",label:l("config.view.triggers.actions.untriggers.default")},{value:"none",label:l("config.view.triggers.actions.untriggers.none")}],this._triggersEvents=[{value:"",label:""},{value:"events",label:l("config.cameras.triggers.events.events")},{value:"clips",label:l("config.cameras.triggers.events.clips")},{value:"snapshots",label:l("config.cameras.triggers.events.snapshots")}],this._timelinePanModes=[{value:"",label:""},{value:"pan",label:l("config.common.controls.timeline.pan_modes.pan")},{value:"seek",label:l("config.common.controls.timeline.pan_modes.seek")},{value:"seek-in-media",label:l("config.common.controls.timeline.pan_modes.seek-in-media")},{value:"seek-in-camera",label:l("config.common.controls.timeline.pan_modes.seek-in-camera")}],this._capabilities=[{value:"",label:""},{value:"live",label:l("config.cameras.capabilities.capabilities.live")},{value:"substream",label:l("config.cameras.capabilities.capabilities.substream")},{value:"clips",label:l("config.cameras.capabilities.capabilities.clips")},{value:"recordings",label:l("config.cameras.capabilities.capabilities.recordings")},{value:"snapshots",label:l("config.cameras.capabilities.capabilities.snapshots")},{value:"favorite-events",label:l("config.cameras.capabilities.capabilities.favorite-events")},{value:"favorite-recordings",label:l("config.cameras.capabilities.capabilities.favorite-recordings")},{value:"seek",label:l("config.cameras.capabilities.capabilities.seek")},{value:"ptz",label:l("config.cameras.capabilities.capabilities.ptz")},{value:"menu",label:l("config.cameras.capabilities.capabilities.menu")}],this._defaultResetInteractionModes=[{value:"",label:""},{value:"all",label:l("config.view.default_reset.interaction_modes.all")},{value:"inactive",label:l("config.view.default_reset.interaction_modes.inactive")},{value:"active",label:l("config.view.default_reset.interaction_modes.active")}],this._proxyMedia=[{value:"",label:""},{value:"auto",label:l("config.cameras.proxy.media.auto")},{value:!0,label:l("config.cameras.proxy.media.true")},{value:!1,label:l("config.cameras.proxy.media.false")}],this._proxySSLCiphers=[{value:"",label:""},{value:"auto",label:l("config.cameras.proxy.ssl_ciphers.auto")},{value:"default",label:l("config.cameras.proxy.ssl_ciphers.default")},{value:"insecure",label:l("config.cameras.proxy.ssl_ciphers.insecure")},{value:"intermediate",label:l("config.cameras.proxy.ssl_ciphers.intermediate")},{value:"modern",label:l("config.cameras.proxy.ssl_ciphers.modern")}],this._proxySSLVerification=[{value:"",label:""},{value:"auto",label:l("config.cameras.proxy.ssl_verification.auto")},{value:!0,label:l("config.cameras.proxy.ssl_verification.true")},{value:!1,label:l("config.cameras.proxy.ssl_verification.false")}],this._reolinkMediaResolution=[{value:"",label:""},{value:"high",label:l("config.cameras.reolink.media_resolution.high")},{value:"low",label:l("config.cameras.reolink.media_resolution.low")}],this._statusBarStyles=[{value:"",label:""},{value:"hover",label:l("config.status_bar.styles.hover")},{value:"hover-card",label:l("config.status_bar.styles.hover-card")},{value:"none",label:l("config.status_bar.styles.none")},{value:"outside",label:l("config.status_bar.styles.outside")},{value:"overlay",label:l("config.status_bar.styles.overlay")},{value:"popup",label:l("config.status_bar.styles.popup")}],this._statusBarPositions=[{value:"",label:""},{value:"top",label:l("config.status_bar.positions.top")},{value:"bottom",label:l("config.status_bar.positions.bottom")}]}setConfig(e){this._config=e,this._configUpgradeable=u(e);const a=h.safeParse(this._config.profiles);if(a.success){const e=m(di);_(this._config,e,a.data),this._defaults=e}}willUpdate(){this._initialized||g().then((e=>{e&&(this._initialized=!0)}))}_renderOptionSetHeader(e,a){const t=pi[e];return o`
      <div
        class="option option-${e}"
        @click=${this._toggleMenu}
        .domain=${"options"}
        .key=${e}
      >
        <div class="row">
          <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
          <div class="title ${a??""}">${t.name}</div>
        </div>
        <div class="secondary">${t.secondary}</div>
      </div>
    `}_getLabel(e){const a=e.split(".").filter((e=>!e.match(/^\[[0-9]+\]$/))).join(".");return l(`config.${a}`)}_renderEntitySelector(e,a){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{entity:{domain:a}}}
        .label=${this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderOptionSelector(e,a=[],t){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{mode:"dropdown",multiple:!!t?.multiple,custom_value:!a.length,options:a}}}
        .label=${t?.label||this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderIconSelector(e,a){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{icon:{}}}
        .label=${a?.label||this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderNumberInput(e,a){if(!this._config)return;const t=b(this._config,e),i=void 0===a?.max?"box":"slider";return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{number:{min:a?.min||0,max:a?.max,mode:i,step:a?.step}}}
        .label=${a?.label||this._getLabel(e)}
        .value=${t??a?.default}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderInfo(e){return o` <span class="info">${e}</span>`}_getEditorCameraTitle(e,a){return"string"==typeof a?.title&&a.title||("string"==typeof a?.camera_entity?p(this.hass,a.camera_entity):"")||"object"==typeof a?.webrtc_card&&a.webrtc_card&&"string"==typeof a.webrtc_card.entity&&a.webrtc_card.entity||("object"==typeof a?.frigate&&a.frigate&&"string"==typeof a?.frigate.camera_name&&a.frigate.camera_name?v(a.frigate.camera_name):"")||"string"==typeof a?.id&&a.id||l("editor.camera")+" #"+e}_renderViewDefaultResetMenu(){return this._putInSubmenu("view.default_reset",!0,`config.${f}.editor_label`,"mdi:restart",o`
        ${this._renderSwitch($,this._defaults.view.default_reset.after_interaction)}
        ${this._renderNumberInput(y)}
        ${this._renderOptionSelector(w,this._defaultResetInteractionModes,{label:l("config.view.default_reset.interaction_mode")})},
        ${this._renderOptionSelector(S,this.hass?x(this.hass):[],{multiple:!0})}
      `)}_renderViewTriggersMenu(){return this._putInSubmenu("view.triggers",!0,`config.${M}.editor_label`,"mdi:target-account",o`
        ${this._renderSwitch(I,this._defaults.view.triggers.filter_selected_camera,{label:l(`config.${I}`)})}
        ${this._renderSwitch(k,this._defaults.view.triggers.show_trigger_status,{label:l(`config.${k}`)})}
        ${this._renderNumberInput(O,{default:this._defaults.view.triggers.untrigger_seconds})}
        ${this._putInSubmenu("view.triggers.actions",!0,`config.${C}.editor_label`,"mdi:cogs",o` ${this._renderOptionSelector(z,this._triggersActionsTrigger,{label:l("config.view.triggers.actions.trigger")})}
          ${this._renderOptionSelector(A,this._triggersActionsUntrigger,{label:l("config.view.triggers.actions.untrigger")})}
          ${this._renderOptionSelector(N,this._triggersActionsInteractionModes,{label:l("config.view.triggers.actions.interaction_mode")})}`)}
      `)}_renderKeyAssigner(e,a){return o` <frigate-card-key-assigner
      .label=${l(`config.${e}`)}
      .value=${this._config?b(this._config,e,a):null}
      @value-changed=${a=>this._valueChangedHandler(e,a)}
    ></frigate-card-key-assigner>`}_renderViewKeyboardShortcutMenu(){return this._putInSubmenu("view.keyboard_shortcuts",!0,`config.${T}.editor_label`,"mdi:keyboard",o`
        ${this._renderSwitch(B,this._defaults.view.keyboard_shortcuts.enabled,{label:l(`config.${B}`)})}
        ${this._renderKeyAssigner(E,this._defaults.view.keyboard_shortcuts.ptz_left)}
        ${this._renderKeyAssigner(P,this._defaults.view.keyboard_shortcuts.ptz_right)}
        ${this._renderKeyAssigner(H,this._defaults.view.keyboard_shortcuts.ptz_up)}
        ${this._renderKeyAssigner(L,this._defaults.view.keyboard_shortcuts.ptz_down)}
        ${this._renderKeyAssigner(V,this._defaults.view.keyboard_shortcuts.ptz_zoom_in)}
        ${this._renderKeyAssigner(K,this._defaults.view.keyboard_shortcuts.ptz_zoom_out)}
        ${this._renderKeyAssigner(U,this._defaults.view.keyboard_shortcuts.ptz_home)}
      `)}_renderStatusBarItem(e){return o` ${this._putInSubmenu("status_bar.items",e,`config.status_bar.items.${e}`,"mdi:feature-search",o`
        ${this._renderSwitch(`${j}.${e}.enabled`,this._defaults.status_bar.items[e]?.enabled??!0,{label:l("config.status_bar.items.enabled")})}
        ${this._renderNumberInput(`${j}.${e}.priority`,{max:q,default:this._defaults.status_bar.items[e]?.priority,label:l("config.status_bar.items.priority")})}
      `)}`}_renderMenuButton(e,a){const t=[{value:"",label:""},{value:"matching",label:l("config.menu.buttons.alignments.matching")},{value:"opposing",label:l("config.menu.buttons.alignments.opposing")}];return o` ${this._putInSubmenu("menu.buttons",e,`config.menu.buttons.${e}`,"mdi:gesture-tap-button",o`
        ${this._renderSwitch(`${R}.${e}.enabled`,this._defaults.menu.buttons[e]?.enabled??!0,{label:l("config.menu.buttons.enabled")})}
        ${this._renderOptionSelector(`${R}.${e}.alignment`,t,{label:l("config.menu.buttons.alignment")})}
        ${this._renderSwitch(`${R}.${e}.permanent`,this._defaults.menu.buttons[e]?.permanent??!1,{label:l("config.menu.buttons.permanent")})}
        ${this._renderNumberInput(`${R}.${e}.priority`,{max:D,default:this._defaults.menu.buttons[e]?.priority,label:l("config.menu.buttons.priority")})}
        ${this._renderIconSelector(`${R}.${e}.icon`,{label:l("config.menu.buttons.icon")})}
        ${a}
      `)}`}_putInSubmenu(e,a,t,i,n){const s=this._expandedMenus[e]===a,c={submenu:!0,selected:s},d=dt(i);return o` <div class="${r(c)}">
      <div
        class="submenu-header"
        @click=${this._toggleMenu}
        .domain=${e}
        .key=${a}
      >
        ${d?o` <img src=${d} /> `:o` <ha-icon .icon=${i}></ha-icon> `}
        <span>${l(t)}</span>
      </div>
      ${s?o`<div class="values">${n}</div>`:""}
    </div>`}_renderMediaLayout(e,a,t,i,n,s,r,c,d,m,u,h){return this._putInSubmenu(e,!0,a,"mdi:page-layout-body",o`
        ${this._renderNumberInput(m,{min:0,max:10,label:l("config.cameras.dimensions.layout.zoom"),step:.1})}
        ${this._renderNumberInput(u,{min:0,max:100,label:l("config.cameras.dimensions.layout.pan.x")})}
        ${this._renderNumberInput(h,{min:0,max:100,label:l("config.cameras.dimensions.layout.pan.y")})}
        ${this._renderOptionSelector(t,this._layoutFits,{label:l("config.cameras.dimensions.layout.fit")})}
        ${this._putInSubmenu(`${e}.position`,!0,"config.cameras.dimensions.layout.position.editor_label","mdi:aspect-ratio",o` ${this._renderNumberInput(i,{min:0,max:100,label:l("config.cameras.dimensions.layout.position.x")})}
          ${this._renderNumberInput(n,{min:0,max:100,label:l("config.cameras.dimensions.layout.position.y")})}`)}
        ${this._putInSubmenu(`${e}.view_box`,!0,"config.cameras.dimensions.layout.view_box.editor_label","mdi:crop",o`
            ${this._renderNumberInput(s,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.top")})}
            ${this._renderNumberInput(r,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.bottom")})}
            ${this._renderNumberInput(c,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.left")})}
            ${this._renderNumberInput(d,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.right")})}
          `)}
      `)}_renderTimelineCoreControls(e,a,t,i,n,s,r){return o`
      ${this._renderOptionSelector(e,this._timelineStyleTypes,{label:l(`config.common.${F}`)})}
      ${r?this._renderOptionSelector(r,this._timelinePanModes,{label:l("config.common.controls.timeline.pan_mode")}):""}
      ${this._renderNumberInput(a,{label:l(`config.common.${G}`)})}
      ${this._renderNumberInput(t,{label:l(`config.common.${J}`)})}
      ${this._renderOptionSelector(i,this._timelineEventsMediaTypes,{label:l(`config.common.${Q}`)})}
      ${this._renderSwitch(n,s,{label:l(`config.common.${W}`)})}
    `}_renderMiniTimeline(e,a,t,i,n,s,r,c,d){return this._putInSubmenu(e,!0,"config.common.controls.timeline.editor_label","mdi:chart-gantt",o` ${this._renderOptionSelector(a,this._miniTimelineModes,{label:l("config.common.controls.timeline.mode")})}
      ${this._renderTimelineCoreControls(t,i,n,s,r,c,d)}`)}_renderViewDisplay(e,a,t,i,n){return this._putInSubmenu(e,!0,"config.common.display.editor_label","mdi:palette-swatch",o`
        ${this._renderOptionSelector(a,this._displayModes,{label:l("config.common.display.mode")})}
        ${this._renderNumberInput(t,{min:0,label:l("config.common.display.grid_selected_width_factor")})}
        ${this._renderNumberInput(i,{min:0,label:l("config.common.display.grid_columns")})}
        ${this._renderNumberInput(n,{min:0,label:l("config.common.display.grid_max_columns")})}
      `)}_renderNextPreviousControls(e,a,t,i){return this._putInSubmenu(e,!0,"config.common.controls.next_previous.editor_label","mdi:arrow-right-bold-circle",o`
        ${this._renderOptionSelector(a,this._nextPreviousControlStyles.filter((e=>!(!i?.allowThumbnails&&"thumbnails"===e.value||!i?.allowIcons&&"icons"===e.value))),{label:l("config.common.controls.next_previous.style")})}
        ${this._renderNumberInput(t,{min:X,label:l("config.common.controls.next_previous.size")})}
      `)}_renderThumbnailsControls(e,a,t,i,n,s,r,c){return this._putInSubmenu(e,!0,"config.common.controls.thumbnails.editor_label","mdi:image-text",o`
        ${c?.configPathMode?o`${this._renderOptionSelector(c.configPathMode,this._thumbnailModes,{label:l("config.common.controls.thumbnails.mode")})}`:o``}
        ${c?.configPathMediaType?o`${this._renderOptionSelector(c.configPathMediaType,this._thumbnailMediaTypes,{label:l("config.common.controls.thumbnails.media_type")})}`:o``}
        ${c?.configPathEventsMediaType?o`${this._renderOptionSelector(c.configPathEventsMediaType,this._thumbnailEventsMediaTypes,{label:l("config.common.controls.thumbnails.events_media_type")})}`:o``}
        ${this._renderNumberInput(a,{min:Y,max:Z,label:l("config.common.controls.thumbnails.size")})}
        ${this._renderSwitch(t,r.show_details,{label:l("config.common.controls.thumbnails.show_details")})}
        ${this._renderSwitch(i,r.show_favorite_control,{label:l("config.common.controls.thumbnails.show_favorite_control")})}
        ${this._renderSwitch(n,r.show_timeline_control,{label:l("config.common.controls.thumbnails.show_timeline_control")})}
        ${this._renderSwitch(s,r.show_download_control,{label:l("config.common.controls.thumbnails.show_download_control")})}
      `)}_renderFilterControls(e,a){return this._putInSubmenu(e,!0,"config.common.controls.filter.editor_label","mdi:filter-cog",o`
        ${a?o`${this._renderOptionSelector(a,this._filterModes,{label:l("config.common.controls.filter.mode")})}`:o``}
      `)}_renderImageOptions(e,a,t,i,n){return o`
      ${this._renderOptionSelector(e,this._imageModes,{label:l("config.common.image.mode")})}
      ${this._renderStringInput(a,{label:l("config.common.image.url")})}
      ${this._renderOptionSelector(t,this.hass?x(this.hass):[],{label:l("config.common.image.entity")})}
      ${this._renderStringInput(i,{label:l("config.common.image.entity_parameters")})}
      ${this._renderNumberInput(n,{label:l("config.common.image.refresh_seconds")})}
    `}_renderCamera(e,a,t,i){const n=[{value:"",label:""},{value:"auto",label:l("config.cameras.live_providers.auto")},{value:"ha",label:l("config.cameras.live_providers.ha")},{value:"image",label:l("config.cameras.live_providers.image")},{value:"jsmpeg",label:l("config.cameras.live_providers.jsmpeg")},{value:"go2rtc",label:l("config.cameras.live_providers.go2rtc")},{value:"webrtc-card",label:l("config.cameras.live_providers.webrtc-card")}],s=[];e.forEach(((e,t)=>{t!==a&&s.push({value:ee(e),label:this._getEditorCameraTitle(t,e)})}));const c=e=>{if(this._config){const a=m(this._config);e(a)&&this._updateConfig(a)}},d={submenu:!0,selected:this._expandedMenus[gi]===a};return o`
      <div class="${r(d)}">
        <div
          class="submenu-header"
          @click=${this._toggleMenu}
          .domain=${gi}
          .key=${a}
        >
          <ha-icon .icon=${i?"mdi:video-plus":"mdi:video"}></ha-icon>
          <span>
            ${i?o` <span class="new-camera">
                  [${l("editor.add_new_camera")}...]
                </span>`:o`<span
                  >${this._getEditorCameraTitle(a,e[a]||{})}</span
                >`}
          </span>
        </div>
        ${this._expandedMenus[gi]===a?o` <div class="values">
              <div class="controls">
                <ha-icon-button
                  class="button"
                  .label=${l("editor.move_up")}
                  .disabled=${i||!this._config||!Array.isArray(this._config.cameras)||a<=0}
                  @click=${()=>!i&&c((e=>!!(Array.isArray(e.cameras)&&a>0)&&(mt(e.cameras,a,a-1),this._openMenu(gi,a-1),!0)))}
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="button"
                  .label=${l("editor.move_down")}
                  .disabled=${i||!this._config||!Array.isArray(this._config.cameras)||a>=this._config.cameras.length-1}
                  @click=${()=>!i&&c((e=>!!(Array.isArray(e.cameras)&&a<e.cameras.length-1)&&(mt(e.cameras,a,a+1),this._openMenu(gi,a+1),!0)))}
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="button"
                  .label=${l("editor.delete")}
                  .disabled=${i}
                  @click=${()=>{c((e=>!!Array.isArray(e.cameras)&&(e.cameras.splice(a,1),this._closeMenu(gi),!0)))}}
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._renderEntitySelector(ae(ut,a),"camera")}
              ${this._renderOptionSelector(ae(ht,a),n)}
              ${this._renderStringInput(ae(_t,a))}
              ${this._renderIconSelector(ae(gt,a),{label:l("config.cameras.icon")})}
              ${this._renderStringInput(ae(bt,a))}
              ${this._putInSubmenu("cameras.engine",!0,"config.cameras.engines.editor_label","mdi:engine",o`${this._putInSubmenu("cameras.frigate",a,"config.cameras.frigate.editor_label","frigate",o`
                    ${this._renderStringInput(ae(pt,a))}
                    ${this._renderStringInput(ae(vt,a))}
                    ${this._renderOptionSelector(ae(ft,a),[],{multiple:!0,label:l("config.cameras.frigate.labels")})}
                    ${this._renderOptionSelector(ae($t,a),[],{multiple:!0,label:l("config.cameras.frigate.zones")})}
                    ${this._renderStringInput(ae(yt,a))}
                  `)}
                ${this._putInSubmenu("cameras.motioneye",a,"config.cameras.motioneye.editor_label","motioneye",o` ${this._renderStringInput(ae(wt,a))}
                  ${this._renderStringInput(ae(St,a))}
                  ${this._renderStringInput(ae(xt,a))}
                  ${this._renderStringInput(ae(Mt,a))}
                  ${this._renderStringInput(ae(It,a))}`)}
                ${this._putInSubmenu("cameras.reolink",a,"config.cameras.reolink.editor_label","reolink",o` ${this._renderStringInput(ae(kt,a))}
                  ${this._renderOptionSelector(ae(Ot,a),this._reolinkMediaResolution,{label:l("config.cameras.reolink.media_resolution.editor_label")})}`)}`)}
              ${this._putInSubmenu("cameras.live_provider",!0,"config.cameras.live_provider_options.editor_label","mdi:cctv",o` ${this._putInSubmenu("cameras.go2rtc",a,"config.cameras.go2rtc.editor_label","mdi:alpha-g-circle",o`${this._renderOptionSelector(ae(Ct,a),this._go2rtcModes,{multiple:!0,label:l("config.cameras.go2rtc.modes.editor_label")})}
                  ${this._renderStringInput(ae(zt,a))}`)}
                ${this._putInSubmenu("cameras.image",!0,"config.cameras.image.editor_label","mdi:image",this._renderImageOptions(ae(At,a),ae(Nt,a),ae(Tt,a),ae(Bt,a),ae(Et,a)))}
                ${this._putInSubmenu("cameras.webrtc_card",a,"config.cameras.webrtc_card.editor_label","mdi:webrtc",o`${this._renderEntitySelector(ae(Pt,a),"camera")}
                  ${this._renderStringInput(ae(Ht,a))}`)}`)}
              ${this._putInSubmenu("cameras.dependencies",a,"config.cameras.dependencies.editor_label","mdi:graph",o` ${this._renderSwitch(ae(Lt,a),this._defaults.cameras.dependencies.all_cameras)}
                ${this._renderOptionSelector(ae(Vt,a),s,{multiple:!0})}`)}
              ${this._putInSubmenu("cameras.triggers",a,"config.cameras.triggers.editor_label","mdi:magnify-scan",o`
                  ${this._renderSwitch(ae(Kt,a),this._defaults.cameras.triggers.occupancy)}
                  ${this._renderSwitch(ae(Ut,a),this._defaults.cameras.triggers.motion)}
                  ${this._renderOptionSelector(ae(jt,a),t,{multiple:!0})}
                  ${this._renderOptionSelector(ae(qt,a),this._triggersEvents,{multiple:!0,label:l("config.cameras.triggers.events.editor_label")})}
                `)}
              ${this._putInSubmenu("cameras.cast",a,"config.cameras.cast.editor_label","mdi:cast",o`
                  ${this._renderOptionSelector(ae(Rt,a),this._castMethods)}
                  ${this._renderStringInput(ae(Dt,a))}
                  ${this._renderStringInput(ae(Ft,a))}
                `)}
              ${this._putInSubmenu("cameras.dimensions",a,"config.cameras.dimensions.editor_label","mdi:aspect-ratio",o`
                  ${this._renderStringInput(ae(Gt,a))}
                  ${this._renderMediaLayout("cameras.dimensions.layout","config.cameras.dimensions.layout.editor_label",ae(Jt,a),ae(Qt,a),ae(Wt,a),ae(Xt,a),ae(Yt,a),ae(Zt,a),ae(ei,a),ae(ai,a),ae(ti,a),ae(ii,a))}
                `)}
              ${this._putInSubmenu("cameras.capabilities",a,"config.cameras.capabilities.editor_label","mdi:cog-stop",o`
                  ${this._renderOptionSelector(ae(ni,a),this._capabilities,{multiple:!0})}
                  ${this._renderOptionSelector(ae(si,a),this._capabilities,{multiple:!0})}
                `)}
              ${this._putInSubmenu("cameras.proxy",a,"config.cameras.proxy.editor_label","mdi:arrow-decision",o`
                  ${this._renderOptionSelector(ae(oi,a),this._proxyMedia,{label:l("config.cameras.proxy.media.editor_label")})}
                  ${this._renderSwitch(ae(ri,a),this._defaults.cameras.proxy.dynamic)}
                  ${this._renderOptionSelector(ae(li,a),this._proxySSLVerification,{label:l("config.cameras.proxy.ssl_verification.editor_label")})}
                  ${this._renderOptionSelector(ae(ci,a),this._proxySSLCiphers,{label:l("config.cameras.proxy.ssl_ciphers.editor_label")})}
                `)}
            </div>`:""}
      </div>
    `}_renderStringInput(e,a){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{text:{type:a?.type||"text"}}}
        .label=${a?.label??this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderSwitch(e,a,t){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{boolean:{}}}
        .label=${t?.label||this._getLabel(e)}
        .value=${b(this._config,e,a)}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_updateConfig(e){this._config=e,te(this,"config-changed",{config:this._config})}render(){if(!this.hass||!this._config)return o``;const e=x(this.hass),a=b(this._config,mi)||[];return o`
      ${this._configUpgradeable?o` <div class="upgrade">
              <span>${l("editor.upgrade_available")}</span>
              <span>
                <mwc-button
                  raised
                  label="${l("editor.upgrade")}"
                  @click=${()=>{if(this._config){const e=m(this._config);ie(e),this._updateConfig(e)}}}
                >
                </mwc-button>
              </span>
            </div>
            <br />`:o``}
      <div class="card-config">
        ${this._renderOptionSetHeader("cameras")}
        ${"cameras"===this._expandedMenus[bi]?o`
              <div class="values">
                ${a.map(((t,i)=>this._renderCamera(a,i,e)))}
                ${this._renderCamera(a,a.length,e,!0)}
              </div>
            `:""}
        ${this._renderOptionSetHeader("profiles")}
        ${"profiles"===this._expandedMenus[bi]?o` <div class="values">
              ${this._renderOptionSelector(ne,this._profiles,{multiple:!0,label:l("config.profiles.editor_label")})}
            </div>`:""}
        ${this._renderOptionSetHeader("view")}
        ${"view"===this._expandedMenus[bi]?o`
              <div class="values">
                ${this._renderOptionSelector(se,this._viewModes)}
                ${this._renderOptionSelector(oe,this._cameraSelectViewModes)}
                ${this._renderOptionSelector(re,this._darkModes)}
                ${this._renderNumberInput(le)}
                ${this._renderSwitch(ce,this._defaults.view.default_cycle_camera)}
                ${this._renderViewDefaultResetMenu()} ${this._renderViewTriggersMenu()}
                ${this._renderViewKeyboardShortcutMenu()}
              </div>
            `:""}
        ${this._renderOptionSetHeader("menu")}
        ${"menu"===this._expandedMenus[bi]?o`
              <div class="values">
                ${this._renderOptionSelector(de,this._menuStyles)}
                ${this._renderOptionSelector(me,this._menuPositions)}
                ${this._renderOptionSelector(ue,this._menuAlignments)}
                ${this._renderNumberInput(he,{min:X})}
                ${this._renderMenuButton("frigate")}
                ${this._renderMenuButton("cameras")}
                ${this._renderMenuButton("substreams")}
                ${this._renderMenuButton("live")}
                ${this._renderMenuButton("clips")}
                ${this._renderMenuButton("snapshots")}
                ${this._renderMenuButton("recordings")}
                ${this._renderMenuButton("image")}
                ${this._renderMenuButton("download")}
                ${this._renderMenuButton("camera_ui")}
                ${this._renderMenuButton("fullscreen")}
                ${this._renderMenuButton("expand")}
                ${this._renderMenuButton("timeline")}
                ${this._renderMenuButton("media_player")}
                ${this._renderMenuButton("microphone",o`${this._renderOptionSelector(`${R}.microphone.type`,this._microphoneButtonTypes,{label:l("config.menu.buttons.type")})}`)}
                ${this._renderMenuButton("play")}
                ${this._renderMenuButton("mute")}
                ${this._renderMenuButton("screenshot")}
                ${this._renderMenuButton("display_mode")}
                ${this._renderMenuButton("ptz_controls")}
                ${this._renderMenuButton("ptz_home")}
              </div>
            `:""}
        ${this._renderOptionSetHeader("status_bar")}
        ${"status_bar"===this._expandedMenus[bi]?o`
              <div class="values">
                ${this._renderOptionSelector(_e,this._statusBarStyles)}
                ${this._renderOptionSelector(ge,this._statusBarPositions)}
                ${this._renderNumberInput(be,{min:pe,label:l("config.status_bar.height")})}
                ${this._renderNumberInput(ve,{min:0,max:60,default:this._defaults.status_bar.popup_seconds,label:l("config.status_bar.popup_seconds")})}
                ${this._renderStatusBarItem("title")}
                ${this._renderStatusBarItem("resolution")}
                ${this._renderStatusBarItem("technology")}
                ${this._renderStatusBarItem("engine")}
              </div>
            `:""}
        ${this._renderOptionSetHeader("live")}
        ${"live"===this._expandedMenus[bi]?o`
              <div class="values">
                ${this._renderSwitch(fe,this._defaults.live.preload)}
                ${this._renderSwitch($e,this._defaults.live.draggable)}
                ${this._renderSwitch(ye,this._defaults.live.zoomable)}
                ${this._renderSwitch(we,this._defaults.live.lazy_load)}
                ${this._renderOptionSelector(Se,this._mediaActionNegativeConditions,{multiple:!0})}
                ${this._renderOptionSelector(xe,this._mediaActionPositiveConditions,{multiple:!0})}
                ${this._renderOptionSelector(Me,this._mediaActionNegativeConditions,{multiple:!0})}
                ${this._renderOptionSelector(Ie,this._mediaLiveMuteConditions,{multiple:!0})}
                ${this._renderOptionSelector(ke,this._mediaLiveUnmuteConditions,{multiple:!0})}
                ${this._renderOptionSelector(Oe,this._transitionEffects)}
                ${this._renderSwitch(Ce,this._defaults.live.show_image_during_load)}
                ${this._renderViewDisplay("live.display",ze,Ae,Ne,Te)}
                ${this._putInSubmenu("live.controls",!0,"config.live.controls.editor_label","mdi:gamepad",o`
                    ${this._renderSwitch(Be,this._defaults.live.controls.builtin,{label:l("config.common.controls.builtin")})}
                    ${this._renderNextPreviousControls("live.controls.next_previous",Ee,Pe,{allowIcons:!0})}
                    ${this._renderThumbnailsControls("live.controls.thumbnails",He,Le,Ve,Ke,Ue,this._defaults.live.controls.thumbnails,{configPathMediaType:je,configPathEventsMediaType:qe,configPathMode:Re})}
                    ${this._renderMiniTimeline("live.controls.timeline",De,Fe,Ge,Je,Qe,We,this._defaults.live.controls.timeline.show_recordings,Xe)}
                    ${this._putInSubmenu("live.controls.ptz",!0,"config.live.controls.ptz.editor_label","mdi:pan",o`
                        ${this._renderOptionSelector(Ye,this._ptzModes)}
                        ${this._renderOptionSelector(Ze,this._ptzPositions)}
                        ${this._renderOptionSelector(ea,this._ptzOrientations)}
                        ${this._renderSwitch(aa,this._defaults.live.controls.ptz.hide_pan_tilt,{label:l("config.live.controls.ptz.hide_pan_tilt")})}
                        ${this._renderSwitch(ta,this._defaults.live.controls.ptz.hide_pan_tilt,{label:l("config.live.controls.ptz.hide_zoom")})}
                        ${this._renderSwitch(ia,this._defaults.live.controls.ptz.hide_home,{label:l("config.live.controls.ptz.hide_home")})}
                      `)}
                  `)}
                ${this._putInSubmenu("live.microphone",!0,"config.live.microphone.editor_label","mdi:microphone",o`
                    ${this._renderNumberInput(na)}
                    ${this._renderSwitch(sa,this._defaults.live.microphone.always_connected)}
                    ${this._renderNumberInput(oa)}
                  `)}
              </div>
            `:""}
        ${this._renderOptionSetHeader("media_gallery")}
        ${"media_gallery"===this._expandedMenus[bi]?o` <div class="values">
              ${this._renderThumbnailsControls("media_gallery.controls.thumbnails",ra,la,ca,da,ma,this._defaults.media_gallery.controls.thumbnails)}
              ${this._renderFilterControls("media_gallery.controls.filter",ua)}
            </div>`:""}
        ${this._renderOptionSetHeader("media_viewer")}
        ${"media_viewer"===this._expandedMenus[bi]?o` <div class="values">
              ${this._renderOptionSelector(ha,this._mediaActionPositiveConditions,{multiple:!0})}
              ${this._renderOptionSelector(_a,this._mediaActionNegativeConditions,{multiple:!0})}
              ${this._renderOptionSelector(ga,this._mediaActionNegativeConditions,{multiple:!0})}
              ${this._renderOptionSelector(ba,this._mediaActionPositiveConditions,{multiple:!0})}
              ${this._renderSwitch(pa,this._defaults.media_viewer.draggable)}
              ${this._renderSwitch(va,this._defaults.media_viewer.zoomable)}
              ${this._renderSwitch(fa,this._defaults.media_viewer.lazy_load)}
              ${this._renderOptionSelector($a,this._transitionEffects)}
              ${this._renderSwitch(ya,this._defaults.media_viewer.snapshot_click_plays_clip)}
              ${this._renderViewDisplay("media_viewer.display",wa,Sa,xa,Ma)}
              ${this._putInSubmenu("media_viewer.controls",!0,"config.media_viewer.controls.editor_label","mdi:gamepad",o`
                  ${this._renderSwitch(Ia,this._defaults.media_viewer.controls.builtin,{label:l("config.common.controls.builtin")})}
                  ${this._renderNextPreviousControls("media_viewer.controls.next_previous",ka,Oa,{allowThumbnails:!0})}
                  ${this._renderThumbnailsControls("media_viewer.controls.thumbnails",Ca,za,Aa,Na,Ta,this._defaults.media_viewer.controls.thumbnails,{configPathMode:Ba})}
                  ${this._renderMiniTimeline("media_viewer.controls.timeline",Ea,Pa,Ha,La,Va,Ka,this._defaults.media_viewer.controls.timeline.show_recordings,Ua)}
                `)}
            </div>`:""}
        ${this._renderOptionSetHeader("image")}
        ${"image"===this._expandedMenus[bi]?o` <div class="values">
              ${this._renderImageOptions(ja,qa,Ra,Da,Fa)}
            </div>`:""}
        ${this._renderOptionSetHeader("timeline")}
        ${"timeline"===this._expandedMenus[bi]?o` <div class="values">
              ${this._renderTimelineCoreControls(F,G,J,Q,W,this._defaults.timeline.show_recordings)}
              ${this._renderThumbnailsControls("timeline.controls.thumbnails",Ga,Ja,Qa,Wa,Xa,this._defaults.timeline.controls.thumbnails,{configPathMode:Ya})}
            </div>`:""}
        ${this._renderOptionSetHeader("dimensions")}
        ${"dimensions"===this._expandedMenus[bi]?o` <div class="values">
              ${this._renderOptionSelector(Za,this._aspectRatioModes)}
              ${this._renderStringInput(et)}
              ${this._renderStringInput(at)}
            </div>`:""}
        ${this._renderOptionSetHeader("performance","low"===b(this._config,ui)?"warning":void 0)}
        ${"performance"===this._expandedMenus[bi]?o` <div class="values">
              ${"low"===b(this._config,ui)?this._renderInfo(l("config.performance.warning")):o``}
              ${this._putInSubmenu("performance.features",!0,"config.performance.features.editor_label","mdi:feature-search",o`
                  ${this._renderSwitch(tt,this._defaults.performance.features.animated_progress_indicator)}
                  ${this._renderNumberInput(it,{max:nt})}
                  ${this._renderNumberInput(st,{min:1})}
                `)}
              ${this._putInSubmenu("performance.style",!0,"config.performance.style.editor_label","mdi:palette-swatch-variant",o`
                  ${this._renderSwitch(ot,this._defaults.performance.style.border_radius)}
                  ${this._renderSwitch(rt,this._defaults.performance.style.box_shadow)}
                `)}
            </div>`:""}
        ${void 0!==this._config.overrides?o` ${this._renderOptionSetHeader("overrides")}
            ${"overrides"===this._expandedMenus[bi]?o` <div class="values">
                  ${this._renderInfo(l("config.overrides.info"))}
                </div>`:""}`:o``}
      </div>
    `}_closeMenu(e){delete this._expandedMenus[e],this.requestUpdate()}_openMenu(e,a){this._expandedMenus[e]=a,this.requestUpdate()}_toggleMenu(e){if(e&&e.target){const a=e.target.domain,t=e.target.key;this._expandedMenus[a]===t?this._closeMenu(a):this._openMenu(a,t)}}_valueChangedHandler(e,a){if(!this._config||!this.hass)return;let t;if(a.detail&&void 0!==a.detail.value&&(t=a.detail.value,"string"==typeof t&&(t=t.trim())),b(this._config,e)===t)return;const i=m(this._config);""===t||void 0===t?lt(i,e):ct(i,e,t),this._updateConfig(i)}static get styles(){return c('ha-icon-button.button {\n  color: var(--secondary-color, white);\n  background-color: rgba(0, 0, 0, 0.6);\n  border-radius: 50%;\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n  opacity: 0.9;\n}\n\n@keyframes pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n  100% {\n    opacity: 1;\n  }\n}\nha-icon[data-domain=alert][data-state=on],\nha-icon[data-domain=automation][data-state=on],\nha-icon[data-domain=binary_sensor][data-state=on],\nha-icon[data-domain=calendar][data-state=on],\nha-icon[data-domain=camera][data-state=streaming],\nha-icon[data-domain=cover][data-state=open],\nha-icon[data-domain=fan][data-state=on],\nha-icon[data-domain=humidifier][data-state=on],\nha-icon[data-domain=light][data-state=on],\nha-icon[data-domain=input_boolean][data-state=on],\nha-icon[data-domain=lock][data-state=unlocked],\nha-icon[data-domain=media_player][data-state=on],\nha-icon[data-domain=media_player][data-state=paused],\nha-icon[data-domain=media_player][data-state=playing],\nha-icon[data-domain=script][data-state=on],\nha-icon[data-domain=sun][data-state=above_horizon],\nha-icon[data-domain=switch][data-state=on],\nha-icon[data-domain=timer][data-state=active],\nha-icon[data-domain=vacuum][data-state=cleaning],\nha-icon[data-domain=group][data-state=on],\nha-icon[data-domain=group][data-state=home],\nha-icon[data-domain=group][data-state=open],\nha-icon[data-domain=group][data-state=locked],\nha-icon[data-domain=group][data-state=problem] {\n  color: var(--paper-item-icon-active-color, #fdd835);\n}\n\nha-icon[data-domain=climate][data-state=cooling] {\n  color: var(--cool-color, var(--state-climate-cool-color));\n}\n\nha-icon[data-domain=climate][data-state=heating] {\n  color: var(--heat-color, var(--state-climate-heat-color));\n}\n\nha-icon[data-domain=climate][data-state=drying] {\n  color: var(--dry-color, var(--state-climate-dry-color));\n}\n\nha-icon[data-domain=alarm_control_panel] {\n  color: var(--alarm-color-armed, var(--label-badge-red));\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=disarmed] {\n  color: var(--alarm-color-disarmed, var(--label-badge-green));\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=pending],\nha-icon[data-domain=alarm_control_panel][data-state=arming] {\n  color: var(--alarm-color-pending, var(--label-badge-yellow));\n  animation: pulse 1s infinite;\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=triggered] {\n  color: var(--alarm-color-triggered, var(--label-badge-red));\n  animation: pulse 1s infinite;\n}\n\nha-icon[data-domain=plant][data-state=problem],\nha-icon[data-domain=zwave][data-state=dead] {\n  color: var(--state-icon-error-color);\n}\n\n/* Color the icon if unavailable */\nha-icon[data-state=unavailable] {\n  color: var(--state-unavailable-color);\n}\n\nha-icon-button[data-domain=alert][data-state=on],\nha-icon-button[data-domain=automation][data-state=on],\nha-icon-button[data-domain=binary_sensor][data-state=on],\nha-icon-button[data-domain=calendar][data-state=on],\nha-icon-button[data-domain=camera][data-state=streaming],\nha-icon-button[data-domain=cover][data-state=open],\nha-icon-button[data-domain=fan][data-state=on],\nha-icon-button[data-domain=humidifier][data-state=on],\nha-icon-button[data-domain=light][data-state=on],\nha-icon-button[data-domain=input_boolean][data-state=on],\nha-icon-button[data-domain=lock][data-state=unlocked],\nha-icon-button[data-domain=media_player][data-state=on],\nha-icon-button[data-domain=media_player][data-state=paused],\nha-icon-button[data-domain=media_player][data-state=playing],\nha-icon-button[data-domain=script][data-state=on],\nha-icon-button[data-domain=sun][data-state=above_horizon],\nha-icon-button[data-domain=switch][data-state=on],\nha-icon-button[data-domain=timer][data-state=active],\nha-icon-button[data-domain=vacuum][data-state=cleaning],\nha-icon-button[data-domain=group][data-state=on],\nha-icon-button[data-domain=group][data-state=home],\nha-icon-button[data-domain=group][data-state=open],\nha-icon-button[data-domain=group][data-state=locked],\nha-icon-button[data-domain=group][data-state=problem] {\n  color: var(--paper-item-icon-active-color, #fdd835);\n}\n\nha-icon-button[data-domain=climate][data-state=cooling] {\n  color: var(--cool-color, var(--state-climate-cool-color));\n}\n\nha-icon-button[data-domain=climate][data-state=heating] {\n  color: var(--heat-color, var(--state-climate-heat-color));\n}\n\nha-icon-button[data-domain=climate][data-state=drying] {\n  color: var(--dry-color, var(--state-climate-dry-color));\n}\n\nha-icon-button[data-domain=alarm_control_panel] {\n  color: var(--alarm-color-armed, var(--label-badge-red));\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=disarmed] {\n  color: var(--alarm-color-disarmed, var(--label-badge-green));\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=pending],\nha-icon-button[data-domain=alarm_control_panel][data-state=arming] {\n  color: var(--alarm-color-pending, var(--label-badge-yellow));\n  animation: pulse 1s infinite;\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=triggered] {\n  color: var(--alarm-color-triggered, var(--label-badge-red));\n  animation: pulse 1s infinite;\n}\n\nha-icon-button[data-domain=plant][data-state=problem],\nha-icon-button[data-domain=zwave][data-state=dead] {\n  color: var(--state-icon-error-color);\n}\n\n/* Color the icon if unavailable */\nha-icon-button[data-state=unavailable] {\n  color: var(--state-unavailable-color);\n}\n\n.option {\n  padding: 4px 4px;\n  cursor: pointer;\n}\n\n.option.option-overrides .title {\n  color: var(--warning-color);\n}\n\n.row {\n  display: flex;\n  margin-bottom: -14px;\n  pointer-events: none;\n}\n\n.title {\n  padding-left: 16px;\n  margin-top: -6px;\n  pointer-events: none;\n}\n\n.title.warning {\n  color: var(--warning-color);\n}\n\n.secondary {\n  padding-left: 40px;\n  color: var(--secondary-text-color);\n  pointer-events: none;\n}\n\n.values {\n  background: var(--secondary-background-color);\n  display: grid;\n}\n\n.values + .option,\n.submenu + .option {\n  margin-top: 10px;\n}\n\ndiv.upgrade {\n  width: auto;\n  border: 1px dotted var(--primary-color);\n  margin: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\ndiv.upgrade span {\n  padding: 10px;\n}\n\n.submenu-header {\n  display: flex;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.submenu.selected > .submenu-header {\n  background-color: var(--primary-color);\n  color: var(--primary-text-color);\n}\n\n.submenu-header * {\n  flex-basis: auto;\n  pointer-events: none;\n}\n\n.submenu-header .new-camera {\n  font-style: italic;\n}\n\n.submenu:not(.selected) > .submenu-header .new-camera {\n  color: var(--secondary-text-color, "black");\n}\n\n.submenu-header ha-icon,\n.submenu-header img {\n  padding-right: 15px;\n}\n\n.submenu.selected {\n  border: 1px solid var(--primary-color);\n}\n\n.submenu {\n  width: calc(100% - 20px);\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 10px;\n}\n\n.submenu:first-child,\n:not(.submenu) + .submenu {\n  margin-top: 10px;\n}\n\n.submenu .controls {\n  display: inline-block;\n  margin-left: auto;\n  margin-right: 0px;\n  margin-bottom: 5px;\n}\n\n.submenu .controls ha-icon-button.button {\n  --mdc-icon-button-size: 32px;\n  --mdc-icon-size: calc(var(--mdc-icon-button-size) / 2);\n}\n\nspan.info {\n  padding: 10px;\n}\n\nha-selector {\n  padding: 10px;\n  border: 1px solid var(--divider-color);\n}')}};t([i({attribute:!1})],vi.prototype,"hass",void 0),t([d()],vi.prototype,"_config",void 0),t([d()],vi.prototype,"_defaults",void 0),t([d()],vi.prototype,"_expandedMenus",void 0),vi=t([n("frigate-card-editor")],vi);export{vi as FrigateCardEditor};
