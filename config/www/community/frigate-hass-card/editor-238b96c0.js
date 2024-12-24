import{i as e,s as i,_ as t,n,t as a,a as s,x as o,e as r,l,r as c,b as d,c as u,d as m,p as h,f as _,g,h as b,j as p,k as v,C as f,m as $,o as y,q as w,u as S,v as x,w as M,y as I,z as k,A as O,B as C,D as z,E as A,F as N,G as T,H as B,I as E,J as P,K as H,L,M as V,N as K,O as U,P as j,Q as q,R,S as D,T as F,U as G,V as J,W as Q,X as W,Y as X,Z as Y,$ as Z,a0 as ee,a1 as ie,a2 as te,a3 as ne,a4 as ae,a5 as se,a6 as oe,a7 as re,a8 as le,a9 as ce,aa as de,ab as ue,ac as me,ad as he,ae as _e,af as ge,ag as be,ah as pe,ai as ve,aj as fe,ak as $e,al as ye,am as we,an as Se,ao as xe,ap as Me,aq as Ie,ar as ke,as as Oe,at as Ce,au as ze,av as Ae,aw as Ne,ax as Te,ay as Be,az as Ee,aA as Pe,aB as He,aC as Le,aD as Ve,aE as Ke,aF as Ue,aG as je,aH as qe,aI as Re,aJ as De,aK as Fe,aL as Ge,aM as Je,aN as Qe,aO as We,aP as Xe,aQ as Ye,aR as Ze,aS as ei,aT as ii,aU as ti,aV as ni,aW as ai,aX as si,aY as oi,aZ as ri,a_ as li,a$ as ci,b0 as di,b1 as ui,b2 as mi,b3 as hi,b4 as _i,b5 as gi,b6 as bi,b7 as pi,b8 as vi,b9 as fi,ba as $i,bb as yi,bc as wi,bd as Si,be as xi,bf as Mi,bg as Ii,bh as ki,bi as Oi,bj as Ci,bk as zi,bl as Ai,bm as Ni,bn as Ti,bo as Bi,bp as Ei,bq as Pi,br as Hi,bs as Li,bt as Vi,bu as Ki,bv as Ui,bw as ji,bx as qi,by as Ri,bz as Di,bA as Fi,bB as Gi,bC as Ji,bD as Qi,bE as Wi,bF as Xi,bG as Yi,bH as Zi,bI as et,bJ as it,bK as tt,bL as nt,bM as at,bN as st,bO as ot,bP as rt,bQ as lt,bR as ct,bS as dt,bT as ut,bU as mt,bV as ht,bW as _t,bX as gt,bY as bt,bZ as pt,b_ as vt,b$ as ft,c0 as $t,c1 as yt,c2 as wt,c3 as St,c4 as xt,c5 as Mt,c6 as It,c7 as kt,c8 as Ot,c9 as Ct,ca as zt,cb as At,cc as Nt,cd as Tt,ce as Bt,cf as Et,cg as Pt,ch as Ht,ci as Lt,cj as Vt,ck as Kt,cl as Ut,cm as jt,cn as qt,co as Rt,cp as Dt,cq as Ft,cr as Gt,cs as Jt,ct as Qt,cu as Wt,cv as Xt,cw as Yt,cx as Zt,cy as en,cz as tn,cA as nn,cB as an,cC as sn,cD as on,cE as rn,cF as ln,cG as cn,cH as dn,cI as un,cJ as mn}from"./card-e5d55e5b.js";class hn{constructor(e){this._assigning=!1,this._value=null,this._blurEventHandler=()=>{this._setAssigning(!1)},this._keydownEventHandler=e=>{e.key&&!["Control","Alt","Shift","Meta"].includes(e.key)&&(this.setValue({key:e.key,ctrl:e.ctrlKey,alt:e.altKey,shift:e.shiftKey,meta:e.metaKey}),this._setAssigning(!1))},this._host=e,this._host.addController(this)}setValue(i){e(i,this._value)||(this._value=i,this._host.requestUpdate(),this._host.dispatchEvent(new CustomEvent("value-changed",{detail:{value:this._value}})))}getValue(){return this._value}hasValue(){return!!this._value}isAssigning(){return this._assigning}toggleAssigning(){this._setAssigning(!this._assigning)}_setAssigning(e){this._assigning=e,i(this._host,this._assigning,"assigning"),this._assigning?this._host.addEventListener("keydown",this._keydownEventHandler):this._host.removeEventListener("keydown",this._keydownEventHandler),this._host.requestUpdate()}hostConnected(){this._host.addEventListener("blur",this._blurEventHandler)}hostDisconnected(){this._host.removeEventListener("blur",this._blurEventHandler)}}let _n=class extends s{constructor(){super(...arguments),this._controller=new hn(this)}willUpdate(e){e.has("value")&&this._controller.setValue(this.value??null)}render(){if(!this.label)return;const e=e=>o`<div class="key">
        <div class="key-inner">${e}</div>
      </div>`;return o`
      <div class="label">${this.label}</div>
      <ha-button
        class="assign"
        @click=${()=>{this._controller.toggleAssigning()}}
      >
        <frigate-card-icon .icon=${{icon:"mdi:keyboard-settings"}}></frigate-card-icon>
        <span class="${r({dotdotdot:this._controller.isAssigning()})}">
          ${this._controller.isAssigning()?"":l("key_assigner.assign")}
        </span>
      </ha-button>
      ${this._controller.hasValue()?o`<ha-button
              @click=${()=>{this._controller.setValue(null)}}
            >
              <frigate-card-icon
                .icon=${{icon:"mdi:keyboard-off"}}
              ></frigate-card-icon>
              <span> ${l("key_assigner.unassign")} </span>
            </ha-button>`:""}
      <div class="key-row">
        ${this.value?.ctrl?e(l("key_assigner.modifiers.ctrl")):""}
        ${this.value?.shift?e(l("key_assigner.modifiers.shift")):""}
        ${this.value?.meta?e(l("key_assigner.modifiers.meta")):""}
        ${this.value?.alt?e(l("key_assigner.modifiers.alt")):""}
        ${this.value?.key?e(this.value.key):""}
      </div>
      </span>`}static get styles(){return c('.dotdotdot:after {\n  animation: dots 2s linear infinite;\n  content: "";\n  display: inline-block;\n  width: 3em;\n}\n@keyframes dots {\n  0%, 20% {\n    content: ".";\n  }\n  40% {\n    content: "..";\n  }\n  60% {\n    content: "...";\n  }\n  90%, 100% {\n    content: "";\n  }\n}\n\n:host {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 10px;\n  height: 56px;\n  border: 1px solid var(--divider-color);\n}\n\n:host([assigning]) ha-button.assign span,\n:host([assigning]) ha-button.assign frigate-card-icon {\n  color: var(--warning-color);\n}\n\nfrigate-card-icon {\n  padding: 10px;\n}\n\ndiv.label {\n  width: 100px;\n  margin-left: 4px;\n}\n\ndiv.key-row {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\ndiv.key {\n  display: flex;\n  align-items: center;\n  height: 90%;\n  width: min-content;\n  margin-left: 5px;\n  margin-right: 5px;\n}\n\ndiv.key-inner {\n  height: 100%;\n  width: 100%;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 4px;\n  padding-right: 4px;\n  border: 2px;\n  border-radius: 4px;\n  border-style: outset;\n  border-color: var(--divider-color);\n  font-family: monospace;\n  text-transform: capitalize;\n}\n\ndiv.unassigned {\n  font-style: italic;\n}\n\ndiv.key + div.key:before {\n  display: flex;\n  align-items: center;\n  margin-right: 5px;\n  content: " + ";\n}')}};t([n({attribute:!1})],_n.prototype,"label",void 0),t([n({attribute:!1})],_n.prototype,"value",void 0),_n=t([a("frigate-card-key-assigner")],_n);const gn="cameras",bn="options",pn={cameras:{icon:"video",name:l("editor.cameras"),secondary:l("editor.cameras_secondary")},view:{icon:"eye",name:l("editor.view"),secondary:l("editor.view_secondary")},menu:{icon:"menu",name:l("editor.menu"),secondary:l("editor.menu_secondary")},status_bar:{icon:"sign-text",name:l("editor.status_bar"),secondary:l("editor.status_bar_secondary")},live:{icon:"cctv",name:l("editor.live"),secondary:l("editor.live_secondary")},media_gallery:{icon:"grid",name:l("editor.media_gallery"),secondary:l("editor.media_gallery_secondary")},media_viewer:{icon:"filmstrip",name:l("editor.media_viewer"),secondary:l("editor.media_viewer_secondary")},image:{icon:"image",name:l("editor.image"),secondary:l("editor.image_secondary")},timeline:{icon:"chart-gantt",name:l("editor.timeline"),secondary:l("editor.timeline_secondary")},dimensions:{icon:"aspect-ratio",name:l("editor.dimensions"),secondary:l("editor.dimensions_secondary")},performance:{icon:"speedometer",name:l("editor.performance"),secondary:l("editor.performance_secondary")},profiles:{icon:"folder-wrench-outline",name:l("editor.profiles"),secondary:l("editor.profiles_secondary")},overrides:{icon:"file-replace",name:l("editor.overrides"),secondary:l("editor.overrides_secondary")}};let vn=class extends s{constructor(){super(...arguments),this._defaults=u(dn),this._initialized=!1,this._configUpgradeable=!1,this._expandedMenus={},this._viewModes=[{value:"",label:""},{value:"live",label:l("config.view.views.live")},{value:"clips",label:l("config.view.views.clips")},{value:"snapshots",label:l("config.view.views.snapshots")},{value:"recordings",label:l("config.view.views.recordings")},{value:"clip",label:l("config.view.views.clip")},{value:"snapshot",label:l("config.view.views.snapshot")},{value:"recording",label:l("config.view.views.recording")},{value:"image",label:l("config.view.views.image")},{value:"timeline",label:l("config.view.views.timeline")}],this._cameraSelectViewModes=[...this._viewModes,{value:"current",label:l("config.view.views.current")}],this._filterModes=[{value:"",label:""},{value:"none",label:l("config.common.controls.filter.modes.none")},{value:"left",label:l("config.common.controls.filter.modes.left")},{value:"right",label:l("config.common.controls.filter.modes.right")}],this._menuStyles=[{value:"",label:""},{value:"none",label:l("config.menu.styles.none")},{value:"hidden",label:l("config.menu.styles.hidden")},{value:"overlay",label:l("config.menu.styles.overlay")},{value:"hover",label:l("config.menu.styles.hover")},{value:"hover-card",label:l("config.menu.styles.hover-card")},{value:"outside",label:l("config.menu.styles.outside")}],this._menuPositions=[{value:"",label:""},{value:"left",label:l("config.menu.positions.left")},{value:"right",label:l("config.menu.positions.right")},{value:"top",label:l("config.menu.positions.top")},{value:"bottom",label:l("config.menu.positions.bottom")}],this._menuAlignments=[{value:"",label:""},{value:"left",label:l("config.menu.alignments.left")},{value:"right",label:l("config.menu.alignments.right")},{value:"top",label:l("config.menu.alignments.top")},{value:"bottom",label:l("config.menu.alignments.bottom")}],this._nextPreviousControlStyles=[{value:"",label:""},{value:"chevrons",label:l("config.common.controls.next_previous.styles.chevrons")},{value:"icons",label:l("config.common.controls.next_previous.styles.icons")},{value:"none",label:l("config.common.controls.next_previous.styles.none")},{value:"thumbnails",label:l("config.common.controls.next_previous.styles.thumbnails")}],this._aspectRatioModes=[{value:"",label:""},{value:"dynamic",label:l("config.dimensions.aspect_ratio_modes.dynamic")},{value:"static",label:l("config.dimensions.aspect_ratio_modes.static")},{value:"unconstrained",label:l("config.dimensions.aspect_ratio_modes.unconstrained")}],this._thumbnailModes=[{value:"",label:""},{value:"none",label:l("config.common.controls.thumbnails.modes.none")},{value:"above",label:l("config.common.controls.thumbnails.modes.above")},{value:"below",label:l("config.common.controls.thumbnails.modes.below")},{value:"left",label:l("config.common.controls.thumbnails.modes.left")},{value:"right",label:l("config.common.controls.thumbnails.modes.right")}],this._thumbnailMediaTypes=[{value:"",label:""},{value:"events",label:l("config.common.controls.thumbnails.media_types.events")},{value:"recordings",label:l("config.common.controls.thumbnails.media_types.recordings")}],this._thumbnailEventsMediaTypes=[{value:"",label:""},{value:"clips",label:l("config.common.controls.thumbnails.events_media_types.clips")},{value:"snapshots",label:l("config.common.controls.thumbnails.events_media_types.snapshots")}],this._transitionEffects=[{value:"",label:""},{value:"none",label:l("config.media_viewer.transition_effects.none")},{value:"slide",label:l("config.media_viewer.transition_effects.slide")}],this._imageModes=[{value:"",label:""},{value:"camera",label:l("config.common.image.modes.camera")},{value:"entity",label:l("config.common.image.modes.entity")},{value:"screensaver",label:l("config.common.image.modes.screensaver")},{value:"url",label:l("config.common.image.modes.url")}],this._timelineEventsMediaTypes=[{value:"",label:""},{value:"all",label:l("config.common.timeline.events_media_types.all")},{value:"clips",label:l("config.common.timeline.events_media_types.clips")},{value:"snapshots",label:l("config.common.timeline.events_media_types.snapshots")}],this._timelineStyleTypes=[{value:"",label:""},{value:"ribbon",label:l("config.common.timeline.styles.ribbon")},{value:"stack",label:l("config.common.timeline.styles.stack")}],this._darkModes=[{value:"",label:""},{value:"on",label:l("config.view.dark_modes.on")},{value:"off",label:l("config.view.dark_modes.off")},{value:"auto",label:l("config.view.dark_modes.auto")}],this._mediaActionNegativeConditions=[{value:"",label:""},{value:"unselected",label:l("config.common.media_action_conditions.unselected")},{value:"hidden",label:l("config.common.media_action_conditions.hidden")}],this._mediaActionPositiveConditions=[{value:"",label:""},{value:"selected",label:l("config.common.media_action_conditions.selected")},{value:"visible",label:l("config.common.media_action_conditions.visible")}],this._mediaLiveUnmuteConditions=[...this._mediaActionPositiveConditions,{value:"microphone",label:l("config.common.media_action_conditions.microphone_unmute")}],this._mediaLiveMuteConditions=[...this._mediaActionNegativeConditions,{value:"microphone",label:l("config.common.media_action_conditions.microphone_mute")}],this._layoutFits=[{value:"",label:""},{value:"contain",label:l("config.cameras.dimensions.layout.fits.contain")},{value:"cover",label:l("config.cameras.dimensions.layout.fits.cover")},{value:"fill",label:l("config.cameras.dimensions.layout.fits.fill")}],this._miniTimelineModes=[{value:"",label:""},{value:"none",label:l("config.common.controls.timeline.modes.none")},{value:"above",label:l("config.common.controls.timeline.modes.above")},{value:"below",label:l("config.common.controls.timeline.modes.below")}],this._profiles=[{value:"",label:""},{value:"casting",label:l("config.profiles.casting")},{value:"low-performance",label:l("config.profiles.low-performance")},{value:"scrubbing",label:l("config.profiles.scrubbing")}],this._go2rtcModes=[{value:"",label:""},{value:"mse",label:l("config.cameras.go2rtc.modes.mse")},{value:"webrtc",label:l("config.cameras.go2rtc.modes.webrtc")},{value:"mp4",label:l("config.cameras.go2rtc.modes.mp4")},{value:"mjpeg",label:l("config.cameras.go2rtc.modes.mjpeg")}],this._microphoneButtonTypes=[{value:"",label:""},{value:"momentary",label:l("config.menu.buttons.types.momentary")},{value:"toggle",label:l("config.menu.buttons.types.toggle")}],this._displayModes=[{value:"",label:""},{value:"single",label:l("display_modes.single")},{value:"grid",label:l("display_modes.grid")}],this._castMethods=[{value:"",label:""},{value:"standard",label:l("config.cameras.cast.methods.standard")},{value:"dashboard",label:l("config.cameras.cast.methods.dashboard")}],this._ptzModes=[{value:"",label:""},{value:"on",label:l("config.live.controls.ptz.modes.on")},{value:"off",label:l("config.live.controls.ptz.modes.off")}],this._ptzOrientations=[{value:"",label:""},{value:"vertical",label:l("config.live.controls.ptz.orientations.vertical")},{value:"horizontal",label:l("config.live.controls.ptz.orientations.horizontal")}],this._ptzPositions=[{value:"",label:""},{value:"top-left",label:l("config.live.controls.ptz.positions.top-left")},{value:"top-right",label:l("config.live.controls.ptz.positions.top-right")},{value:"bottom-left",label:l("config.live.controls.ptz.positions.bottom-left")},{value:"bottom-right",label:l("config.live.controls.ptz.positions.bottom-right")}],this._triggersActionsInteractionModes=[{value:"",label:""},{value:"all",label:l("config.view.triggers.actions.interaction_modes.all")},{value:"inactive",label:l("config.view.triggers.actions.interaction_modes.inactive")},{value:"active",label:l("config.view.triggers.actions.interaction_modes.active")}],this._triggersActionsTrigger=[{value:"",label:""},{value:"default",label:l("config.view.triggers.actions.triggers.default")},{value:"live",label:l("config.view.triggers.actions.triggers.live")},{value:"media",label:l("config.view.triggers.actions.triggers.media")},{value:"none",label:l("config.view.triggers.actions.triggers.none")}],this._triggersActionsUntrigger=[{value:"",label:""},{value:"default",label:l("config.view.triggers.actions.untriggers.default")},{value:"none",label:l("config.view.triggers.actions.untriggers.none")}],this._triggersEvents=[{value:"",label:""},{value:"events",label:l("config.cameras.triggers.events.events")},{value:"clips",label:l("config.cameras.triggers.events.clips")},{value:"snapshots",label:l("config.cameras.triggers.events.snapshots")}],this._timelinePanModes=[{value:"",label:""},{value:"pan",label:l("config.common.controls.timeline.pan_modes.pan")},{value:"seek",label:l("config.common.controls.timeline.pan_modes.seek")},{value:"seek-in-media",label:l("config.common.controls.timeline.pan_modes.seek-in-media")},{value:"seek-in-camera",label:l("config.common.controls.timeline.pan_modes.seek-in-camera")}],this._capabilities=[{value:"",label:""},{value:"live",label:l("config.cameras.capabilities.capabilities.live")},{value:"substream",label:l("config.cameras.capabilities.capabilities.substream")},{value:"clips",label:l("config.cameras.capabilities.capabilities.clips")},{value:"recordings",label:l("config.cameras.capabilities.capabilities.recordings")},{value:"snapshots",label:l("config.cameras.capabilities.capabilities.snapshots")},{value:"favorite-events",label:l("config.cameras.capabilities.capabilities.favorite-events")},{value:"favorite-recordings",label:l("config.cameras.capabilities.capabilities.favorite-recordings")},{value:"seek",label:l("config.cameras.capabilities.capabilities.seek")},{value:"ptz",label:l("config.cameras.capabilities.capabilities.ptz")},{value:"menu",label:l("config.cameras.capabilities.capabilities.menu")}],this._defaultResetInteractionModes=[{value:"",label:""},{value:"all",label:l("config.view.default_reset.interaction_modes.all")},{value:"inactive",label:l("config.view.default_reset.interaction_modes.inactive")},{value:"active",label:l("config.view.default_reset.interaction_modes.active")}],this._proxyMedia=[{value:"",label:""},{value:"auto",label:l("config.cameras.proxy.media.auto")},{value:!0,label:l("config.cameras.proxy.media.true")},{value:!1,label:l("config.cameras.proxy.media.false")}],this._proxySSLCiphers=[{value:"",label:""},{value:"auto",label:l("config.cameras.proxy.ssl_ciphers.auto")},{value:"default",label:l("config.cameras.proxy.ssl_ciphers.default")},{value:"insecure",label:l("config.cameras.proxy.ssl_ciphers.insecure")},{value:"intermediate",label:l("config.cameras.proxy.ssl_ciphers.intermediate")},{value:"modern",label:l("config.cameras.proxy.ssl_ciphers.modern")}],this._proxySSLVerification=[{value:"",label:""},{value:"auto",label:l("config.cameras.proxy.ssl_verification.auto")},{value:!0,label:l("config.cameras.proxy.ssl_verification.true")},{value:!1,label:l("config.cameras.proxy.ssl_verification.false")}],this._reolinkMediaResolution=[{value:"",label:""},{value:"high",label:l("config.cameras.reolink.media_resolution.high")},{value:"low",label:l("config.cameras.reolink.media_resolution.low")}],this._statusBarStyles=[{value:"",label:""},{value:"hover",label:l("config.status_bar.styles.hover")},{value:"hover-card",label:l("config.status_bar.styles.hover-card")},{value:"none",label:l("config.status_bar.styles.none")},{value:"outside",label:l("config.status_bar.styles.outside")},{value:"overlay",label:l("config.status_bar.styles.overlay")},{value:"popup",label:l("config.status_bar.styles.popup")}],this._statusBarPositions=[{value:"",label:""},{value:"top",label:l("config.status_bar.positions.top")},{value:"bottom",label:l("config.status_bar.positions.bottom")}]}setConfig(e){this._config=e,this._configUpgradeable=m(e);const i=h.safeParse(this._config.profiles);if(i.success){const e=u(dn);_(this._config,e,i.data),this._defaults=e}}willUpdate(){this._initialized||g().then((e=>{e&&(this._initialized=!0)}))}_renderOptionSetHeader(e,i){const t=pn[e];return o`
      <div
        class="option option-${e}"
        @click=${this._toggleMenu}
        .domain=${"options"}
        .key=${e}
      >
        <div class="row">
          <frigate-card-icon
            .icon=${{icon:`mdi:${t.icon}`}}
          ></frigate-card-icon>
          <div class="title ${i??""}">${t.name}</div>
        </div>
        <div class="secondary">${t.secondary}</div>
      </div>
    `}_getLabel(e){const i=e.split(".").filter((e=>!e.match(/^\[[0-9]+\]$/))).join(".");return l(`config.${i}`)}_renderEntitySelector(e,i){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{entity:{domain:i}}}
        .label=${this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${i=>this._valueChangedHandler(e,i)}
      >
      </ha-selector>
    `}_renderOptionSelector(e,i=[],t){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{mode:"dropdown",multiple:!!t?.multiple,custom_value:!i.length,options:i}}}
        .label=${t?.label||this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${i=>this._valueChangedHandler(e,i)}
      >
      </ha-selector>
    `}_renderIconSelector(e,i){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{icon:{}}}
        .label=${i?.label||this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${i=>this._valueChangedHandler(e,i)}
      >
      </ha-selector>
    `}_renderNumberInput(e,i){if(!this._config)return;const t=b(this._config,e),n=void 0===i?.max?"box":"slider";return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{number:{min:i?.min||0,max:i?.max,mode:n,step:i?.step}}}
        .label=${i?.label||this._getLabel(e)}
        .value=${t??i?.default}
        .required=${!1}
        @value-changed=${i=>this._valueChangedHandler(e,i)}
      >
      </ha-selector>
    `}_renderInfo(e){return o` <span class="info">${e}</span>`}_getEditorCameraTitle(e,i){return"string"==typeof i?.title&&i.title||("string"==typeof i?.camera_entity?p(this.hass,i.camera_entity):"")||"object"==typeof i?.webrtc_card&&i.webrtc_card&&"string"==typeof i.webrtc_card.entity&&i.webrtc_card.entity||("object"==typeof i?.frigate&&i.frigate&&"string"==typeof i?.frigate.camera_name&&i.frigate.camera_name?v(i.frigate.camera_name):"")||"string"==typeof i?.id&&i.id||l("editor.camera")+" #"+e}_renderViewDefaultResetMenu(){return this._putInSubmenu("view.default_reset",!0,`config.${f}.editor_label`,"mdi:restart",o`
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
      `)}_renderKeyAssigner(e,i){return o` <frigate-card-key-assigner
      .label=${l(`config.${e}`)}
      .value=${this._config?b(this._config,e,i):null}
      @value-changed=${i=>this._valueChangedHandler(e,i)}
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
      `)}`}_renderMenuButton(e,i){const t=[{value:"",label:""},{value:"matching",label:l("config.menu.buttons.alignments.matching")},{value:"opposing",label:l("config.menu.buttons.alignments.opposing")}];return o` ${this._putInSubmenu("menu.buttons",e,`config.menu.buttons.${e}`,"mdi:gesture-tap-button",o`
        ${this._renderSwitch(`${R}.${e}.enabled`,this._defaults.menu.buttons[e]?.enabled??!0,{label:l("config.menu.buttons.enabled")})}
        ${this._renderOptionSelector(`${R}.${e}.alignment`,t,{label:l("config.menu.buttons.alignment")})}
        ${this._renderSwitch(`${R}.${e}.permanent`,this._defaults.menu.buttons[e]?.permanent??!1,{label:l("config.menu.buttons.permanent")})}
        ${this._renderNumberInput(`${R}.${e}.priority`,{max:D,default:this._defaults.menu.buttons[e]?.priority,label:l("config.menu.buttons.priority")})}
        ${this._renderIconSelector(`${R}.${e}.icon`,{label:l("config.menu.buttons.icon")})}
        ${i}
      `)}`}_putInSubmenu(e,i,t,n,a){const s=this._expandedMenus[e]===i;return o` <div class="${r({submenu:!0,selected:s})}">
      <div
        class="submenu-header"
        @click=${this._toggleMenu}
        .domain=${e}
        .key=${i}
      >
        <frigate-card-icon .icon=${{icon:n}}></frigate-card-icon>
        <span>${l(t)}</span>
      </div>
      ${s?o`<div class="values">${a}</div>`:""}
    </div>`}_renderMediaLayout(e,i,t,n,a,s,r,c,d,u,m,h){return this._putInSubmenu(e,!0,i,"mdi:page-layout-body",o`
        ${this._renderNumberInput(u,{min:0,max:10,label:l("config.cameras.dimensions.layout.zoom"),step:.1})}
        ${this._renderNumberInput(m,{min:0,max:100,label:l("config.cameras.dimensions.layout.pan.x")})}
        ${this._renderNumberInput(h,{min:0,max:100,label:l("config.cameras.dimensions.layout.pan.y")})}
        ${this._renderOptionSelector(t,this._layoutFits,{label:l("config.cameras.dimensions.layout.fit")})}
        ${this._putInSubmenu(`${e}.position`,!0,"config.cameras.dimensions.layout.position.editor_label","mdi:aspect-ratio",o` ${this._renderNumberInput(n,{min:0,max:100,label:l("config.cameras.dimensions.layout.position.x")})}
          ${this._renderNumberInput(a,{min:0,max:100,label:l("config.cameras.dimensions.layout.position.y")})}`)}
        ${this._putInSubmenu(`${e}.view_box`,!0,"config.cameras.dimensions.layout.view_box.editor_label","mdi:crop",o`
            ${this._renderNumberInput(s,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.top")})}
            ${this._renderNumberInput(r,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.bottom")})}
            ${this._renderNumberInput(c,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.left")})}
            ${this._renderNumberInput(d,{min:0,max:100,label:l("config.cameras.dimensions.layout.view_box.right")})}
          `)}
      `)}_renderTimelineCoreControls(e,i,t,n,a,s,r){return o`
      ${this._renderOptionSelector(e,this._timelineStyleTypes,{label:l(`config.common.${F}`)})}
      ${r?this._renderOptionSelector(r,this._timelinePanModes,{label:l("config.common.controls.timeline.pan_mode")}):""}
      ${this._renderNumberInput(i,{label:l(`config.common.${G}`)})}
      ${this._renderNumberInput(t,{label:l(`config.common.${J}`)})}
      ${this._renderOptionSelector(n,this._timelineEventsMediaTypes,{label:l(`config.common.${Q}`)})}
      ${this._renderSwitch(a,s,{label:l(`config.common.${W}`)})}
    `}_renderMiniTimeline(e,i,t,n,a,s,r,c,d){return this._putInSubmenu(e,!0,"config.common.controls.timeline.editor_label","mdi:chart-gantt",o` ${this._renderOptionSelector(i,this._miniTimelineModes,{label:l("config.common.controls.timeline.mode")})}
      ${this._renderTimelineCoreControls(t,n,a,s,r,c,d)}`)}_renderViewDisplay(e,i,t,n,a){return this._putInSubmenu(e,!0,"config.common.display.editor_label","mdi:palette-swatch",o`
        ${this._renderOptionSelector(i,this._displayModes,{label:l("config.common.display.mode")})}
        ${this._renderNumberInput(t,{min:0,label:l("config.common.display.grid_selected_width_factor")})}
        ${this._renderNumberInput(n,{min:0,label:l("config.common.display.grid_columns")})}
        ${this._renderNumberInput(a,{min:0,label:l("config.common.display.grid_max_columns")})}
      `)}_renderNextPreviousControls(e,i,t,n){return this._putInSubmenu(e,!0,"config.common.controls.next_previous.editor_label","mdi:arrow-right-bold-circle",o`
        ${this._renderOptionSelector(i,this._nextPreviousControlStyles.filter((e=>!(!n?.allowThumbnails&&"thumbnails"===e.value||!n?.allowIcons&&"icons"===e.value))),{label:l("config.common.controls.next_previous.style")})}
        ${this._renderNumberInput(t,{min:X,label:l("config.common.controls.next_previous.size")})}
      `)}_renderThumbnailsControls(e,i,t,n,a,s,r,c){return this._putInSubmenu(e,!0,"config.common.controls.thumbnails.editor_label","mdi:image-text",o`
        ${c?.configPathMode?o`${this._renderOptionSelector(c.configPathMode,this._thumbnailModes,{label:l("config.common.controls.thumbnails.mode")})}`:o``}
        ${c?.configPathMediaType?o`${this._renderOptionSelector(c.configPathMediaType,this._thumbnailMediaTypes,{label:l("config.common.controls.thumbnails.media_type")})}`:o``}
        ${c?.configPathEventsMediaType?o`${this._renderOptionSelector(c.configPathEventsMediaType,this._thumbnailEventsMediaTypes,{label:l("config.common.controls.thumbnails.events_media_type")})}`:o``}
        ${this._renderNumberInput(i,{min:Y,max:Z,label:l("config.common.controls.thumbnails.size")})}
        ${this._renderSwitch(t,r.show_details,{label:l("config.common.controls.thumbnails.show_details")})}
        ${this._renderSwitch(n,r.show_favorite_control,{label:l("config.common.controls.thumbnails.show_favorite_control")})}
        ${this._renderSwitch(a,r.show_timeline_control,{label:l("config.common.controls.thumbnails.show_timeline_control")})}
        ${this._renderSwitch(s,r.show_download_control,{label:l("config.common.controls.thumbnails.show_download_control")})}
      `)}_renderFilterControls(e,i){return this._putInSubmenu(e,!0,"config.common.controls.filter.editor_label","mdi:filter-cog",o`
        ${i?o`${this._renderOptionSelector(i,this._filterModes,{label:l("config.common.controls.filter.mode")})}`:o``}
      `)}_renderImageOptions(e,i,t,n,a){return o`
      ${this._renderOptionSelector(e,this._imageModes,{label:l("config.common.image.mode")})}
      ${this._renderStringInput(i,{label:l("config.common.image.url")})}
      ${this._renderOptionSelector(t,this.hass?x(this.hass):[],{label:l("config.common.image.entity")})}
      ${this._renderStringInput(n,{label:l("config.common.image.entity_parameters")})}
      ${this._renderNumberInput(a,{label:l("config.common.image.refresh_seconds")})}
    `}_renderCamera(e,i,t,n){const a=[{value:"",label:""},{value:"auto",label:l("config.cameras.live_providers.auto")},{value:"ha",label:l("config.cameras.live_providers.ha")},{value:"image",label:l("config.cameras.live_providers.image")},{value:"jsmpeg",label:l("config.cameras.live_providers.jsmpeg")},{value:"go2rtc",label:l("config.cameras.live_providers.go2rtc")},{value:"webrtc-card",label:l("config.cameras.live_providers.webrtc-card")}],s=[];e.forEach(((e,t)=>{t!==i&&s.push({value:ee(e),label:this._getEditorCameraTitle(t,e)})}));const c=e=>{if(this._config){const i=u(this._config);e(i)&&this._updateConfig(i)}},d={submenu:!0,selected:this._expandedMenus[gn]===i};return o`
      <div class="${r(d)}">
        <div
          class="submenu-header"
          @click=${this._toggleMenu}
          .domain=${gn}
          .key=${i}
        >
          <frigate-card-icon
            .icon=${{icon:n?"mdi:video-plus":"mdi:video"}}
          ></frigate-card-icon>
          <span>
            ${n?o` <span class="new-camera">
                  [${l("editor.add_new_camera")}...]
                </span>`:o`<span
                  >${this._getEditorCameraTitle(i,e[i]||{})}</span
                >`}
          </span>
        </div>
        ${this._expandedMenus[gn]===i?o` <div class="values">
              <div class="controls">
                <ha-icon-button
                  class="button"
                  .label=${l("editor.move_up")}
                  .disabled=${n||!this._config||!Array.isArray(this._config.cameras)||i<=0}
                  @click=${()=>!n&&c((e=>!!(Array.isArray(e.cameras)&&i>0)&&(dt(e.cameras,i,i-1),this._openMenu(gn,i-1),!0)))}
                >
                  <frigate-card-icon
                    .icon=${{icon:"mdi:arrow-up"}}
                  ></frigate-card-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="button"
                  .label=${l("editor.move_down")}
                  .disabled=${n||!this._config||!Array.isArray(this._config.cameras)||i>=this._config.cameras.length-1}
                  @click=${()=>!n&&c((e=>!!(Array.isArray(e.cameras)&&i<e.cameras.length-1)&&(dt(e.cameras,i,i+1),this._openMenu(gn,i+1),!0)))}
                >
                  <frigate-card-icon
                    .icon=${{icon:"mdi:arrow-down"}}
                  ></frigate-card-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="button"
                  .label=${l("editor.delete")}
                  .disabled=${n}
                  @click=${()=>{c((e=>!!Array.isArray(e.cameras)&&(e.cameras.splice(i,1),this._closeMenu(gn),!0)))}}
                >
                  <frigate-card-icon .icon=${{icon:"mdi:delete"}}></frigate-card-icon>
                </ha-icon-button>
              </div>
              ${this._renderEntitySelector(ie(ut,i),"camera")}
              ${this._renderOptionSelector(ie(mt,i),a)}
              ${this._renderStringInput(ie(ht,i))}
              ${this._renderIconSelector(ie(_t,i),{label:l("config.cameras.icon")})}
              ${this._renderStringInput(ie(gt,i))}
              ${this._putInSubmenu("cameras.engine",!0,"config.cameras.engines.editor_label","mdi:engine",o`${this._putInSubmenu("cameras.frigate",i,"config.cameras.frigate.editor_label","frigate",o`
                    ${this._renderStringInput(ie(bt,i))}
                    ${this._renderStringInput(ie(pt,i))}
                    ${this._renderOptionSelector(ie(vt,i),[],{multiple:!0,label:l("config.cameras.frigate.labels")})}
                    ${this._renderOptionSelector(ie(ft,i),[],{multiple:!0,label:l("config.cameras.frigate.zones")})}
                    ${this._renderStringInput(ie($t,i))}
                  `)}
                ${this._putInSubmenu("cameras.motioneye",i,"config.cameras.motioneye.editor_label","motioneye",o` ${this._renderStringInput(ie(yt,i))}
                  ${this._renderStringInput(ie(wt,i))}
                  ${this._renderStringInput(ie(St,i))}
                  ${this._renderStringInput(ie(xt,i))}
                  ${this._renderStringInput(ie(Mt,i))}`)}
                ${this._putInSubmenu("cameras.reolink",i,"config.cameras.reolink.editor_label","reolink",o` ${this._renderStringInput(ie(It,i))}
                  ${this._renderOptionSelector(ie(kt,i),this._reolinkMediaResolution,{label:l("config.cameras.reolink.media_resolution.editor_label")})}`)}`)}
              ${this._putInSubmenu("cameras.live_provider",!0,"config.cameras.live_provider_options.editor_label","mdi:cctv",o` ${this._putInSubmenu("cameras.go2rtc",i,"config.cameras.go2rtc.editor_label","mdi:alpha-g-circle",o`${this._renderOptionSelector(ie(Ot,i),this._go2rtcModes,{multiple:!0,label:l("config.cameras.go2rtc.modes.editor_label")})}
                  ${this._renderStringInput(ie(Ct,i))}`)}
                ${this._putInSubmenu("cameras.image",!0,"config.cameras.image.editor_label","mdi:image",this._renderImageOptions(ie(zt,i),ie(At,i),ie(Nt,i),ie(Tt,i),ie(Bt,i)))}
                ${this._putInSubmenu("cameras.webrtc_card",i,"config.cameras.webrtc_card.editor_label","mdi:webrtc",o`${this._renderEntitySelector(ie(Et,i),"camera")}
                  ${this._renderStringInput(ie(Pt,i))}`)}`)}
              ${this._putInSubmenu("cameras.dependencies",i,"config.cameras.dependencies.editor_label","mdi:graph",o` ${this._renderSwitch(ie(Ht,i),this._defaults.cameras.dependencies.all_cameras)}
                ${this._renderOptionSelector(ie(Lt,i),s,{multiple:!0})}`)}
              ${this._putInSubmenu("cameras.triggers",i,"config.cameras.triggers.editor_label","mdi:magnify-scan",o`
                  ${this._renderSwitch(ie(Vt,i),this._defaults.cameras.triggers.occupancy)}
                  ${this._renderSwitch(ie(Kt,i),this._defaults.cameras.triggers.motion)}
                  ${this._renderOptionSelector(ie(Ut,i),t,{multiple:!0})}
                  ${this._renderOptionSelector(ie(jt,i),this._triggersEvents,{multiple:!0,label:l("config.cameras.triggers.events.editor_label")})}
                `)}
              ${this._putInSubmenu("cameras.cast",i,"config.cameras.cast.editor_label","mdi:cast",o`
                  ${this._renderOptionSelector(ie(qt,i),this._castMethods)}
                  ${this._renderStringInput(ie(Rt,i))}
                  ${this._renderStringInput(ie(Dt,i))}
                `)}
              ${this._putInSubmenu("cameras.dimensions",i,"config.cameras.dimensions.editor_label","mdi:aspect-ratio",o`
                  ${this._renderStringInput(ie(Ft,i))}
                  ${this._renderMediaLayout("cameras.dimensions.layout","config.cameras.dimensions.layout.editor_label",ie(Gt,i),ie(Jt,i),ie(Qt,i),ie(Wt,i),ie(Xt,i),ie(Yt,i),ie(Zt,i),ie(en,i),ie(tn,i),ie(nn,i))}
                `)}
              ${this._putInSubmenu("cameras.capabilities",i,"config.cameras.capabilities.editor_label","mdi:cog-stop",o`
                  ${this._renderOptionSelector(ie(an,i),this._capabilities,{multiple:!0})}
                  ${this._renderOptionSelector(ie(sn,i),this._capabilities,{multiple:!0})}
                `)}
              ${this._putInSubmenu("cameras.proxy",i,"config.cameras.proxy.editor_label","mdi:arrow-decision",o`
                  ${this._renderOptionSelector(ie(on,i),this._proxyMedia,{label:l("config.cameras.proxy.media.editor_label")})}
                  ${this._renderSwitch(ie(rn,i),this._defaults.cameras.proxy.dynamic)}
                  ${this._renderOptionSelector(ie(ln,i),this._proxySSLVerification,{label:l("config.cameras.proxy.ssl_verification.editor_label")})}
                  ${this._renderOptionSelector(ie(cn,i),this._proxySSLCiphers,{label:l("config.cameras.proxy.ssl_ciphers.editor_label")})}
                `)}
            </div>`:""}
      </div>
    `}_renderStringInput(e,i){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{text:{type:i?.type||"text"}}}
        .label=${i?.label??this._getLabel(e)}
        .value=${b(this._config,e,"")}
        .required=${!1}
        @value-changed=${i=>this._valueChangedHandler(e,i)}
      >
      </ha-selector>
    `}_renderSwitch(e,i,t){if(this._config)return o`
      <ha-selector
        .hass=${this.hass}
        .selector=${{boolean:{}}}
        .label=${t?.label||this._getLabel(e)}
        .value=${b(this._config,e,i)}
        .required=${!1}
        @value-changed=${i=>this._valueChangedHandler(e,i)}
      >
      </ha-selector>
    `}_updateConfig(e){this._config=e,te(this,"config-changed",{config:this._config})}render(){if(!this.hass||!this._config)return o``;const e=x(this.hass),i=b(this._config,un)||[];return o`
      ${this._configUpgradeable?o` <div class="upgrade">
              <span>${l("editor.upgrade_available")}</span>
              <span>
                <mwc-button
                  raised
                  label="${l("editor.upgrade")}"
                  @click=${()=>{if(this._config){const e=u(this._config);ne(e),this._updateConfig(e)}}}
                >
                </mwc-button>
              </span>
            </div>
            <br />`:o``}
      <div class="card-config">
        ${this._renderOptionSetHeader("cameras")}
        ${"cameras"===this._expandedMenus[bn]?o`
              <div class="values">
                ${i.map(((t,n)=>this._renderCamera(i,n,e)))}
                ${this._renderCamera(i,i.length,e,!0)}
              </div>
            `:""}
        ${this._renderOptionSetHeader("profiles")}
        ${"profiles"===this._expandedMenus[bn]?o` <div class="values">
              ${this._renderOptionSelector(ae,this._profiles,{multiple:!0,label:l("config.profiles.editor_label")})}
            </div>`:""}
        ${this._renderOptionSetHeader("view")}
        ${"view"===this._expandedMenus[bn]?o`
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
        ${"menu"===this._expandedMenus[bn]?o`
              <div class="values">
                ${this._renderOptionSelector(de,this._menuStyles)}
                ${this._renderOptionSelector(ue,this._menuPositions)}
                ${this._renderOptionSelector(me,this._menuAlignments)}
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
        ${"status_bar"===this._expandedMenus[bn]?o`
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
        ${"live"===this._expandedMenus[bn]?o`
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
                        ${this._renderOptionSelector(ei,this._ptzOrientations)}
                        ${this._renderSwitch(ii,this._defaults.live.controls.ptz.hide_pan_tilt,{label:l("config.live.controls.ptz.hide_pan_tilt")})}
                        ${this._renderSwitch(ti,this._defaults.live.controls.ptz.hide_pan_tilt,{label:l("config.live.controls.ptz.hide_zoom")})}
                        ${this._renderSwitch(ni,this._defaults.live.controls.ptz.hide_home,{label:l("config.live.controls.ptz.hide_home")})}
                      `)}
                  `)}
                ${this._putInSubmenu("live.microphone",!0,"config.live.microphone.editor_label","mdi:microphone",o`
                    ${this._renderNumberInput(ai)}
                    ${this._renderSwitch(si,this._defaults.live.microphone.always_connected)}
                    ${this._renderNumberInput(oi)}
                  `)}
              </div>
            `:""}
        ${this._renderOptionSetHeader("media_gallery")}
        ${"media_gallery"===this._expandedMenus[bn]?o` <div class="values">
              ${this._renderThumbnailsControls("media_gallery.controls.thumbnails",ri,li,ci,di,ui,this._defaults.media_gallery.controls.thumbnails)}
              ${this._renderFilterControls("media_gallery.controls.filter",mi)}
            </div>`:""}
        ${this._renderOptionSetHeader("media_viewer")}
        ${"media_viewer"===this._expandedMenus[bn]?o` <div class="values">
              ${this._renderOptionSelector(hi,this._mediaActionPositiveConditions,{multiple:!0})}
              ${this._renderOptionSelector(_i,this._mediaActionNegativeConditions,{multiple:!0})}
              ${this._renderOptionSelector(gi,this._mediaActionNegativeConditions,{multiple:!0})}
              ${this._renderOptionSelector(bi,this._mediaActionPositiveConditions,{multiple:!0})}
              ${this._renderSwitch(pi,this._defaults.media_viewer.draggable)}
              ${this._renderSwitch(vi,this._defaults.media_viewer.zoomable)}
              ${this._renderSwitch(fi,this._defaults.media_viewer.lazy_load)}
              ${this._renderOptionSelector($i,this._transitionEffects)}
              ${this._renderSwitch(yi,this._defaults.media_viewer.snapshot_click_plays_clip)}
              ${this._renderViewDisplay("media_viewer.display",wi,Si,xi,Mi)}
              ${this._putInSubmenu("media_viewer.controls",!0,"config.media_viewer.controls.editor_label","mdi:gamepad",o`
                  ${this._renderSwitch(Ii,this._defaults.media_viewer.controls.builtin,{label:l("config.common.controls.builtin")})}
                  ${this._renderNextPreviousControls("media_viewer.controls.next_previous",ki,Oi,{allowThumbnails:!0})}
                  ${this._renderThumbnailsControls("media_viewer.controls.thumbnails",Ci,zi,Ai,Ni,Ti,this._defaults.media_viewer.controls.thumbnails,{configPathMode:Bi})}
                  ${this._renderMiniTimeline("media_viewer.controls.timeline",Ei,Pi,Hi,Li,Vi,Ki,this._defaults.media_viewer.controls.timeline.show_recordings,Ui)}
                `)}
            </div>`:""}
        ${this._renderOptionSetHeader("image")}
        ${"image"===this._expandedMenus[bn]?o` <div class="values">
              ${this._renderImageOptions(ji,qi,Ri,Di,Fi)}
            </div>`:""}
        ${this._renderOptionSetHeader("timeline")}
        ${"timeline"===this._expandedMenus[bn]?o` <div class="values">
              ${this._renderTimelineCoreControls(F,G,J,Q,W,this._defaults.timeline.show_recordings)}
              ${this._renderThumbnailsControls("timeline.controls.thumbnails",Gi,Ji,Qi,Wi,Xi,this._defaults.timeline.controls.thumbnails,{configPathMode:Yi})}
            </div>`:""}
        ${this._renderOptionSetHeader("dimensions")}
        ${"dimensions"===this._expandedMenus[bn]?o` <div class="values">
              ${this._renderOptionSelector(Zi,this._aspectRatioModes)}
              ${this._renderStringInput(et)}
              ${this._renderStringInput(it)}
            </div>`:""}
        ${this._renderOptionSetHeader("performance","low"===b(this._config,mn)?"warning":void 0)}
        ${"performance"===this._expandedMenus[bn]?o` <div class="values">
              ${"low"===b(this._config,mn)?this._renderInfo(l("config.performance.warning")):o``}
              ${this._putInSubmenu("performance.features",!0,"config.performance.features.editor_label","mdi:feature-search",o`
                  ${this._renderSwitch(tt,this._defaults.performance.features.animated_progress_indicator)}
                  ${this._renderNumberInput(nt,{max:at})}
                  ${this._renderNumberInput(st,{min:1})}
                `)}
              ${this._putInSubmenu("performance.style",!0,"config.performance.style.editor_label","mdi:palette-swatch-variant",o`
                  ${this._renderSwitch(ot,this._defaults.performance.style.border_radius)}
                  ${this._renderSwitch(rt,this._defaults.performance.style.box_shadow)}
                `)}
            </div>`:""}
        ${void 0!==this._config.overrides?o` ${this._renderOptionSetHeader("overrides")}
            ${"overrides"===this._expandedMenus[bn]?o` <div class="values">
                  ${this._renderInfo(l("config.overrides.info"))}
                </div>`:""}`:o``}
      </div>
    `}_closeMenu(e){delete this._expandedMenus[e],this.requestUpdate()}_openMenu(e,i){this._expandedMenus[e]=i,this.requestUpdate()}_toggleMenu(e){if(e&&e.target){const i=e.target.domain,t=e.target.key;this._expandedMenus[i]===t?this._closeMenu(i):this._openMenu(i,t)}}_valueChangedHandler(e,i){if(!this._config||!this.hass)return;let t;if(i.detail&&void 0!==i.detail.value&&(t=i.detail.value,"string"==typeof t&&(t=t.trim())),b(this._config,e)===t)return;const n=u(this._config);""===t||void 0===t?lt(n,e):ct(n,e,t),this._updateConfig(n)}static get styles(){return c('ha-icon-button.button {\n  color: var(--secondary-color, white);\n  background-color: rgba(0, 0, 0, 0.6);\n  border-radius: 50%;\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n  opacity: 0.9;\n}\n\n.option {\n  padding: 4px 4px;\n  cursor: pointer;\n}\n\n.option.option-overrides .title {\n  color: var(--warning-color);\n}\n\n.row {\n  display: flex;\n  margin-bottom: -14px;\n  pointer-events: none;\n}\n\n.title {\n  padding-left: 16px;\n  margin-top: -6px;\n  pointer-events: none;\n}\n\n.title.warning {\n  color: var(--warning-color);\n}\n\n.secondary {\n  padding-left: 40px;\n  color: var(--secondary-text-color);\n  pointer-events: none;\n}\n\n.values {\n  background: var(--secondary-background-color);\n  display: grid;\n}\n\n.values + .option,\n.submenu + .option {\n  margin-top: 10px;\n}\n\ndiv.upgrade {\n  width: auto;\n  border: 1px dotted var(--primary-color);\n  margin: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\ndiv.upgrade span {\n  padding: 10px;\n}\n\n.submenu-header {\n  display: flex;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.submenu.selected > .submenu-header {\n  background-color: var(--primary-color);\n  color: var(--primary-text-color);\n}\n\n.submenu-header * {\n  flex-basis: auto;\n  pointer-events: none;\n}\n\n.submenu-header .new-camera {\n  font-style: italic;\n}\n\n.submenu:not(.selected) > .submenu-header .new-camera {\n  color: var(--secondary-text-color, "black");\n}\n\n.submenu-header frigate-card-icon {\n  margin-right: 15px;\n}\n\n.submenu.selected {\n  border: 1px solid var(--primary-color);\n}\n\n.submenu {\n  width: calc(100% - 20px);\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 10px;\n}\n\n.submenu:first-child,\n:not(.submenu) + .submenu {\n  margin-top: 10px;\n}\n\n.submenu .controls {\n  display: inline-block;\n  margin-left: auto;\n  margin-right: 0px;\n  margin-bottom: 5px;\n}\n\n.submenu .controls ha-icon-button.button {\n  --mdc-icon-button-size: 32px;\n  --mdc-icon-size: calc(var(--mdc-icon-button-size) / 2);\n}\n\nspan.info {\n  padding: 10px;\n}\n\nha-selector {\n  padding: 10px;\n  border: 1px solid var(--divider-color);\n}')}};t([n({attribute:!1})],vn.prototype,"hass",void 0),t([d()],vn.prototype,"_config",void 0),t([d()],vn.prototype,"_defaults",void 0),t([d()],vn.prototype,"_expandedMenus",void 0),vn=t([a("frigate-card-editor")],vn);export{vn as FrigateCardEditor};
