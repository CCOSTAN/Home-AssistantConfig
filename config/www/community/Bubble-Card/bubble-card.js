(()=>{"use strict";var __webpack_modules__={946:(e,t,n)=>{function o(e,t=40){if(Array.isArray(e)&&3===e.length){for(let t=0;t<3;t++)if(e[t]<0||e[t]>255)return;return e.every((e=>Math.abs(e-255)<=t))}}let a;function i(e,t,n=1){if(e.startsWith("#"))if(4===e.length){let o=Math.min(255,parseInt(e.charAt(1).repeat(2),16)*n),i=Math.min(255,parseInt(e.charAt(2).repeat(2),16)*n),r=Math.min(255,parseInt(e.charAt(3).repeat(2),16)*n);a="rgba("+o+", "+i+", "+r+", "+t+")"}else{let o=Math.min(255,parseInt(e.slice(1,3),16)*n),i=Math.min(255,parseInt(e.slice(3,5),16)*n),r=Math.min(255,parseInt(e.slice(5,7),16)*n);a="rgba("+o+", "+i+", "+r+", "+t+")"}else if(e.startsWith("rgb")){let o=e.match(/\d+/g);a="rgba("+Math.min(255,o[0]*n)+", "+Math.min(255,o[1]*n)+", "+Math.min(255,o[2]*n)+", "+t+")"}else if(e.startsWith("var(--")){let o=e.slice(4,-1),r=window.getComputedStyle(document.documentElement).getPropertyValue(o);(r.startsWith("#")||r.startsWith("rgb"))&&(a=i(r,t,n))}return a}n.d(t,{_k:()=>i,wW:()=>o})},191:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BX:()=>fireEvent,GP:()=>applyScrollingEffect,IL:()=>getAttribute,Jn:()=>tapFeedback,OC:()=>isEntityType,P2:()=>throttle,Vv:()=>isColorLight,X:()=>getWeatherIcon,az:()=>createElement,gJ:()=>getImage,jk:()=>forwardHaptic,jx:()=>setLayout,mk:()=>getIconColor,o0:()=>formatDateTime,oY:()=>getName,pr:()=>isStateOn,q7:()=>getIcon,y0:()=>getState});var _style_ts__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(946);function hasStateChanged(e,t,n){if(e.hasState=t.states[n],e.hasState)return e.newState=[e.hasState.state,e.hasState.attributes.rgb_color],e.oldState&&e.newState[0]===e.oldState[0]&&e.newState[1]===e.oldState[1]?e.stateChanged=!1:(e.oldState=e.newState,e.stateChanged=!0),e.stateChanged}function configChanged(e,t){return!(!t.classList.contains("editor")||e.config===e.previousConfig||(e.previousConfig=e.config,0))}const fireEvent=(e,t,n,o)=>{o=o||{},n=null==n?{}:n;const a=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return a.detail=n,e.dispatchEvent(a),a},forwardHaptic=e=>{fireEvent(window,"haptic",e)},navigate=(e,t,n=!1)=>{n?history.replaceState(null,"",t):history.pushState(null,"",t),fireEvent(window,"location-changed",{replace:n})};function toggleEntity(e,t){e.callService("homeassistant","toggle",{entity_id:t})}function tapFeedback(e){void 0!==e&&(e.style.display="",e.style.animation="tap-feedback .3s",setTimeout((()=>{e.style.animation="none",e.style.display="none"}),500))}function getIcon(e,t=e.config.entity,n=e.config.icon){const o=t?.split(".")[0],a=getAttribute(e,"device_class",t),i=getAttribute(e,"icon",t),r=n,s=getState(e,t),l={alarm_control_panel:"mdi:shield",alert:"mdi:alert",automation:"mdi:playlist-play",binary_sensor:function(){const n="off"===s;switch(getAttribute(e,"device_class",t)){case"battery":return n?"mdi:battery":"mdi:battery-outline";case"battery_charging":return n?"mdi:battery":"mdi:battery-charging";case"cold":return n?"mdi:thermometer":"mdi:snowflake";case"connectivity":return n?"mdi:server-network-off":"mdi:server-network";case"door":return n?"mdi:door-closed":"mdi:door-open";case"garage_door":return n?"mdi:garage":"mdi:garage-open";case"heat":return n?"mdi:thermometer":"mdi:fire";case"light":return n?"mdi:brightness-5":"mdi:brightness-7";case"lock":return n?"mdi:lock":"mdi:lock-open";case"moisture":return n?"mdi:water-off":"mdi:water";case"motion":return n?"mdi:motion-sensor-off":"mdi:motion-sensor";case"occupancy":case"presence":return n?"mdi:home-outline":"mdi:home";case"opening":return n?"mdi:square":"mdi:square-outline";case"plug":case"power":return n?"mdi:power-plug-off":"mdi:power-plug";case"running":return n?"mdi:stop":"mdi:play";case"safety":case"tamper":return n?"mdi:check-circle":"mdi:alert-circle";case"smoke":return n?"mdi:check-circle":"mdi:smoke";case"sound":return n?"mdi:music-note-off":"mdi:music-note";case"update":return n?"mdi:package":"mdi:package-up";case"vibration":return n?"mdi:crop-portrait":"mdi:vibrate";case"window":return n?"mdi:window-closed":"mdi:window-open";default:return n?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}}(),calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",cover:function(){const n="closed"!==s;switch(getAttribute(e,"device_class",t)){case"awning":return n?"mdi:awning-outline":"mdi:awning";case"blind":return n?"mdi:blinds-open":"mdi:blinds";case"curtain":return n?"mdi:curtains-open":"mdi:curtains";case"damper":case"shutter":default:return n?"mdi:window-shutter-open":"mdi:window-shutter";case"door":return n?"mdi:door-open":"mdi:door-closed";case"garage":return n?"mdi:garage-open":"mdi:garage";case"gate":return n?"mdi:gate-open":"mdi:gate";case"shade":return n?"mdi:roller-shade":"mdi:roller-shade-closed";case"window":return n?"mdi:window-open":"mdi:window-closed"}}(),device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",lock:"mdi:lock",mailbox:"mdi:mailbox",media_player:"mdi:speaker",mower:"mdi:robot-mower",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:palette",script:"mdi:file-document",sensor:function(){switch(getAttribute(e,"device_class",t)){case"battery":return 100==s?"mdi:battery":s>=90?"mdi:battery-90":s>=80?"mdi:battery-80":s>=70?"mdi:battery-70":s>=60?"mdi:battery-60":s>=50?"mdi:battery-50":s>=40?"mdi:battery-40":s>=30?"mdi:battery-30":s>=20?"mdi:battery-20":s>=10?"mdi:battery-10":"mdi:battery-alert";case"humidity":return"mdi:water-percent";case"illuminance":return"mdi:brightness-5";case"temperature":return"mdi:thermometer";case"pressure":return"mdi:gauge";case"power":return"mdi:flash";case"signal_strength":return"mdi:wifi";case"energy":return"mdi:lightning-bolt";default:return"mdi:eye"}}(),simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weather:function(n=getState(e,t)){switch(n){case"cloudy":default:return"mdi:weather-cloudy";case"partlycloudy":return"mdi:weather-partly-cloudy";case"rainy":return"mdi:weather-rainy";case"snowy":return"mdi:weather-snowy";case"sunny":return"mdi:weather-sunny";case"clear-night":return"mdi:weather-night";case"fog":return"mdi:weather-fog";case"hail":return"mdi:weather-hail";case"lightning":return"mdi:weather-lightning";case"lightning-rainy":return"mdi:weather-lightning-rainy";case"pouring":return"mdi:weather-pouring";case"windy":return"mdi:weather-windy";case"windy-variant":return"mdi:weather-windy-variant";case"exceptional":return"mdi:alert-circle-outline"}}(),weblink:"mdi:open-in-new"};return r||i||(l[o]?l[o]:l[a]?l[a]:"")}function getWeatherIcon(e){switch(e){case"cloudy":default:return"mdi:weather-cloudy";case"partlycloudy":return"mdi:weather-partly-cloudy";case"rainy":return"mdi:weather-rainy";case"snowy":return"mdi:weather-snowy";case"sunny":return"mdi:weather-sunny";case"clear-night":return"mdi:weather-night";case"fog":return"mdi:weather-fog";case"hail":return"mdi:weather-hail";case"lightning":return"mdi:weather-lightning";case"lightning-rainy":return"mdi:weather-lightning-rainy";case"pouring":return"mdi:weather-pouring";case"windy":return"mdi:weather-windy";case"windy-variant":return"mdi:weather-windy-variant";case"exceptional":return"mdi:alert-circle-outline"}}let cachedColor=null,cachedResult=null;function resolveCssVariable(e){const t=getComputedStyle(document.body);let n=e;for(;n.startsWith("var(");){const e=n.match(/var\((--[^,]+),?\s*(.*)?\)/);if(!e)break;const o=t.getPropertyValue(e[1]).trim();if(o)n=o;else{if(!e[2])break;n=e[2].trim()}}return n}function isColorLight(e){const t=resolveCssVariable(e);if(!t)return!1;if(t===cachedColor)return cachedResult;cachedColor=t;const n=t.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);let o,a,i;if(n)o=parseInt(n[1],16),a=parseInt(n[2],16),i=parseInt(n[3],16);else{const e=t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);if(!e)return cachedResult=!1,cachedResult;o=parseInt(e[1],10),a=parseInt(e[2],10),i=parseInt(e[3],10)}return cachedResult=(.2126*o+.7152*a+.0722*i)/255>.5,cachedResult}function getIconColor(e,t=e.config.entity,n=1){const o=e.config.card_type,a=e.config.use_accent_color,i="var(--bubble-accent-color, var(--accent-color))",r=getAttribute(e,"rgb_color",t),s=isColorLight("var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))))");if(n=s?n-.2:n,!t)return i;if(isEntityType(e,"light")&&!a?"button"===o?e.card.classList.add("is-light"):"pop-up"===o&&e.elements.headerContainer.classList.add("is-light"):"button"===o?e.card.classList.remove("is-light"):"pop-up"===o&&e.elements.headerContainer.classList.remove("is-light"),!1===t.startsWith("light.")||a)return i;const l=[225,225,210];if(!r)return`var(--bubble-light-color, rgba(${l.map((e=>Math.min(255,e*n))).join(", ")}))`;const c=r.map((e=>Math.min(255,e*n)));return(0,_style_ts__WEBPACK_IMPORTED_MODULE_0__.wW)(r)?`var(--bubble-light-color, rgba(${l.map((e=>Math.min(255,e*n))).join(", ")}))`:`var(--bubble-light-color, rgba(${c.join(", ")}))`}function getImage(e,t=e.config.entity){if(e.config.force_icon)return"";const n=e._hass.states[t],o=n.attributes.entity_picture_local||n.attributes.entity_picture;return o?e._hass.hassUrl(o):""}function getName(e){const t=e.config.name,n=getAttribute(e,"friendly_name");return e.name||t||n||""}function getState(e,t=e.config.entity){return e._hass.states[t]?.state??""}function getAttribute(context,attribute,entity=context.config.entity){return attribute?eval(`context._hass.states['${entity}']?.attributes.${attribute}`)??"":""}function isEntityType(e,t){return e.config.entity?.startsWith(t+".")??!1}function isStateOn(e,t=e.config.entity){const n=getState(e,t).toLowerCase(),o=Number(n);return!!(["on","open","opening","closing","cleaning","true","idle","home","playing","paused","locked","occupied","available","running","active","connected","online","mowing","starting","heat","cool","dry","heat_cool","fan_only","auto","alarm"].includes(n)||o>0)}function createElement(e,t=""){const n=document.createElement(e);return""!==t&&t.split(" ").forEach((e=>{n.classList.add(e)})),n}function debounce(e,t){let n;return function(...o){clearTimeout(n),n=setTimeout((()=>e.apply(this,o)),t)}}function applyScrollingEffect(e,t,n){const o=e.config.scrolling_effect??!0;if(!o)return void applyNonScrollingStyle(t,n);if(t.previousText===n)return;const a=t.className.split(" ").find((e=>e.startsWith("bubble-")));function i(){t.innerHTML=`<div class="scrolling-container">${n}</div>`,t.style="";const e=t.scrollWidth,i=t.parentNode?.offsetWidth||0;o&&e>i?(function(e,t,n){const o='<span class="bubble-scroll-separator"> | </span>',a=`<span>${t+o+t+o}</span>`;e.innerHTML=`<div class="scrolling-container">${a}</div>`;const i=function(e){return`\n            .${e} .scrolling-container {\n                width: 100%;\n                white-space: nowrap;\n                mask-image: linear-gradient(to right, transparent, black calc(0% + 8px), black calc(100% - 8px), transparent);\n                mask-image: linear-gradient(to left, transparent, black calc(0% + 8px), black calc(100% - 8px), transparent);\n            }\n            .${e} .scrolling-container span {\n                display: inline-block;\n                animation: scroll 14s linear infinite;\n            }\n\n            .bubble-scroll-separator {\n                opacity: .3;\n                margin: 0 6px 0 8px;\n            }\n\n            @keyframes scroll {\n                from { transform: translateX(0%); }\n                to { transform: translateX(-50%); }\n            }\n        `}(n);e.styleElement=document.createElement("style"),e.appendChild(e.styleElement),e.styleElement.innerHTML=i}(t,n,a),t.previousText=n):t.previousText=n}requestAnimationFrame(i),t.eventAdded||(window.addEventListener("resize",debounce(i,300)),t.eventAdded=!0)}function applyNonScrollingStyle(e,t){e.innerHTML=t,e.previousText=t,e.style.whiteSpace="normal",e.style.display="-webkit-box",e.style.webkitLineClamp="2",e.style.webkitBoxOrient="vertical",e.style.textOverflow="ellipsis"}function formatDateTime(e,t){if(!e)return"";const n=new Date(e),o=new Date;let a,i,r=Math.floor((o-n)/1e3);return isNaN(r)?"":(r<60?(a="second",i=r+1):r<3600?(a="minute",i=Math.floor(r/60)):r<86400?(a="hour",i=Math.floor(r/3600)):(a="day",i=Math.floor(r/86400)),new Intl.RelativeTimeFormat(t,{numeric:"auto"}).format(-i,a))}function setLayout(e){const t=e.config.card_layout,n="large"===t||"large-2-rows"===t,o="large-2-rows"===t;n!==e.content.classList.contains("large")&&e.content.classList.toggle("large",n),o!==e.content.classList.contains("rows-2")&&e.content.classList.toggle("rows-2",o)}function throttle(e,t=300){let n;return(...o)=>{void 0===n&&(e(...o),n=setTimeout((()=>{n=void 0}),t))}}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__={};(()=>{let e="v2.3.3";var t=__webpack_require__(946),n=__webpack_require__(191);function o(e,t,n){setTimeout((()=>{const o=new Event("hass-action",{bubbles:!0,composed:!0}),a={...t};!a.entity_id&&this?.config?.entity&&(a.entity_id=this.config.entity),"tap"===n||"double_tap"===n||"hold"===n?o.detail={config:a,action:n}:(e.modifiedConfig={...a,tap_action:{...a[n]}},delete e.modifiedConfig[n],o.detail={config:e.modifiedConfig,action:"tap"}),e.dispatchEvent(o)}),10)}function a(e,t,n,o){e.classList.add("bubble-action"),e.dataset.entity=t?.entity||n,e.dataset.tapAction=JSON.stringify(t?.tap_action||o?.tap_action||{action:"more-info"}),e.dataset.doubleTapAction=JSON.stringify(t?.double_tap_action||o?.double_tap_action||{action:"toggle"}),e.dataset.holdAction=JSON.stringify(t?.hold_action||o?.hold_action||{action:"toggle"});const a=JSON.parse(e.dataset.tapAction),i=JSON.parse(e.dataset.doubleTapAction),r=JSON.parse(e.dataset.holdAction);e.style.cursor="none"===a.action&&"none"===i.action&&"none"===r.action?"":"pointer"}window.isScrolling=!1,document.addEventListener("scroll",(function(){window.isScrolling=!0,setTimeout((()=>{window.isScrolling=!1}),150)}),{passive:!0}),document.body.addEventListener("pointerdown",(e=>{if(window.isScrolling)return;const t=e.composedPath();let n=null;for(const e of t)if(e.classList&&e.classList.contains("bubble-action")){n=e;break}if(n){const t={tap_action:JSON.parse(n.dataset.tapAction),double_tap_action:JSON.parse(n.dataset.doubleTapAction),hold_action:JSON.parse(n.dataset.holdAction),entity:n.dataset.entity};n.actionHandler||(n.actionHandler=new i(n,t,r)),n.actionHandler.handleStart(e),n.addEventListener("pointerup",n.actionHandler.handleEnd.bind(n.actionHandler),{once:!0}),document.addEventListener("scroll",n.actionHandler.handleScroll.bind(n.actionHandler),{once:!0})}}),{passive:!0});class i{constructor(e,t,n){this.element=e,this.config=t,this.sendActionEvent=n,this.tapTimeout=null,this.holdTimeout=null,this.startX=0,this.startY=0,this.holdFired=!1,this.pointerMoveListener=this.detectScrollLikeMove.bind(this)}handleStart(e){window.isScrolling||this.isDisconnected||(this.startX=e.clientX,this.startY=e.clientY,this.holdFired=!1,document.addEventListener("pointermove",this.pointerMoveListener),this.holdTimeout=setTimeout((()=>{"none"===(this.config.hold_action||{action:"none"}).action||window.isScrolling||(this.sendActionEvent(this.element,this.config,"hold"),this.holdFired=!0)}),400))}detectScrollLikeMove(e){const t=Math.abs(e.clientX-this.startX),n=Math.abs(e.clientY-this.startY);(t>5||n>5)&&(clearTimeout(this.holdTimeout),this.holdTimeout=null,document.removeEventListener("pointermove",this.pointerMoveListener))}handleEnd(e){if(window.isScrolling||this.isDisconnected)return;if(clearTimeout(this.holdTimeout),this.holdTimeout=null,document.removeEventListener("pointermove",this.pointerMoveListener),this.holdFired)return;const t=Date.now(),n=this.config.double_tap_action||{action:"none"},o=this.config.tap_action||{action:"none"};this.lastTap&&t-this.lastTap<200&&"none"!==n.action?(clearTimeout(this.tapTimeout),this.sendActionEvent(this.element,this.config,"double_tap")):"none"!==o.action&&(this.tapTimeout=setTimeout((()=>{this.sendActionEvent(this.element,this.config,"tap")}),200)),this.lastTap=t}handleScroll(){clearTimeout(this.holdTimeout),this.holdTimeout=null,document.removeEventListener("pointermove",this.pointerMoveListener)}}function r(e,t,n){const a=t.tap_action||{action:"more-info"},i=t.double_tap_action||{action:"toggle"},r=t.hold_action||{action:"toggle"},s=t.entity||this.config?.entity,l=e=>e.service&&"entity"===e.target?.entity_id&&s?{...e,target:{...e.target,entity_id:s}}:e,c=l(a),d=l(i),u=l(r);let b;switch(n){case"tap":default:b=c;break;case"double_tap":b=d;break;case"hold":b=u}o(e,{entity:s,tap_action:c,double_tap_action:d,hold_action:u},n)}function s(e,t){e.addEventListener("click",(()=>{(0,n.jk)("selection"),(0,n.Jn)(t)}))}let l=!1;function c(){!l&&location.hash&&setTimeout((()=>{const e=window.location.href.split("#")[0];history.replaceState(null,"",e),window.dispatchEvent(new Event("location-changed"))}),50)}function d(e){const t=e.startsWith("#")?window.location.href.split("#")[0]+e:e;history.pushState(null,"",t),window.dispatchEvent(new Event("location-changed"))}function u(e,t){e.editor||(e.hideContentTimeout=setTimeout((()=>{const{sectionRow:t,sectionRowContainer:n}=e;"hui-card"===t?.tagName.toLowerCase()&&(t.hidden=!0,t.style.display="none",n?.classList.contains("card")&&(n.style.display="none"))}),t))}function b(e,t){const{showBackdrop:n,hideBackdrop:o}=L(e);t?n():o()}function p(e,t){if(e.config.background_update)return;const n=t?"appendChild":"removeChild";requestAnimationFrame((()=>{e.verticalStack[n](e.popUp)}))}function h(e,t){requestAnimationFrame((()=>{e.classList.toggle("is-popup-opened",t),e.classList.toggle("is-popup-closed",!t)}))}function m(e,t){e.boundClickOutside||(e.boundClickOutside=t=>function(e,t){(t.config.close_by_clicking_outside??1)&&(e.composedPath().find((e=>e.classList?.contains("bubble-pop-up")||["HA-DIALOG","HA-MORE-INFO-DIALOG","HA-DIALOG-DATE-PICKER"].includes(e.nodeName)))||c())}(t,e)),t?(e.listenersAdded||(e.popUp.addEventListener("touchstart",e.resetCloseTimeout,{passive:!0}),e.listenersAdded=!0),window.clickOutsideListenerAdded||(window.addEventListener("click",e.boundClickOutside,{passive:!0}),window.clickOutsideListenerAdded=!0)):e.listenersAdded&&(e.popUp.removeEventListener("touchstart",e.resetCloseTimeout),e.listenersAdded=!1,!location.hash&&window.clickOutsideListenerAdded&&(window.removeEventListener("click",e.boundClickOutside),window.clickOutsideListenerAdded=!1))}function g(e){document.body.style.overflow=e}function f(e){["hideContentTimeout","removeDomTimeout","closeTimeout"].forEach((t=>clearTimeout(e[t])))}const _="\n  .bubble-backdrop {\n    position: fixed;\n    background-color: var(--bubble-backdrop-background-color);\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 4;\n    opacity: 0;\n    transition: opacity 0.3s;\n    transition-delay: .1s;\n    display: flex;\n    backdrop-filter: var(--custom-backdrop-filter);\n    -webkit-backdrop-filter: var(--custom-backdrop-filter);\n    transform: translate3d(0, 0, 0);\n  }\n\n  .bubble-backdrop.is-visible {\n    opacity: 1;\n  }\n\n  .bubble-backdrop.is-hidden {\n    opacity: 0;\n    pointer-events: none;\n  }\n";let y,v,w,x,k=!1;const C=window.matchMedia("(prefers-color-scheme: dark)"),$=(0,n.az)("style");function S(){x=getComputedStyle(document.body).getPropertyValue("--ha-card-background")||getComputedStyle(document.body).getPropertyValue("--card-background-color"),document.body.style.setProperty("--bubble-backdrop-background-color",(0,t._k)(x,.8,.6))}function L(e){const t=e.config.hide_backdrop??!1;if(y)return y;$.innerHTML=_,document.head.appendChild($);const o=(0,n.az)("style");document.head.appendChild(o);const a=(0,n.az)("div","bubble-backdrop backdrop is-hidden");return t&&(a.style.display="none",a.style.pointerEvents="none"),document.body.appendChild(a),a.style.setProperty("--custom-backdrop-filter",`blur(${e.config.backdrop_blur??0}px)`),y={hideBackdrop:function(){a.classList.add("is-hidden"),a.classList.remove("is-visible")},showBackdrop:function(){requestAnimationFrame((()=>{a.classList.add("is-visible"),a.classList.remove("is-hidden")}))},backdropElement:a,backdropCustomStyle:o},y}function T(e,t,n,o){let a;switch(n){case"hvac_modes":a=document.createElement("ha-icon"),a.slot="graphic",a.icon=function(e){switch(e){case"auto":return"mdi:thermostat-auto";case"cool":return"mdi:snowflake";case"heat":return"mdi:fire";case"heat_cool":return"mdi:sun-snowflake-variant";case"dry":return"mdi:water-percent";case"fan_only":default:return"mdi:fan";case"off":return"mdi:power"}}(o);break;case"fan_modes":if(!t.attributes.fan_modes)return null;a=document.createElement("ha-attribute-icon"),a.slot="graphic",a.attribute="fan_mode",a.attributeValue=o,a.hass=e._hass,a.stateObj=t;break;case"swing_modes":a=document.createElement("ha-attribute-icon"),a.slot="graphic",a.attribute="swing_mode",a.attributeValue=o,a.hass=e._hass,a.stateObj=t;break;case"preset_modes":a=document.createElement("ha-attribute-icon"),a.slot="graphic",a.attribute="preset_mode",a.attributeValue=o,a.hass=e._hass,a.stateObj=t;break;default:a=!1}return a}C.addEventListener("change",S),S();const O="\n    * {\n        -webkit-tap-highlight-color: transparent !important;\n    }\n    ha-card {\n        margin-top: 0;\n        background: none;\n        opacity: 1;\n    }\n    mwc-list-item {\n        border-radius: var(--bubble-select-list-border-radius, var(--bubble-border-radius, 24px));\n        margin: 0 8px;\n    }\n    mwc-list-item[selected] {\n        color: var(--primary-text-color) !important;\n        background-color: var(--bubble-list-item-accent-color, var(--bubble-accent-color, var(--accent-color)));\n    }\n    ha-select {\n        --mdc-shape-medium: var(--bubble-select-list-border-radius, var(--bubble-border-radius, 32px));\n        --mdc-theme-surface: var(--bubble-select-list-background-color, var(--bubble-select-main-background-color, var(--bubble-main-background-color, var(--card-background-color, var(--secondary-background-color)))));\n        --mdc-shape-large: 32px;\n        --mdc-shape-small: 64px;\n        --mdc-menu-max-width: min-content;\n        --mdc-menu-min-width: var(--bubble-select-list-width, 200px);\n        --mdc-select-max-width: min-content;\n        --mdc-select-outlined-hover-border-color: transparent;\n        --mdc-select-outlined-idle-border-color: transparent;\n        --mdc-theme-primary: transparent;\n        --right-value: calc(var(--mdc-menu-min-width) - 154px);\n    }\n    .mdc-select {\n        color: transparent !important;\n        width: 150px !important;\n        position: absolute !important;\n        pointer-events: none;\n        right: var(--right-value, 46px);\n        top: -28px;\n    }\n    .mdc-menu, mwc-list, .mdc-list-item {\n        pointer-events: auto;\n    }\n    .mdc-select__dropdown-icon {\n        display: none !important;\n    }\n    .mdc-select__selected-text {\n        color: transparent !important;\n    }\n    .mdc-select__anchor {\n        width: 100%;\n        pointer-events: none;\n    }\n    .bubble-dropdown-container {\n        display: flex !important;\n        width: auto;\n        height: 100%;\n        align-items: center;\n    }\n    .bubble-dropdown-arrow {\n        display: flex;\n        position: absolute;\n        background: var(--bubble-select-arrow-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n        height: 36px;\n        width: 36px;\n        right: 6px;\n        pointer-events: none;\n        border-radius: var(--bubble-select-button-border-radius, var(--bubble-border-radius, 20px));\n        align-items: center;\n        justify-content: center;\n        transition: background 0.2s, transform 0.2s;\n        pointer-events: none;\n    }\n    .bubble-dropdown-select {\n        position: relative;\n        width: 42px;\n    }\n    .is-unavailable {\n        opacity: 0.5;\n    }\n    .bubble-select-card-container {\n        position: relative;\n        width: 100%;\n        height: 50px;\n        background-color: var(--bubble-select-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n        border-radius: var(--bubble-select-border-radius, var(--bubble-border-radius, 32px));\n        box-shadow: var(--bubble-select-box-shadow, var(--bubble-box-shadow, none));\n        touch-action: pan-y;\n        box-sizing: border-box;\n        border: solid 2px transparent;\n        transition: all 0.15s;\n        cursor: pointer;\n    }\n    .bubble-select-card,\n    .bubble-select-background {\n        display: flex;\n        position: absolute;\n        justify-content: space-between;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n        transition: background-color 1.5s;\n    }\n    .bubble-select-background {\n        background-color: var(--bubble-select-background-color);\n        opacity: .5;\n        overflow: hidden !important;\n        border-radius: var(--bubble-select-border-radius, var(--bubble-border-radius, 32px));\n    }\n    .is-unavailable .bubble-select-card {\n        cursor: not-allowed;\n    }\n    .bubble-icon-container {\n        display: flex;\n        flex-wrap: wrap;\n        align-content: center;\n        justify-content: center;\n        min-width: 38px;\n        min-height: 38px;\n        margin: 6px;\n        border-radius: var(--bubble-select-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n        background-color: var(--bubble-select-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n        overflow: hidden;\n        position: relative;\n        cursor: pointer;\n    }\n    .bubble-icon-container::after {\n        content: '';\n        background-color: currentColor;\n        position: absolute;\n        display: block;\n        width: 100%;\n        height: 100%;\n        transition: all 1s;\n        left: 0;\n        right: 0;\n        opacity: 0;\n        pointer-events: none;\n    }\n\n    .bubble-icon {\n        display: flex;\n        opacity: 0.6;\n    }\n\n    .bubble-entity-picture {\n        background-size: cover;\n        background-position: center;\n        height: 100%;\n        width: 100%;\n        position: absolute;\n    }\n\n    .bubble-name,\n    .bubble-state {\n        display: flex;\n        position: relative;\n        white-space: nowrap;\n    }\n\n    .bubble-name-container {\n        display: flex;\n        line-height: 18px;\n        flex-direction: column;\n        justify-content: center;\n        flex-grow: 1;\n        margin: 0 16px 0 4px;\n        pointer-events: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-name {\n        font-weight: 600;\n    }\n\n    .bubble-state {\n        font-size: 12px;\n        font-weight: normal;\n        opacity: 0.7;\n    }\n\n    .bubble-feedback-element {\n        position: absolute;\n        top: 0;\n        left: 0;\n        opacity: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgb(0,0,0);\n        pointer-events: none;\n    }\n\n    @keyframes tap-feedback {\n        0% {transform: translateX(-100%); opacity: 0;}\n        64% {transform: translateX(0); opacity: 0.1;}\n        100% {transform: translateX(100%); opacity: 0;}\n    }\n\n    .large .bubble-select-card-container {\n      height: 56px;\n      border-radius: var(--bubble-select-border-radius, var(--bubble-border-radius, 32px));\n    }\n\n    .large .bubble-icon-container {\n      --mdc-icon-size: 24px;\n      min-width: 42px !important;\n      min-height: 42px !important;\n      margin-left: 6px;\n    }\n\n    .rows-2 .bubble-sub-button-container {\n      flex-direction: column;\n      gap: 4px !important;\n      display: grid !important;\n      grid-template-columns: repeat(2, min-content);\n      grid-template-rows: repeat(2, 1fr);\n      grid-auto-flow: column;\n      width: auto;\n    }\n\n    .rows-2 .bubble-sub-button {\n      height: 20px !important;\n    }\n";function z(e,t=e.elements,o){t.dropdownContainer=(0,n.az)("div","bubble-dropdown-container"),t.dropdownSelect=(0,n.az)("ha-select","bubble-dropdown-select"),t.dropdownSelect.setAttribute("outlined",""),t.dropdownArrow=(0,n.az)("ha-icon","bubble-dropdown-arrow"),t.dropdownArrow.setAttribute("icon","mdi:chevron-down"),t.dropdownContainer.appendChild(t.dropdownArrow),t.dropdownStyleElement=(0,n.az)("style"),t.dropdownCustomStyleElement=(0,n.az)("style"),t.dropdownStyleElement.textContent=O,t.dropdownSelect.updateComplete.then((()=>{!function(){if(t.dropdownSelect.shadowRoot)if(t!==e.elements){t.dropdownSelectStyleElement=(0,n.az)("style"),t.dropdownSelectStyleElement.textContent=O,t.dropdownSelect.shadowRoot.appendChild(t.dropdownSelectStyleElement),t.dropdownContainer.appendChild(t.dropdownStyleElement),o&&(t.dropdownContainer.style.width="24px"),t.dropdownArrow.style.height="20px",t.dropdownArrow.style.width="20px",t.mainContainer=t.parentElement.parentElement.parentElement;let e=t.dropdownSelect.shadowRoot.querySelector("mwc-menu");e&&(e.style.position="relative",e.style.right="138px")}else t.dropdownSelect.shadowRoot.appendChild(t.dropdownStyleElement),t.dropdownSelect.shadowRoot.appendChild(t.dropdownCustomStyleElement)}()})),t===e.elements?t.selectCard.appendChild(t.dropdownContainer):t.appendChild(t.dropdownContainer)}function E(e,t=e.elements,n=e.config.entity,o=e.config){const{dropdownArrow:a,dropdownSelect:i,selectCardContainer:r,selectBackground:s}=t,l=t===e.elements?r:t,c=t===e.elements?s:t;t!==e.elements&&(l.style.border="solid 2px rgba(0,0,0,0)");let d=!0;c.addEventListener("click",(e=>{if("mwc-list-item"===e.target.tagName.toLowerCase())return;const n=i.shadowRoot.querySelector("mwc-menu"),o=()=>{a.style.transform="rotate(180deg)",t.dropdownArrow.style.background="var(--accent-color)",l.style.border="var(--bubble-select-border, solid 2px var(--accent-color))",t.mainContainer&&(t.mainContainer.style.overflow="visible")};d?(d=!1,a.style.transition="none",n.setAttribute("open",""),requestAnimationFrame((()=>{n.removeAttribute("open"),setTimeout((()=>{a.style.transition="",o()}),140)}))):(n.hasAttribute("open")||(n.removeAttribute("mdc-menu-surface--is-open-below"),n.setAttribute("mdc-menu-surface--is-open-above",""),n.setAttribute("open","")),o())})),i.addEventListener("closed",(e=>{e.stopPropagation(),e.preventDefault(),a.style.transform="rotate(0deg)",l.style.border="solid 2px rgba(0,0,0,0)",t.dropdownArrow.style.background="",t.mainContainer&&(t.mainContainer.style.overflow="")})),t.dropdownSelect.addEventListener("click",(t=>{const a=t.target.value;!function(e,t,n,o){const a=t?.split(".")[0];switch(a){case"input_select":e._hass.callService("input_select","select_option",{entity_id:t,option:n});break;case"select":e._hass.callService("select","select_option",{entity_id:t,option:n});break;case"climate":switch(o.select_attribute){case"hvac_modes":e._hass.callService("climate","set_hvac_mode",{entity_id:t,hvac_mode:n});break;case"fan_modes":e._hass.callService("climate","set_fan_mode",{entity_id:t,fan_mode:n});break;case"swing_modes":e._hass.callService("climate","set_swing_mode",{entity_id:t,swing_mode:n});break;case"preset_modes":e._hass.callService("climate","set_preset_mode",{entity_id:t,preset_mode:n})}break;case"fan":"preset_modes"===o.select_attribute&&e._hass.callService("fan","set_preset_mode",{entity_id:t,preset_mode:n});break;case"light":"effect_list"===o.select_attribute&&e._hass.callService("light","turn_on",{entity_id:t,effect:n});break;case"media_player":switch(o.select_attribute){case"source_list":e._hass.callService("media_player","select_source",{entity_id:t,source:n});break;case"sound_mode_list":e._hass.callService("media_player","select_sound_mode",{entity_id:t,sound_mode:n})}break;default:console.warn(`Unsupported entity type: ${a}`)}}(e,n,a,o)}))}function B(e,t=e.elements,n=e.config.entity,o){if(t.currentState=e._hass.states[n]?.state,!t.currentState)return;if(t.currentList=n?.startsWith("input_select")||n?.startsWith("select")?e._hass.states[n].attributes.options:e._hass.states[n].attributes[o.select_attribute],t.previousList===t.currentList&&t.previousState===t.currentState)return;let a=t.currentList;for(t.currentState;t.dropdownSelect.firstChild;)t.dropdownSelect.removeChild(t.dropdownSelect.firstChild);a.forEach((a=>{const i=document.createElement("mwc-list-item");i.value=a;const r=T(e,e._hass.states[n],o.select_attribute,a);r&&(i.graphic="icon",i.appendChild(r));const s=function(e,t,n,o){switch(n){case"fan_modes":return e._hass.formatEntityAttributeValue(t,"fan_mode",o);case"hvac_modes":return e._hass.formatEntityState(t,o);case"swing_modes":return e._hass.formatEntityAttributeValue(t,"swing_mode",o);case"preset_modes":return e._hass.formatEntityAttributeValue(t,"preset_mode",o);default:return function(e){const t=e.replace(/_/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}(o)}}(e,e._hass.states[n],o.select_attribute,a);i.appendChild(document.createTextNode(s)),a===function(e,t){switch(t){case"fan_modes":return e.attributes.fan_mode||null;case"swing_modes":return e.attributes.swing_mode||null;case"preset_modes":return e.attributes.preset_mode||null;case"effect_list":return e.attributes.effect||null;case"source_list":return e.attributes.source||null;case"sound_mode_list":return e.attributes.sound_mode||null;default:return e.state}}(e._hass.states[n],o.select_attribute)&&i.setAttribute("selected",""),t.dropdownSelect.appendChild(i),t.previousList=t.currentList,t.previousState=t.currentState})),t.dropdownContainer.appendChild(t.dropdownSelect)}function A(e,t){try{if(e.states[t])return e.states[t]?.state}catch{}}function I(e,t){const n=e.entity&&t.states[e.entity]?t.states[e.entity].state:"unavailable";let o=e.state??e.state_not;if(Array.isArray(o)){const e=o.map((e=>A(t,e))).filter((e=>void 0!==e));o=[...o,...e]}else if("string"==typeof o){const e=A(t,o);o=[o],e&&o.push(e)}return null!=e.state?V(o).includes(n):!V(o).includes(n)}function V(e){return void 0===e||Array.isArray(e)?e:[e]}function P(e,t){return e.every((e=>{if("condition"in e)switch(e.condition){case"screen":return!!(n=e).media_query&&matchMedia(n.media_query).matches;case"user":return function(e,t){return!(!e.users||!t.user?.id)&&e.users.includes(t.user.id)}(e,t);case"numeric_state":return function(e,t){const n=(e.entity?t.states[e.entity]:void 0)?.state;let o=e.above,a=e.below;"string"==typeof o&&(o=A(t,o)??o),"string"==typeof a&&(a=A(t,a)??a);const i=Number(n),r=Number(o),s=Number(a);return!isNaN(i)&&(null==e.above||isNaN(r)||r<i)&&(null==e.below||isNaN(s)||s>i)}(e,t);case"and":return function(e,t){return!e.conditions||P(e.conditions,t)}(e,t);case"or":return function(e,t){return!e.conditions||e.conditions.some((e=>P([e],t)))}(e,t);default:return I(e,t)}var n;return I(e,t)}))}function D(e){return null!=e.entity&&(null!=e.state||null!=e.state_not)}function U(e){return e.every((e=>{if("condition"in e)switch(e.condition){case"screen":return null!=e.media_query;case"user":return null!=e.users;case"numeric_state":return function(e){return null!=e.entity&&(null!=e.above||null!=e.below)}(e);case"and":case"or":return function(e){return null!=e.conditions}(e);default:return D(e)}return D(e)}))}function H(e){const t=e._hass.states[e.config.entity],o=(0,n.IL)(e,e.config.attribute,e.config.entity),a=t?.last_changed,i="state"===e.config.button_type,r=e.config.show_name??!0,s=e.config.show_icon??!0,l=e.config.show_state??i,c=e.config.show_attribute??i,d=e.config.show_last_changed??e.config.show_last_updated??!1,u=e.config.scrolling_effect??!0,b=e.previousConfig||{};if(e.previousState===t&&e.previousAttribute===o&&e.previousLastChanged===a&&b.showName===r&&b.showIcon===s&&b.showState===l&&b.showAttribute===c&&b.showLastChanged===d&&b.scrollingEffect===u)return;let p=t&&l?e._hass.formatEntityState(t):"",h="",m="",g="";var f;c&&o&&(h=t?e._hass.formatEntityAttributeValue(t,e.config.attribute)??o:""),d&&t&&(m=t?(f=(0,n.o0)(a,e._hass.locale.language)).charAt(0).toUpperCase()+f.slice(1):""),e.elements.stateStyles||(e.elements.stateStyles=(0,n.az)("style"),e.elements.stateStyles.innerText=M,e.content.appendChild(e.elements.stateStyles),"pop-up"===e.config.card_type&&e.elements.buttonContainer.appendChild(e.elements.stateStyles)),g=[p,h,m].filter((e=>e)).join(" • "),r?e.elements.name.classList.remove("hidden"):e.elements.name.classList.add("hidden"),s?(e.elements.iconContainer.classList.remove("hidden"),e.elements.nameContainer.classList.remove("name-without-icon")):(e.elements.iconContainer.classList.add("hidden"),e.elements.nameContainer.classList.add("name-without-icon")),(l||d||c)&&!r?e.elements.state.classList.add("state-without-name"):e.elements.state.classList.remove("state-without-name"),l||d||c?(e.elements.state.classList.add("display-state"),e.elements.state.classList.remove("hidden")):(e.elements.state.classList.remove("display-state"),e.elements.state.classList.add("hidden")),(0,n.GP)(e,e.elements.state,g),e.previousState=t,e.previousAttribute=o,e.previousConfig={showName:r,showIcon:s,showState:l,showAttribute:c,showLastChanged:d,scrollingEffect:u}}const M="\n    .hidden {\n        display: none !important;\n    }\n\n    .state-without-name {\n        opacity: 1;\n        font-size: 14px;\n    }\n\n    .name-without-icon {\n        margin-left: 16px;\n    }\n\n    .display-state {\n        display: flex;\n    }\n";function N(e,t=e.content,o=t.firstChild.firstChild,i=!1){const r=e.config.sub_button;if(!r)return;e.previousValues=e.previousValues||{};let l=[...e.previousValues.subButtons||[]];e.elements=e.elements||{};const c=e.elements.subButtonContainer??(0,n.az)("div","bubble-sub-button-container");if(!e.elements.subButtonContainer&&e.config.sub_button){const t=(0,n.az)("style");t.innerText=j,c.appendChild(t),i?o.prepend(c):o.appendChild(c),e.elements.subButtonContainer=c}r.forEach(((t,o)=>{if(!t)return;const i=o+1,r=t.entity??e.config.entity,l=e._hass.states[r],d=t.name??(0,n.IL)(e,"friendly_name",r)??"",u=t.attribute??"",b=(0,n.IL)(e,u,r),p=(0,n.pr)(e,r);if("fan_modes"===u&&null==b)return void(e.elements[i]||(0,n.az)("div","bubble-sub-button bubble-sub-button-"+i)).classList.add("hidden");const h=t.show_name??!1,m=t.show_state??!1,g=t.show_attribute??!1,f=(t.show_last_changed||t.show_last_updated)??!1,_=t.show_icon??!0,y=t.show_background??!0,v=t.state_background??!0,w=t.light_background??!0,x=t.show_arrow??!0,k=r?.startsWith("input_select")||r?.startsWith("select")||t.select_attribute,C=(0,n.q7)(e,t.entity,t.icon??"");let $=e.elements[i]||(0,n.az)("div","bubble-sub-button bubble-sub-button-"+i);if(!e.elements[i]||k&&!$.contains($.dropdownContainer)){let o=Array.prototype.indexOf.call(c.children,$);k&&!$.contains($.dropdownContainer)&&c.contains($)&&(c.removeChild($),$=(0,n.az)("div","bubble-sub-button bubble-sub-button-"+i)),$.nameContainer=(0,n.az)("div","bubble-sub-button-name-container"),$.feedbackContainer=(0,n.az)("div","bubble-feedback-container"),$.feedback=(0,n.az)("div","bubble-feedback-element feedback-element"),$.appendChild($.feedbackContainer),$.feedbackContainer.appendChild($.feedback),k&&(z(e,$,x),$.dropdownContainer.style.display="none",E(e,$,r,t)),$.appendChild($.nameContainer),o>=0&&o<c.children.length?c.insertBefore($,c.children[o]):c.appendChild($),e.elements[i]=$}k?(B(e,$,r,t),x?x&&($.dropdownArrow.style.display="",$.dropdownContainer.style.width="24px"):($.dropdownArrow.style.display="none",$.dropdownContainer.style.width="0px",$.style.padding="6px")):$.contains($.dropdownContainer)&&$.removeChild($.dropdownContainer);const S=!(!k||!$.dropdownSelect)&&Array.from($.dropdownSelect.children).find((e=>e.hasAttribute("selected")))?.value;if(_&&C){let o=$.icon;if(o||(o=(0,n.az)("ha-icon","bubble-sub-button-icon"),o.classList.add("show-icon"),$.appendChild(o),$.icon=o),S){const n=T(e,l,t.select_attribute,S);n&&!t.icon?(o.tagName!==n.tagName||o.icon!==n.icon||o.attribute!==n.attribute||o.attributeValue!==n.attributeValue)&&($.replaceChild(n,o),$.icon=n,o=n):o.icon!==C&&o.setAttribute("icon",C)}else o.icon!==C&&o.setAttribute("icon",C);$.icon.classList.remove("hidden"),$.icon.classList.add("bubble-sub-button-icon","show-icon")}else $.icon&&($.icon.classList.remove("show-icon"),$.icon.classList.add("hidden"));if(y)if(p&&v){const t=(0,n.Vv)("var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))))");w&&$.style.setProperty("--bubble-sub-button-light-background-color",(0,n.mk)(e,r,t?1:.8)),$.classList.add("background-on"),$.classList.remove("background-off")}else $.classList.add("background-off"),$.classList.remove("background-on");else $.classList.remove("background-on"),$.classList.remove("background-off");"none"===t.tap_action?.action&&"none"===t.double_tap_action?.action&&"none"===t.hold_action?.action||$.actionAdded||(a($,k?"":t,r,{tap_action:{action:k?"none":"more-info"},double_tap_action:{action:"none"},hold_action:{action:"none"}}),s($,$.feedback),k&&($.style.pointerEvents="auto",$.style.cursor="pointer"),$.actionAdded=!0);let L="";const O=l&&m?e._hass.formatEntityState(l):"",A=l&&""!==b&&g?e._hass.formatEntityAttributeValue(l,u)??b:"",I=l&&f?(0,n.o0)(l.last_changed,e._hass.locale.language):"";h&&""!==d&&(L+=d),""!==O&&(L+=(L?" · ":"")+O),""!==I&&(L+=(L?" · ":"")+I),""!==A&&(L+=(L?" · ":"")+A),L=L.charAt(0).toUpperCase()+L.slice(1),L||_||k?($.classList.remove("hidden"),$.nameContainer.innerText!==L&&($.nameContainer.innerText=L),_&&$.icon&&(L?($.icon.classList.add("icon-with-state"),$.icon.classList.remove("icon-without-state")):($.icon.classList.add("icon-without-state"),$.icon.classList.remove("icon-with-state"))),L||_||!k?k&&($.dropdownContainer.classList.remove("no-icon-select-container"),$.dropdownArrow.classList.remove("no-icon-select-arrow")):($.dropdownContainer.classList.add("no-icon-select-container"),$.dropdownArrow.classList.add("no-icon-select-arrow"))):($.classList.add("hidden"),$.dropdownContainer&&($.dropdownContainer.classList.remove("no-icon-select-container"),$.dropdownArrow.classList.remove("no-icon-select-arrow")));const D=t.visibility;if(null!=D){const t=V(D);U(t)&&(P(t,e._hass)?$.classList.remove("hidden"):$.classList.add("hidden"))}})),e.previousValues.subButtons=r.slice();for(let t=l.length;t>0;t--)if(t>r.length){let n=e.elements[t];n&&(c.removeChild(n),delete e.elements[t])}}const j="\n    .bubble-sub-button-container {\n        position: relative;\n        display: flex;\n        justify-content: end;\n        right: 8px;\n        align-content: center;\n        gap: 8px;\n        align-items: center;\n    }\n    .bubble-sub-button {\n        display: flex;\n        flex-wrap: nowrap;\n        flex-direction: row-reverse;\n        align-items: center;\n        justify-content: center;\n        position: relative;\n        right: 0;\n        box-sizing: border-box;\n        width: min-content;\n        min-width: 36px;\n        height: 36px;\n        vertical-align: middle;\n        font-size: 12px;\n        border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, 32px));\n        padding: 0 8px;\n        white-space: nowrap;\n        transition: all 0.5s ease-in-out;\n        color: var(--primary-text-color);\n    }\n    .bubble-feedback-container {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, 32px));\n        overflow: hidden;\n        pointer-events: none;\n    }\n    .bubble-sub-button-name-container {\n        display: flex;\n    }\n    .show-icon {\n        display: flex;\n        --mdc-icon-size: 16px;\n    }\n    .background-on {\n        background-color: var(--bubble-sub-button-light-background-color, var(--accent-color));\n    }\n    .background-off {\n        background-color: var(--bubble-sub-button-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n    }\n    .hidden {\n        display: none;\n    }\n    .icon-with-state {\n        margin-right: 4px;\n        --mdc-icon-size: 16px;\n    }\n    .icon-without-state {\n        margin-right: 0;\n        --mdc-icon-size: 20px;\n    }\n    .no-icon-select-arrow {\n        width: 28px !important;\n        height: 28px !important;\n        right: 2px !important;        \n    }\n    .no-icon-select-container {\n        width: 16px !important;\n    }\n    .bubble-dropdown-arrow {\n        background: var(--bubble-select-arrow-background-color) !important;\n    }\n";function q(e){Array.isArray(e.subButtonIcon)||(e.subButtonIcon=[]),"pop-up"===e.config.card_type?e.popUp.querySelectorAll(".bubble-sub-button-icon").forEach(((t,n)=>{e.subButtonIcon[n]=t})):e.content.querySelectorAll(".bubble-sub-button-icon").forEach(((t,n)=>{e.subButtonIcon[n]=t}))}function F(e){let t=e.config.button_type;return"custom"===t&&(console.error('Buttons "custom" have been removed. Use either "switch", "slider", "state" or  "name"'),t=""),e.config.entity?t||"switch":t||"name"}function X(e,t){const o=e._hass.states[e.config.entity];if((0,n.OC)(e,"light"))e._hass.callService("light","turn_on",{entity_id:e.config.entity,brightness:Math.round(255*t/100)});else if((0,n.OC)(e,"media_player"))e._hass.callService("media_player","volume_set",{entity_id:e.config.entity,volume_level:(t/100).toFixed(2)});else if((0,n.OC)(e,"cover"))e._hass.callService("cover","set_cover_position",{entity_id:e.config.entity,position:Math.round(t)});else if((0,n.OC)(e,"input_number")){const a=o.attributes.min??0,i=o.attributes.max??100,r=(0,n.IL)(e,"step")??1;let s=(i-a)*t/100+a,l=Math.round(s/r)*r;e._hass.callService("input_number","set_value",{entity_id:e.config.entity,value:l})}else if((0,n.OC)(e,"fan")){const n=o.attributes.percentage_step??1;let a=Math.round(t/n)*n;e._hass.callService("fan","set_percentage",{entity_id:e.config.entity,percentage:a})}else if((0,n.OC)(e,"climate")){const n=o.attributes.min_temp??0,a=o.attributes.max_temp??1e4,i="°C"===e._hass.config.unit_system.temperature,r=o.attributes.target_temp_step?o.attributes.target_temp_step:i?.5:1;let s=(a-n)*t/100+n,l=Math.round(s/r)*r;l=parseFloat(l.toFixed(1)),e._hass.callService("climate","set_temperature",{entity_id:e.config.entity,temperature:l})}else if((0,n.OC)(e,"number")){const n=o.attributes.min??0,a=o.attributes.max??100,i=o.attributes.step??1;let r=(a-n)*t/100+n,s=Math.round(r/i)*i;e._hass.callService("number","set_value",{entity_id:e.config.entity,value:s})}}function W(e,t){const n=e.elements.rangeSlider.getBoundingClientRect(),o=100*(t-n.left)/n.width,a=Math.min(100,Math.max(0,o));return e.elements.rangeFill.style.transform=`translateX(${a}%)`,a}const R="\n    * {\n        -webkit-tap-highlight-color: transparent !important;\n        -ms-overflow-style: none; /* for Internet Explorer, Edge */\n        scrollbar-width: none; /* for Firefox */\n    }\n    *::-webkit-scrollbar {\n        display: none; /* for Chrome, Safari, and Opera */\n    }\n    ha-card {\n        margin-top: 0;\n        background: none;\n        opacity: 1;\n    }\n    .is-unavailable {\n        opacity: 0.5;\n    }\n\n    .bubble-button-card-container {\n        position: relative;\n        width: 100%;\n        height: 50px;\n        background-color: var(--bubble-button-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n        border-radius: var(--bubble-button-border-radius, var(--bubble-border-radius, 32px));\n        box-shadow: var(--bubble-button-box-shadow, var(--bubble-box-shadow, none));\n        overflow: scroll;\n        touch-action: pan-y;\n    }\n\n    .bubble-button-card,\n    .bubble-range-slider,\n    .bubble-button-background {\n        display: flex;\n        position: absolute;\n        justify-content: space-between;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n        transition: background-color 1.5s;\n    }\n    .bubble-button-background {\n        background-color: var(--bubble-button-background-color);\n        opacity: .5;\n        border-radius: var(--bubble-button-border-radius, var(--bubble-border-radius, 32px));\n    }\n    .bubble-range-fill {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        left: -100%;\n        transition: all .3s;\n        z-index: 0;\n    }\n    .is-dragging .bubble-range-fill {\n        transition: none;\n    }\n    .is-light .bubble-range-fill {\n        opacity: 0.5;\n    }\n    .is-unavailable .bubble-button-card,\n    .is-unavailable .bubble-range-slider {\n        cursor: not-allowed;\n    }\n    .bubble-range-slider {\n        cursor: ew-resize;\n        border-radius: var(--bubble-button-border-radius, var(--bubble-border-radius, 32px));\n        overflow: hidden;\n        mask-image: radial-gradient(white, black);\n        -webkit-mask-image: -webkit-radial-gradient(white, black);\n    }\n    .bubble-icon-container {\n        display: flex;\n        flex-wrap: wrap;\n        align-content: center;\n        justify-content: center;\n        min-width: 38px;\n        min-height: 38px;\n        margin: 6px;\n        border-radius: var(--bubble-button-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n        background-color: var(--bubble-button-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n        overflow: hidden;\n        position: relative;\n        cursor: pointer;\n    }\n\n    .bubble-icon {\n        display: flex;\n        opacity: 0.6;\n    }\n\n    .is-on .bubble-icon {\n      filter: brightness(1.1);\n      opacity: 1;\n    }\n\n    .bubble-entity-picture {\n        background-size: cover;\n        background-position: center;\n        height: 100%;\n        width: 100%;\n        position: absolute;\n    }\n\n    .bubble-name,\n    .bubble-state {\n        display: flex;\n        position: relative;\n        white-space: nowrap;\n    }\n\n    .bubble-name-container {\n        display: flex;\n        line-height: 18px;\n        flex-direction: column;\n        justify-content: center;\n        flex-grow: 1;\n        margin: 0 16px 0 4px;\n        pointer-events: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-name {\n        font-size: 13px;\n        font-weight: 600;\n    }\n\n    .bubble-state {\n        font-size: 12px;\n        font-weight: normal;\n        opacity: 0.7;\n    }\n\n    .bubble-feedback-element {\n        position: absolute;\n        top: 0;\n        left: 0;\n        opacity: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgb(0,0,0);\n        pointer-events: none;\n    }\n\n    @keyframes tap-feedback {\n        0% {transform: translateX(-100%); opacity: 0;}\n        64% {transform: translateX(0); opacity: 0.1;}\n        100% {transform: translateX(100%); opacity: 0;}\n    }\n\n    .large .bubble-button-card-container {\n      height: 56px;\n      border-radius: var(--bubble-button-border-radius, var(--bubble-border-radius, 32px));\n    }\n\n    .large .bubble-icon-container {\n      --mdc-icon-size: 24px;\n      min-width: 42px !important;\n      min-height: 42px !important;\n      margin-left: 8px;\n    }\n\n    .rows-2 .bubble-sub-button-container {\n      flex-direction: column;\n      gap: 4px !important;\n      display: grid !important;\n      grid-template-columns: repeat(2, min-content);\n      grid-template-rows: repeat(2, 1fr);\n      grid-auto-flow: column;\n      width: auto;\n      padding-right: 14px;\n    }\n\n    .rows-2 .bubble-sub-button {\n      height: 20px !important;\n    }\n";function Y(e,t=e.content,o=t){const i=F(e);e.cardType!==`button-${i}`&&e.buttonType!==i&&(function(e,t=e.content,o=t){const a=F(e);e.dragging=!1,e.elements||(e.elements={}),e.elements.buttonCardContainer=(0,n.az)("div","bubble-button-card-container button-container"),e.elements.buttonCard=(0,n.az)("div","bubble-button-card switch-button"),e.elements.buttonBackground=(0,n.az)("div","bubble-button-background"),e.elements.nameContainer=(0,n.az)("div","bubble-name-container name-container"),e.elements.iconContainer=(0,n.az)("div","bubble-icon-container icon-container"),e.elements.name=(0,n.az)("div","bubble-name name"),e.elements.state=(0,n.az)("div","bubble-state state"),e.elements.feedback=(0,n.az)("div","bubble-feedback-element feedback-element"),e.elements.icon=(0,n.az)("ha-icon","bubble-icon icon"),e.elements.image=(0,n.az)("div","bubble-entity-picture entity-picture"),e.elements.style=(0,n.az)("style"),e.elements.customStyle=(0,n.az)("style"),e.elements.feedback.style.display="none",e.elements.style.innerText=R,e.elements.iconContainer.appendChild(e.elements.icon),e.elements.iconContainer.appendChild(e.elements.image),e.elements.nameContainer.appendChild(e.elements.name),"name"!==a&&e.elements.nameContainer.appendChild(e.elements.state),e.elements.buttonCard.appendChild(e.elements.buttonBackground),e.elements.buttonCard.appendChild(e.elements.iconContainer),e.elements.buttonCard.appendChild(e.elements.nameContainer),e.elements.buttonCard.appendChild(e.elements.feedback),e.elements.buttonCardContainer.appendChild(e.elements.buttonCard),t.innerHTML="",o===t&&t.appendChild(e.elements.buttonCardContainer),t.appendChild(e.elements.style),t.appendChild(e.elements.customStyle),o!==t?(o.innerHTML="",e.elements.buttonCardContainer.appendChild(t),o.appendChild(e.elements.buttonCardContainer),e.buttonType=a):e.cardType=`button-${a}`}(e,t,o),"switch"===i?function(e){a(e.elements.iconContainer,e.config),a(e.elements.buttonBackground,e.config.button_action,e.config.entity,{tap_action:{action:"toggle"},double_tap_action:{action:"toggle"},hold_action:{action:"more-info"}}),s(e.elements.buttonBackground,e.elements.feedback)}(e):"slider"===i?function(e){a(e.elements.iconContainer,e.config);let t=0,o=null;e.elements.rangeFill=(0,n.az)("div","bubble-range-fill range-fill"),e.elements.rangeSlider=(0,n.az)("div","bubble-range-slider range-slider"),e.elements.rangeSlider.appendChild(e.elements.rangeFill),e.elements.buttonCardContainer.appendChild(e.elements.rangeSlider),e.elements.buttonCardContainer.insertBefore(e.elements.rangeSlider,e.elements.buttonCard),e.elements.buttonCard.style.cursor="ew-resize",e.elements.buttonCardContainer.addEventListener("pointercancel",(function(){clearTimeout(o),e.dragging=!1,e.elements.buttonCardContainer.classList.remove("is-dragging"),e.elements.buttonCardContainer.removeEventListener("pointermove",r),window.removeEventListener("pointerup",s)})),e.elements.buttonCardContainer.addEventListener("pointerdown",(n=>{n.target.closest(".bubble-action")||(e.elements.buttonCardContainer.setPointerCapture(n.pointerId),e.card.classList.contains("is-unavailable")||(e.dragging=!0,t=n.pageX||(n.touches?n.touches[0].pageX:0),e.elements.buttonCardContainer.classList.add("is-dragging"),e.elements.buttonCardContainer.addEventListener("pointermove",r),window.addEventListener("pointerup",s)))}));const i=(0,n.P2)(X,200);function r(t){if(t.stopPropagation(),t.target.closest(".bubble-action"))return;const n=t.pageX||(t.touches?t.touches[0].pageX:0),o=W(e,n);e.config.slider_live_update&&i(e,o)}function s(t){t.stopPropagation(),clearTimeout(o),o=setTimeout((()=>{e.dragging=!1}),1400);const a=t.pageX||(t.touches?t.touches[0].pageX:0),i=W(e,a);e.config.slider_live_update||X(e,i),(0,n.jk)("selection"),e.elements.buttonCardContainer.classList.remove("is-dragging"),e.elements.buttonCardContainer.removeEventListener("pointermove",r),window.removeEventListener("pointerup",s)}}(e):"state"===i?function(e){a(e.elements.buttonCardContainer,e.config),a(e.elements.buttonBackground,e.config.button_action,e.config.entity,{tap_action:{action:"more-info"},double_tap_action:{action:"more-info"},hold_action:{action:"more-info"}}),s(e.elements.buttonBackground,e.elements.feedback)}(e):"name"===i&&function(e){const t={tap_action:{action:"none"},double_tap_action:{action:"none"},hold_action:{action:"none"}};a(e.elements.iconContainer,e.config,e.config.entity,t),a(e.elements.buttonBackground,e.config.button_action,e.config.entity,t),s(e.elements.buttonBackground,e.elements.feedback)}(e)),"name"!==i&&(function(e){const t=(0,n.y0)(e),o=e.config.card_type;"unavailable"===t?"button"===o?e.card.classList.add("is-unavailable"):"pop-up"===o&&e.elements.headerContainer.classList.add("is-unavailable"):"button"===o?e.card.classList.remove("is-unavailable"):"pop-up"===o&&e.elements.headerContainer.classList.remove("is-unavailable"),(0,n.pr)(e)?"button"===o?e.card.classList.add("is-on"):"pop-up"===o&&e.elements.headerContainer.classList.add("is-on"):"button"===o?e.card.classList.remove("is-on"):"pop-up"===o&&e.elements.headerContainer.classList.remove("is-on")}(e),function(e){const t=e.config.card_type,o=F(e),a=(0,n.OC)(e,"light"),i=(0,n.pr)(e),r=(0,n.mk)(e),s="button"===t?e.card.style.getPropertyValue("--bubble-button-background-color"):e.popUp.style.getPropertyValue("--bubble-button-background-color"),l=e.elements.buttonBackground.style.opacity;let c="",d="";"switch"===o&&i?r&&a?(c=(0,n.mk)(e),d=".5"):(c="var(--bubble-button-accent-color, var(--bubble-accent-color, var(--accent-color)))",d="1"):(c="rgba(0, 0, 0, 0)",d=".5"),s!==c&&("button"===t?e.card.style.setProperty("--bubble-button-background-color",c):"pop-up"===t&&e.popUp.style.setProperty("--bubble-button-background-color",c)),l!==d&&(e.elements.buttonBackground.style.opacity=d)}(e),function(e){if("slider"===F(e)){if(e.elements.rangeFill.style.backgroundColor=(0,n.mk)(e),e.dragging)return;let t=0;if((0,n.OC)(e,"light"))t=100*(0,n.IL)(e,"brightness")/255;else if((0,n.OC)(e,"media_player"))t=(0,n.pr)(e)?100*(0,n.IL)(e,"volume_level"):0;else if((0,n.OC)(e,"cover"))t=(0,n.IL)(e,"current_position");else if((0,n.OC)(e,"input_number")){const o=(0,n.IL)(e,"min"),a=(0,n.IL)(e,"max");t=100*((0,n.y0)(e)-o)/(a-o)}else if((0,n.OC)(e,"fan"))t=(0,n.pr)(e)?(0,n.IL)(e,"percentage"):0;else if((0,n.OC)(e,"climate")){const o=(0,n.IL)(e,"min_temp"),a=(0,n.IL)(e,"max_temp");t=100*((0,n.IL)(e,"temperature")-o)/(a-o)}else if((0,n.OC)(e,"number")){const o=(0,n.IL)(e,"min"),a=(0,n.IL)(e,"max");t=100*((0,n.y0)(e)-o)/(a-o)}e.elements.rangeFill.style.transform=`translateX(${t}%)`}}(e)),function(e){const t=F(e),o="name"!==t&&(0,n.pr)(e),a="name"!==t?(0,n.q7)(e):e.config.icon,i="name"!==t?(0,n.gJ)(e):"",r="name"!==t&&(0,n.OC)(e,"light"),s=e.elements.iconContainer.style.color,l=e.elements.image.style.backgroundImage,c=e.elements.icon.icon,d=e.elements.icon.style.display,u=e.elements.image.style.display;if(r&&o){const t=`var(--bubble-icon-background-color, ${(0,n.mk)(e)})`;s!==t&&(e.elements.iconContainer.style.color=t)}else""!==s&&(e.elements.iconContainer.style.color="");if(""!==i){const t="url("+i+")";l!==t&&(e.elements.image.style.backgroundImage=t),"none"!==d&&(e.elements.icon.style.display="none"),""!==u&&(e.elements.image.style.display="")}else if(""!==a){c!==a&&(e.elements.icon.icon=a);const i=o&&"state"!==t?(0,n.mk)(e):"inherit";e.elements.icon.style.color!==i&&(e.elements.icon.style.color=i),""!==d&&(e.elements.icon.style.display=""),"none"!==u&&(e.elements.image.style.display="none")}else"none"!==d&&(e.elements.icon.style.display="none"),"none"!==u&&(e.elements.image.style.display="none")}(e),H(e),N(e,t,e.elements.buttonCard),"pop-up"!==e.cardType&&function(e){if(q(e),(0,n.jx)(e),!e.config.styles)return;const t=(0,n.y0)(e);let o="";try{o=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card","name",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,t,e.elements.icon,e.subButtonIcon,n.X,e.card,e.card.name):""}catch(e){throw new Error(`Error in generating button custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=o)}(e),function(e){if(e.config.styles?.includes("card.querySelector('.bubble-name').innerText"))return;const t="name"!==F(e)?(0,n.oY)(e):e.config.name;t!==e.elements.previousName&&((0,n.GP)(e,e.elements.name,t),e.elements.previousName=t)}(e)}async function J(e){if("pop-up"!==e.cardType){if(e.getRootNode()instanceof ShadowRoot==0)return;!function(e){try{e.cardType="pop-up",e.verticalStack=e.getRootNode(),e.sectionRow=e.verticalStack.host.parentElement,e.sectionRowContainer=e.sectionRow?.parentElement,e.popUp=e.verticalStack.querySelector("#root"),e.popUp.classList.add("bubble-pop-up","pop-up","is-popup-closed"),e.editor||e.config.background_update||e.verticalStack.removeChild(e.popUp),e.elements={},L(e),e.cardTitle&&(e.cardTitle.style.display="none"),k=k||(e.config.hide_backdrop??!0),e.popUp.style.setProperty("--custom-height-offset-desktop",e.config.margin_top_desktop??"0px"),e.popUp.style.setProperty("--custom-height-offset-mobile",e.config.margin_top_mobile??"0px"),e.popUp.style.setProperty("--custom-margin",`-${e.config.margin??"7px"}`),e.popUp.style.setProperty("--custom-popup-filter",e.config.backdrop_blur&&"0"!==e.config.backdrop_blur?"none":`blur(${e.config.bg_blur??10}px)`),e.popUp.style.setProperty("--custom-shadow-opacity",(e.config.shadow_opacity??0)/100);const t=function(e){return()=>{e.config.hash===location.hash?(l=!0,setTimeout((()=>{l=!1}),100),function(e){e.popUp.classList.contains("is-popup-opened")||(f(e),p(e,!0),requestAnimationFrame((()=>{b(e,!0),h(e.popUp,!0),function(e){const{sectionRow:t,sectionRowContainer:n,popUp:o}=e;o.style.transform="","hui-card"===t?.tagName.toLowerCase()&&(t.hidden=!1,t.style.display="",n?.classList.contains("card")&&(n.style.display=""))}(e)})),m(e,!0),e.config.auto_close>0&&(e.closeTimeout=setTimeout(c,e.config.auto_close)),g("hidden"),e.config.open_action&&o(e.popUp,e.config,"open_action"))}(e)):function(e){e.popUp.classList.contains("is-popup-opened")&&(f(e),h(e.popUp,!1),b(e,!1),e.removeDomTimeout=setTimeout((()=>{p(e,!1),u(e,0)}),300),m(e,!1),g(""),e.config.close_action&&o(e,e.config,"close_action"))}(e)}}(e);window.addEventListener("location-changed",t),window.addEventListener("popstate",t)}catch(e){console.error(e)}}(e),function(e){e.elements={closeIcon:(0,n.az)("ha-icon","bubble-close-icon"),closeButton:(0,n.az)("button","bubble-close-button close-pop-up"),buttonContainer:(0,n.az)("div","bubble-button-container"),header:(0,n.az)("div","bubble-header")},e.elements.closeIcon.icon="mdi:close",e.elements.closeButton.appendChild(e.elements.closeIcon),e.elements.closeButton.addEventListener("click",(()=>{c(),(0,n.jk)("selection")}));const t=e.popUp.querySelector(".bubble-header-container");t?Object.assign(e.elements,{headerContainer:t,closeIcon:t.querySelector(".bubble-close-icon"),closeButton:t.querySelector(".bubble-close-button"),buttonContainer:t.querySelector(".bubble-button-container"),header:t.querySelector(".bubble-header")}):(e.elements.headerContainer=(0,n.az)("div","bubble-header-container"),e.elements.headerContainer.setAttribute("id","header-container"),e.elements.headerContainer.appendChild(e.elements.header),e.elements.headerContainer.appendChild(e.elements.closeButton),e.elements.header.appendChild(e.elements.buttonContainer)),e.popUp.addEventListener("touchstart",(e=>{v=e.touches[0].clientY}),{passive:!0}),e.elements.header.addEventListener("touchmove",(t=>{const n=t.touches[0].clientY-v;n>0&&(e.popUp.style.transform=`translateY(${n}px)`)}),{passive:!0}),e.elements.header.addEventListener("touchend",(t=>{t.changedTouches[0].clientY-v>50?c():e.popUp.style.transform=""}),{passive:!0})}(e),function(e){try{e.elements.style=(0,n.az)("style"),e.elements.style.innerText="\n  .bubble-pop-up-container {\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      margin-top: -50px;\n      max-width: 100%;\n      padding-top: 40px;\n      padding-bottom: 80px;\n      grid-gap: 14px;\n      gap: 14px;\n      column-gap: 14px;\n      --grid-gap: 14px;\n      --vertical-stack-card-gap: 14px;\n      --horizontal-stack-card-gap: 14px;\n      --stack-card-gap: 14px;\n      -ms-overflow-style: none; /* for Internet Explorer, Edge */\n      scrollbar-width: none; /* for Firefox */\n      overflow-y: auto; \n      overflow-x: hidden; \n      grid-auto-rows: min-content;\n      mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 40px), transparent 100%);\n      -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 40px), transparent 100%);\n      padding: 18px 18px calc(140px + var(--custom-height-offset-mobile)) 18px;\n  }\n  .bubble-pop-up-container > * {\n      flex-shrink: 0 !important;\n  }\n  .bubble-pop-up.card-content {\n      width: 100% !important;\n      padding: 0 !important;\n  }\n  .bubble-pop-up {\n      transition: transform 0.3s ease;\n      position: fixed;\n      width: 100%;\n      max-width: 100%;\n      border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) 0 0;\n      box-sizing: border-box;\n      margin-left: var(--custom-margin);\n      left: 7px;\n      z-index: 5 !important;\n      bottom: calc(-56px - var(--custom-height-offset-mobile));\n  }\n  .bubble-pop-up-background {\n      width: 100%;\n      height: 100%;\n      display: flex;\n      top: 0;\n      left: 0;\n      position: absolute;\n      background-color: var(--bubble-pop-up-main-background-color, var(--bubble-pop-up-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color)))));\n      border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) 0 0;\n      backdrop-filter: var(--custom-popup-filter);\n      -webkit-backdrop-filter: var(--custom-popup-filter);\n  }\n  .bubble-pop-up-container::-webkit-scrollbar {\n      display: none; /* for Chrome, Safari, and Opera */\n  }\n  .is-popup-opened {\n      box-shadow: 0px 0px 50px rgba(0, 0, 0, var(--custom-shadow-opacity));\n  }\n  .is-popup-closed { \n      transform: translateY(100%);\n      box-shadow: none !important;\n  }\n\n  @media only screen and (min-width: 600px) {\n      .bubble-pop-up {\n          margin-left: 0 !important;\n          bottom: calc(-56px - var(--custom-height-offset-desktop));\n          min-width: var(--desktop-width, 540px);\n          max-width: var(--desktop-width, 540px);\n          left: calc(50% - (var(--desktop-width, 540px) / 2));\n      }\n      .bubble-pop-up-container {\n          padding: 18px 18px calc(140px + var(--custom-height-offset-desktop)) 18px;\n      }\n  }\n  @media only screen and (min-width: 768px) {\n      .bubble-pop-up {\n        left: calc(var(--mdc-drawer-width, 0px) / 2 + 50% - (var(--desktop-width, 540px) / 2));\n      }\n  }\n  .bubble-pop-up.editor {\n      transition: none !important;\n      position: relative !important;\n      top: 0;\n      left: 0;\n      width: 100% !important;\n      backdrop-filter: none !important;\n      display: flex !important;\n      transform: none !important;\n      height: auto !important;\n      min-width: auto;\n      z-index: 0 !important;\n  }\n  .bubble-header-container {\n      display: inline-flex;\n      height: 50px;\n      margin: 0;\n      padding: 0;\n      z-index: 3;\n      padding: 18px 18px 22px;\n      position: sticky;\n      top: 0;\n      background: none !important;\n      overflow: visible;\n  }\n  .bubble-header {\n      display: inline-flex;\n      flex-grow: 1;\n      margin-right: 14px;\n      color: var(--primary-text-color);\n  }\n  .bubble-name {\n      font-size: 14px;\n      font-weight: heavy;\n  }\n  .bubble-close-button {\n      height: 50px;\n      width: 50px;\n      border: none;\n      border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px));\n      z-index: 1;\n      background: var(--bubble-pop-up-main-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color))));\n      color: var(--primary-text-color);\n      flex-shrink: 0;\n      cursor: pointer;\n  }\n  .bubble-button-card-container {\n      background: var(--bubble-pop-up-main-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color))));\n  }\n  .bubble-pop-up-container.editor-cropped {\n      height: 122px !important;\n      mask-image: linear-gradient(to bottom, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%) !important;\n      -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 40px, black calc(100% - 40px), transparent 100%) !important;   \n  }\n  .bubble-pop-up.editor > .bubble-pop-up-container {\n      padding-bottom: 18px !important;\n      mask-image: none;\n      -webkit-mask-image: none;  \n      overflow: hidden;  \n  }\n  .editor .bubble-pop-up-background {\n      width: 100%;\n      height: 100%;\n      left: 0px;\n      top: 0px;\n      z-index: -1;\n      display: flex;\n      position: absolute;\n      background-color: var(--bubble-pop-up-main-background-color, var(--bubble-pop-up-background-color, var(--bubble-secondary-background-color, var(--background-color, var(--secondary-background-color)))));\n      border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px)) !important;\n      backdrop-filter: none;\n      -webkit-backdrop-filter: none;\n  }\n\n  .no-header .bubble-header-container {\n      visibility: hidden !important;\n      height: 0px !important;\n  }\n  .no-header .bubble-pop-up-container {\n      padding-top: 4px !important;\n      mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%) !important;\n      -webkit-mask-image: linear-gradient(to bottom, transparent 0px, black 24px, black calc(100% - 24px), transparent 100%) !important;\n  }\n\n  .large .bubble-button-card-container {\n    height: 56px;\n    border-radius: var(--bubble-button-border-radius, var(--bubble-border-radius, 36px));\n  }\n  .large .bubble-pop-up-container {\n      margin-top: -36px;\n  }\n  .large .bubble-icon-container {\n    --mdc-icon-size: 24px;\n    min-width: 42px !important;\n    min-height: 42px !important;\n    margin-left: 8px;\n  }\n  .large .bubble-close-button {\n      height: 56px;\n      width: 56px;\n      border: none;\n      border-radius: var(--bubble-pop-up-border-radius, var(--bubble-border-radius, 42px));\n      z-index: 1;\n      --mdc-icon-size: 28px !important;\n  }\n\n  .rows-2 .bubble-sub-button-container {\n    flex-direction: column;\n    gap: 4px !important;\n    display: grid !important;\n    grid-template-columns: repeat(2, min-content);\n    grid-template-rows: repeat(2, 1fr);\n    grid-auto-flow: column;\n    width: auto;\n    padding-right: 14px;\n  }\n  .rows-2 .bubble-sub-button {\n    height: 20px !important;\n  }\n";let o,a=e.popUp.querySelector("style");e.stylesAdded&&a?e.elements.customStyle=a:(e.elements.customStyle=(0,n.az)("style"),e.popUp.appendChild(e.elements.customStyle),e.popUp.appendChild(e.elements.style),e.stylesAdded=!0);const i=e.config.bg_opacity??88;function r(){o=getComputedStyle(document.body).getPropertyValue("--ha-card-background")||getComputedStyle(document.body).getPropertyValue("--card-background-color");const n=e.config.bg_color?e.config.bg_color:o,a=(0,t._k)(n,i/100,1.02);e.popUp.style.setProperty("--bubble-pop-up-background-color",a)}C.addEventListener("change",(()=>{r()}),{passive:!0}),r(),e.popUp.style.setProperty("--desktop-width",e.config.width_desktop??"540px"),e.config.close_on_click&&e.popUp.addEventListener("click",c,{passive:!0}),window.addEventListener("keydown",(t=>{"Escape"===t.key&&e.config.hash===location.hash&&c()}),{passive:!0});let s=e.config.slide_to_close_distance??400;e.popUp.addEventListener("touchmove",(e=>{e.touches[0].clientY-v>s&&e.touches[0].clientY>w&&c(),w=e.touches[0].clientY}),{passive:!0});const l=e.popUp.querySelector(".bubble-pop-up-container");if(null===l){e.elements.popUpContainer=(0,n.az)("div"),e.elements.popUpContainer.classList.add("bubble-pop-up-container");let d=e.popUp.firstChild;for(;d;)e.elements.popUpContainer.appendChild(d),d=e.popUp.firstChild}else e.elements.popUpContainer=l;e.popUpBackground=(0,n.az)("div","bubble-pop-up-background"),e.popUp.appendChild(e.popUpBackground),e.popUp.appendChild(e.elements.headerContainer),e.popUp.appendChild(e.elements.popUpContainer),e.config.hash!==location.hash&&u(e,0),window.dispatchEvent(new Event("location-changed"))}catch(b){console.error(b)}}(e)}else e.popUp&&e.elements&&(e.config.hash!==location.hash&&e.config===e.previousConfig||((e.config.entity||e.config.name)&&Y(e,e.elements.buttonContainer,e.elements.header),requestAnimationFrame((()=>{!function(e){q(e);const t=e.config.card_layout,o="large"===t||"large-2-rows"===t,a="large-2-rows"===t;o!==e.popUp.classList.contains("large")&&e.popUp.classList.toggle("large",o),a!==e.popUp.classList.contains("rows-2")&&e.popUp.classList.toggle("rows-2",a);const i=e.config.show_header??!0;if(e.popUp.classList.contains("no-header")===i&&e.popUp.classList.toggle("no-header",!i),!e.config.styles)return;const r=(0,n.y0)(e),{backdropCustomStyle:s}=L(e);let l="";try{l=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,r,e.elements.icon,e.subButtonIcon,n.X,e.popUp):""}catch(e){throw new Error(`Error in generating pop-up custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=l),s.innerText=l}(e)})),e.previousConfig=e.config),e.editor||function(e){const t=e.config.trigger;if(t){const n=!e.hasPageLoaded;e.hasPageLoaded=!0;const o=V(t);if(U(o)){const t=P(o,e._hass);if(t===e.previousTrigger)return;e.config.hash===location.hash?t||n||c():t&&d(e.config.hash),e.previousTrigger=t}}else{let t=e.config.trigger_entity??"";if(""===t)return;let n=e.config.trigger_state??"",o=e.config.trigger_close??!1,a=e._hass.states[t]?.state;if(!t)return;if(!n)return;if(e.oldTriggerEntityState===a)return;const i=!e.hasPageLoaded;e.hasPageLoaded=!0,e.config.hash===location.hash?o&&n!==a&&(i||c()):a===n&&d(e.config.hash),e.oldTriggerEntityState=a}}(e),function(e){if(!e.verticalStack)return;const{host:t}=e.verticalStack,{popUp:n,sectionRow:o,sectionRowContainer:a,elements:i}=e,r=e._cachedDetectedEditor??=t?.closest("hui-card-preview")||t?.closest("hui-card[preview][class]")||t?.getRootNode().host?.closest("hui-section[preview][class]"),s=n?.classList.contains("is-popup-opened"),l="hui-card"===o?.tagName.toLowerCase();if(e.previousEditorState??=null,e.previousDetectedEditor??=null,!s&&l){const{editor:t,editorAccess:n}=e;t||!n||r||o?.hasAttribute("hidden")?a?.classList.contains("card")&&t&&"none"===a.style.display&&(a.style.display=""):(o.setAttribute("hidden",""),o.style.display="none")}const c=n?.classList;if(e.editor||r){c?.contains("editor")||(document.body.style.overflow="",c?.remove("is-popup-opened"),c?.add("is-popup-closed","editor")),e.editorAccess=!0;const t=null===r;i?.popUpContainer?.classList.contains("editor-cropped")!==t&&i.popUpContainer.classList.toggle("editor-cropped",t)}else c?.contains("editor")&&c.remove("editor"),i?.popUpContainer?.classList.remove("editor-cropped");e.editor===e.previousEditorState&&r===e.previousDetectedEditor||(function(e){const{hideBackdrop:t}=L(e),n=e.verticalStack.host,o=n?.closest("hui-card-preview");(e.editor||o)&&(t(),clearTimeout(e.removeDomTimeout),o||e.verticalStack.contains(e.popUp)||e.verticalStack.appendChild(e.popUp))}(e),e.previousEditorState=e.editor,e.previousDetectedEditor=r)}(e))}let G=!1;function K(e,t){const o=e.config[`${t}_name`]??"",a=e.config[`${t}_icon`]??"",i=e.config[`${t}_pir_sensor`],r=e.config[`${t}_link`],s=e.config[`${t}_entity`];G=G||location.hash===r;const l=(0,n.az)("ha-icon","bubble-icon icon");l.icon=a;const u=(0,n.az)("div","bubble-name name");u.innerText=o;const b=(0,n.az)("div","bubble-background-color background-color"),p=(0,n.az)("div","bubble-background background"),h=(0,n.az)("div",`bubble-button bubble-button-${t} button ${r.substring(1)}`);let m=localStorage.getItem(`bubbleButtonWidth-${r}`);return h.style.width=`${m}px`,h.appendChild(l),h.appendChild(u),h.appendChild(b),h.appendChild(p),h.addEventListener("click",(()=>{location.hash!==r&&(G=!1),G?c():d(r),G=!G,(0,n.jk)("light")})),h.icon=l,h.name=u,h.backgroundColor=b,h.background=p,h.pirSensor=i,h.lightEntity=s,h.link=r,h.index=t,window.addEventListener("location-changed",(function(){e.config.highlight_current_view&&(location.pathname===r||location.hash===r?h.classList.add("highlight"):h.classList.remove("highlight"))})),e.elements.buttons.push(h),h}const Z=1,Q=2,ee=8;function te(e,t){return function(e,t){return!(!e||void 0===e.supported_features)&&0!=(e.supported_features&t)}(e.attributes,t)}function ne(e,t){(0,n.OC)(e,"media_player")&&e._hass.callService("media_player","volume_set",{entity_id:e.config.entity,volume_level:(t/100).toFixed(2)})}function oe(e,t,n=!1){const o=e.elements.rangeSlider.getBoundingClientRect(),a=100*(t-o.left)/o.width,i=Math.round(Math.min(100,Math.max(0,a)));if(e.elements.rangeFill.style.transform=`translateX(${i}%)`,n){if(e.dragging)return;ne(e,i)}else ne(e,i)}(0,n.P2)(ne);const ae="\n    * {\n        -webkit-tap-highlight-color: transparent !important;\n    }\n\n    ha-card {\n        margin-top: 0;\n        background: none;\n        opacity: 1;\n        overflow: visible !important;\n    }\n    .is-unavailable {\n        opacity: 0.5;\n    }\n\n    .bubble-media-player-container {\n        position: relative;\n        width: 100%;\n        height: 50px;\n        background-color: var(--bubble-media-player-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n        touch-action: pan-y;\n        border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, 32px));\n        box-shadow: var(--bubble-media-player-box-shadow, var(--bubble-box-shadow, none));\n    }\n\n    .bubble-media-player {\n        display: flex;\n        position: absolute;\n        justify-content: space-between;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n        transition: background-color 1.5s;\n        border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, 32px));\n        background-color: rgba(0,0,0,0);\n    }\n\n    .bubble-button-container {\n        display: inline-grid;\n        grid-auto-flow: column;\n        gap: 10px;\n        align-self: center;\n        margin-right: 8px;\n    }\n\n    .bubble-play-pause-button,\n    .bubble-previous-button,\n    .bubble-next-button,\n    .bubble-volume-button,\n    .bubble-power-button {\n        background: none;\n        border: none;\n        cursor: pointer;\n        border-radius: var(--bubble-media-player-buttons-border-radius, var(--bubble-border-radius, 32px));\n        padding: 6px;\n        height: 24px;\n        width: 24px;\n        transition: background 0.3s ease;\n        align-self: center;\n    }\n\n    .bubble-play-pause-button {\n        background-color: var(--bubble-accent-color, var(--accent-color));\n    }\n\n    .bubble-volume-slider {\n        position: absolute;\n        width: calc(100% - 150px);\n        height: 38px;\n        left: 50px;\n        overflow: hidden;\n        border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, 32px));\n        z-index: 1;\n        background-color: var(--bubble-media-player-slider-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n        opacity: 1;\n        transition: opacity .2s, transform .2s;\n        transform: translateX(0);\n    }\n\n    .bubble-range-value {\n        display: flex;\n        justify-content: flex-end;\n        height: 38px;\n        align-items: center;\n        padding-right: 14px;\n        font-size: 12px;\n        opacity: 0.8;\n    }\n\n    .bubble-mute-button {\n        opacity: 1;\n        transition: opacity .2s, transform .2s;\n        transform: translateX(0);\n    }\n\n    .is-hidden {\n        opacity: 0 !important;\n        pointer-events: none;\n        transform: translateX(14px);\n    }\n\n    .bubble-range-fill {\n        z-index: -1;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        left: -100%;\n        transition: all .3s;\n        background-color: var(--accent-color);\n    }\n\n    .is-dragging .bubble-range-fill {\n        transition: none;\n    }\n\n    .is-light .bubble-range-fill {\n        opacity: 0.5;\n    }\n\n    .is-unavailable .bubble-button-card {\n        cursor: not-allowed;\n    }\n\n    .bubble-range-slider {\n        cursor: ew-resize;\n    }\n    .is-unavailable .bubble-range-slider {\n        cursor: not-allowed;\n    }\n\n    .bubble-icon-container {\n        display: flex;\n        flex-wrap: wrap;\n        width: 38px;\n        height: 38px;\n        min-width: 38px;\n        min-height: 38px;\n        align-items: center;\n        justify-content: center;\n        margin: 6px;\n        border-radius: var(--bubble-media-player-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n        background-color: var(--bubble-media-player-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));;\n        overflow: hidden;\n        position: relative;\n        cursor: pointer;\n        pointer-events: auto;\n    }\n\n    .bubble-icon {\n        opacity: 0.6;\n    }\n\n    .is-on .bubble-icon {\n      filter: brightness(1.1);\n      opacity: 1;\n    }\n\n    .bubble-icon,\n    .bubble-mute-button {\n        display: flex;\n        position: absolute;\n        height: 38px;\n        width: 38px;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .bubble-entity-picture {\n        background-size: cover;\n        background-position: center;\n        height: 100%;\n        width: 100%;\n        position: absolute;\n    }\n\n    .bubble-media-info-container {\n        display: flex;\n        line-height: 14px;\n        font-size: 12px;\n        flex-direction: column;\n        justify-content: center;\n        flex-grow: 1;\n        margin-left: 4px;\n        pointer-events: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-title,\n    .bubble-name,\n    .bubble-state,\n    .bubble-artist {\n        display: flex;\n        margin: 2px 0;\n        position: relative;\n        white-space: nowrap;\n    }\n\n    .bubble-title {\n        font-weight: 600;\n    }\n\n    .bubble-name-container {\n        display: flex;\n        line-height: 1em;\n        flex-direction: column;\n        justify-content: center;\n        flex-grow: 1;\n        font-weight: 600;\n        margin-left: 4px;\n        pointer-events: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-name {\n        font-size: 13px;\n        margin: 2px 0;\n    }\n\n    .bubble-state {\n        font-size: 12px;\n        opacity: 0.7;\n        margin: 2px 0;\n        font-weight: normal;\n    }\n\n    .bubble-sub-button-container {\n        right: 0 !important;\n    }\n\n    .bubble-background-container {\n        display: flex;\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        border-radius: inherit;\n        overflow: hidden;\n    }\n\n    .bubble-cover-background {\n        display: flex;\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        background-size: cover;\n        background-position: 50%;\n        filter: blur(50px);\n        opacity: 0.5;\n    }\n\n    @media screen and (max-width: 250px) {\n        .bubble-previous-button {\n            display: none;\n        }\n    }\n\n    @media screen and (max-width: 206px) {\n        .bubble-next-button {\n            display: none;\n        }\n    }\n\n    @media screen and (max-width: 160px) {\n        .bubble-volume-button {\n            display: none;\n        }\n    }\n\n    @keyframes tap-feedback {\n        0% {transform: translateX(-100%); opacity: 0;}\n        64% {transform: translateX(0); opacity: 0.1;}\n        100% {transform: translateX(100%); opacity: 0;}\n    }\n\n    .large .bubble-media-player-container {\n      height: 56px;\n      border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, 32px));\n    }\n\n    .large .bubble-icon-container {\n      --mdc-icon-size: 24px;\n      min-width: 42px !important;\n      min-height: 42px !important;\n      margin-left: 8px;\n    }\n    \n    .large .bubble-play-pause-button {\n      display: flex;\n      height: 42px;\n      width: 42px;\n      padding: 0;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .large .bubble-volume-slider {\n      height: 42px;\n      border-radius: var(--bubble-media-player-border-radius, var(--bubble-border-radius, 32px));\n      left: 60px;\n      width: calc(100% - 168px);\n    }\n\n    .large .bubble-range-value {\n      place-items: center;\n      height: 42px;\n    }\n\n    .large .bubble-button-container {\n      align-items: center;\n    }\n\n    .rows-2 .bubble-sub-button-container {\n      flex-direction: column;\n      gap: 4px !important;\n      display: grid !important;\n      grid-template-columns: repeat(2, 1fr);\n      grid-template-rows: repeat(2, minmax(auto, max-content));\n      grid-auto-flow: column;\n      width: auto;\n    }\n\n    .rows-2 .bubble-sub-button {\n      height: 20px !important;\n    }\n";let ie;function re(e){"media-player"!==e.cardType&&function(e){e.dragging=!1,e.elements={},e.elements.mediaPlayerContainer=(0,n.az)("div","bubble-media-player-container"),e.elements.mediaPlayerCard=(0,n.az)("div","bubble-media-player"),e.elements.mediaInfoContainer=(0,n.az)("div","bubble-media-info-container"),e.elements.nameContainer=(0,n.az)("div","bubble-name-container"),e.elements.buttonContainer=(0,n.az)("div","bubble-button-container"),e.elements.iconContainer=(0,n.az)("div","bubble-icon-container"),e.elements.backgroundContainer=(0,n.az)("div","bubble-background-container"),e.elements.coverBackground=(0,n.az)("div","bubble-cover-background"),e.elements.playPauseButton=(0,n.az)("ha-icon","bubble-play-pause-button"),e.elements.previousButton=(0,n.az)("ha-icon","bubble-previous-button"),e.elements.previousButton.setAttribute("icon","mdi:skip-previous"),e.elements.nextButton=(0,n.az)("ha-icon","bubble-next-button"),e.elements.nextButton.setAttribute("icon","mdi:skip-next"),e.elements.volumeButton=(0,n.az)("ha-icon","bubble-volume-button"),e.elements.volumeButton.setAttribute("icon","mdi:volume-high"),e.elements.powerButton=(0,n.az)("ha-icon","bubble-power-button"),e.elements.powerButton.setAttribute("icon","mdi:power-standby"),e.elements.muteButton=(0,n.az)("ha-icon","bubble-mute-button is-hidden"),e.elements.muteButton.setAttribute("icon","mdi:volume-off"),e.elements.title=(0,n.az)("div","bubble-title"),e.elements.artist=(0,n.az)("div","bubble-artist"),e.elements.name=(0,n.az)("div","bubble-name"),e.elements.state=(0,n.az)("div","bubble-state"),e.elements.icon=(0,n.az)("ha-icon","bubble-icon"),e.elements.image=(0,n.az)("div","bubble-entity-picture"),e.elements.style=(0,n.az)("style"),e.elements.customStyle=(0,n.az)("style"),e.elements.style.innerText=ae,e.elements.iconContainer.appendChild(e.elements.icon),e.elements.iconContainer.appendChild(e.elements.image),e.elements.iconContainer.appendChild(e.elements.muteButton),e.elements.nameContainer.appendChild(e.elements.name),e.elements.nameContainer.appendChild(e.elements.state),e.elements.mediaInfoContainer.appendChild(e.elements.title),e.elements.mediaInfoContainer.appendChild(e.elements.artist),e.elements.buttonContainer.appendChild(e.elements.powerButton),e.elements.buttonContainer.appendChild(e.elements.previousButton),e.elements.buttonContainer.appendChild(e.elements.nextButton),e.elements.buttonContainer.appendChild(e.elements.volumeButton),e.elements.buttonContainer.appendChild(e.elements.playPauseButton),e.elements.mediaPlayerCard.appendChild(e.elements.iconContainer),e.elements.mediaPlayerCard.appendChild(e.elements.mediaInfoContainer),e.elements.mediaPlayerCard.appendChild(e.elements.nameContainer),e.elements.mediaPlayerCard.appendChild(e.elements.buttonContainer),e.elements.backgroundContainer.appendChild(e.elements.coverBackground),e.elements.mediaPlayerContainer.appendChild(e.elements.backgroundContainer),e.content.innerHTML="",e.content.appendChild(e.elements.mediaPlayerContainer),e.content.appendChild(e.elements.style),e.content.appendChild(e.elements.customStyle),e.elements.mediaPlayerContainer.appendChild(e.elements.mediaPlayerCard),a(e.elements.icon,e.config,e.config.entity),a(e.elements.image,e.config,e.config.entity),e.elements.volumeSliderContainer=(0,n.az)("div","bubble-volume-slider is-hidden"),function(e,t){let o=0;function a(t){t.stopPropagation();const n=t.pageX||(t.touches?t.touches[0].pageX:0);Math.abs(o-n)>10&&oe(e,n,!0);const a=e.elements.rangeSlider.getBoundingClientRect(),i=100*(n-a.left)/a.width,r=Math.min(100,Math.max(0,i));e.elements.rangeValue.innerText=Math.round(r)+"%"}function i(n){n.stopPropagation(),e.dragging=!1;const o=n.pageX||(n.touches?n.touches[0].pageX:0);oe(e,o),t.classList.remove("is-dragging"),t.removeEventListener("pointermove",a),t.removeEventListener("pointerup",i);const r=e.elements.rangeSlider.getBoundingClientRect(),s=100*(o-r.left)/r.width,l=Math.min(100,Math.max(0,s));e.elements.rangeValue.innerText=Math.round(l)+"%"}ie=Math.round(100*(0,n.IL)(e,"volume_level"))+"%",e.elements.rangeFill=(0,n.az)("div","bubble-range-fill range-fill"),e.elements.rangeSlider=(0,n.az)("div","bubble-range-slider range-slider"),e.elements.rangeValue=(0,n.az)("div","bubble-range-value"),e.elements.rangeSlider.appendChild(e.elements.rangeValue),e.elements.rangeSlider.appendChild(e.elements.rangeFill),t.appendChild(e.elements.rangeSlider),t.addEventListener("pointercancel",(function(){e.dragging=!1,t.classList.remove("is-dragging"),t.removeEventListener("pointermove",a),t.removeEventListener("pointerup",i)})),t.addEventListener("pointerdown",(n=>{t.setPointerCapture(n.pointerId),e.card.classList.contains("is-unavailable")||(e.dragging=!0,o=n.pageX||(n.touches?n.touches[0].pageX:0),t.classList.add("is-dragging"),t.addEventListener("pointermove",a),t.addEventListener("pointerup",i))})),e.elements.rangeValue.innerText=ie}(e,e.elements.volumeSliderContainer),e.elements.mediaPlayerCard.appendChild(e.elements.volumeSliderContainer),e.elements.volumeButton.addEventListener("click",(()=>{e.elements.volumeSliderContainer.classList.toggle("is-hidden"),e.elements.muteButton.classList.toggle("is-hidden"),e.elements.icon.classList.toggle("is-hidden"),e.elements.image.classList.toggle("is-hidden"),function(e){const t=e.elements.volumeButton.isHidden,n=t?"1":"0",o=t?"mdi:volume-high":"mdi:close";e.elements.volumeButton.setAttribute("icon",o),e.elements.mediaInfoContainer.style.opacity=n,e.elements.nameContainer.style.opacity=n,e.elements.subButtonContainer&&(e.elements.subButtonContainer.style.opacity=n),e.elements.previousButton.style.opacity=n,e.elements.nextButton.style.opacity=n,e.elements.powerButton.style.opacity=n,e.elements.volumeButton.isHidden=!t}(e),ie=Math.round(100*(0,n.IL)(e,"volume_level"))+"%"})),e.elements.powerButton.addEventListener("click",(()=>{const t=(0,n.pr)(e);e._hass.callService("media_player",t?"turn_off":"turn_on",{entity_id:e.config.entity})})),e.elements.muteButton.addEventListener("click",(()=>{const t=!0===(0,n.IL)(e,"is_volume_muted");e._hass.callService("media_player","volume_mute",{entity_id:e.config.entity,is_volume_muted:!t}),e.elements.muteButton.clicked=!0})),e.elements.previousButton.addEventListener("click",(()=>{e._hass.callService("media_player","media_previous_track",{entity_id:e.config.entity})})),e.elements.nextButton.addEventListener("click",(()=>{e._hass.callService("media_player","media_next_track",{entity_id:e.config.entity})})),e.elements.playPauseButton.addEventListener("click",(()=>{e._hass.callService("media_player","media_play_pause",{entity_id:e.config.entity}),e.elements.playPauseButton.clicked=!0})),e.elements.mediaPlayerContainer.addEventListener("click",(()=>(0,n.jk)("selection"))),e.cardType="media-player"}(e),function(e){"unavailable"===(0,n.y0)(e)?e.card.classList.add("is-unavailable"):e.card.classList.remove("is-unavailable"),(0,n.pr)(e)?e.card.classList.add("is-on"):e.card.classList.remove("is-on")}(e),function(e){if(e.config.styles?.includes("card.querySelector('.bubble-name').innerText"))return;const t=(0,n.oY)(e);t!==e.previousName&&(e.elements.name.innerText=t,e.previousName=t,(0,n.GP)(e,e.elements.name,t))}(e),function(e){const t=(0,n.IL)(e,"media_title"),o=(0,n.IL)(e,"media_artist"),a=t+o;a!==e.previousMediaState&&(e.elements.artist.style.display=""===o?"none":"flex",e.previousMediaState=a,(0,n.GP)(e,e.elements.title,t),(0,n.GP)(e,e.elements.artist,o))}(e),function(e){(0,n.IL)(e,"media_title");const t=""===(0,n.IL)(e,"media_artist");e.elements.mediaInfoContainer.style.display=t?"none":"",e.elements.nameContainer.style.display=t?"":"none"}(e),function(e){const t=(0,n.pr)(e),o=(0,n.q7)(e),a=(0,n.gJ)(e),i=e.elements.image.style.backgroundImage,r=e.elements.icon.icon,s=e.elements.icon.style.color;if(""!==a){const t="url("+a+")";i!==t&&(e.elements.image.style.backgroundImage=t),"none"!==e.elements.icon.style.display&&(e.elements.icon.style.display="none"),""!==e.elements.image.style.display&&(e.elements.image.style.display="")}else if(""!==o){r!==o&&(e.elements.icon.icon=o);const n=t?"var(--accent-color)":"inherit";s!==n&&(e.elements.icon.style.color=n),""!==e.elements.icon.style.display&&(e.elements.icon.style.display=""),"none"!==e.elements.image.style.display&&(e.elements.image.style.display="none")}else"none"!==e.elements.icon.style.display&&(e.elements.icon.style.display="none"),"none"!==e.elements.image.style.display&&(e.elements.image.style.display="none")}(e),function(e){const t=(0,n.pr)(e),o=(0,n.gJ)(e),a=e.config.cover_background,i=e.elements.coverBackground.style.backgroundImage;if(a&&t&&o){const t="url("+o+")";i!==t&&(e.elements.coverBackground.style.backgroundImage=t)}else""!==i&&(e.elements.coverBackground.style.backgroundImage="")}(e),H(e),function(e){if((0,n.OC)(e,"media_player")&&!1===e.dragging&&e.elements.rangeFill){const t=100*(0,n.IL)(e,"volume_level");e.elements.rangeFill.style.transform=`translateX(${t}%)`}}(e),function(e){const t="playing"===(0,n.y0)(e),o=e.elements.playPauseButton.clicked;t?e.elements.playPauseButton.setAttribute("icon",o?"mdi:play":"mdi:pause"):e.elements.playPauseButton.setAttribute("icon",o?"mdi:pause":"mdi:play"),e.elements.playPauseButton.clicked=!1}(e),function(e){const t=!0===(0,n.IL)(e,"is_volume_muted"),o=e.elements.muteButton.clicked;e.elements.muteButton.style.color=t?o?"":"var(--accent-color)":o?"var(--accent-color)":"",e.elements.muteButton.clicked=!1}(e),function(e){const t=(0,n.pr)(e);e.elements.powerButton.style.color=t?"var(--accent-color)":""}(e),N(e,e.content,e.elements.buttonContainer,!0),function(e){q(e),(0,n.jx)(e);const t=(0,n.y0)(e),o="off"!==t&&"unknown"!==t;if(e.config.hide?.power_button&&"none"!==e.elements.powerButton.style.display?e.elements.powerButton.style.display="none":e.config.hide?.power_button||"none"!==e.elements.powerButton.style.display||(e.elements.powerButton.style.display=""),!e.config.hide?.previous_button&&(e.editor||o)||"none"===e.elements.previousButton.style.display?e.config.hide?.previous_button||!e.editor&&!o||"none"!==e.elements.previousButton.style.display||(e.elements.previousButton.style.display=""):e.elements.previousButton.style.display="none",!e.config.hide?.next_button&&(e.editor||o)||"none"===e.elements.nextButton.style.display?e.config.hide?.next_button||!e.editor&&!o||"none"!==e.elements.nextButton.style.display||(e.elements.nextButton.style.display=""):e.elements.nextButton.style.display="none",!e.config.hide?.volume_button&&(e.editor||o)||"none"===e.elements.volumeButton.style.display?e.config.hide?.volume_button||!e.editor&&!o||"none"!==e.elements.volumeButton.style.display||(e.elements.volumeButton.style.display=""):e.elements.volumeButton.style.display="none",!e.config.hide?.play_pause_button&&(e.editor||o)||"none"===e.elements.playPauseButton.style.display?e.config.hide?.play_pause_button||!e.editor&&!o||"none"!==e.elements.playPauseButton.style.display||(e.elements.playPauseButton.style.display=""):e.elements.playPauseButton.style.display="none",!e.config.styles)return;let a="";try{a=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,t,e.elements.icon,e.subButtonIcon,n.X,e.card):""}catch(e){throw new Error(`Error in generating media player custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=a)}(e)}function se(e){let t="";const n=e._hass.states[e.config.entity],o=(n.attributes.current_temperature,n.attributes.hvac_action),a=n.state,i="heating"===o||"heat"===a&&e.config.state_color,r="cooling"===o||"cool"===a&&e.config.state_color,s="off"!==a&&"unknown"!==a;switch(a){case"fan_only":t="var(--bubble-state-climate-fan-only-color, var(--state-climate-fan-only-color, var(--state-climate-active-color, var(--state-active-color))))";break;case"dry":t="var(--bubble-state-climate-dry-color, var(--state-climate-dry-color, var(--state-climate-active-color, var(--state-active-color))))";break;default:t=r?"var(--bubble-state-climate-cool-color, var(--state-climate-cool-color, var(--state-climate-active-color, var(--state-active-color))))":i?"var(--bubble-state-climate-heat-color, var(--state-climate-heat-color, var(--state-climate-active-color, var(--state-active-color))))":s&&e.config.state_color?"auto"===a?"var(--bubble-state-climate-auto-color, var(--state-climate-auto-color, var(--state-climate-active-color, var(--state-active-color))))":"heat_cool"===a?"var(--bubble-state-climate-heat-cool-color, var(--state-climate-heat-cool-color, var(--state-climate-active-color, var(--state-active-color))))":"var(--bubble-climate-accent-color, var(--bubble-accent-color, var(--accent-color)))":""}return t}let le,ce,de;class ue extends HTMLElement{editor=!1;isConnected=!1;connectedCallback(){this.isConnected=!0,this._hass&&this.updateBubbleCard()}disconnectedCallback(){this.isConnected=!1}set editMode(e){this.editor!==e&&(this.editor=e,this._hass&&this.updateBubbleCard())}set hass(e){!function(e){if(!e.content){let t=e.shadowRoot||e.attachShadow({mode:"open"}),n=document.createElement("ha-card");n.style.cssText="background: none; border: none; box-shadow: none; border-radius: 16px;";let o=document.createElement("div");o.className="card-content",o.style.padding="0",n.appendChild(o),t.appendChild(n),e.card=n,e.content=o}}(this),this._hass=e,this.editor||(this.isConnected||"pop-up"===this.config.card_type)&&this.updateBubbleCard()}updateBubbleCard(){switch(this.config.card_type){case"pop-up":J(this);break;case"button":Y(this);break;case"separator":"separator"!==(e=this).cardType&&function(e){e.elements={},e.elements.separatorCard=(0,n.az)("div","bubble-separator separator-container"),e.elements.icon=(0,n.az)("ha-icon","bubble-icon"),e.elements.name=(0,n.az)("h4","bubble-name"),e.elements.line=(0,n.az)("div","bubble-line"),e.elements.style=(0,n.az)("style"),e.elements.style.innerText="\n    .bubble-separator {\n        display: flex;\n        width: 100%;\n        \n        align-items: center;\n        z-index: 1;\n    }\n    .bubble-icon {\n        display: inline-flex;\n        height: auto;\n        width: auto;\n        margin: 0 22px 0 8px;\n    }\n    .bubble-name {\n        margin: 0 30px 0 0;\n        font-size: 16px;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n    }\n    .bubble-name:empty {\n        display: none;\n    }\n    .bubble-line {\n        border-radius: 6px;\n        opacity: 0.5;\n        flex-grow: 1;\n        height: 6px;\n        background-color: var(--bubble-line-background-color, var(--background-color, var(--secondary-background-color)));\n        margin-right: 14px;\n    }\n    .bubble-sub-button-container {\n        margin: 0 8px;\n        right: 0 !important;\n    }\n\n    .large .bubble-separator {\n        height: 56px;\n    }\n\n    .rows-2 .bubble-sub-button-container {\n        flex-direction: column;\n        gap: 4px !important;\n        display: grid !important;\n        grid-template-columns: repeat(2, min-content);\n        grid-template-rows: repeat(2, 1fr);\n        grid-auto-flow: column;\n        width: auto;\n    }\n\n    .rows-2 .bubble-sub-button {\n        height: 20px !important;\n    }\n",e.elements.customStyle=(0,n.az)("style"),e.elements.separatorCard.appendChild(e.elements.icon),e.elements.separatorCard.appendChild(e.elements.name),e.elements.separatorCard.appendChild(e.elements.line),e.content.innerHTML="",e.content.appendChild(e.elements.separatorCard),e.content.appendChild(e.elements.style),e.content.appendChild(e.elements.customStyle),e.cardType="separator"}(e),function(e){e.elements.icon.icon=(0,n.q7)(e),""===e.elements.icon.icon&&""===e.elements.icon.style.margin?(e.elements.icon.style.margin="0px 8px",e.elements.icon.style.width="0px"):""!==e.elements.icon.icon&&"0px 8px"===e.elements.icon.style.margin&&(e.elements.icon.style.margin="",e.elements.icon.style.width="")}(e),function(e){if(e.config.styles?.includes("card.querySelector('.bubble-name').innerText"))return;const t=(0,n.oY)(e);t!==e.elements.name.innerText&&(e.elements.name.innerText=t)}(e),N(e,e.content,e.elements.separatorCard),function(e){q(e),(0,n.jx)(e);const t=(0,n.y0)(e);let o="";try{o=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,t,e.elements.icon,e.subButtonIcon,n.X,e.card):""}catch(e){throw new Error(`Error in generating separator custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=o)}(e);break;case"cover":!function(e){"cover"!==e.cardType&&function(e){e.elements={},e.elements.coverCardContainer=(0,n.az)("div","bubble-cover-card-container cover-container"),e.elements.headerContainer=(0,n.az)("div","bubble-header header-container"),e.elements.buttonsContainer=(0,n.az)("div","bubble-buttons buttons-container"),e.elements.iconContainer=(0,n.az)("div","bubble-icon-container icon-container"),e.elements.icon=(0,n.az)("ha-icon","bubble-icon"),e.elements.nameContainer=(0,n.az)("div","bubble-name-container name-container"),e.elements.name=(0,n.az)("div","bubble-name name"),e.elements.state=(0,n.az)("div","bubble-state state"),e.elements.buttonOpen=(0,n.az)("div","bubble-button bubble-open button open"),e.elements.buttonStop=(0,n.az)("div","bubble-button bubble-stop button stop"),e.elements.buttonClose=(0,n.az)("div","bubble-button bubble-close button close"),e.elements.iconOpen=(0,n.az)("ha-icon","bubble-icon bubble-icon-open"),e.elements.iconStop=(0,n.az)("ha-icon","bubble-icon bubble-icon-stop"),e.elements.iconStop.icon="mdi:stop",e.elements.iconClose=(0,n.az)("ha-icon","bubble-icon bubble-icon-close"),e.elements.style=(0,n.az)("style"),e.elements.style.innerText="\n    * {\n        -webkit-tap-highlight-color: transparent !important;\n    }\n    ha-card {\n        margin-top: 0 !important;\n        background: none !important;\n    }\n\n    .bubble-cover-card-container {\n        display: grid;\n        gap: 10px;\n        overflow: hidden;\n    }\n\n    .bubble-header {\n        display: flex;\n        align-items: center;\n    }\n\n    .bubble-icon-container {\n        display: flex;\n        flex-wrap: wrap;\n        align-content: center;\n        justify-content: center;\n        min-width: 38px;\n        min-height: 38px;\n        border-radius: var(--bubble-cover-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n        background-color: var(--bubble-cover-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n        border: 6px solid var(--bubble-cover-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n        cursor: pointer;\n    }\n\n    .bubble-name-container {\n        display: flex;\n        line-height: 1em;\n        flex-direction: column;\n        justify-content: center;\n        flex-grow: 1;\n        font-weight: 600;\n        margin-left: 4px;\n        margin-right: 16px;\n        pointer-events: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-name {\n        font-size: 13px;\n        margin: 2px 0;\n        white-space: nowrap;\n        display: flex;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-state {\n        font-size: 12px;\n        opacity: 0.7;\n        margin: 2px 0;\n        font-weight: normal;\n        white-space: nowrap;\n        display: flex;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-buttons {\n        display: grid;\n        align-self: center;\n        grid-auto-flow: column;\n        grid-gap: 18px;\n    }\n\n    .bubble-icon {\n        display: flex; \n        height: 24px; \n        width: 24px; \n        color: var(--primary-text-color);\n    }\n\n    .bubble-button.disabled {\n        opacity: 0.3 !important;\n        pointer-events: none !important;\n        cursor: none !important;\n    }\n\n    .bubble-button {\n        display: flex;\n        background: var(--bubble-cover-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n        height: 42px;\n        border-radius: var(--bubble-cover-border-radius, var(--bubble-border-radius, 32px));\n        box-shadow: var(--bubble-cover-box-shadow, var(--bubble-button-box-shadow, var(--bubble-box-shadow, none)));\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        border: none;\n    }\n\n    .large .bubble-cover-card-container {\n      height: 56px;\n      display: flex;\n      background: var(--bubble-cover-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n      border-radius: var(--bubble-cover-border-radius, var(--bubble-border-radius, 32px));\n      box-shadow: var(--bubble-cover-box-shadow, var(--bubble-button-box-shadow, var(--bubble-box-shadow, none)));\n    }\n\n    .large .bubble-buttons .bubble-icon {\n      color: var(--primary-text-color) !important;\n      opacity: 1;\n    }\n\n    .large .bubble-header-container {\n        height: 56px;\n    }\n\n    .large .bubble-header {\n        width: 100%;\n    }\n\n    .large .bubble-icon-container {\n      --mdc-icon-size: 24px;\n      min-width: 42px !important;\n      min-height: 42px !important;\n      align-content: center;\n      border: none;\n      margin: 8px 6px 8px 8px;\n    }\n\n    .large .bubble-icon {\n      align-items: center;\n    }\n\n    .large .bubble-buttons {\n      display: flex;\n      position: relative;\n      right: 18px;\n      align-self: center;\n      grid-gap: 18px;\n    }\n\n    .large .bubble-button,\n    .large .bubble-sub-button {\n      box-shadow: none;\n    }\n\n    .large .bubble-sub-button-container {\n      margin-right: 14px;\n    }\n\n    .rows-2 .bubble-sub-button-container {\n      flex-direction: column;\n      gap: 4px !important;\n      display: grid !important;\n      grid-template-columns: repeat(2, min-content);\n      grid-template-rows: repeat(2, 1fr);\n      grid-auto-flow: column;\n      width: auto;\n      padding-right: 14px;\n    }\n\n    .rows-2 .bubble-sub-button {\n      height: 20px !important;\n    }\n",e.elements.customStyle=(0,n.az)("style"),e.elements.iconContainer.appendChild(e.elements.icon),e.elements.headerContainer.appendChild(e.elements.iconContainer),e.elements.headerContainer.appendChild(e.elements.nameContainer),e.elements.nameContainer.appendChild(e.elements.name),e.elements.nameContainer.appendChild(e.elements.state),e.elements.buttonsContainer.appendChild(e.elements.buttonOpen),e.elements.buttonsContainer.appendChild(e.elements.buttonStop),e.elements.buttonsContainer.appendChild(e.elements.buttonClose),e.elements.buttonOpen.appendChild(e.elements.iconOpen),e.elements.buttonOpen.addEventListener("click",(()=>{const t=e.config.open_service??"cover.open_cover",[n,o]=t.split(".");e._hass.callService(n,o,{entity_id:e.config.entity})})),e.elements.buttonStop.appendChild(e.elements.iconStop),e.elements.buttonStop.addEventListener("click",(()=>{const t=e.config.stop_service??"cover.stop_cover",[n,o]=t.split(".");e._hass.callService(n,o,{entity_id:e.config.entity})})),e.elements.buttonClose.appendChild(e.elements.iconClose),e.elements.buttonClose.addEventListener("click",(()=>{const t=e.config.close_service??"cover.close_cover",[n,o]=t.split(".");e._hass.callService(n,o,{entity_id:e.config.entity})})),a(e.elements.iconContainer,e.config),e.content.innerHTML="",e.content.appendChild(e.elements.coverCardContainer),e.content.appendChild(e.elements.style),e.content.appendChild(e.elements.customStyle),e.elements.coverCardContainer.appendChild(e.elements.headerContainer),e.elements.coverCardContainer.appendChild(e.elements.buttonsContainer),e.elements.coverCardContainer.addEventListener("click",(()=>(0,n.jk)("selection"))),e.cardType="cover"}(e),function(e){const t=e._hass.states[e.config.entity],{current_position:o,assumed_state:a}=t.attributes,i=te(t,Z),r=te(t,Q),s=te(t,ee),l=function(e){return void 0!==e.attributes.current_position?100===e.attributes.current_position:"open"===e.state}(t),c=function(e){return void 0!==e.attributes.current_position?0===e.attributes.current_position:"closed"===e.state}(t),d="curtain"===(0,n.IL)(e,"device_class");e.elements.icon.icon=l?(0,n.q7)(e,e.config.entity,e.config.icon_open):(0,n.q7)(e,e.config.entity,e.config.icon_close),e.elements.iconOpen.icon=e.config.icon_up||(d?"mdi:arrow-expand-horizontal":"mdi:arrow-up"),e.elements.iconClose.icon=e.config.icon_down||(d?"mdi:arrow-collapse-horizontal":"mdi:arrow-down"),void 0!==o?(l?e.elements.buttonOpen.classList.add("disabled"):i&&e.elements.buttonOpen.classList.remove("disabled"),c?e.elements.buttonClose.classList.add("disabled"):r&&e.elements.buttonClose.classList.remove("disabled")):(e.elements.buttonOpen.classList.remove("disabled"),e.elements.buttonClose.classList.remove("disabled")),e.elements.buttonStop.style.display=s?"":"none"}(e),function(e){if(e.config.styles?.includes("card.querySelector('.bubble-name').innerText"))return;const t=(0,n.oY)(e);t!==e.elements.previousName&&(e.elements.name.innerText=t,(0,n.GP)(e,e.elements.name,t),e.elements.previousName=t)}(e),H(e),N(e,e.content,e.elements.headerContainer),function(e){if(q(e),(0,n.jx)(e),!e.config.styles)return;const t=(0,n.y0)(e);let o="";try{o=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,t,e.elements.icon,e.subButtonIcon,n.X,e.card):""}catch(e){throw new Error(`Error in generating cover custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=o)}(e)}(this);break;case"empty-column":!function(e){"empty-column"!==e.cardType&&function(e){e.elements={},e.elements.emptyColumnCard=(0,n.az)("div","bubble-empty-column empty-column"),e.elements.style=(0,n.az)("style"),e.elements.style.innerText="\n    .empty-column {\n        display: flex;\n        width: 100%;\n    }\n",e.elements.customStyle=(0,n.az)("style"),e.content.innerHTML="",e.content.appendChild(e.elements.emptyColumnCard),e.content.appendChild(e.elements.style),e.content.appendChild(e.elements.customStyle),e.cardType="empty-column"}(e)}(this);break;case"horizontal-buttons-stack":!function(e){"horizontal-buttons-stack"!==e.cardType&&function(e){e.elements={},e.elements.buttons=[],e.elements.cardContainer=(0,n.az)("div","bubble-horizontal-buttons-stack-card-container horizontal-buttons-stack-container");let t=1;for(;e.config[t+"_link"];)e.elements.cardContainer.appendChild(K(e,t)),t++;e.elements.style=(0,n.az)("style"),e.elements.style.innerText="\n    @keyframes from-bottom {\n        0% { transform: translate(-50%, 100px); }\n        26% { transform: translate(-50%, -8px); }\n        46% { transform: translate(-50%, 1px); }\n        62% { transform: translate(-50%, -2px); }\n        70% { transform: translate(-50%, 0); }\n        100% { transform: translate(-50%, 0); }\n    }\n    @keyframes pulse {\n        0% { filter: brightness(0.7); }\n        100% { filter: brightness(1.3); }\n    }\n    ha-card {\n        border-radius: 0;\n    }\n    .horizontal-buttons-stack-card {\n        bottom: 16px;\n        height: 51px;\n        margin-top: 0;\n        position: fixed;\n        width: calc(100% - var(--mdc-drawer-width, 0px) - 8px);\n        left: calc(var(--mdc-drawer-width, 0px) + 4px);\n        z-index: 6; /* Higher value hide the more-info panel */\n    }\n    @media only screen and (max-width: 870px) {\n        .horizontal-buttons-stack-card {\n            width: calc(100% - 16px);\n            left: 8px;\n        }\n\n        .horizontal-buttons-stack-card::before {\n            left: -10px;\n        }\n    }\n    .horizontal-buttons-stack-card::before {\n        content: '';\n        position: absolute;\n        top: -32px;\n        display: none;\n        background: linear-gradient(0deg, var(--background-color, var(--primary-background-color)) 50%, rgba(79, 69, 87, 0));\n        width: 200%;\n        height: 100px;\n        pointer-events: none;\n    }\n    .has-gradient.horizontal-buttons-stack-card::before {\n        display: block;\n    }\n\n    .card-content {\n        width: calc(100% + 36px);\n        padding: 0 !important;\n        max-width: calc(var(--desktop-width) - 8px);\n        box-sizing: border-box;\n        overflow: scroll;\n        position: absolute;\n        left: 50%;\n        transform: translateX(-50%);\n        -ms-overflow-style: none;\n        scrollbar-width: none;\n        -webkit-mask-image: linear-gradient(\n            90deg,\n            #000000 0%,\n            #000000 calc(0% + 28px),\n            #000000 calc(100% - 28px),\n            transparent 100%\n        );\n    }\n    .is-scrollable.card-content {\n        padding: 0 !important;\n        width: 100%;\n    }\n    .is-scrolled.card-content {\n        padding: 0 !important;\n        width: 100%;\n        -webkit-mask-image: linear-gradient(\n            90deg,\n            transparent 0%,\n            #000000 calc(0% + 28px),\n            #000000 calc(100% - 28px),\n            transparent 100%\n        );\n    }\n    .is-maxed-scroll.card-content {\n        -webkit-mask-image: linear-gradient(\n            90deg,\n            transparent 0%,\n            #000000 calc(0% + 28px),\n            #000000 calc(100% - 28px),\n            #000000 100%\n        );\n    }\n    .card-content::-webkit-scrollbar {\n        display: none;\n    }\n\n    .bubble-horizontal-buttons-stack-card-container {\n        height: 51px;\n        position: relative;\n        margin: auto;\n    }\n\n    .bubble-button {\n        align-items: center;\n        border-radius: var(--bubble-horizontal-buttons-stack-border-radius, var(--bubble-border-radius, 32px));\n        color: var(--primary-text-color);\n        cursor: pointer;\n        display: inline-flex;\n        height: 50px;\n        left: 0;\n        padding: 0 16px;\n        position: absolute;\n        white-space: nowrap;\n        z-index: 1;\n        transition: transform 1s;\n        box-sizing: border-box;\n    }\n    .bubble-button.highlight {\n        animation: pulse 1.4s infinite alternate;\n    }\n    .bubble-background-color {\n        border: 1px solid var(--primary-text-color);\n        border-radius: var(--bubble-horizontal-buttons-stack-border-radius, var(--bubble-border-radius, 32px));\n        box-sizing: border-box;\n        height: 100%;\n        left: 0;\n        position: absolute;\n        top: 0;\n        transition: background-color 1s;\n        width: 100%;\n        z-index: -1;\n    }\n    .bubble-background {\n        opacity: 0.8;\n        border-radius: var(--bubble-horizontal-buttons-stack-border-radius, var(--bubble-border-radius, 32px));\n        width: 100%;\n        height: 100%;\n        box-sizing: border-box !important;\n        position: absolute;\n        left: 0;\n        z-index: -2;\n        background-color: var(--background-color,var(--primary-background-color));\n    }\n    .bubble-icon {\n        height: 24px;\n        width: 24px;\n    }\n    .bubble-icon + .bubble-name {\n        margin-left: 8px;\n    }\n\n\n    .horizontal-buttons-stack-card.editor {\n        position: relative;\n        width: 100%;\n        left: 0;\n        bottom: 0;\n    }\n    .horizontal-buttons-stack-card.editor::before {\n        background: none;\n    }\n\n",e.elements.customStyle=(0,n.az)("style"),e.card.classList.add("horizontal-buttons-stack-card"),e.card.style.marginLeft=e.config.margin??"",e.config.hide_gradient||e.card.classList.add("has-gradient"),e.card.style.setProperty("--desktop-width",e.config.width_desktop??"500px"),e.elements.cardContainer.appendChild(e.elements.style),e.elements.cardContainer.appendChild(e.elements.customStyle),e.content.appendChild(e.elements.cardContainer),e.content.addEventListener("scroll",(()=>{e.content.scrollLeft>0?e.content.classList.add("is-scrolled"):e.content.classList.remove("is-scrolled"),e.content.scrollWidth-12<e.content.offsetWidth+e.content.scrollLeft?e.content.classList.add("is-maxed-scroll"):e.content.classList.remove("is-maxed-scroll")})),(e.config.rise_animation??1)&&(e.content.style.animation="from-bottom .6s forwards",setTimeout((()=>{e.content.style.animation="none"}),1500));let o=e.card.parentNode.host;o&&!e.editor&&"hui-card"!==o.parentElement.tagName.toLowerCase()?o.style.padding="0 0 80px":o.parentElement&&!e.editor&&"hui-card"===o.parentElement.tagName.toLowerCase()&&(o.parentElement.style.padding="0 0 80px"),e.cardType="horizontal-buttons-stack"}(e),function(e){if(!e.config.styles)return;let t="";try{t=e.config.styles?Function("hass","card",`return \`${e.config.styles}\`;`)(e._hass,e.card):""}catch(e){throw new Error(`Error in generating horizontal buttons stack custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=t)}(e),function(e){if(!e.config.auto_order)return;const t=e._hass.states;e.elements.buttons.sort(((e,n)=>{if(!t[e.pirSensor])return 1;if(!t[e.pirSensor])return-1;const o=t[e.pirSensor]?.last_updated,a=t[n.pirSensor]?.last_updated;return"on"===t[e.pirSensor]?.state&&"on"===t[n.pirSensor]?.state?o>a?-1:o===a?0:1:"on"===t[e.pirSensor]?.state?-1:"on"===t[n.pirSensor]?.state?1:o>a?-1:o===a?0:1}))}(e),function(e){e.elements.buttons.forEach((t=>{const n=t.index,o=e.config[`${n}_name`]??"",a=e.config[`${n}_icon`]??"",i=e.config[`${n}_pir_sensor`],r=e.config[`${n}_link`],s=e.config[`${n}_entity`];t.pirSensor=i,t.lightEntity=s,t.link=r,o?(t.name.innerText=o,t.name.style.display=""):t.name.style.display="none",a?(t.icon.icon=a,t.icon.style.display=""):t.icon.style.display="none",void 0===r&&(t.remove(),e.elements.buttons=e.elements.buttons.filter((e=>e!==t)),e.elements.buttons.forEach(((e,t)=>{e.index=t+1})))}));let t=e.elements.buttons.length+1;for(;void 0!==e.config[`${t}_link`];){if(!e.elements.buttons.find((e=>e.index===t))){const n=K(e,t);e.elements.buttons.push(n)}t++}}(e),function(e){const t=e.shadowRoot.host.closest("hui-card-preview, hui-card-options");e.editor||null!==t?(e.elements.cardContainer.classList.add("editor"),e.card.classList.add("editor")):(e.elements.cardContainer.classList.remove("editor"),e.card.classList.remove("editor"))}(e),function(e){let t=0;for(let n=0;n<e.elements.buttons.length;++n){let o=localStorage.getItem(`bubbleButtonWidth-${e.elements.buttons[n].link}`);e.elements.buttons[n].style.width="";const a=e.elements.buttons[n].offsetWidth;e.elements.buttons[n].style.width=`${a}px`,a>0&&(o=a,localStorage.setItem(`bubbleButtonWidth-${e.elements.buttons[n].link}`,`${a}`)),null!==o&&(e.elements.buttons[n].style.transform=`translateX(${t}px)`,e.elements.buttons[n].style.width="",t+=+o+12)}e.elements.cardContainer.style.width=`${t}px`}(e),function(e){e.elements.buttons.forEach((n=>{const o=e._hass.states[n.lightEntity],a=o?.attributes.rgb_color,i=o?.state;if(a){const e=(0,t.wW)(a)?"rgba(255, 220, 200, 0.5)":`rgba(${a}, 0.5)`;n.backgroundColor.style.backgroundColor=e,n.backgroundColor.style.borderColor="rgba(0, 0, 0, 0)"}else"on"==i?(n.backgroundColor.style.backgroundColor="rgba(255, 255, 255, 0.5)",n.backgroundColor.style.borderColor="rgba(0, 0, 0, 0)"):(n.backgroundColor.style.backgroundColor="rgba(0, 0, 0, 0)",n.backgroundColor.style.borderColor="var(--primary-text-color)")}))}(e),function(e){e.content.scrollWidth>=e.content.offsetWidth?e.content.classList.add("is-scrollable"):e.content.classList.remove("is-scrollable")}(e)}(this);break;case"media-player":re(this);break;case"select":!function(e){e.cardType,"select"!==e.cardType&&(function(e){e.elements||(e.elements={});let t=e.content;e.elements.selectCardContainer=(0,n.az)("div","bubble-select-card-container"),e.elements.selectCard=(0,n.az)("div","bubble-select-card"),e.elements.selectBackground=(0,n.az)("div","bubble-select-background"),e.elements.nameContainer=(0,n.az)("div","bubble-name-container"),e.elements.iconContainer=(0,n.az)("div","bubble-icon-container"),e.elements.name=(0,n.az)("div","bubble-name"),e.elements.state=(0,n.az)("div","bubble-state"),e.elements.feedback=(0,n.az)("div","bubble-feedback-element"),e.elements.icon=(0,n.az)("ha-icon","bubble-icon"),e.elements.image=(0,n.az)("div","bubble-entity-picture"),e.elements.style=(0,n.az)("style"),e.elements.customStyle=(0,n.az)("style"),e.elements.feedback.style.display="none",e.elements.style.innerText=O,s(e.elements.selectBackground,e.elements.feedback),a(e.elements.iconContainer,e.config,e.config.entity),e.elements.iconContainer.appendChild(e.elements.icon),e.elements.iconContainer.appendChild(e.elements.image),e.elements.nameContainer.appendChild(e.elements.name),e.elements.nameContainer.appendChild(e.elements.state),e.elements.selectCard.appendChild(e.elements.selectBackground),e.elements.selectCard.appendChild(e.elements.iconContainer),e.elements.selectCard.appendChild(e.elements.nameContainer),e.elements.selectCardContainer.appendChild(e.elements.selectCard),e.elements.selectBackground.appendChild(e.elements.feedback),t.innerHTML="",t.appendChild(e.elements.selectCardContainer),t.appendChild(e.elements.style),t.appendChild(e.elements.customStyle),e.cardType="select"}(e),z(e),E(e)),B(e,e.elements,e.config.entity,e.config),function(e){"unavailable"===(0,n.y0)(e)?e.card.classList.add("is-unavailable"):e.card.classList.remove("is-unavailable")}(e),function(e){const t=(0,n.q7)(e),o=(0,n.gJ)(e);""!==o?(e.elements.image.style.backgroundImage="url("+o+")",e.elements.icon.style.display="none",e.elements.image.style.display=""):""!==t?(e.elements.icon.icon=t,e.elements.icon.style.color="inherit",e.elements.icon.style.display="",e.elements.image.style.display="none"):(e.elements.icon.style.display="none",e.elements.image.style.display="none")}(e),function(e){if(e.config.styles?.includes("card.querySelector('.bubble-name').innerText"))return;const t=(0,n.oY)(e);t!==e.elements.previousName&&((0,n.GP)(e,e.elements.name,t),e.elements.previousName=t)}(e),H(e),N(e,e.content,e.elements.dropdownContainer,!0),function(e){q(e),(0,n.jx)(e);const t=(0,n.y0)(e);let o="";try{o=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,t,e.elements.icon,e.subButtonIcon,n.X,e.card):""}catch(e){throw new Error(`Error in generating select custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=o,e.elements.dropdownCustomStyleElement.innerText=o)}(e)}(this);break;case"climate":!function(e){"climate"!==e.cardType&&function(e){e.dragging=!1,e.elements={};const t=e.config.entity,o=e._hass.states[t],i="°C"===e._hass.config.unit_system.temperature,r=o.attributes.target_temp_step?o.attributes.target_temp_step:i?.5:1;function l(t,o,a){const i=(0,n.az)("div","bubble-climate-minus-button"),r=(0,n.az)("div","bubble-climate-plus-button"),l=(0,n.az)("ha-icon","bubble-climate-minus-button-icon");l.setAttribute("icon","mdi:minus"),i.appendChild(l),s(i);const c=(0,n.az)("ha-icon","bubble-climate-plus-button-icon");let d,u;c.setAttribute("icon","mdi:plus"),r.appendChild(c),s(r),"temperature"===o?(e.elements.tempDisplay=(0,n.az)("div","bubble-temperature-display"),d=e.elements.tempDisplay):"target_temp_low"===o?(e.elements.lowTempDisplay=(0,n.az)("div","bubble-low-temperature-display"),d=e.elements.lowTempDisplay):"target_temp_high"===o&&(e.elements.highTempDisplay=(0,n.az)("div","bubble-high-temperature-display"),d=e.elements.highTempDisplay),t.appendChild(i),t.appendChild(d),t.appendChild(r);let b=parseFloat((0,n.IL)(e,o))||0,p=b;function h(t){"temperature"===o?e.elements.tempDisplay.innerText=t.toFixed(1):"target_temp_low"===o?e.elements.lowTempDisplay.innerText=t.toFixed(1):"target_temp_high"===o&&(e.elements.highTempDisplay.innerText=t.toFixed(1))}function m(){const t=parseFloat((0,n.IL)(e,o))||0;t!==p&&(b=t,p=t)}function g(){m();const t={entity_id:e.config.entity};"target_temp_low"===o?(t.target_temp_low=b,t.target_temp_high=(0,n.IL)(e,"target_temp_high")):"target_temp_high"===o?(t.target_temp_high=b,t.target_temp_low=(0,n.IL)(e,"target_temp_low")):t[o]=b,e._hass.callService("climate","set_temperature",t)}i.addEventListener("click",(()=>{m(),b=parseFloat((b-a).toFixed(1)),h(b),clearTimeout(u),u=setTimeout(g,700)})),r.addEventListener("click",(()=>{m(),b=parseFloat((b+a).toFixed(1)),h(b),clearTimeout(u),u=setTimeout(g,700)}))}e.elements.climateContainer=(0,n.az)("div","bubble-climate-container"),e.elements.climateCard=(0,n.az)("div","bubble-climate"),e.elements.buttonContainer=(0,n.az)("div","bubble-button-container"),e.elements.nameContainer=(0,n.az)("div","bubble-name-container"),e.elements.iconContainer=(0,n.az)("div","bubble-icon-container"),e.elements.name=(0,n.az)("div","bubble-name"),e.elements.state=(0,n.az)("div","bubble-state"),e.elements.icon=(0,n.az)("ha-icon","bubble-icon"),e.elements.image=(0,n.az)("div","bubble-entity-picture entity-picture"),e.elements.colorBackground=(0,n.az)("div","bubble-color-background"),e.elements.style=(0,n.az)("style"),e.elements.customStyle=(0,n.az)("style"),e.elements.style.innerText="\n    * {\n        -webkit-tap-highlight-color: transparent !important;\n    }\n\n    ha-card {\n        margin-top: 0;\n        background: none;\n        opacity: 1;\n    }\n    .is-unavailable {\n        opacity: 0.5;\n    }\n\n    .bubble-climate-container {\n        position: relative;\n        width: 100%;\n        height: 50px;\n        background-color: var(--bubble-climate-main-background-color, var(--bubble-main-background-color, var(--background-color-2, var(--secondary-background-color))));\n        border-radius: var(--bubble-climate-border-radius, var(--bubble-border-radius, 32px));\n        box-shadow: var(--bubble-climate-box-shadow, var(--bubble-box-shadow, none));\n        overflow: visible;\n        touch-action: pan-y;\n    }\n\n    .bubble-climate {\n        display: flex;\n        position: absolute;\n        justify-content: space-between;\n        align-items: center;\n        height: 100%;\n        width: 100%;\n        transition: background-color 1.5s;\n        background-color: rgba(0,0,0,0);\n    }\n\n    .bubble-button-container {\n        display: inline-grid;\n        grid-auto-flow: column;\n        gap: 10px;\n        align-self: center;\n        align-items: center;\n        margin-right: 8px;\n    }\n\n    .bubble-temperature-container, .bubble-low-temp-container, .bubble-high-temp-container {\n        display: inline-flex;\n        position: relative;\n        font-size: 12px;\n        white-space: nowrap;\n        justify-content: center;\n        align-items: center;\n        width: auto;\n        height: 100%;\n        border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, 32px));\n        background-color: var(--bubble-climate-button-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background))));\n    }\n\n    .bubble-low-temp-container {\n        color: var(--state-climate-heat-color, var(--state-climate-active-color, var(--state-active-color)));\n    }\n\n    .bubble-high-temp-container {\n        color: var(--state-climate-cool-color, var(--state-climate-active-color, var(--state-active-color)));\n    }\n\n    .bubble-target-temperature-container {\n        display: flex;\n        gap: 10px;\n    }\n\n    .bubble-climate-minus-button,\n    .bubble-climate-plus-button {\n        display: flex;\n        position: relative;\n        align-items: center;\n        justify-content: center;\n        box-sizing: border-box;\n        width: 36px;\n        height: 36px;\n        vertical-align: middle;\n        font-size: 18px;\n        color: var(--primary-text-color);\n        cursor: pointer;\n    }\n\n    .bubble-climate-minus-button-icon,\n    .bubble-climate-plus-button-icon {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        --mdc-icon-size: 16px;\n    }\n\n    .bubble-feedback-container {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        border-radius: var(--bubble-sub-button-border-radius, var(--bubble-border-radius, 32px));\n        overflow: hidden;\n        pointer-events: none;\n    }\n\n    .bubble-feedback-element {\n        position: absolute;\n        top: 0;\n        left: 0;\n        opacity: 0;\n        width: 100%;\n        height: 100%;\n        background-color: rgb(0,0,0);\n        pointer-events: none;\n    }\n\n    .bubble-color-background {\n        display: flex;\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        border-radius: var(--bubble-climate-border-radius, var(--bubble-border-radius, 32px));\n        opacity: 0.7;\n        transition: background-color 2s ease;\n    }\n\n    .is-unavailable .bubble-climate {\n        cursor: not-allowed;\n    }\n\n    .bubble-icon-container {\n        display: flex;\n        flex-wrap: wrap;\n        width: 38px;\n        height: 38px;\n        min-width: 38px;\n        min-height: 38px;\n        align-items: center;\n        justify-content: center;\n        margin: 6px;\n        border-radius: var(--bubble-climate-icon-border-radius, var(--bubble-icon-border-radius, var(--bubble-border-radius, 50%)));\n        background-color: var(--bubble-climate-icon-background-color, var(--bubble-icon-background-color, var(--bubble-secondary-background-color, var(--card-background-color, var(--ha-card-background)))));\n        overflow: hidden;\n        position: relative;\n        cursor: pointer;\n        pointer-events: auto;\n    }\n\n    .bubble-icon {\n        opacity: 0.6;\n    }\n\n    .is-on .bubble-icon {\n      filter: brightness(1.1);\n      opacity: 1;\n    }\n\n    .bubble-icon {\n        display: flex;\n        position: absolute;\n        height: 38px;\n        width: 38px;\n        justify-content: center;\n        align-items: center;\n        transition: all 2s;\n    }\n\n    .bubble-entity-picture {\n        background-size: cover;\n        background-position: center;\n        height: 100%;\n        width: 100%;\n        position: absolute;\n    }\n\n    .bubble-name,\n    .bubble-state {\n        display: flex;\n        margin: 2px 0;\n        position: relative;\n        white-space: nowrap;\n    }\n\n    .bubble-name-container {\n        display: flex;\n        line-height: 1em;\n        flex-direction: column;\n        justify-content: center;\n        flex-grow: 1;\n        font-weight: 600;\n        margin-left: 4px;\n        pointer-events: none;\n        position: relative;\n        overflow: hidden;\n    }\n\n    .bubble-name {\n        font-size: 13px;\n        margin: 2px 0;\n    }\n\n    .bubble-state {\n        font-size: 12px;\n        opacity: 0.7;\n        margin: 2px 0;\n        font-weight: normal;\n    }\n\n    .bubble-sub-button-container {\n        right: 0 !important;\n    }\n\n    .hidden {\n        display: none !important;\n    }\n\n    @keyframes tap-feedback {\n        0% {transform: translateX(-100%); opacity: 0;}\n        64% {transform: translateX(0); opacity: 0.1;}\n        100% {transform: translateX(100%); opacity: 0;}\n    }\n\n    .large .bubble-climate-container {\n      height: 56px;\n      border-radius: var(--bubble-climate-border-radius, var(--bubble-border-radius, 32px));\n    }\n\n    .large .bubble-icon-container {\n      --mdc-icon-size: 24px;\n      min-width: 42px !important;\n      min-height: 42px !important;\n      margin-left: 8px;\n    }\n\n    .rows-2 .bubble-sub-button-container {\n      flex-direction: column;\n      gap: 4px !important;\n      display: grid !important;\n      grid-template-columns: repeat(2, min-content);\n      grid-template-rows: repeat(2, 1fr);\n      grid-auto-flow: column;\n      width: auto;\n    }\n\n    .rows-2 .bubble-sub-button {\n      height: 20px !important;\n    }\n",e.elements.iconContainer.appendChild(e.elements.icon),e.elements.iconContainer.appendChild(e.elements.image),e.elements.nameContainer.appendChild(e.elements.name),e.elements.nameContainer.appendChild(e.elements.state);const c=void 0!==o?.attributes?.target_temp_low,d=void 0!==o?.attributes?.target_temp_high;void 0!==o?.attributes?.temperature&&(e.elements.temperatureContainer=(0,n.az)("div","bubble-temperature-container"),l(e.elements.temperatureContainer,"temperature",r),e.elements.buttonContainer.appendChild(e.elements.temperatureContainer)),(c||d)&&(e.elements.targetTemperatureContainer=(0,n.az)("div","bubble-target-temperature-container"),c&&(e.elements.lowTempContainer=(0,n.az)("div","bubble-low-temp-container"),l(e.elements.lowTempContainer,"target_temp_low",r),e.elements.targetTemperatureContainer.appendChild(e.elements.lowTempContainer)),d&&(e.elements.highTempContainer=(0,n.az)("div","bubble-high-temp-container"),l(e.elements.highTempContainer,"target_temp_high",r),e.elements.targetTemperatureContainer.appendChild(e.elements.highTempContainer)),e.elements.buttonContainer.appendChild(e.elements.targetTemperatureContainer)),e.elements.climateCard.appendChild(e.elements.iconContainer),e.elements.climateCard.appendChild(e.elements.nameContainer),e.elements.climateCard.appendChild(e.elements.buttonContainer),e.elements.climateContainer.appendChild(e.elements.colorBackground),e.elements.climateContainer.appendChild(e.elements.climateCard),e.content.innerHTML="",e.content.appendChild(e.elements.climateContainer),e.content.appendChild(e.elements.style),e.content.appendChild(e.elements.customStyle),a(e.elements.iconContainer,e.config),e.cardType="climate"}(e),function(e){"unavailable"===(0,n.y0)(e)?e.card.classList.add("is-unavailable"):e.card.classList.remove("is-unavailable"),(0,n.pr)(e)?e.card.classList.add("is-on"):e.card.classList.remove("is-on")}(e),function(e){if(e.config.styles?.includes("card.querySelector('.bubble-name').innerText"))return;const t=(0,n.oY)(e);t!==e.previousName&&e.elements.name&&(e.elements.name.innerText=t,e.previousName=t,(0,n.GP)(e,e.elements.name,t))}(e),function(e){const t=(0,n.pr)(e),o=(0,n.q7)(e),a=(0,n.gJ)(e),i=e.elements.image.style.backgroundImage,r=e.elements.icon.icon,s=e.elements.icon.style.color;if(""!==a){const t="url("+a+")";i!==t&&(e.elements.image.style.backgroundImage=t),"none"!==e.elements.icon.style.display&&(e.elements.icon.style.display="none"),""!==e.elements.image.style.display&&(e.elements.image.style.display="")}else if(""!==o){r!==o&&(e.elements.icon.icon=o);const n=t?`var(--bubble-icon-background-color, ${se(e)})`:"inherit";s!==n&&(e.elements.icon.style.color=n),""!==e.elements.icon.style.display&&(e.elements.icon.style.display=""),"none"!==e.elements.image.style.display&&(e.elements.image.style.display="none")}else"none"!==e.elements.icon.style.display&&(e.elements.icon.style.display="none"),"none"!==e.elements.image.style.display&&(e.elements.image.style.display="none")}(e),H(e),function(e){const t=(0,n.IL)(e,"temperature");""===t?e.elements.temperatureContainer?.classList.add("hidden"):e.elements.temperatureContainer?.classList.remove("hidden"),t!==e.previousTemp&&(e.previousTemp=t,e.elements.tempDisplay&&(e.elements.tempDisplay.innerText=parseFloat(t).toFixed(1)))}(e),function(e){const t=(0,n.IL)(e,"target_temp_low"),o=e.config.hide_target_temp_low;""===t?e.elements.targetTemperatureContainer?.classList.add("hidden"):e.elements.targetTemperatureContainer?.classList.remove("hidden"),o?e.elements.lowTempContainer?.classList.add("hidden"):e.elements.lowTempContainer?.classList.remove("hidden"),t!==e.previousTargetTempLow&&(e.previousTargetTempLow=t,e.elements.lowTempDisplay&&(e.elements.lowTempDisplay.innerText=parseFloat(t).toFixed(1)))}(e),function(e){const t=(0,n.IL)(e,"target_temp_high");e.config.hide_target_temp_high?e.elements.highTempContainer?.classList.add("hidden"):e.elements.highTempContainer?.classList.remove("hidden"),t!==e.previousTargetTempHigh&&(e.previousTargetTempHigh=t,e.elements.highTempDisplay&&(e.elements.highTempDisplay.innerText=parseFloat(t).toFixed(1)))}(e),N(e,e.content,e.elements.buttonContainer,!0),function(e){q(e),(0,n.jx)(e);const t=(0,n.y0)(e);if(e.previousState!==t&&(e.previousState=t,e.elements.colorBackground.style.backgroundColor=`var(--bubble-climate-background-color, ${se(e)})`),e.config.card_layout,e.elements.hvacModeDropdown,!e.config.styles)return;let o="";try{o=e.config.styles?Function("hass","entity","state","icon","subButtonIcon","getWeatherIcon","card",`return \`${e.config.styles}\`;`)(e._hass,e.config.entity,t,e.elements.icon,e.subButtonIcon,n.X,e.card):""}catch(e){throw new Error(`Error in generating climate custom templates: ${e.message}`)}e.elements.customStyle&&(e.elements.customStyle.innerText=o)}(e)}(this)}var e}setConfig(e){if(e.error)throw new Error(e.error);if("pop-up"===e.card_type){if(!e.hash)throw new Error("You need to define an hash. Please note that this card must be placed inside a vertical_stack to work as a pop-up.")}else if("horizontal-buttons-stack"===e.card_type){var t={};for(var n in e)if(n.match(/^\d+_icon$/)){var o=n.replace("_icon","_link");if(void 0===e[o])throw new Error("You need to define "+o);if(t[e[o]])throw new Error("You can't use "+e[o]+" twice");t[e[o]]=!0}}else if(["button","cover","climate","select","media-player"].includes(e.card_type)&&!e.entity&&"name"!==e.button_type)throw new Error("You need to define an entity");if("select"===e.card_type&&e.entity&&!e.select_attribute&&!e.entity?.startsWith("input_select")&&!e.entity?.startsWith("select"))throw new Error('"Select menu (from attributes)" missing');if(window.entityError)throw new Error("You need to define a valid entity");if("button"===e.card_type){const t={...e},n=t.button_type||"switch";t.tap_action=t.tap_action??{action:"more-info"},t.double_tap_action=t.double_tap_action??{action:"state"===n?"more-info":"toggle"},t.hold_action=t.hold_action??{action:"state"===n?"more-info":"toggle"},this.config=t}else this.config=e;this._hass&&this.updateBubbleCard()}getCardSize(){switch(this.config.card_type){case"pop-up":return-1e5;case"button":case"separator":case"empty-column":case"media-player":case"select":case"climate":return 1;case"cover":return 2;case"horizontal-buttons-stack":return 0}}static getConfigElement(){return function(){if(!le)try{le=Object.getPrototypeOf(customElements.get("ha-panel-lovelace")),ce=le.prototype?.html,de=le.prototype?.css}catch(e){return void console.error(e.message)}customElements.get("bubble-card-editor")||customElements.define("bubble-card-editor",class extends le{setConfig(e){this._config={...e}}static get properties(){return{hass:{},_config:{}}}get _card_type(){return this._config?.card_type||""}get _button_type(){return this._config?.button_type||("pop-up"===this._config?.card_type?"":"switch")}get _entity(){return this._config?.entity||""}get _name(){return this._config?.name||""}get _icon(){return this._config?.icon||""}get _state(){return this._config?.state||""}get _text(){return this._config?.text||""}get _hash(){return this._config?.hash||"#pop-up-name"}get _trigger_entity(){return this._config?.trigger_entity||""}get _trigger_state(){return this._config?.trigger_state||""}get _trigger_close(){return this._config?.trigger_close||!1}get _margin(){return this._config?.margin||"7px"}get _margin_top_mobile(){return this._config?.margin_top_mobile||"0px"}get _margin_top_desktop(){return this._config?.margin_top_desktop||"0px"}get _width_desktop(){return this._config?.width_desktop||"540px"}get _bg_color(){return this._config?.bg_color||""}get _bg_opacity(){return void 0!==this._config?.bg_opacity?this._config?.bg_opacity:"88"}get _bg_blur(){return void 0!==this._config?.bg_blur?this._config?.bg_blur:"10"}get _backdrop_blur(){return void 0!==this._config?.backdrop_blur?this._config?.backdrop_blur:"0"}get _shadow_opacity(){return void 0!==this._config?.shadow_opacity?this._config?.shadow_opacity:"0"}get _rise_animation(){return void 0===this._config?.rise_animation||this._config?.rise_animation}get _auto_close(){return this._config?.auto_close||""}get _close_on_click(){return this._config?.close_on_click||!1}get _close_by_clicking_outside(){return this._config?.close_by_clicking_outside??!0}get _background_update(){return this._config?.background_update||!1}get _icon_open(){return this._config?.icon_open||""}get _icon_close(){return this._config?.icon_close||""}get _icon_down(){return this._config?.icon_down||""}get _icon_up(){return this._config?.icon_up||""}get _open_service(){return this._config?.open_service||"cover.open_cover"}get _close_service(){return this._config?.close_service||"cover.close_cover"}get _stop_service(){return this._config?.stop_service||"cover.stop_cover"}get _auto_order(){return this._config?.auto_order||!1}get _highlight_current_view(){return this._config?.highlight_current_view||!1}get _show_state(){const e="state"===this._config?.card_type;return this._config?.show_state||e}get _show_attribute(){const e="state"===this._config.card_type;return this._config.show_attribute||e}get _show_last_changed(){const e="state"===this._config.card_type;return this._config.show_last_changed||this._config.show_last_updated||e}get _attribute(){return this._config.attribute||!1}get _hide_backdrop(){return this._config.hide_backdrop??!1}get _hide_gradient(){return this._config.hide_gradient||!1}get _hide_play_pause_button(){return this._config.hide?.play_pause_button||!1}get _hide_next_button(){return this._config.hide?.next_button||!1}get _hide_previous_button(){return this._config.hide?.previous_button||!1}get _hide_volume_button(){return this._config.hide?.volume_button||!1}get _hide_power_button(){return this._config.hide?.power_button||!1}get _sub_button(){return this._config.sub_button||""}get _button_action(){return this._config.button_action||""}get _open_action(){return this._config.open_action||""}get _close_action(){return this._config.close_action||""}get _show_header(){return this._config.show_header??!0}get _slide_to_close_distance(){return this._config.slide_to_close_distance??400}get _slider_live_update(){return this._config.slider_live_update??!1}get _cover_background(){return this._config.cover_background??!1}get _tap_action(){return{action:this._config.tap_action?.action||"more-info",navigation_path:this._config.tap_action?.navigation_path||"",url_path:this._config.tap_action?.url_path||"",service:this._config.tap_action?.service||"",target_entity:this._config.tap_action?.target?.entity_id||"",data:this._config.tap_action?.data||""}}get _double_tap_action(){return{action:this._config.double_tap_action?.action||"toggle",navigation_path:this._config.double_tap_action?.navigation_path||"",url_path:this._config.double_tap_action?.url_path||"",service:this._config.double_tap_action?.service||"",target_entity:this._config.double_tap_action?.target?.entity_id||"",data:this._config.double_tap_action?.data||""}}get _hold_action(){return{action:this._config.hold_action?.action||"toggle",navigation_path:this._config.hold_action?.navigation_path||"",url_path:this._config.hold_action?.url_path||"",service:this._config.hold_action?.service||"",target_entity:this._config.hold_action?.target?.entity_id||"",data:this._config.hold_action?.data||""}}get _selectable_attributes(){return["source_list","sound_mode_list","hvac_modes","fan_modes","swing_modes","preset_modes","effect_list"]}render(){if(!this.hass)return ce``;const t=document.querySelector("body > home-assistant").shadowRoot.querySelector("hui-dialog-edit-card").shadowRoot.querySelector("ha-dialog > div.content > div.element-preview");if("sticky"!==t.style.position&&(t.style.position="sticky",t.style.top="0"),!this.listsUpdated){const s=e=>({label:e,value:e});this.allEntitiesList=Object.keys(this.hass.states).map(s),this.lightList=Object.keys(this.hass.states).filter((e=>"light"===e.substr(0,e.indexOf(".")))).map(s),this.sensorList=Object.keys(this.hass.states).filter((e=>"sensor"===e.substr(0,e.indexOf(".")))).map(s),this.binarySensorList=Object.keys(this.hass.states).filter((e=>"binary_sensor"===e.substr(0,e.indexOf(".")))).map(s),this.coverList=Object.keys(this.hass.states).filter((e=>"cover"===e.substr(0,e.indexOf(".")))).map(s),this.mediaPlayerList=Object.keys(this.hass.states).filter((e=>"media_player"===e.substr(0,e.indexOf(".")))).map(s),this.climateList=Object.keys(this.hass.states).filter((e=>"climate"===e.substr(0,e.indexOf(".")))).map(s),this.inputSelectList=Object.keys(this.hass.states).filter((e=>{const t=this.hass.states[e],n=e.substr(0,e.indexOf(".")),o="input_select"===n||"select"===n,a=this._selectable_attributes.some((e=>t.attributes?.[e]));return o||a})).map(s),this.attributeList=Object.keys(this.hass.states[this._entity]?.attributes||{}).map((e=>{let t=this.hass.states[this._entity];return{label:this.hass.formatEntityAttributeName(t,e),value:e}})),this.cardTypeList=[{label:"Button (Switch, slider, ...)",value:"button"},{label:"Cover",value:"cover"},{label:"Climate",value:"climate"},{label:"Empty column",value:"empty-column"},{label:"Horizontal buttons stack",value:"horizontal-buttons-stack"},{label:"Media player",value:"media-player"},{label:"Pop-up",value:"pop-up"},{label:"Select",value:"select"},{label:"Separator",value:"separator"}],this.buttonTypeList=[{label:"Switch",value:"switch"},{label:"Slider",value:"slider"},{label:"State",value:"state"},{label:"Name / Text",value:"name"}],this.tapActionTypeList=[{label:"More info",value:"more-info"},{label:"Toggle",value:"toggle"},{label:"Navigate",value:"navigate"},{label:"URL",value:"url"},{label:"Call service",value:"call-service"},{label:"Assist",value:"assist"},{label:"No action",value:"none"}],this.listsUpdated=!0}const n=this.allEntitiesList,o=(this.lightList,this.sensorList,this.coverList),a=this.cardTypeList,i=this.buttonTypeList,r="name"===this._config?.button_type;if("pop-up"===this._config?.card_type){const l=this._config?.trigger??[];return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        <ha-textfield
                            label="Hash (e.g. #kitchen)"
                            .value="${this._hash}"
                            .configValue="${"hash"}"
                            @input="${this._valueChanged}"
                        ></ha-textfield>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:dock-top"></ha-icon>
                              Header settings
                            </h4>
                            <div class="content">
                                <ha-formfield .label="Optional - Show header">
                                    <ha-switch
                                        aria-label="Optional - Show header"
                                        .checked=${this._show_header}
                                        .configValue="${"show_header"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Show header</label> 
                                    </div>
                                </ha-formfield>
                                <ha-alert alert-type="info">You can completely hide the pop-up header, including the close button. To close it when hidden, either make a long swipe within the pop-up or click outside of it.</ha-alert>
                                <div style="${this._show_header?"":"display: none;"}">
                                    <hr />
                                    ${this.makeDropdown("Button type","button_type",i)}
                                    ${this.makeDropdown("Optional - Entity","entity",n,r)}               
                                    <ha-textfield
                                        label="Optional - Name"
                                        .value="${this._name}"
                                        .configValue="${"name"}"
                                        @input="${this._valueChanged}"
                                    ></ha-textfield>
                                    ${this.makeDropdown("Optional - Icon","icon")}
                                    ${this.makeShowState()}
                                    <hr />
                                    <ha-expansion-panel outlined>
                                        <h4 slot="header">
                                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                          Tap action on icon
                                        </h4>
                                        <div class="content">
                                            ${this.makeTapActionPanel("Tap action")}
                                            ${this.makeTapActionPanel("Double tap action")}
                                            ${this.makeTapActionPanel("Hold action")}
                                        </div>
                                    </ha-expansion-panel>
                                    <ha-expansion-panel outlined style="display: ${"slider"===this._config.button_type?"none":""}">
                                        <h4 slot="header">
                                          <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                          Tap action on button
                                        </h4>
                                        <div class="content">
                                            ${this.makeTapActionPanel("Tap action",this._button_action,"name"!==this._config.button_type?"state"===this._config.button_type?"more-info":"toggle":"none","button_action")}
                                            ${this.makeTapActionPanel("Double tap action",this._button_action,"name"!==this._config.button_type?"state"===this._config.button_type?"more-info":"toggle":"none","button_action")}
                                            ${this.makeTapActionPanel("Hold action",this._button_action,"name"!==this._config.button_type?"more-info":"none","button_action")}
                                        </div>
                                    </ha-expansion-panel>
                                    ${this.makeSubButtonPanel()}
                                </div>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:cog"></ha-icon>
                              Pop-up settings
                            </h4>
                            <div class="content">
                                <ha-textfield
                                    label="Optional - Auto close in milliseconds (e.g. 15000)"
                                    type="number"
                                    inputMode="numeric"
                                    min="0"
                                    step="1000"
                                    .value="${this._auto_close}"
                                    .configValue="${"auto_close"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                <ha-textfield
                                    label="Optional - Slide to close distance (default to 400)"
                                    type="number"
                                    inputMode="numeric"
                                    min="0"
                                    step="10"
                                    .value="${this._slide_to_close_distance}"
                                    .configValue="${"slide_to_close_distance"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                <ha-formfield .label="Optional - Close the pop-up by clicking outside of it (a refresh is needed)">
                                    <ha-switch
                                        aria-label="Optional - Close the pop-up by clicking outside of it (a refresh is needed)"
                                        .checked=${this._close_by_clicking_outside}
                                        .configValue="${"close_by_clicking_outside"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Close the pop-up by clicking outside of it (a refresh is needed)</label> 
                                    </div>
                                </ha-formfield>
                                <ha-formfield .label="Optional - Close the pop-up after any click or tap">
                                    <ha-switch
                                        aria-label="Optional - Close the pop-up after any click or tap"
                                        .checked=${this._close_on_click}
                                        .configValue="${"close_on_click"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Close the pop-up after any click or tap</label> 
                                    </div>
                                </ha-formfield>
                                <ha-formfield .label="Optional - Update cards in background (not recommended)">
                                    <ha-switch
                                        aria-label="Optional - Update cards in background (not recommended)"
                                        .checked=${this._background_update}
                                        .configValue="${"background_update"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Update cards in background (not recommended)</label> 
                                    </div>
                                </ha-formfield>
                                <ha-alert alert-type="info">Background updates are only recommended if you encounter issues with certain cards within your pop-up.</ha-alert>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:bell"></ha-icon>
                              Pop-up trigger
                            </h4>
                            <div class="content">
                                <ha-card-conditions-editor
                                    .hass=${this.hass}
                                    .conditions=${l}
                                    @value-changed=${e=>this._conditionChanged(e)}
                                >
                                </ha-card-conditions-editor>
                                <ha-alert alert-type="info">
                                    The pop-up will be opened when ALL conditions are fulfilled. For example you can open a "Security" pop-up with a camera when a person is in front of your house. You can also create a toggle helper (<code>input_boolean</code>) and trigger its opening/closing in an automation.
                                </ha-alert>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Pop-up open/close action
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Open action",this._config,"none")}
                                ${this.makeTapActionPanel("Close action",this._config,"none")}
                                <ha-alert alert-type="info">This allows you to trigger an action on pop-up open/close.</ha-alert>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                                <ha-expansion-panel outlined>
                                    <h4 slot="header">
                                      <ha-icon icon="mdi:palette"></ha-icon>
                                      Pop-up styling
                                    </h4>
                                    <div class="content"> 
                                        <ha-textfield
                                            label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                                            .value="${this._margin}"
                                            .configValue="${"margin"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Top margin on mobile (e.g. -56px if your header is hidden)"
                                            .value="${this._margin_top_mobile}"
                                            .configValue="${"margin_top_mobile"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Top margin on desktop (e.g. 50vh for an half sized pop-up)"
                                            .value="${this._margin_top_desktop}"
                                            .configValue="${"margin_top_desktop"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Width on desktop (100% by default on mobile)"
                                            .value="${this._width_desktop}"
                                            .configValue="${"width_desktop"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Background color (any var, hex, rgb or rgba value)"
                                            .value="${this._bg_color}"
                                            .configValue="${"bg_color"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Background opacity (0-100 range)"
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            max="100"
                                            .value="${this._bg_opacity}"
                                            .configValue="${"bg_opacity"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Background blur (0-100 range)"
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            max="100"
                                            .value="${this._bg_blur}"
                                            .configValue="${"bg_blur"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Backdrop blur (0-100 range)"
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            max="100"
                                            .value="${this._backdrop_blur}"
                                            .configValue="${"backdrop_blur"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Shadow opacity (0-100 range)"
                                            type="number"
                                            inputMode="numeric"
                                            min="0"
                                            max="100"
                                            .configValue="${"shadow_opacity"}"
                                            .value="${this._shadow_opacity}""
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-formfield .label="Optional - Hide pop-up backdrop (a refresh is needed)">
                                            <ha-switch
                                                aria-label="Optional - Hide pop-up backdrop (a refresh is needed)"
                                                .checked=${this._hide_backdrop}
                                                .configValue="${"hide_backdrop"}"
                                                @change=${this._valueChanged}
                                            ></ha-switch>
                                            <div class="mdc-form-field">
                                                <label class="mdc-label">Optional - Hide pop-up backdrop (a refresh is needed)</label> 
                                            </div>
                                        </ha-formfield>
                                        <ha-alert alert-type="warning">Set this toggle to true on the first pop-up of your main dashboard to hide the darker backdrop behind all pop-ups. <b>You can add a blurred effect to it by changing <code>Optional - Backdrop blur</code> just below, but be aware that this can slow down your dashboard when opening pop-ups. It is now set to 0 for that reason.</b></ha-alert>
                                    </div>
                                </ha-expansion-panel>
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        <ha-alert alert-type="info">
                            This card allows you to convert any vertical stack into a pop-up. Each pop-up is hidden by default and can be opened by targeting its link (e.g., '#pop-up-name'), with <a style="color: var(--text-primary-color)" href="https://github.com/Clooos/Bubble-Card#example">any card</a> that supports the <code>navigate</code> action, or with the <a style="color: var(--text-primary-color)" href="https://github.com/Clooos/Bubble-Card#horizontal-buttons-stack">horizontal buttons stack</a> that is included.
                            <br><br><b>Important:</b> This card must be placed within a <a style="color: var(--text-primary-color)" href="https://www.home-assistant.io/dashboards/vertical-stack/">vertical stack</a> card at the topmost position to function properly. To avoid misalignment with your view, place vertical stacks/pop-ups after all other dashboard cards. It should be called from the same view to work. 
                            <br><br><b>You can also watch this <a style="color: var(--text-primary-color)" href="https://www.youtube.com/watch?v=7mOV7BfWoFc">video</a> that explains how to create your first pop-up.</b>
                        </ha-alert>
                        <ha-alert alert-type="warning">Since v1.7.0, the optimized mode has been removed to ensure stability and to simplify updates for everyone. However, if your pop-up content still appears on the screen during page loading, <a style="color: var(--text-primary-color)" href="https://github.com/Clooos/Bubble-Card#pop-up-initialization-fix">you can install this similar fix.</a></ha-alert>
                        ${this.makeVersion()}
                  </div>
                `}if("button"===this._config?.card_type)return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        ${this.makeDropdown("Button type","button_type",i)}
                        ${this.makeDropdown("slider"!==this._button_type?"Entity (toggle)":"Entity (light, media_player, cover or input_number)","entity",n,r)}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:cog"></ha-icon>
                              Button settings
                            </h4>
                            <div class="content">     
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._name}"
                                    .configValue="${"name"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                ${this.makeDropdown("Optional - Icon","icon")}
                                ${this.makeShowState()}
                                <ha-formfield .label="Optional - Slider live update" style="display: ${"slider"!==this._button_type?"none":""}">
                                    <ha-switch
                                        aria-label="Optional - Slider live update"
                                        .checked=${this._slider_live_update}
                                        .configValue="${"slider_live_update"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Slider live update</label> 
                                    </div>
                                </ha-formfield>
                                <ha-alert style="display: ${"slider"!==this._button_type?"none":""}" alert-type="info">By default, sliders are updated only on release. You can toggle this option to enable live updates while sliding.</ha-alert>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on icon
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action")}
                                ${this.makeTapActionPanel("Double tap action")}
                                ${this.makeTapActionPanel("Hold action")}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined style="display: ${"slider"===this._config.button_type?"none":""}">
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on button
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action",this._button_action,"name"!==this._config.button_type?"state"===this._config.button_type?"more-info":"toggle":"none","button_action")}
                                ${this.makeTapActionPanel("Double tap action",this._button_action,"name"!==this._config.button_type?"state"===this._config.button_type?"more-info":"toggle":"none","button_action")}
                                ${this.makeTapActionPanel("Hold action",this._button_action,"name"!==this._config.button_type?"more-info":"none","button_action")}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        ${this.makeSubButtonPanel()}
                        <ha-alert alert-type="info">This card allows you to control your entities. ${"slider"===this._config.button_type?"Supported entities: Light (brightness), media player (volume), cover (position), fan (percentage), climate (temperature), input number and number (value). To access color / control of an entity, simply tap on the icon.":""}</ha-alert>
                        ${this.makeVersion()}
                    </div>
                `;if("separator"===this._config?.card_type)return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        <ha-textfield
                            label="Name"
                            .value="${this._name}"
                            .configValue="${"name"}"
                            @input="${this._valueChanged}"
                        ></ha-textfield>
                        ${this.makeDropdown("Icon","icon")}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        ${this.makeSubButtonPanel()}
                        <ha-alert alert-type="info">This card is a simple separator for dividing your pop-up into categories / sections. e.g. Lights, Devices, Covers, Settings, Automations...</ha-alert>
                        ${this.makeVersion()}
                  </div>
                `;if("horizontal-buttons-stack"===this._config?.card_type){if(!this.buttonAdded)for(this.buttonAdded=!0,this.buttonIndex=0;this._config[this.buttonIndex+1+"_link"];)this.buttonIndex++;function c(){this.buttonIndex++,this.requestUpdate()}return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        <div id="buttons-container">
                            ${this.makeButton()}
                        </div>
                        <button class="icon-button" @click="${c}">
                            <ha-icon icon="mdi:plus"></ha-icon>
                            New button
                        </button>
                        <ha-formfield .label="Auto order">
                            <ha-switch
                                aria-label="Toggle auto order"
                                .checked=${this._auto_order}
                                .configValue="${"auto_order"}"
                                @change=${this._valueChanged}
                            ></ha-switch>
                            <div class="mdc-form-field">
                                <label class="mdc-label">Optional - Auto order (Presence/occupancy sensors needed)</label> 
                            </div>
                        </ha-formfield>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">  
                                <ha-expansion-panel outlined>
                                    <h4 slot="header">
                                      <ha-icon icon="mdi:palette"></ha-icon>
                                      Horizontal buttons stack styling
                                    </h4>
                                    <div class="content"> 
                                        <ha-textfield
                                            label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                                            .value="${this._margin}"
                                            .configValue="${"margin"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-textfield
                                            label="Optional - Width on desktop (100% by default on mobile)"
                                            .value="${this._width_desktop}"
                                            .configValue="${"width_desktop"}"
                                            @input="${this._valueChanged}"
                                        ></ha-textfield>
                                        <ha-formfield .label="Optional - Rise animation (Displays an animation once the page has loaded)">
                                            <ha-switch
                                                aria-label="Optional - Rise animation (Displays an animation once the page has loaded)"
                                                .checked=${this._rise_animation}
                                                .configValue="${"rise_animation"}"
                                                @change=${this._valueChanged}
                                            ></ha-switch>
                                            <div class="mdc-form-field">
                                                <label class="mdc-label">Optional - Rise animation (Displays an animation once the page has loaded)</label> 
                                            </div>
                                        </ha-formfield>
                                        <ha-formfield .label="Optional - Highlight current hash / view">
                                            <ha-switch
                                                aria-label="Optional - Highlight current hash / view"
                                                .checked=${this._highlight_current_view}
                                                .configValue="${"highlight_current_view"}"
                                                @change=${this._valueChanged}
                                            ></ha-switch>
                                            <div class="mdc-form-field">
                                                <label class="mdc-label">Optional - Highlight current hash / view</label> 
                                            </div>
                                        </ha-formfield>
                                        <ha-formfield .label="Optional - Hide gradient">
                                            <ha-switch
                                                aria-label="Optional - Hide gradient"
                                                .checked=${this._hide_gradient}
                                                .configValue="${"hide_gradient"}"
                                                @change=${this._valueChanged}
                                            ></ha-switch>
                                            <div class="mdc-form-field">
                                                <label class="mdc-label">Optional - Hide gradient</label> 
                                            </div>
                                        </ha-formfield>
                                    </div>
                                </ha-expansion-panel>
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        <ha-alert alert-type="info">This card is the companion to the pop-up card, allowing you to open the corresponding pop-ups. It also allows you to open any page of your dashboard. In addition, you can add your motion sensors so that the order of the buttons adapts according to the room you just entered. This card is scrollable, remains visible and acts as a footer.</ha-alert>
                        ${this.makeVersion()}
                    </div>
                `}if("cover"===this._config?.card_type)return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        ${this.makeDropdown("Entity","entity",o)}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:cog"></ha-icon>
                              Cover settings
                            </h4>
                            <div class="content"> 
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._name||""}"
                                    .configValue="${"name"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                ${this.makeDropdown("Optional - Open icon","icon_open")}
                                ${this.makeDropdown("Optional - Closed icon","icon_close")}
                                ${this.makeShowState()}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:window-shutter-cog"></ha-icon>
                              Custom services
                            </h4>
                            <div class="content"> 
                                <ha-textfield
                                    label="Optional - Open service (cover.open_cover by default)"
                                    .value="${this._open_service}"
                                    .configValue="${"open_service"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                <ha-textfield
                                    label="Optional - Stop service (cover.stop_cover by default)"
                                    .value="${this._stop_service}"
                                    .configValue="${"stop_service"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                <ha-textfield
                                    label="Optional - Close service (cover.close_cover by default)"
                                    .value="${this._close_service}"
                                    .configValue="${"close_service"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on icon
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action")}
                                ${this.makeTapActionPanel("Double tap action")}
                                ${this.makeTapActionPanel("Hold action")}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content"> 
                                ${this.makeLayoutOptions()}
                                <ha-expansion-panel outlined>
                                    <h4 slot="header">
                                      <ha-icon icon="mdi:palette"></ha-icon>
                                      Cover styling
                                    </h4>
                                    <div class="content"> 
                                        ${this.makeDropdown("Optional - Arrow down icon","icon_down")}
                                        ${this.makeDropdown("Optional - Arrow up icon","icon_up")}
                                    </div>
                                </ha-expansion-panel>
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        ${this.makeSubButtonPanel()}
                        <ha-alert alert-type="info">This card allows you to control your covers.</ha-alert>
                        ${this.makeVersion()}
                    </div>
                `;if("media-player"===this._config?.card_type)return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        ${this.makeDropdown("Entity","entity",this.mediaPlayerList)}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:cog"></ha-icon>
                              Media player settings
                            </h4>
                            <div class="content"> 
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._name||""}"
                                    .configValue="${"name"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                ${this.makeDropdown("Optional - Icon","icon")}
                                ${this.makeShowState()}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:eye-off"></ha-icon>
                              Display/hide buttons
                            </h4>
                            <div class="content"> 
                                <ha-formfield .label="Optional - Hide play/pause button">
                                    <ha-switch
                                        aria-label="Optional - Hide play/pause button"
                                        .checked=${this._hide_play_pause_button}
                                        .configValue="${"hide.play_pause_button"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide play/pause button</label> 
                                    </div>
                                </ha-formfield>
                                <ha-formfield .label="Optional - Hide volume button">
                                    <ha-switch
                                        aria-label="Optional - Hide volume button"
                                        .checked=${this._hide_volume_button}
                                        .configValue="${"hide.volume_button"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide volume button</label>
                                    </div>
                                </ha-formfield>
                                <ha-formfield .label="Optional - Hide next button">
                                    <ha-switch
                                        aria-label="Optional - Hide next button"
                                        .checked=${this._hide_next_button}
                                        .configValue="${"hide.next_button"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide next button</label>
                                    </div>
                                </ha-formfield>
                                <ha-formfield .label="Optional - Hide previous button">
                                    <ha-switch
                                        aria-label="Optional - Hide previous button"
                                        .checked=${this._hide_previous_button}
                                        .configValue="${"hide.previous_button"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide previous button</label>
                                    </div>
                                </ha-formfield>
                                <ha-formfield .label="Optional - Hide power button">
                                    <ha-switch
                                        aria-label="Optional - Hide power button"
                                        .checked=${this._hide_power_button}
                                        .configValue="${"hide.power_button"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Hide power button</label>
                                    </div>
                                </ha-formfield>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on icon
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action")}
                                ${this.makeTapActionPanel("Double tap action")}
                                ${this.makeTapActionPanel("Hold action")}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                                <ha-expansion-panel outlined>
                                    <h4 slot="header">
                                      <ha-icon icon="mdi:palette"></ha-icon>
                                      Media player styling
                                    </h4>
                                    <div class="content"> 
                                        <ha-formfield .label="Optional - Blurred media cover in background">
                                            <ha-switch
                                                aria-label="Optional - Blurred media cover in background"
                                                .checked=${this._cover_background}
                                                .configValue="${"cover_background"}"
                                                @change=${this._valueChanged}
                                            ></ha-switch>
                                            <div class="mdc-form-field">
                                                <label class="mdc-label">Optional - Blurred media cover in background</label> 
                                            </div>
                                        </ha-formfield>
                                    </div>
                                </ha-expansion-panel>
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        ${this.makeSubButtonPanel()}
                        <ha-alert alert-type="info">This card allows you to control a media player. You can tap on the icon to get more control.</ha-alert>
                        ${this.makeVersion()}
                    </div>
                `;if("empty-column"===this._config?.card_type)return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                            </div>
                        </ha-expansion-panel>
                        <ha-alert alert-type="info">Just an empty card to fill any empty column.</ha-alert>
                        ${this.makeVersion()}
                    </div>
                `;if("select"===this._config?.card_type){const d=this._config.entity,u=(d?.startsWith("input_select")||d?.startsWith("select")||this._config.select_attribute,this.hass.states[d]?.attributes),b=this._selectable_attributes.some((e=>u?.[e])),p=Object.keys(this.hass.states[d]?.attributes||{}).map((e=>{let t=this.hass.states[d];return{label:this.hass.formatEntityAttributeName(t,e),value:e}})).filter((e=>this._selectable_attributes.includes(e.value)));return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        ${this.makeDropdown("Entity","entity",this.inputSelectList)}
                        ${b?ce`
                            <div class="ha-combo-box">
                                <ha-combo-box
                                    label="Select menu (from attributes)"
                                    .value="${this._config.select_attribute}"
                                    .items="${p}"
                                    .configValue="${"select_attribute"}"
                                    @value-changed="${this._valueChanged}"
                                ></ha-combo-box>
                            </div>
                        `:""}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:cog"></ha-icon>
                              Button settings
                            </h4>
                            <div class="content">                   
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._name}"
                                    .configValue="${"name"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                ${this.makeDropdown("Optional - Icon","icon")}
                                ${this.makeShowState()}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on icon
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action")}
                                ${this.makeTapActionPanel("Double tap action")}
                                ${this.makeTapActionPanel("Hold action")}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        ${this.makeSubButtonPanel()}
                        <ha-alert alert-type="info">
                          This card allows you to have a select menu for your 
                          <code>input_select</code>, <code>select</code> entities, and 
                          any other entities that have attribute lists like 
                          <code>source_list</code>, <code>sound_mode_list</code>, 
                          <code>hvac_modes</code>, <code>fan_modes</code>, 
                          <code>swing_modes</code>, <code>preset_modes</code>, or 
                          <code>effect_list</code>.
                        </ha-alert>
                        ${this.makeVersion()}
                    </div>
                `}if("climate"===this._config?.card_type){if("climate"===this._config.card_type&&!this.climateSubButtonsAdded&&this._config.entity){const h=this.hass.states[this._config.entity]?.attributes?.hvac_modes;this._config.sub_button&&0!==this._config.sub_button.length||(this._config.sub_button=[h?{name:"HVAC modes menu",select_attribute:"hvac_modes",state_background:!1,show_arrow:!1}:null].filter(Boolean)),this.climateSubButtonsAdded=!0}return ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        ${this.makeDropdown("Entity","entity",this.climateList)}
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:cog"></ha-icon>
                              Climate settings
                            </h4>
                            <div class="content">     
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._name}"
                                    .configValue="${"name"}"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                ${this.makeDropdown("Optional - Icon","icon")}
                                ${this.makeShowState()}
                                ${this.hass.states[this._config.entity]?.attributes?.target_temp_low?ce`
                                    <ha-formfield .label="Optional - Hide target temp low">
                                        <ha-switch
                                            aria-label="Optional - Hide target temp low"
                                            .checked=${this._config.hide_target_temp_low}
                                            .configValue="${"hide_target_temp_low"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Hide target temp low</label> 
                                        </div>
                                    </ha-formfield>
                                `:""}
                                ${this.hass.states[this._config.entity]?.attributes?.target_temp_high?ce`
                                    <ha-formfield .label="Optional - Hide target temp high">
                                        <ha-switch
                                            aria-label="Optional - Hide target temp high"
                                            .checked=${this._config.hide_target_temp_high}
                                            .configValue="${"hide_target_temp_high"}"
                                            @change=${this._valueChanged}
                                        ></ha-switch>
                                        <div class="mdc-form-field">
                                            <label class="mdc-label">Optional - Hide target temp high</label> 
                                        </div>
                                    </ha-formfield>
                                `:""}
                                <ha-formfield .label="Optional - Constant background color when ON">
                                    <ha-switch
                                        aria-label="Optional - Constant background color when ON"
                                        .checked=${!0===this._config.state_color}
                                        .configValue="${"state_color"}"
                                        @change=${this._valueChanged}
                                    ></ha-switch>
                                    <div class="mdc-form-field">
                                        <label class="mdc-label">Optional - Constant background color when ON</label> 
                                    </div>
                                </ha-formfield>
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on icon
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action")}
                                ${this.makeTapActionPanel("Double tap action")}
                                ${this.makeTapActionPanel("Hold action")}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:palette"></ha-icon>
                              Styling options
                            </h4>
                            <div class="content">
                                ${this.makeLayoutOptions()}
                                ${this.makeStyleEditor()}
                            </div>
                        </ha-expansion-panel>
                        ${this.makeSubButtonPanel()}
                        <ha-alert alert-type="info">This card allows you to control your climate entities. You can also add a sub-button that display a select menu for your climate modes (check if you have "Select menu" available when you create a new sub-button).</ha-alert>
                        ${this.makeVersion()}
                    </div>
                `}return this._config?.card_type?void 0:ce`
                    <div class="card-config">
                        ${this.makeDropdown("Card type","card_type",a)}
                        <ha-alert alert-type="info">You need to add a card type first. Please note that in some cases, a page refresh might be needed after exiting the editor.</ha-alert>
                        <img style="width: 100%; height: auto; border-radius: 24px;" src="https://raw.githubusercontent.com/Clooos/Bubble-Card/main/.github/bubble-card.gif">
                        <p>The <b>Bubble Card ${e}</b> changelog is available <a href="https://github.com/Clooos/Bubble-Card/releases/tag/${e}"><b>here</b></a>.</p>
                        <hr />
                        <p>If you have an issue or a question you can find more details in the GitHub documentation. You can also find useful resources and help in these links.</p>
                        <div style="display: inline-block;">
                            <a href="https://github.com/Clooos/Bubble-Card"><img src="https://img.shields.io/badge/GitHub-Documentation-blue?logo=github"></a>
                            <a href="https://www.youtube.com/@cloooos"><img src="https://img.shields.io/badge/YouTube-My%20channel-red?logo=youtube"></a>
                            <a href="https://www.reddit.com/r/BubbleCard/"><img src="https://img.shields.io/badge/Reddit-r/BubbleCard-orange?logo=reddit"></a>
                            <a href="https://community.home-assistant.io/t/bubble-card-a-minimalist-card-collection-for-home-assistant-with-a-nice-pop-up-touch/609678"><img src="https://img.shields.io/badge/Home%20Assistant-Community%20Forum-blue?logo=home-assistant"></a>
                        </div>
                        <hr />
                        <p>I dedicate most of my spare time to making this project the best it can be. So if you appreciate my work, any donation would be a great way to show your support.</p>
                        <div style="display: inline-block;">
                            <a href="https://www.buymeacoffee.com/clooos"><img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee"></a> 
                            <a href="https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR"><img src="https://img.shields.io/badge/Donate-PayPal-blue?logo=paypal"></img></a>
                        </div>
                        <p>Looking for more advanced examples? Check out my <a href="https://www.patreon.com/Clooos"><b>Patreon</b></a> for exclusive custom styles and templates!</p>
                        <a href="https://www.patreon.com/Clooos"><img src="https://img.shields.io/badge/Patreon-Clooos-orange?logo=patreon"></a>
                        <p style="margin-top: 0;">Thank you! 🍻</p>
                        ${this.makeVersion()}
                    </div>
                `}makeLayoutOptions(){return ce`
                <ha-combo-box
                    label="${"pop-up"===this._config.card_type?"Header card layout":"Card layout"}"
                    .value="${this._config.card_layout||"normal"}"
                    .configValue="${"card_layout"}"
                    .items="${[{label:"Normal",value:"normal"},{label:"Large (Optimized for sections)",value:"large"},{label:"Large with 2 sub-buttons rows (Optimized for sections)",value:"large-2-rows"}]}"
                    @value-changed="${this._valueChanged}"
                ></ha-combo-box>
                <ha-expansion-panel outlined>
                    <h4 slot="header">
                        <ha-icon icon="mdi:table"></ha-icon>
                        Layout options for sections
                    </h4>
                    <div class="content">
                        <ha-combo-box
                            label="Columns"
                            .value="${this._config.columns}"
                            .configValue="${"columns"}"
                            .items="${[{label:"Auto",value:null},{label:"1/4",value:1},{label:"2/4",value:2},{label:"3/4",value:3},{label:"4/4",value:4}]}"
                            @value-changed="${this._valueChanged}"
                        ></ha-combo-box>
                        <ha-combo-box
                            label="Rows"
                            .value="${this._config.rows}"
                            .configValue="${"rows"}"
                            .items="${[{label:"Auto",value:null},{label:"1/4",value:1},{label:"2/4",value:2},{label:"3/4",value:3},{label:"4/4",value:4}]}"
                            @value-changed="${this._valueChanged}"
                        ></ha-combo-box>
                    </div>
                </ha-expansion-panel>
            `}makeShowState(e=this._config,t="",n=!1,o){const a=e?.entity??this._config.entity??"",i="name"===this._config.button_type,r=a?.startsWith("input_select")||a?.startsWith("select")||e.select_attribute,s=Object.keys(this.hass.states[a]?.attributes||{}).map((e=>{let t=this.hass.states[a];return{label:this.hass.formatEntityAttributeName(t,e),value:e}}));return ce`
                ${"sub_button"!==n?ce`
                    <ha-formfield .label="Optional - Text scrolling effect">
                        <ha-switch
                            aria-label="Optional - Text scrolling effect"
                            .checked=${e?.scrolling_effect??!0}
                            .configValue="${t+"scrolling_effect"}"
                            @change="${n?e=>this._arrayValueChange(o,{scrolling_effect:e.target.checked},n):this._valueChanged}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Text scrolling effect</label> 
                        </div>
                    </ha-formfield>
                `:""}
                ${"sub_button"===n?ce`
                    <ha-formfield .label="Optional - Show background">
                        <ha-switch
                            aria-label="Optional - Show background when entity is on"
                            .checked=${e?.show_background??!0}
                            @change="${e=>this._arrayValueChange(o,{show_background:e.target.checked},n)}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Show background when entity is on</label> 
                        </div>
                    </ha-formfield>
                `:""}
                ${"sub_button"===n&&(e?.show_background??1)?ce`
                    <ha-formfield .label="Optional - Background color based on state">
                        <ha-switch
                            aria-label="Optional - Background color based on state"
                            .checked=${e?.state_background??!0}
                            @change="${e=>this._arrayValueChange(o,{state_background:e.target.checked},n)}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Background color based on state</label> 
                        </div>
                    </ha-formfield>
                `:""}
                ${"sub_button"===n&&(e?.state_background??1)&&a.startsWith("light")?ce`
                    <ha-formfield .label="Optional - Background color based on light color">
                        <ha-switch
                            aria-label="Optional - Background color based on light color"
                            .checked=${e?.light_background??!0}
                            @change="${e=>this._arrayValueChange(o,{light_background:e.target.checked},n)}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Background color based on light color</label> 
                        </div>
                    </ha-formfield>
                `:""}
                ${"sub_button"!==n&&a.startsWith("light")?ce`
                    <ha-formfield .label="Optional - Use accent color instead of light color">
                        <ha-switch
                            aria-label="Optional - Use accent color instead of light color"
                            .checked=${e?.use_accent_color??!1}
                            .configValue="${t+"use_accent_color"}"
                            @change="${this._valueChanged}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Use accent color instead of light color</label> 
                        </div>
                    </ha-formfield>
                `:""}
                <ha-formfield .label="Optional - Show icon">
                    <ha-switch
                        aria-label="Optional - Show icon"
                        .checked=${e?.show_icon??!0}
                        .configValue="${t+"show_icon"}"
                        @change="${n?e=>this._arrayValueChange(o,{show_icon:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show icon</label> 
                    </div>
                </ha-formfield>
                ${"sub_button"!==n?ce`
                    <ha-formfield .label="Optional - Prioritize icon over entity picture">
                        <ha-switch
                            aria-label="Optional - Prioritize icon over entity picture"
                            .checked=${e?.force_icon??!1}
                            .configValue="${t+"force_icon"}"
                            .disabled="${i}"
                            @change="${n?e=>this._arrayValueChange(o,{force_icon:e.target.checked},n):this._valueChanged}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Prioritize icon over entity picture</label> 
                        </div>
                    </ha-formfield>
                `:""}
                <ha-formfield .label="Optional - Show name">
                    <ha-switch
                        aria-label="Optional - Show name"
                        .checked=${!!(e?.show_name??"sub_button"!==n)}
                        .configValue="${t+"show_name"}"
                        @change="${n?e=>this._arrayValueChange(o,{show_name:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show name</label> 
                    </div>
                </ha-formfield>
                <ha-formfield .label="Optional - Show entity state">
                    <ha-switch
                        aria-label="Optional - Show entity state"
                        .checked="${e?.show_state??"state"===e.button_type}"
                        .configValue="${t+"show_state"}"
                        .disabled="${i&&"sub_button"!==n}"
                        @change="${n?e=>this._arrayValueChange(o,{show_state:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show entity state</label> 
                    </div>
                </ha-formfield>
                <ha-formfield .label="Optional - Show last changed">
                    <ha-switch
                        aria-label="Optional - Show last changed"
                        .checked=${e?.show_last_changed}
                        .configValue="${t+"show_last_changed"}"
                        .disabled="${i&&"sub_button"!==n}"
                        @change="${n?e=>this._arrayValueChange(o,{show_last_changed:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show last changed</label> 
                    </div>
                </ha-formfield>
                <ha-formfield .label="Optional - Show attribute">
                    <ha-switch
                        aria-label="Optional - Show attribute"
                        .checked=${e?.show_attribute}
                        .configValue="${t+"show_attribute"}"
                        .disabled="${i&&"sub_button"!==n}"
                        @change="${n?e=>this._arrayValueChange(o,{show_attribute:e.target.checked},n):this._valueChanged}"
                    ></ha-switch>
                    <div class="mdc-form-field">
                        <label class="mdc-label">Optional - Show attribute</label> 
                    </div>
                </ha-formfield>
                ${e?.show_attribute?ce`
                    <div class="ha-combo-box">
                        <ha-combo-box
                            label="Optional - Attribute to show"
                            .value="${e?.attribute}"
                            .configValue="${t+"attribute"}"
                            .items="${s}"
                            .disabled="${i}"
                            @value-changed="${n?e=>this._arrayValueChange(o,{attribute:e.detail.value},n):this._valueChanged}"
                        ></ha-combo-box>
                    </div>
                `:""}
                ${"sub_button"===n&&r?ce`
                    <ha-formfield .label="Optional - Show arrow (Select entities only)">
                        <ha-switch
                            aria-label="Optional - Show arrow (Select entities only)"
                            .checked=${e?.show_arrow??!0}
                            .configValue="${t+"show_arrow"}"
                            @change="${n?e=>this._arrayValueChange(o,{show_arrow:e.target.checked},n):this._valueChanged}"
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Show arrow (Select menu only)</label> 
                        </div>
                    </ha-formfield>
                `:""}
            `}makeDropdown(e,t,n,o){return e.includes("icon")||e.includes("Icon")?ce`
                    <div class="ha-icon-picker">
                        <ha-icon-picker
                            label="${e}"
                            .value="${this["_"+t]}"
                            .configValue="${t}"
                            item-value-path="icon"
                            item-label-path="icon"
                            @value-changed="${this._valueChanged}"
                        ></ha-icon-picker>
                    </div>
                `:ce`
                <div class="ha-combo-box">
                    <ha-combo-box
                        label="${e}"
                        .value="${this["_"+t]}"
                        .configValue="${t}"
                        .items="${n}"
                        .disabled="${o}"
                        @value-changed="${this._valueChanged}"
                    ></ha-combo-box>
                </div>
              `}makeTapActionPanel(e,t=this._config,n,o,a=this._config){this.hass;const i="Tap action"===e?"mdi:gesture-tap":"Double tap action"===e?"mdi:gesture-double-tap":"Hold action"===e?"mdi:gesture-tap-hold":"mdi:gesture-tap",r="Tap action"===e?t.tap_action:"Double tap action"===e?t.double_tap_action:"Hold action"===e?t.hold_action:"Open action"===e?t.open_action:t.close_action,s="Tap action"===e?"tap_action":"Double tap action"===e?"double_tap_action":"Hold action"===e?"hold_action":"Open action"===e?"open_action":"close_action",l=t===this._config;return n||(n=l&&"Tap action"===e?"name"!==this._config.button_type?"more-info":"none":l?"name"!==this._config.button_type?"toggle":"none":""),ce`
                <ha-expansion-panel outlined>
                    <h4 slot="header">
                        <ha-icon icon="${i}"></ha-icon>
                        ${e}
                    </h4>
                    <div class="content"> 
                        <div class="ha-combo-box">
                            <ha-combo-box
                                label="${e}"
                                .value="${r?.action??n}"
                                .items="${this.tapActionTypeList}"
                                @value-changed="${e=>this._tapActionValueChange(a,{[s]:{action:e.detail.value}},o)}"
                            ></ha-combo-box>
                        </div>
                        ${"navigate"===r?.action?ce`
                            <div class="ha-textfield">
                                <ha-textfield
                                    label="Navigation path"
                                    .value="${r?.navigation_path??""}"
                                    @input="${e=>this._tapActionValueChange(a,{[s]:{navigation_path:e.target.value}},o)}"
                                ></ha-textfield>
                            </div>
                        `:""}
                        ${"url"===r?.action?ce`
                            <div class="ha-textfield">
                                <ha-textfield
                                    label="URL path"
                                    .value="${r?.url_path??""}"
                                    @input="${e=>this._tapActionValueChange(a,{[s]:{url_path:e.target.value}},o)}"
                                ></ha-textfield>
                            </div>
                        `:""}
                        ${"call-service"===r?.action?ce`
                            <div class="ha-textfield">
                                <ha-textfield
                                    label="Service"
                                    .value="${r?.service??""}"
                                    @input="${e=>this._tapActionValueChange(a,{[s]:{service:e.target.value}},o)}"
                                ></ha-textfield>
                            </div>
                            <div class="ha-combo-box">
                                <ha-combo-box
                                    label="Optional - Entity"
                                    .value="${r?.target?.entity_id}"
                                    .items="${this.allEntitiesList}"
                                    @value-changed="${"entity"!==r?.target?.entity_id?e=>{this._tapActionValueChange(a,{[s]:{target:{entity_id:e.detail.value}}},o)}:""}"
                                ></ha-combo-box>
                            </div>
                            <ha-formfield .label="Optional - Use default entity">
                                <ha-switch
                                    aria-label="Optional - Use default entity"
                                    .checked=${"entity"===r?.target?.entity_id}
                                    @change="${e=>{"entity"!==r?.target?.entity_id?this._tapActionValueChange(a,{[s]:{target:{entity_id:"entity"}}},o):this._tapActionValueChange(a,{[s]:{target:{}}},o)}}"
                                ></ha-switch>
                                <div class="mdc-form-field">
                                    <label class="mdc-label">Optional - Use default entity</label> 
                                </div>
                            </ha-formfield>
                        `:""}
                        ${"call-service"===r?.action&&r?.service?ce`
                            <ha-alert alert-type="info">For now, you still need to switch to the YAML editor if you want to add <code>data:</code> to your service.</ha-alert>
                        `:""}
                    </div>
                </ha-expansion-panel>
            `}makeSubButtonPanel(){const e=this._config?.sub_button?.map(((e,t)=>{if(!e)return;const n="sub_button."+t+".",o=e.entity??this._config.entity,a=o?.startsWith("input_select")||o?.startsWith("select")||e.select_attribute,i=this.hass.states[o]?.attributes,r=this._selectable_attributes.some((e=>i?.[e])),s=Object.keys(this.hass.states[o]?.attributes||{}).map((e=>{let t=this.hass.states[o];return{label:this.hass.formatEntityAttributeName(t,e),value:e}})).filter((e=>this._selectable_attributes.includes(e.value))),l=e.visibility??[];return ce`
                <ha-expansion-panel outlined>
                    <h4 slot="header">
                        <ha-icon icon="mdi:border-radius"></ha-icon>
                        ${this._config.sub_button[t]?"Button "+(t+1)+(e.name?" - "+e.name:""):"New button"}
                        <button class="icon-button header" @click="${n=>{n.stopPropagation();let o=[...this._config.sub_button];o.splice(t,1),this._config.sub_button=o,this._valueChanged({target:{configValue:"sub_button."+(t-1),value:e}}),this.requestUpdate()}}">
                          <ha-icon icon="mdi:delete"></ha-icon>
                        </button>
                        ${t>0?ce`<button class="icon-button header" @click="${e=>{if(e.stopPropagation(),t>0){let e=[...this._config.sub_button];[e[t],e[t-1]]=[e[t-1],e[t]],this._config.sub_button=e,this._valueChanged({target:{configValue:"sub_button."+t,value:this._config.sub_button[t]}})}this.requestUpdate()}}">
                          <ha-icon icon="mdi:arrow-left"></ha-icon>
                        </button>`:""}
                        ${t<this._config.sub_button.length-1?ce`<button class="icon-button header" @click="${e=>{if(e.stopPropagation(),t<this._config.sub_button.length-1){let e=[...this._config.sub_button];[e[t],e[t+1]]=[e[t+1],e[t]],this._config.sub_button=e,this._valueChanged({target:{configValue:"sub_button."+t,value:this._config.sub_button[t]}})}this.requestUpdate()}}">
                          <ha-icon icon="mdi:arrow-right"></ha-icon>
                        </button>`:""}
                    </h4>
                    <div class="content">
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                                <ha-icon icon="mdi:cog"></ha-icon>
                                Button settings
                            </h4>
                            <div class="content"> 
                                <div class="ha-combo-box">
                                    <ha-combo-box
                                        label="${"Optional - Entity (default to card entity)"}"
                                        .value="${o}"
                                        .items="${this.allEntitiesList}"
                                        @value-changed="${e=>this._arrayValueChange(t,{entity:e.detail.value},"sub_button")}"
                                    ></ha-combo-box>
                                </div>
                                ${r?ce`
                                    <div class="ha-combo-box">
                                        <ha-combo-box
                                            label="Optional - Select menu (from attributes)"
                                            .value="${e.select_attribute}"
                                            .items="${s}"
                                            @value-changed="${e=>this._arrayValueChange(t,{select_attribute:e.detail.value},"sub_button")}"
                                        ></ha-combo-box>
                                    </div>
                                `:""}
                                <div class="ha-textfield">
                                    <ha-textfield
                                        label="Optional - Name"
                                        .value="${e.name??""}"
                                        @input="${e=>this._arrayValueChange(t,{name:e.target.value},"sub_button")}"
                                    ></ha-textfield>
                                </div>
                                <div class="ha-icon-picker">
                                    <ha-icon-picker
                                        label="Optional - Icon"
                                        .value="${e.icon}"
                                        item-label-path="label"
                                        item-value-path="value"
                                        @value-changed="${e=>this._arrayValueChange(t,{icon:e.detail.value},"sub_button")}"
                                    ></ha-icon-picker>
                                </div>
                                ${this.makeShowState(e,n,"sub_button",t)}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined style="${a?"opacity: 0.5; pointer-events: none;":""}">
                            <h4 slot="header">
                              <ha-icon icon="mdi:gesture-tap"></ha-icon>
                              Tap action on button
                            </h4>
                            <div class="content">
                                ${this.makeTapActionPanel("Tap action",e,"more-info","sub_button",t)}
                                ${this.makeTapActionPanel("Double tap action",e,"none","sub_button",t)}
                                ${this.makeTapActionPanel("Hold action",e,"none","sub_button",t)}
                            </div>
                        </ha-expansion-panel>
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                              <ha-icon icon="mdi:eye"></ha-icon>
                            Visibility
                            </h4>
                            <div class="content">
                                <ha-card-conditions-editor
                                    .hass=${this.hass}
                                    .conditions=${l}
                                    @value-changed=${e=>this._conditionChanged(e,t,"sub_button")}
                                >
                                </ha-card-conditions-editor>
                                <ha-alert alert-type="info">
                                    The sub-button will be shown when ALL conditions are fulfilled. If no conditions are set, the sub-button will always be shown.
                                </ha-alert>
                            </div>
                        </ha-expansion-panel>
                    </div>
                </ha-expansion-panel>
            `}));return ce`
            <ha-expansion-panel outlined>
              <h4 slot="header">
                <ha-icon icon="mdi:shape-square-rounded-plus"></ha-icon>
                Sub-buttons editor
              </h4>
              <div class="content">
                ${e}
                <button class="icon-button" @click="${()=>{this._config.sub_button||(this._config.sub_button=[]);let e={entity:this._config.entity};this._config.sub_button=[...this._config.sub_button],this._config.sub_button.push(e),(0,n.BX)(this,"config-changed",{config:this._config}),this.requestUpdate()}}">
                  <ha-icon icon="mdi:plus"></ha-icon>
                  New sub-button
                </button>
                <ha-alert alert-type="info">
                    Add new customized buttons fixed to the right. 
                    These buttons can also display a select menu for your 
                    <code>input_select</code>, <code>select</code> entities, and 
                    any other entities that have attribute lists like 
                    <code>source_list</code>, <code>sound_mode_list</code>, 
                    <code>hvac_modes</code>, <code>fan_modes</code>, 
                    <code>swing_modes</code>, <code>preset_modes</code>, or 
                    <code>effect_list</code>.
                </ha-alert>
              </div>
            </ha-expansion-panel>
          `}makeButton(){let e=[];for(let t=1;t<=this.buttonIndex;t++)e.push(ce`
                    <div class="${t}_button">
                        <ha-expansion-panel outlined>
                            <h4 slot="header">
                                <ha-icon icon="mdi:border-radius"></ha-icon>
                                Button ${t} ${this._config[t+"_name"]?"- "+this._config[t+"_name"]:""}
                                <button class="icon-button header" @click="${()=>this.removeButton(t)}">
                                  <ha-icon icon="mdi:delete"></ha-icon>
                                </button>
                            </h4>
                            <div class="content">
                                <ha-textfield
                                    label="Link / Hash to pop-up (e.g. #kitchen)"
                                    .value="${this._config[t+"_link"]||""}"
                                    .configValue="${t}_link"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                <ha-textfield
                                    label="Optional - Name"
                                    .value="${this._config[t+"_name"]||""}"
                                    .configValue="${t}_name"
                                    @input="${this._valueChanged}"
                                ></ha-textfield>
                                <ha-icon-picker
                                    label="Optional - Icon"
                                    .value="${this._config[t+"_icon"]||""}"
                                    .configValue="${t}_icon"
                                    item-label-path="label"
                                    item-value-path="value"
                                    @value-changed="${this._valueChanged}"
                                ></ha-icon-picker>
                                <ha-combo-box
                                    label="Optional - Light / Light group (For background color)"
                                    .value="${this._config[t+"_entity"]||""}"
                                    .configValue="${t}_entity"
                                    .items="${this.allEntitiesList}"
                                    @value-changed="${this._valueChanged}"
                                ></ha-combo-box>
                                <ha-combo-box
                                    label="Optional - Presence / Occupancy sensor (For button auto order)"
                                    .value="${this._config[t+"_pir_sensor"]||""}"
                                    .configValue="${t}_pir_sensor"
                                    .disabled=${!this._config.auto_order}
                                    .items="${this.allEntitiesList}"
                                    @value-changed="${this._valueChanged}"
                                ></ha-combo-box>
                                <ha-alert alert-type="info">In fact you can also get the auto order with any entity type, for example you can add light groups to these fields and the order will change based on the last changed states.</ha-alert>
                            </div>
                        </ha-expansion-panel>
                    </div>
                `);return e}makeVersion(){return ce`
                <h4 style="
                    font-size: 12px !important;
                    color: #fff;
                    background: rgba(0,0,0,0.1);
                    padding: 8px 16px;
                    border-radius: 32px;
                ">
                    Bubble Card 
                    <span style="
                        font-size: 10px;
                        background: rgba(0,120,180,1);
                        padding: 0px 8px;
                        border-radius: 12px;
                        margin-right: -6px;
                        float: right;
                        color: white;
                    ">
                        ${e}
                    </span>
                </h4>
            `}removeButton(e){delete this._config[e+"_name"],delete this._config[e+"_icon"],delete this._config[e+"_link"],delete this._config[e+"_entity"],delete this._config[e+"_pir_sensor"];for(let t=e;t<this.buttonIndex;t++)this._config[t+"_name"]=this._config[t+1+"_name"],this._config[t+"_icon"]=this._config[t+1+"_icon"],this._config[t+"_link"]=this._config[t+1+"_link"],this._config[t+"_entity"]=this._config[t+1+"_entity"],this._config[t+"_pir_sensor"]=this._config[t+1+"_pir_sensor"];delete this._config[this.buttonIndex+"_name"],delete this._config[this.buttonIndex+"_icon"],delete this._config[this.buttonIndex+"_link"],delete this._config[this.buttonIndex+"_entity"],delete this._config[this.buttonIndex+"_pir_sensor"],this.buttonIndex--,(0,n.BX)(this,"config-changed",{config:this._config})}makeStyleEditor(){return ce`
                <ha-expansion-panel outlined>
                    <h4 slot="header">
                        <ha-icon icon="mdi:code-braces"></ha-icon>
                        Custom styles / Templates
                    </h4>
                    <div class="content">
                        <div class="code-editor">
                            <ha-code-editor
                                mode="yaml"
                                autofocus
                                autocomplete-entities
                                autocomplete-icons
                                .hass=${this.hass}
                                .value=${this._config.styles}
                                .configValue="${"styles"}"
                                @value-changed=${this._valueChanged}
                            ></ha-code-editor>
                        </div>
                        <ha-alert alert-type="info">
                          For advanced users, you can edit the CSS style of this card in this editor. More information <a href="https://github.com/Clooos/Bubble-Card#styling">here</a>. You don't need to add <code>styles: |</code>, it will be added automatically. You can also add <a href="https://github.com/Clooos/Bubble-Card#templates">templates</a>.
                          <br><br><b>Looking for more advanced examples?</b> Check out my <a href="https://www.patreon.com/Clooos">Patreon</a> for exclusive custom styles and advanced templates, this is also the best way to show your support to my project!
                        </ha-alert>
                    </div>
                </ha-expansion-panel>
            `}_valueChanged(e){const t=e.target,o=e.detail;let a;if("HA-SWITCH"===t.tagName?a=t.checked:void 0!==t.value&&(a="string"==typeof t.value?t.value.replace(",","."):t.value),"string"==typeof a&&(a.endsWith(".")||"-"===a))return;const{configValue:i,checked:r}=t;if(i){const n=i.split(".");let r=this._config;for(let e=0;e<n.length-1;e++)r[n[e]]=r[n[e]]||{},r=r[n[e]];"input"===e.type?r[n[n.length-1]]=a:o&&r[n[n.length-1]]!==o.value?r[n[n.length-1]]=o.value:"HA-SWITCH"===t.tagName&&(r[n[n.length-1]]=a)}(0,n.BX)(this,"config-changed",{config:this._config}),this.requestUpdate()}_arrayValueChange(e,t,o){if(this._config.sub_button&&!this.subButtonJustAdded)return this.subButtonJustAdded=!0,void setTimeout((()=>this._arrayValueChange(e,t,o)),10);this._config[o]=this._config[o]||[];let a=[...this._config[o]];a[e]=a[e]||{},a[e]={...a[e],...t},this._config[o]=a,(0,n.BX)(this,"config-changed",{config:this._config}),this.requestUpdate()}_tapActionValueChange(e,t,o){if(void 0===o)for(let e in t)this._config[e]={...this._config[e],...t[e]};else{this._config[o]=this._config[o]||(o?{}:[]);let n=Array.isArray(this._config[o])?[...this._config[o]]:{...this._config[o]};if(Array.isArray(n)){n[e]=n[e]||{};let o={...n[e]};for(let e in t)o[e]=e in o?{...o[e],...t[e]}:t[e];n[e]=o}else for(let e in t)n.hasOwnProperty(e)?n[e]={...n[e],...t[e]}:n[e]=t[e];this._config[o]=n}(0,n.BX)(this,"config-changed",{config:this._config}),this.requestUpdate()}_conditionChanged(e,t,o){if(e.stopPropagation(),o){this._config[o]=this._config[o]||[];let n=[...this._config[o]];n[t]=n[t]||{};const a=e.detail.value;n[t]={...n[t],visibility:a},this._config[o]=n}else if("pop-up"===this._config.card_type){const t=e.detail.value;this._config={...this._config,trigger:t}}(0,n.BX)(this,"config-changed",{config:this._config}),this.requestUpdate()}static get styles(){return de`
                div {
                  display: grid;
                  grid-gap: 12px;
                }

                ha-combo-box[label="Card type"]::after {
                  content: "";
                  position: relative;
                  background-color: var(--background-color, var(--secondary-background-color));
                  display: block;
                  width: 100%;
                  height: 1px;
                  top: 12px;
                  margin-bottom: 12px !important;
                  opacity: 0.6;
                }

                #add-button {
                  margin: 0 0 14px 0;
                  color: var(--text-primary-color);
                  width: 100%;
                  height: 32px;
                  border-radius: 16px;
                  border: none;
                  background-color: var(--accent-color);
                  cursor: pointer;
                }

                p {
                  margin-bottom: 4px;
                }

                ha-icon, a, p, button, h4 {
                  color: var(--primary-text-color) !important;
                }

                hr {
                  display: inline-block;
                  width: 100%;
                  border: 1px solid var(--background-color, var(--secondary-background-color));
                  opacity: 0.6;
                  margin: 8px 0 0 0;
                }

                code {
                  background: var(--accent-color);
                  background-blend-mode: darken;
                  padding: 2px 4px;
                  border-radius: 6px;
                }

                .button-header {
                  height: auto;
                  width: 100%;
                  display: inline-flex;
                  align-items: center;
                  margin: 0 8px;
                }

                .button-number {
                  display: inline-flex;
                  width: auto;
                }

                .remove-button {
                  display: inline-flex;
                  border-radius: 50%;
                  width: 24px;
                  height: 24px;
                  text-align: center;
                  line-height: 24px;
                  vertical-align: middle;
                  cursor: pointer;
                }

                .content {
                  margin: 12px 4px 14px 4px;
                }

                h4 > ha-icon {
                  margin: 8px;
                }

                ha-textfield {
                  width: 100%;
                }

                h3 {
                  margin: 4px 0;
                }

                .code-editor {
                    overflow: scroll;
                }

                .icon-button {
                  background: var(--accent-color);
                  border: none;
                  cursor: pointer;
                  padding: 8px;
                  margin: 0;
                  border-radius: 32px;
                  font-weight: bold;
                }

                .icon-button.header {
                  background: none;
                  float: right;
                  padding: 0;
                  margin: 0 8px;
                }

                ha-card-conditions-editor {
                  margin-top: -12px;
                }
            `}})}(),document.createElement("bubble-card-editor")}getLayoutOptions(){let e=1;"pop-up"===this.config.card_type?e=0:"horizontal-buttons-stack"===this.config.card_type?e=1:["cover"].includes(this.config.card_type)&&(e=2);let t=4;return"pop-up"===this.config.card_type?t=0:"horizontal-buttons-stack"===this.config.card_type&&(t=4),{grid_columns:this.config.columns??t,grid_rows:this.config.rows??e}}}customElements.define("bubble-card",ue),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-card",name:"Bubble Card",preview:!1,description:"A minimalist card collection with a nice pop-up touch.",documentationURL:"https://github.com/Clooos/Bubble-Card/"}),console.info(`%c Bubble Card %c ${e} `,"background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)","background-color: #506eac;color: #fff;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)")})()})();