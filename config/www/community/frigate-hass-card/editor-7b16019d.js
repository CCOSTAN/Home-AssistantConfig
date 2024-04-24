import{l as e,s as a,c as n,i as t,a as i,b as o,y as s,g as r,d as l,p as d,o as c,C as m,e as u,f as h,h as _,j as b,k as g,F as p,m as v,n as f,q as $,r as y,t as w,B as S,T as M,u as x,v as I,w as C,x as O,z as k,A as N,D as T,E as B,G as A,H as P,I as H,J as z,K as L,L as E,M as j,N as q,O as U,P as Z,Q as F,R as V,S as R,U as D,V as G,W as J,X as K,Y as Q,Z as W,_ as X,$ as Y,a0 as ee,a1 as ae,a2 as ne,a3 as te,a4 as ie,a5 as oe,a6 as se,a7 as re,a8 as le,a9 as de,aa as ce,ab as me,ac as ue,ad as he,ae as _e,af as be,ag as ge,ah as pe,ai as ve,aj as fe,ak as $e,al as ye,am as we,an as Se,ao as Me,ap as xe,aq as Ie,ar as Ce,as as Oe,at as ke,au as Ne,av as Te,aw as Be,ax as Ae,ay as Pe,az as He,aA as ze,aB as Le,aC as Ee,aD as je,aE as qe,aF as Ue,aG as Ze,aH as Fe,aI as Ve,aJ as Re,aK as De,aL as Ge,aM as Je,aN as Ke,aO as Qe,aP as We,aQ as Xe,aR as Ye,aS as ea,aT as aa,aU as na,aV as ta,aW as ia,aX as oa,aY as sa,aZ as ra,a_ as la,a$ as da,b0 as ca,b1 as ma,b2 as ua,b3 as ha,b4 as _a,b5 as ba,b6 as ga,b7 as pa,b8 as va,b9 as fa,ba as $a,bb as ya,bc as wa,bd as Sa,be as Ma,bf as xa,bg as Ia,bh as Ca,bi as Oa,bj as ka,bk as Na,bl as Ta,bm as Ba,bn as Aa,bo as Pa,bp as Ha,bq as za,br as La,bs as Ea,bt as ja,bu as qa,bv as Ua,bw as Za,bx as Fa,by as Va,bz as Ra,bA as Da,bB as Ga,bC as Ja,bD as Ka,bE as Qa,bF as Wa,bG as Xa,bH as Ya,bI as en,bJ as an,bK as nn,bL as tn,bM as on,bN as sn,bO as rn,bP as ln,bQ as dn,bR as cn}from"./card-555679fd.js";const mn="buttons",un="cameras",hn="options",_n="scan",bn={cameras:{icon:"video",name:e("editor.cameras"),secondary:e("editor.cameras_secondary")},view:{icon:"eye",name:e("editor.view"),secondary:e("editor.view_secondary")},menu:{icon:"menu",name:e("editor.menu"),secondary:e("editor.menu_secondary")},live:{icon:"cctv",name:e("editor.live"),secondary:e("editor.live_secondary")},media_gallery:{icon:"grid",name:e("editor.media_gallery"),secondary:e("editor.media_gallery_secondary")},media_viewer:{icon:"filmstrip",name:e("editor.media_viewer"),secondary:e("editor.media_viewer_secondary")},image:{icon:"image",name:e("editor.image"),secondary:e("editor.image_secondary")},timeline:{icon:"chart-gantt",name:e("editor.timeline"),secondary:e("editor.timeline_secondary")},dimensions:{icon:"aspect-ratio",name:e("editor.dimensions"),secondary:e("editor.dimensions_secondary")},performance:{icon:"speedometer",name:e("editor.performance"),secondary:e("editor.performance_secondary")},overrides:{icon:"file-replace",name:e("editor.overrides"),secondary:e("editor.overrides_secondary")}};let gn=class extends a{constructor(){super(...arguments),this._defaults=n(dn),this._initialized=!1,this._configUpgradeable=!1,this._expandedMenus={},this._viewModes=[{value:"",label:""},{value:"live",label:e("config.view.views.live")},{value:"clips",label:e("config.view.views.clips")},{value:"snapshots",label:e("config.view.views.snapshots")},{value:"recordings",label:e("config.view.views.recordings")},{value:"clip",label:e("config.view.views.clip")},{value:"snapshot",label:e("config.view.views.snapshot")},{value:"recording",label:e("config.view.views.recording")},{value:"image",label:e("config.view.views.image")},{value:"timeline",label:e("config.view.views.timeline")}],this._cameraSelectViewModes=[...this._viewModes,{value:"current",label:e("config.view.views.current")}],this._filterModes=[{value:"",label:""},{value:"none",label:e("config.common.controls.filter.modes.none")},{value:"left",label:e("config.common.controls.filter.modes.left")},{value:"right",label:e("config.common.controls.filter.modes.right")}],this._menuStyles=[{value:"",label:""},{value:"none",label:e("config.menu.styles.none")},{value:"hidden",label:e("config.menu.styles.hidden")},{value:"overlay",label:e("config.menu.styles.overlay")},{value:"hover",label:e("config.menu.styles.hover")},{value:"hover-card",label:e("config.menu.styles.hover-card")},{value:"outside",label:e("config.menu.styles.outside")}],this._menuPositions=[{value:"",label:""},{value:"left",label:e("config.menu.positions.left")},{value:"right",label:e("config.menu.positions.right")},{value:"top",label:e("config.menu.positions.top")},{value:"bottom",label:e("config.menu.positions.bottom")}],this._menuAlignments=[{value:"",label:""},{value:"left",label:e("config.menu.alignments.left")},{value:"right",label:e("config.menu.alignments.right")},{value:"top",label:e("config.menu.alignments.top")},{value:"bottom",label:e("config.menu.alignments.bottom")}],this._nextPreviousControlStyles=[{value:"",label:""},{value:"chevrons",label:e("config.common.controls.next_previous.styles.chevrons")},{value:"icons",label:e("config.common.controls.next_previous.styles.icons")},{value:"none",label:e("config.common.controls.next_previous.styles.none")},{value:"thumbnails",label:e("config.common.controls.next_previous.styles.thumbnails")}],this._aspectRatioModes=[{value:"",label:""},{value:"dynamic",label:e("config.dimensions.aspect_ratio_modes.dynamic")},{value:"static",label:e("config.dimensions.aspect_ratio_modes.static")},{value:"unconstrained",label:e("config.dimensions.aspect_ratio_modes.unconstrained")}],this._thumbnailModes=[{value:"",label:""},{value:"none",label:e("config.common.controls.thumbnails.modes.none")},{value:"above",label:e("config.common.controls.thumbnails.modes.above")},{value:"below",label:e("config.common.controls.thumbnails.modes.below")},{value:"left",label:e("config.common.controls.thumbnails.modes.left")},{value:"right",label:e("config.common.controls.thumbnails.modes.right")}],this._thumbnailMedias=[{value:"",label:""},{value:"clips",label:e("config.common.controls.thumbnails.medias.clips")},{value:"snapshots",label:e("config.common.controls.thumbnails.medias.snapshots")}],this._titleModes=[{value:"",label:""},{value:"none",label:e("config.common.controls.title.modes.none")},{value:"popup-top-left",label:e("config.common.controls.title.modes.popup-top-left")},{value:"popup-top-right",label:e("config.common.controls.title.modes.popup-top-right")},{value:"popup-bottom-left",label:e("config.common.controls.title.modes.popup-bottom-left")},{value:"popup-bottom-right",label:e("config.common.controls.title.modes.popup-bottom-right")}],this._transitionEffects=[{value:"",label:""},{value:"none",label:e("config.media_viewer.transition_effects.none")},{value:"slide",label:e("config.media_viewer.transition_effects.slide")}],this._imageModes=[{value:"",label:""},{value:"camera",label:e("config.image.modes.camera")},{value:"screensaver",label:e("config.image.modes.screensaver")},{value:"url",label:e("config.image.modes.url")}],this._timelineMediaTypes=[{value:"",label:""},{value:"all",label:e("config.common.timeline.medias.all")},{value:"clips",label:e("config.common.timeline.medias.clips")},{value:"snapshots",label:e("config.common.timeline.medias.snapshots")}],this._timelineStyleTypes=[{value:"",label:""},{value:"ribbon",label:e("config.common.timeline.styles.ribbon")},{value:"stack",label:e("config.common.timeline.styles.stack")}],this._darkModes=[{value:"",label:""},{value:"on",label:e("config.view.dark_modes.on")},{value:"off",label:e("config.view.dark_modes.off")},{value:"auto",label:e("config.view.dark_modes.auto")}],this._mediaActionNegativeConditions=[{value:"",label:""},{value:"all",label:e("config.common.media_action_conditions.all")},{value:"unselected",label:e("config.common.media_action_conditions.unselected")},{value:"hidden",label:e("config.common.media_action_conditions.hidden")},{value:"never",label:e("config.common.media_action_conditions.never")}],this._mediaActionPositiveConditions=[{value:"",label:""},{value:"all",label:e("config.common.media_action_conditions.all")},{value:"selected",label:e("config.common.media_action_conditions.selected")},{value:"visible",label:e("config.common.media_action_conditions.visible")},{value:"never",label:e("config.common.media_action_conditions.never")}],this._layoutFits=[{value:"",label:""},{value:"contain",label:e("config.common.layout.fits.contain")},{value:"cover",label:e("config.common.layout.fits.cover")},{value:"fill",label:e("config.common.layout.fits.fill")}],this._miniTimelineModes=[{value:"",label:""},{value:"none",label:e("config.common.controls.timeline.modes.none")},{value:"above",label:e("config.common.controls.timeline.modes.above")},{value:"below",label:e("config.common.controls.timeline.modes.below")}],this._performanceProfiles=[{value:"",label:""},{value:"low",label:e("config.performance.profiles.low")},{value:"high",label:e("config.performance.profiles.high")}],this._go2rtcModes=[{value:"",label:""},{value:"mse",label:e("config.cameras.go2rtc.modes.mse")},{value:"webrtc",label:e("config.cameras.go2rtc.modes.webrtc")},{value:"mp4",label:e("config.cameras.go2rtc.modes.mp4")},{value:"mjpeg",label:e("config.cameras.go2rtc.modes.mjpeg")}],this._microphoneButtonTypes=[{value:"",label:""},{value:"momentary",label:e("config.menu.buttons.types.momentary")},{value:"toggle",label:e("config.menu.buttons.types.toggle")}]}setConfig(e){this._config=e,this._configUpgradeable=t(e);let a=null;try{a=this._config.performance?.profile}catch(e){}if("high"===a||"low"===a){const e=n(dn);"low"===a&&i(this._config,e),this._defaults=e}}willUpdate(){this._initialized||o().then((e=>{e&&(this._initialized=!0)}))}_renderOptionSetHeader(e,a){const n=bn[e];return s`
      <div
        class="option option-${e}"
        @click=${this._toggleMenu}
        .domain=${"options"}
        .key=${e}
      >
        <div class="row">
          <ha-icon .icon=${`mdi:${n.icon}`}></ha-icon>
          <div class="title ${a??""}">${n.name}</div>
        </div>
        <div class="secondary">${n.secondary}</div>
      </div>
    `}_getLabel(a){const n=a.split(".").filter((e=>!e.match(/^\[[0-9]+\]$/))).join(".");return e(`config.${n}`)}_renderEntitySelector(e,a){if(this._config)return s`
      <ha-selector
        .hass=${this.hass}
        .selector=${{entity:{domain:a}}}
        .label=${this._getLabel(e)}
        .value=${r(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderOptionSelector(e,a=[],n){if(this._config)return s`
      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{mode:"dropdown",multiple:!!n?.multiple,custom_value:!a.length,options:a}}}
        .label=${n?.label||this._getLabel(e)}
        .value=${r(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderIconSelector(e,a){if(this._config)return s`
      <ha-selector
        .hass=${this.hass}
        .selector=${{icon:{}}}
        .label=${a?.label||this._getLabel(e)}
        .value=${r(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderNumberInput(e,a){if(!this._config)return;const n=r(this._config,e),t=void 0===a?.max?"box":"slider";return s`
      <ha-selector
        .hass=${this.hass}
        .selector=${{number:{min:a?.min||0,max:a?.max,mode:t}}}
        .label=${a?.label||this._getLabel(e)}
        .value=${n??a?.default}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderInfo(e){return s` <span class="info">${e}</span>`}_getEditorCameraTitle(a,n){return"string"==typeof n?.title&&n.title||("string"==typeof n?.camera_entity?l(this.hass,n.camera_entity):"")||"object"==typeof n?.webrtc_card&&n.webrtc_card&&"string"==typeof n.webrtc_card.entity&&n.webrtc_card.entity||("object"==typeof n?.frigate&&n.frigate&&"string"==typeof n?.frigate.camera_name&&n.frigate.camera_name?d(n.frigate.camera_name):"")||"string"==typeof n?.id&&n.id||e("editor.camera")+" #"+a}_renderViewScanMenu(){const a={submenu:!0,selected:!!this._expandedMenus[_n]};return s`
      <div class="${c(a)}">
        <div
          class="submenu-header"
          @click=${this._toggleMenu}
          .domain=${_n}
          .key=${!0}
        >
          <ha-icon .icon=${"mdi:target-account"}></ha-icon>
          <span>${e(`config.${m}.scan_mode`)}</span>
        </div>
        ${this._expandedMenus[_n]?s` <div class="values">
              ${this._renderSwitch(u,this._defaults.view.scan.enabled,{label:e(`config.${u}`)})}
              ${this._renderSwitch(h,this._defaults.view.scan.show_trigger_status,{label:e(`config.${h}`)})}
              ${this._renderSwitch(_,this._defaults.view.scan.untrigger_reset)}
              ${this._renderNumberInput(b,{default:this._defaults.view.scan.untrigger_seconds})}
            </div>`:""}
      </div>
    `}_renderMenuButton(a,n){const t=[{value:"",label:""},{value:"matching",label:e("config.menu.buttons.alignments.matching")},{value:"opposing",label:e("config.menu.buttons.alignments.opposing")}],i={submenu:!0,selected:this._expandedMenus[mn]===a};return s`
      <div class="${c(i)}">
        <div
          class="submenu-header"
          @click=${this._toggleMenu}
          .domain=${mn}
          .key=${a}
        >
          <ha-icon .icon=${"mdi:gesture-tap-button"}></ha-icon>
          <span
            >${e("editor.button")+": "+e(`config.${g}.${a}`)}</span
          >
        </div>

        ${this._expandedMenus[mn]===a?s` <div class="values">
              ${this._renderSwitch(`${g}.${a}.enabled`,this._defaults.menu.buttons[a]?.enabled??!0,{label:e("config.menu.buttons.enabled")})}
              ${this._renderOptionSelector(`${g}.${a}.alignment`,t,{label:e("config.menu.buttons.alignment")})}
              ${this._renderNumberInput(`${g}.${a}.priority`,{max:p,default:this._defaults.menu.buttons[a]?.priority,label:e("config.menu.buttons.priority")})}
              ${this._renderIconSelector(`${g}.${a}.icon`,{label:e("config.menu.buttons.icon")})}
              ${n}
            </div>`:""}
      </div>
    `}_putInSubmenu(a,n,t,i,o){const r=this._expandedMenus[a]===n;return s` <div class="${c({submenu:!0,selected:r})}">
      <div
        class="submenu-header"
        @click=${this._toggleMenu}
        .domain=${a}
        .key=${n}
      >
        ${i.name?s` <ha-icon .icon=${i.name}></ha-icon> `:i.path?s`
              <ha-svg-icon .viewBox=${i.viewBox} .path="${i.path}"></ha-svg-icon>
            `:""}
        <span>${e(t)}</span>
      </div>
      ${r?s`<div class="values">${o}</div>`:""}
    </div>`}_renderMediaLayout(a,n,t,i,o){return this._putInSubmenu(a,!0,n,{name:"mdi:page-layout-body"},s`
        ${this._renderOptionSelector(t,this._layoutFits)}
        ${this._renderNumberInput(i,{min:0,max:100,label:e("config.common.layout.position.x")})}
        ${this._renderNumberInput(o,{min:0,max:100,label:e("config.common.layout.position.y")})}
      `)}_renderTimelineCoreControls(a,n,t,i,o,r){return s` ${this._renderOptionSelector(a,this._timelineStyleTypes,{label:e(`config.common.${v}`)})}
    ${this._renderNumberInput(n,{label:e(`config.common.${f}`)})}
    ${this._renderNumberInput(t,{label:e(`config.common.${$}`)})}
    ${this._renderOptionSelector(i,this._timelineMediaTypes,{label:e(`config.common.${y}`)})}
    ${this._renderSwitch(o,r,{label:e(`config.common.${w}`)})}`}_renderMiniTimeline(a,n,t,i,o,r,l,d){return this._putInSubmenu(a,!0,"config.common.controls.timeline.editor_label",{name:"mdi:chart-gantt"},s` ${this._renderOptionSelector(n,this._miniTimelineModes,{label:e("config.common.controls.timeline.mode")})}
      ${this._renderTimelineCoreControls(t,i,o,r,l,d)}`)}_renderNextPreviousControls(a,n,t,i){return this._putInSubmenu(a,!0,"config.common.controls.next_previous.editor_label",{name:"mdi:arrow-right-bold-circle"},s`
        ${this._renderOptionSelector(n,this._nextPreviousControlStyles.filter((e=>!(!i?.allowThumbnails&&"thumbnails"===e.value||!i?.allowIcons&&"icons"===e.value))),{label:e("config.common.controls.next_previous.style")})}
        ${this._renderNumberInput(t,{min:S,label:e("config.common.controls.next_previous.size")})}
      `)}_renderThumbnailsControls(a,n,t,i,o,r,l,d){return this._putInSubmenu(a,!0,"config.common.controls.thumbnails.editor_label",{name:"mdi:image-text"},s`
        ${d?.configPathMode?s`${this._renderOptionSelector(d.configPathMode,this._thumbnailModes,{label:e("config.common.controls.thumbnails.mode")})}`:s``}
        ${d?.configPathMedia?s`${this._renderOptionSelector(d.configPathMedia,this._thumbnailMedias,{label:e("config.common.controls.thumbnails.media")})}`:s``}
        ${this._renderNumberInput(n,{min:M,max:x,label:e("config.common.controls.thumbnails.size")})}
        ${this._renderSwitch(t,l.show_details,{label:e("config.common.controls.thumbnails.show_details")})}
        ${this._renderSwitch(i,l.show_favorite_control,{label:e("config.common.controls.thumbnails.show_favorite_control")})}
        ${this._renderSwitch(o,l.show_timeline_control,{label:e("config.common.controls.thumbnails.show_timeline_control")})}
        ${this._renderSwitch(r,l.show_download_control,{label:e("config.common.controls.thumbnails.show_download_control")})}
      `)}_renderFilterControls(a,n){return this._putInSubmenu(a,!0,"config.common.controls.filter.editor_label",{name:"mdi:filter-cog"},s`
        ${n?s`${this._renderOptionSelector(n,this._filterModes,{label:e("config.common.controls.filter.mode")})}`:s``}
      `)}_renderTitleControls(a,n,t){return this._putInSubmenu(a,!0,"config.common.controls.title.editor_label",{name:"mdi:subtitles"},s` ${this._renderOptionSelector(n,this._titleModes,{label:e("config.common.controls.title.mode")})}
      ${this._renderNumberInput(t,{min:0,max:60,label:e("config.common.controls.title.duration_seconds")})}`)}_renderCamera(a,t,i,o){const r=[{value:"",label:""},{value:"auto",label:e("config.cameras.live_providers.auto")},{value:"ha",label:e("config.cameras.live_providers.ha")},{value:"image",label:e("config.cameras.live_providers.image")},{value:"jsmpeg",label:e("config.cameras.live_providers.jsmpeg")},{value:"go2rtc",label:e("config.cameras.live_providers.go2rtc")},{value:"webrtc-card",label:e("config.cameras.live_providers.webrtc-card")}],l=[];a.forEach(((e,a)=>{a!==t&&l.push({value:I(e),label:this._getEditorCameraTitle(a,e)})}));const d=e=>{if(this._config){const a=n(this._config);e(a)&&this._updateConfig(a)}},m={submenu:!0,selected:this._expandedMenus[un]===t};return s`
      <div class="${c(m)}">
        <div
          class="submenu-header"
          @click=${this._toggleMenu}
          .domain=${un}
          .key=${t}
        >
          <ha-icon .icon=${o?"mdi:video-plus":"mdi:video"}></ha-icon>
          <span>
            ${o?s` <span class="new-camera">
                  [${e("editor.add_new_camera")}...]
                </span>`:s`<span
                  >${this._getEditorCameraTitle(t,a[t]||{})}</span
                >`}
          </span>
        </div>
        ${this._expandedMenus[un]===t?s` <div class="values">
              <div class="controls">
                <ha-icon-button
                  class="button"
                  .label=${e("editor.move_up")}
                  .disabled=${o||!this._config||!Array.isArray(this._config.cameras)||t<=0}
                  @click=${()=>!o&&d((e=>!!(Array.isArray(e.cameras)&&t>0)&&(Pa(e.cameras,t,t-1),this._openMenu(un,t-1),!0)))}
                >
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="button"
                  .label=${e("editor.move_down")}
                  .disabled=${o||!this._config||!Array.isArray(this._config.cameras)||t>=this._config.cameras.length-1}
                  @click=${()=>!o&&d((e=>!!(Array.isArray(e.cameras)&&t<e.cameras.length-1)&&(Pa(e.cameras,t,t+1),this._openMenu(un,t+1),!0)))}
                >
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="button"
                  .label=${e("editor.delete")}
                  .disabled=${o}
                  @click=${()=>{d((e=>!!Array.isArray(e.cameras)&&(e.cameras.splice(t,1),this._closeMenu(un),!0)))}}
                >
                  <ha-icon icon="mdi:delete"></ha-icon>
                </ha-icon-button>
              </div>
              ${this._renderEntitySelector(C(Ha,t),"camera")}
              ${this._renderOptionSelector(C(za,t),r)}
              ${this._renderStringInput(C(La,t))}
              ${this._renderIconSelector(C(Ea,t),{label:e("config.cameras.icon")})}
              ${this._renderStringInput(C(ja,t))}
              ${this._renderSwitch(C(qa,t),this._defaults.cameras.hide)}
              ${this._putInSubmenu("cameras.engine",!0,"config.cameras.engines.editor_label",{name:"mdi:engine"},s`${this._putInSubmenu("cameras.frigate",t,"config.cameras.frigate.editor_label",{path:O},s`
                    ${this._renderStringInput(C(Ua,t))}
                    ${this._renderStringInput(C(Za,t))}
                    ${this._renderOptionSelector(C(Fa,t),[],{multiple:!0,label:e("config.cameras.frigate.labels")})}
                    ${this._renderOptionSelector(C(Va,t),[],{multiple:!0,label:e("config.cameras.frigate.zones")})}
                    ${this._renderStringInput(C(Ra,t))}
                  `)}
                ${this._putInSubmenu("cameras.motioneye",t,"config.cameras.motioneye.editor_label",{path:"M 49.65,10.81 C 44.24,10.84 36.85,13.50 31.48,15.96 25.84,13.92 20.04,10.69 13.50,10.84 13.07,10.85 12.65,10.87 12.20,10.91 12.20,10.91 7.08,11.33 7.08,11.33 7.08,11.33 11.94,12.95 11.94,12.95 18.62,15.13 24.49,16.51 29.66,25.48 30.86,25.48 33.22,25.48 34.34,25.48 39.49,16.57 45.66,15.08 52.02,12.95 52.02,12.95 56.83,11.39 56.83,11.39 56.83,11.39 51.83,10.91 51.83,10.91 51.15,10.84 50.43,10.80 49.65,10.81 49.65,10.81 49.65,10.81 49.65,10.81 Z M 32.00,5.00 C 26.53,5.00 21.45,6.75 17.20,9.54 21.80,10.04 26.33,11.22 31.48,13.76 36.69,11.11 42.02,10.00 46.83,9.45 42.57,6.64 37.48,5.00 32.00,5.00 Z M 43.42,22.65 C 41.70,22.65 40.31,24.05 40.31,25.77 40.31,27.49 41.70,28.88 43.42,28.88 45.14,28.88 46.54,27.49 46.54,25.77 46.54,24.05 45.14,22.65 43.42,22.65 Z M 20.58,22.65 C 18.86,22.65 17.46,24.05 17.46,25.77 17.46,27.49 18.86,28.88 20.58,28.88 22.30,28.88 23.69,27.49 23.69,25.77 23.69,24.05 22.30,22.65 20.58,22.65 Z M 11.91,14.02 C 7.61,18.80 5.00,25.06 5.00,32.00 5.00,46.91 17.09,59.00 32.00,59.00 46.91,59.00 59.00,46.91 59.00,32.00 59.00,25.09 56.40,18.80 52.12,14.02 50.08,14.77 48.04,15.65 46.02,16.78 49.92,17.91 52.77,21.53 52.77,25.77 52.77,30.90 48.59,35.12 43.42,35.12 39.04,35.12 35.36,32.09 34.34,28.04 34.34,28.04 29.66,28.04 29.66,28.04 28.65,32.09 24.96,35.12 20.58,35.12 15.41,35.12 11.20,30.90 11.20,25.77 11.20,21.48 14.16,17.83 18.14,16.75 16.12,15.65 14.04,14.79 11.91,14.02 11.91,14.02 11.91,14.02 11.91,14.02 Z M 32.00,30.96 C 32.64,33.35 33.33,35.72 36.15,37.19 36.15,37.19 32.00,43.42 32.00,43.42 32.00,43.42 27.85,37.19 27.85,37.19 30.32,35.44 31.46,33.29 32.00,30.96 Z",viewBox:"0 0 64 64"},s`
                    ${this._renderStringInput(C(Da,t))}
                    ${this._renderStringInput(C(Ga,t))}
                    ${this._renderStringInput(C(Ja,t))}
                    ${this._renderStringInput(C(Ka,t))}
                    ${this._renderStringInput(C(Qa,t))}
                  `)} `)}
              ${this._putInSubmenu("cameras.live_provider",!0,"config.cameras.live_provider_options.editor_label",{name:"mdi:cctv"},s` ${this._putInSubmenu("cameras.go2rtc",t,"config.cameras.go2rtc.editor_label",{name:"mdi:alpha-g-circle"},s`${this._renderOptionSelector(C(Wa,t),this._go2rtcModes,{multiple:!0,label:e("config.cameras.go2rtc.modes.editor_label")})}
                  ${this._renderStringInput(C(Xa,t))}`)}
                ${this._putInSubmenu("cameras.image",!0,"config.cameras.image.editor_label",{name:"mdi:image"},s`
                    ${this._renderNumberInput(C(Ya,t))}
                    ${this._renderStringInput(C(en,t))}
                  `)}
                ${this._putInSubmenu("cameras.webrtc_card",t,"config.cameras.webrtc_card.editor_label",{name:"mdi:webrtc"},s`${this._renderEntitySelector(C(an,t),"camera")}
                  ${this._renderStringInput(C(nn,t))}`)}`)}
              ${this._putInSubmenu("cameras.dependencies",t,"config.cameras.dependencies.editor_label",{name:"mdi:graph"},s` ${this._renderSwitch(C(tn,t),this._defaults.cameras.dependencies.all_cameras)}
                ${this._renderOptionSelector(C(on,t),l,{multiple:!0})}`)}
              ${this._putInSubmenu("cameras.triggers",t,"config.cameras.triggers.editor_label",{name:"mdi:magnify-scan"},s` ${this._renderSwitch(C(sn,t),this._defaults.cameras.triggers.occupancy)}
                ${this._renderSwitch(C(rn,t),this._defaults.cameras.triggers.motion)}
                ${this._renderOptionSelector(C(ln,t),i,{multiple:!0})}`)}
            </div>`:""}
      </div>
    `}_renderStringInput(e,a){if(this._config)return s`
      <ha-selector
        .hass=${this.hass}
        .selector=${{text:{type:a?.type||"text"}}}
        .label=${a?.label??this._getLabel(e)}
        .value=${r(this._config,e,"")}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_renderSwitch(e,a,n){if(this._config)return s`
      <ha-selector
        .hass=${this.hass}
        .selector=${{boolean:{}}}
        .label=${n?.label||this._getLabel(e)}
        .value=${r(this._config,e,a)}
        .required=${!1}
        @value-changed=${a=>this._valueChangedHandler(e,a)}
      >
      </ha-selector>
    `}_updateConfig(e){this._config=e,k(this,"config-changed",{config:this._config})}render(){if(!this.hass||!this._config)return s``;const a=N(this.hass),t=r(this._config,cn)||[];return s`
      ${this._configUpgradeable?s` <div class="upgrade">
              <span>${e("editor.upgrade_available")}</span>
              <span>
                <mwc-button
                  raised
                  label="${e("editor.upgrade")}"
                  @click=${()=>{if(this._config){const e=n(this._config);T(e),this._updateConfig(e)}}}
                >
                </mwc-button>
              </span>
            </div>
            <br />`:s``}
      <div class="card-config">
        ${this._renderOptionSetHeader("cameras")}
        ${"cameras"===this._expandedMenus[hn]?s`
              <div class="values">
                ${t.map(((e,n)=>this._renderCamera(t,n,a)))}
                ${this._renderCamera(t,t.length,a,!0)}
              </div>
            `:""}
        ${this._renderOptionSetHeader("view")}
        ${"view"===this._expandedMenus[hn]?s`
              <div class="values">
                ${this._renderOptionSelector(B,this._viewModes)}
                ${this._renderOptionSelector(A,this._cameraSelectViewModes)}
                ${this._renderOptionSelector(P,this._darkModes)}
                ${this._renderNumberInput(H)}
                ${this._renderNumberInput(z)}
                ${this._renderSwitch(L,this._defaults.view.update_force)}
                ${this._renderSwitch(E,this._defaults.view.update_cycle_camera)}
                ${this._renderViewScanMenu()}
              </div>
            `:""}
        ${this._renderOptionSetHeader("menu")}
        ${"menu"===this._expandedMenus[hn]?s`
              <div class="values">
                ${this._renderOptionSelector(j,this._menuStyles)}
                ${this._renderOptionSelector(q,this._menuPositions)}
                ${this._renderOptionSelector(U,this._menuAlignments)}
                ${this._renderNumberInput(Z,{min:S})}
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
                ${this._renderMenuButton("microphone",s`${this._renderOptionSelector(`${g}.microphone.type`,this._microphoneButtonTypes,{label:e("config.menu.buttons.type")})}`)}
                ${this._renderMenuButton("play")}
                ${this._renderMenuButton("mute")}
                ${this._renderMenuButton("screenshot")}
              </div>
            `:""}
        ${this._renderOptionSetHeader("live")}
        ${"live"===this._expandedMenus[hn]?s`
              <div class="values">
                ${this._renderSwitch(F,this._defaults.live.preload)}
                ${this._renderSwitch(V,this._defaults.live.draggable)}
                ${this._renderSwitch(R,this._defaults.live.zoomable)}
                ${this._renderSwitch(D,this._defaults.live.lazy_load)}
                ${this._renderOptionSelector(G,this._mediaActionNegativeConditions)}
                ${this._renderOptionSelector(J,this._mediaActionPositiveConditions)}
                ${this._renderOptionSelector(K,this._mediaActionNegativeConditions)}
                ${this._renderOptionSelector(Q,this._mediaActionNegativeConditions)}
                ${this._renderOptionSelector(W,this._mediaActionPositiveConditions)}
                ${this._renderOptionSelector(X,this._transitionEffects)}
                ${this._renderSwitch(Y,this._defaults.live.show_image_during_load)}
                ${this._putInSubmenu("live.controls",!0,"config.live.controls.editor_label",{name:"mdi:gamepad"},s`
                    ${this._renderSwitch(ee,this._defaults.live.controls.builtin,{label:e("config.common.controls.builtin")})}
                    ${this._renderNextPreviousControls("live.controls.next_previous",ae,ne,{allowIcons:!0})}
                    ${this._renderThumbnailsControls("live.controls.thumbnails",te,ie,oe,se,re,this._defaults.live.controls.thumbnails,{configPathMedia:le,configPathMode:de})}
                    ${this._renderTitleControls("live.controls.title",ce,me)}
                    ${this._renderMiniTimeline("live.controls.timeline",ue,he,_e,be,ge,pe,this._defaults.live.controls.timeline.show_recordings)}
                  `)}
                ${this._renderMediaLayout("live.layout","config.live.layout",ve,fe,$e)}
                ${this._putInSubmenu("live.microphone",!0,"config.live.microphone.editor_label",{name:"mdi:microphone"},s`
                    ${this._renderNumberInput(ye)}
                    ${this._renderSwitch(we,this._defaults.live.microphone.always_connected)}
                  `)}
              </div>
            `:""}
        ${this._renderOptionSetHeader("media_gallery")}
        ${"media_gallery"===this._expandedMenus[hn]?s` <div class="values">
              ${this._renderThumbnailsControls("media_gallery.controls.thumbnails",Se,Me,xe,Ie,Ce,this._defaults.media_gallery.controls.thumbnails)}
              ${this._renderFilterControls("media_gallery.controls.filter",Oe)}
            </div>`:""}
        ${this._renderOptionSetHeader("media_viewer")}
        ${"media_viewer"===this._expandedMenus[hn]?s` <div class="values">
              ${this._renderOptionSelector(ke,this._mediaActionPositiveConditions)}
              ${this._renderOptionSelector(Ne,this._mediaActionNegativeConditions)}
              ${this._renderOptionSelector(Te,this._mediaActionNegativeConditions)}
              ${this._renderOptionSelector(Be,this._mediaActionPositiveConditions)}
              ${this._renderSwitch(Ae,this._defaults.media_viewer.draggable)}
              ${this._renderSwitch(Pe,this._defaults.media_viewer.zoomable)}
              ${this._renderSwitch(He,this._defaults.media_viewer.lazy_load)}
              ${this._renderOptionSelector(ze,this._transitionEffects)}
              ${this._renderSwitch(Le,this._defaults.media_viewer.snapshot_click_plays_clip)}
              ${this._putInSubmenu("media_viewer.controls",!0,"config.media_viewer.controls.editor_label",{name:"mdi:gamepad"},s`
                  ${this._renderSwitch(Ee,this._defaults.media_viewer.controls.builtin,{label:e("config.common.controls.builtin")})}
                  ${this._renderNextPreviousControls("media_viewer.controls.next_previous",je,qe,{allowThumbnails:!0})}
                  ${this._renderThumbnailsControls("media_viewer.controls.thumbnails",Ue,Ze,Fe,Ve,Re,this._defaults.media_viewer.controls.thumbnails,{configPathMode:De})}
                  ${this._renderTitleControls("media_viewer.controls.title",Ge,Je)}
                  ${this._renderMiniTimeline("media_viewer.controls.timeline",Ke,Qe,We,Xe,Ye,ea,this._defaults.media_viewer.controls.timeline.show_recordings)}
                `)}
              ${this._renderMediaLayout("media_viewer.layout","config.media_viewer.layout",aa,na,ta)}
            </div>`:""}
        ${this._renderOptionSetHeader("image")}
        ${"image"===this._expandedMenus[hn]?s` <div class="values">
              ${this._renderOptionSelector(ia,this._imageModes)}
              ${this._renderStringInput(oa)}
              ${this._renderNumberInput(sa)}
              ${this._renderSwitch(ra,this._defaults.image.zoomable)}
              ${this._renderMediaLayout("image.layout","config.image.layout",la,da,ca)}
            </div>`:""}
        ${this._renderOptionSetHeader("timeline")}
        ${"timeline"===this._expandedMenus[hn]?s` <div class="values">
              ${this._renderTimelineCoreControls(v,f,$,y,w,this._defaults.timeline.show_recordings)}
              ${this._renderThumbnailsControls("timeline.controls.thumbnails",ma,ua,ha,_a,ba,this._defaults.timeline.controls.thumbnails,{configPathMode:ga})}
            </div>`:""}
        ${this._renderOptionSetHeader("dimensions")}
        ${"dimensions"===this._expandedMenus[hn]?s` <div class="values">
              ${this._renderOptionSelector(pa,this._aspectRatioModes)}
              ${this._renderStringInput(va)}
              ${this._renderStringInput(fa)}
              ${this._renderStringInput($a)}
            </div>`:""}
        ${this._renderOptionSetHeader("performance","low"===r(this._config,ya)?"warning":void 0)}
        ${"performance"===this._expandedMenus[hn]?s` <div class="values">
              ${"low"===r(this._config,ya)?this._renderInfo(e("config.performance.warning")):s``}
              ${this._renderOptionSelector(ya,this._performanceProfiles)}
              ${this._putInSubmenu("performance.features",!0,"config.performance.features.editor_label",{name:"mdi:feature-search"},s`
                  ${this._renderSwitch(wa,this._defaults.performance.features.animated_progress_indicator)}
                  ${this._renderNumberInput(Sa,{max:Ma})}
                `)}
              ${this._putInSubmenu("performance.style",!0,"config.performance.style.editor_label",{name:"mdi:palette-swatch-variant"},s`
                  ${this._renderSwitch(xa,this._defaults.performance.style.border_radius)}
                  ${this._renderSwitch(Ia,this._defaults.performance.style.box_shadow)}
                `)}
            </div>`:""}
        ${void 0!==this._config.overrides?s` ${this._renderOptionSetHeader("overrides")}
            ${"overrides"===this._expandedMenus[hn]?s` <div class="values">
                  ${this._renderInfo(e("config.overrides.info"))}
                </div>`:""}`:s``}
      </div>
    `}_closeMenu(e){delete this._expandedMenus[e],this.requestUpdate()}_openMenu(e,a){this._expandedMenus[e]=a,this.requestUpdate()}_toggleMenu(e){if(e&&e.target){const a=e.target.domain,n=e.target.key;this._expandedMenus[a]===n?this._closeMenu(a):this._openMenu(a,n)}}_valueChangedHandler(e,a){if(!this._config||!this.hass)return;let t;if(a.detail&&void 0!==a.detail.value&&(t=a.detail.value,"string"==typeof t&&(t=t.trim())),r(this._config,e)===t)return;const i=n(this._config);""===t||void 0===t?Ca(i,e):Oa(i,e,t),this._updateConfig(i)}static get styles(){return ka('ha-icon-button.button {\n  color: var(--secondary-color, white);\n  background-color: rgba(0, 0, 0, 0.6);\n  border-radius: 50%;\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n  opacity: 0.9;\n}\n\n@keyframes pulse {\n  0% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.6;\n  }\n  100% {\n    opacity: 1;\n  }\n}\nha-icon[data-domain=alert][data-state=on],\nha-icon[data-domain=automation][data-state=on],\nha-icon[data-domain=binary_sensor][data-state=on],\nha-icon[data-domain=calendar][data-state=on],\nha-icon[data-domain=camera][data-state=streaming],\nha-icon[data-domain=cover][data-state=open],\nha-icon[data-domain=fan][data-state=on],\nha-icon[data-domain=humidifier][data-state=on],\nha-icon[data-domain=light][data-state=on],\nha-icon[data-domain=input_boolean][data-state=on],\nha-icon[data-domain=lock][data-state=unlocked],\nha-icon[data-domain=media_player][data-state=on],\nha-icon[data-domain=media_player][data-state=paused],\nha-icon[data-domain=media_player][data-state=playing],\nha-icon[data-domain=script][data-state=on],\nha-icon[data-domain=sun][data-state=above_horizon],\nha-icon[data-domain=switch][data-state=on],\nha-icon[data-domain=timer][data-state=active],\nha-icon[data-domain=vacuum][data-state=cleaning],\nha-icon[data-domain=group][data-state=on],\nha-icon[data-domain=group][data-state=home],\nha-icon[data-domain=group][data-state=open],\nha-icon[data-domain=group][data-state=locked],\nha-icon[data-domain=group][data-state=problem] {\n  color: var(--paper-item-icon-active-color, #fdd835);\n}\n\nha-icon[data-domain=climate][data-state=cooling] {\n  color: var(--cool-color, var(--state-climate-cool-color));\n}\n\nha-icon[data-domain=climate][data-state=heating] {\n  color: var(--heat-color, var(--state-climate-heat-color));\n}\n\nha-icon[data-domain=climate][data-state=drying] {\n  color: var(--dry-color, var(--state-climate-dry-color));\n}\n\nha-icon[data-domain=alarm_control_panel] {\n  color: var(--alarm-color-armed, var(--label-badge-red));\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=disarmed] {\n  color: var(--alarm-color-disarmed, var(--label-badge-green));\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=pending],\nha-icon[data-domain=alarm_control_panel][data-state=arming] {\n  color: var(--alarm-color-pending, var(--label-badge-yellow));\n  animation: pulse 1s infinite;\n}\n\nha-icon[data-domain=alarm_control_panel][data-state=triggered] {\n  color: var(--alarm-color-triggered, var(--label-badge-red));\n  animation: pulse 1s infinite;\n}\n\nha-icon[data-domain=plant][data-state=problem],\nha-icon[data-domain=zwave][data-state=dead] {\n  color: var(--state-icon-error-color);\n}\n\n/* Color the icon if unavailable */\nha-icon[data-state=unavailable] {\n  color: var(--state-unavailable-color);\n}\n\nha-icon-button[data-domain=alert][data-state=on],\nha-icon-button[data-domain=automation][data-state=on],\nha-icon-button[data-domain=binary_sensor][data-state=on],\nha-icon-button[data-domain=calendar][data-state=on],\nha-icon-button[data-domain=camera][data-state=streaming],\nha-icon-button[data-domain=cover][data-state=open],\nha-icon-button[data-domain=fan][data-state=on],\nha-icon-button[data-domain=humidifier][data-state=on],\nha-icon-button[data-domain=light][data-state=on],\nha-icon-button[data-domain=input_boolean][data-state=on],\nha-icon-button[data-domain=lock][data-state=unlocked],\nha-icon-button[data-domain=media_player][data-state=on],\nha-icon-button[data-domain=media_player][data-state=paused],\nha-icon-button[data-domain=media_player][data-state=playing],\nha-icon-button[data-domain=script][data-state=on],\nha-icon-button[data-domain=sun][data-state=above_horizon],\nha-icon-button[data-domain=switch][data-state=on],\nha-icon-button[data-domain=timer][data-state=active],\nha-icon-button[data-domain=vacuum][data-state=cleaning],\nha-icon-button[data-domain=group][data-state=on],\nha-icon-button[data-domain=group][data-state=home],\nha-icon-button[data-domain=group][data-state=open],\nha-icon-button[data-domain=group][data-state=locked],\nha-icon-button[data-domain=group][data-state=problem] {\n  color: var(--paper-item-icon-active-color, #fdd835);\n}\n\nha-icon-button[data-domain=climate][data-state=cooling] {\n  color: var(--cool-color, var(--state-climate-cool-color));\n}\n\nha-icon-button[data-domain=climate][data-state=heating] {\n  color: var(--heat-color, var(--state-climate-heat-color));\n}\n\nha-icon-button[data-domain=climate][data-state=drying] {\n  color: var(--dry-color, var(--state-climate-dry-color));\n}\n\nha-icon-button[data-domain=alarm_control_panel] {\n  color: var(--alarm-color-armed, var(--label-badge-red));\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=disarmed] {\n  color: var(--alarm-color-disarmed, var(--label-badge-green));\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=pending],\nha-icon-button[data-domain=alarm_control_panel][data-state=arming] {\n  color: var(--alarm-color-pending, var(--label-badge-yellow));\n  animation: pulse 1s infinite;\n}\n\nha-icon-button[data-domain=alarm_control_panel][data-state=triggered] {\n  color: var(--alarm-color-triggered, var(--label-badge-red));\n  animation: pulse 1s infinite;\n}\n\nha-icon-button[data-domain=plant][data-state=problem],\nha-icon-button[data-domain=zwave][data-state=dead] {\n  color: var(--state-icon-error-color);\n}\n\n/* Color the icon if unavailable */\nha-icon-button[data-state=unavailable] {\n  color: var(--state-unavailable-color);\n}\n\n.option {\n  padding: 4px 4px;\n  cursor: pointer;\n}\n\n.option.option-overrides .title {\n  color: var(--warning-color);\n}\n\n.row {\n  display: flex;\n  margin-bottom: -14px;\n  pointer-events: none;\n}\n\n.title {\n  padding-left: 16px;\n  margin-top: -6px;\n  pointer-events: none;\n}\n\n.title.warning {\n  color: var(--warning-color);\n}\n\n.secondary {\n  padding-left: 40px;\n  color: var(--secondary-text-color);\n  pointer-events: none;\n}\n\n.values {\n  background: var(--secondary-background-color);\n  display: grid;\n}\n\n.values + .option,\n.submenu + .option {\n  margin-top: 10px;\n}\n\ndiv.upgrade {\n  width: auto;\n  border: 1px dotted var(--primary-color);\n  margin: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\ndiv.upgrade span {\n  padding: 10px;\n}\n\n.submenu-header {\n  display: flex;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.submenu.selected > .submenu-header {\n  background-color: var(--primary-color);\n  color: var(--primary-text-color);\n}\n\n.submenu-header * {\n  flex-basis: auto;\n  pointer-events: none;\n}\n\n.submenu-header .new-camera {\n  font-style: italic;\n}\n\n.submenu:not(.selected) > .submenu-header .new-camera {\n  color: var(--secondary-text-color, "black");\n}\n\n.submenu-header ha-icon,\n.submenu-header ha-svg-icon {\n  padding-right: 15px;\n}\n\n.submenu.selected {\n  border: 1px solid var(--primary-color);\n}\n\n.submenu {\n  width: calc(100% - 20px);\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 10px;\n}\n\n.submenu:first-child,\n:not(.submenu) + .submenu {\n  margin-top: 10px;\n}\n\n.submenu .controls {\n  display: inline-block;\n  margin-left: auto;\n  margin-right: 0px;\n  margin-bottom: 5px;\n}\n\n.submenu .controls ha-icon-button.button {\n  --mdc-icon-button-size: 32px;\n  --mdc-icon-size: calc(var(--mdc-icon-button-size) / 2);\n}\n\nspan.info {\n  padding: 10px;\n}\n\nha-selector {\n  padding: 10px;\n  border: 1px solid var(--divider-color);\n}')}};Na([Ta({attribute:!1})],gn.prototype,"hass",void 0),Na([Ba()],gn.prototype,"_config",void 0),Na([Ba()],gn.prototype,"_defaults",void 0),Na([Ba()],gn.prototype,"_expandedMenus",void 0),gn=Na([Aa("frigate-card-editor")],gn);export{gn as FrigateCardEditor};
