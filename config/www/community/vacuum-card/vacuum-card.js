/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,a=null)=>{for(;e!==a;){const a=e.nextSibling;t.removeChild(e),e=a}},a=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${a}--\x3e`,n=new RegExp(`${a}|${o}`);class i{constructor(t,e){this.parts=[],this.element=e;const o=[],i=[],s=document.createTreeWalker(e.content,133,null,!1);let u=0,p=-1,d=0;const{strings:h,values:{length:m}}=t;for(;d<m;){const t=s.nextNode();if(null!==t){if(p++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:a}=e;let o=0;for(let t=0;t<a;t++)r(e[t].name,"$lit$")&&o++;for(;o-- >0;){const e=h[d],a=c.exec(e)[2],o=a.toLowerCase()+"$lit$",i=t.getAttribute(o);t.removeAttribute(o);const r=i.split(n);this.parts.push({type:"attribute",index:p,name:a,strings:r}),d+=r.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const a=t.parentNode,i=e.split(n),s=i.length-1;for(let e=0;e<s;e++){let o,n=i[e];if(""===n)o=l();else{const t=c.exec(n);null!==t&&r(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),o=document.createTextNode(n)}a.insertBefore(o,t),this.parts.push({type:"node",index:++p})}""===i[s]?(a.insertBefore(l(),t),o.push(t)):t.data=i[s],d+=s}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&p!==u||(p++,e.insertBefore(l(),t)),u=p,this.parts.push({type:"node",index:p}),null===t.nextSibling?t.data="":(o.push(t),p--),d++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),d++}}else s.currentNode=i.pop()}for(const t of o)t.parentNode.removeChild(t)}}const r=(t,e)=>{const a=t.length-e.length;return a>=0&&t.slice(a)===e},s=t=>-1!==t.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:a},parts:o}=t,n=document.createTreeWalker(a,133,null,!1);let i=d(o),r=o[i],s=-1,l=0;const c=[];let u=null;for(;n.nextNode();){s++;const t=n.currentNode;for(t.previousSibling===u&&(u=null),e.has(t)&&(c.push(t),null===u&&(u=t)),null!==u&&l++;void 0!==r&&r.index===s;)r.index=null!==u?-1:r.index-l,i=d(o,i),r=o[i]}c.forEach(t=>t.parentNode.removeChild(t))}const p=t=>{let e=11===t.nodeType?0:1;const a=document.createTreeWalker(t,133,null,!1);for(;a.nextNode();)e++;return e},d=(t,e=-1)=>{for(let a=e+1;a<t.length;a++){const e=t[a];if(s(e))return a}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const h=new WeakMap,m=t=>"function"==typeof t&&h.has(t),_={},f={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class g{constructor(t,e,a){this.__parts=[],this.template=t,this.processor=e,this.options=a}update(t){let e=0;for(const a of this.__parts)void 0!==a&&a.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),a=[],o=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let i,r=0,l=0,c=n.nextNode();for(;r<o.length;)if(i=o[r],s(i)){for(;l<i.index;)l++,"TEMPLATE"===c.nodeName&&(a.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=a.pop(),c=n.nextNode());if("node"===i.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,i.name,i.strings,this.options));r++}else this.__parts.push(void 0),r++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const b=` ${a} `;class v{constructor(t,e,a,o){this.strings=t,this.values=e,this.type=a,this.processor=o}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let i=0;i<t;i++){const t=this.strings[i],r=t.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===t.indexOf("--\x3e",r+1);const s=c.exec(t);e+=null===s?t+(n?b:o):t.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+a}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const y=t=>null===t||!("object"==typeof t||"function"==typeof t),S=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class w{constructor(t,e,a){this.dirty=!0,this.element=t,this.name=e,this.strings=a,this.parts=[];for(let t=0;t<a.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new k(this)}_getValue(){const t=this.strings,e=t.length-1;let a="";for(let o=0;o<e;o++){a+=t[o];const e=this.parts[o];if(void 0!==e){const t=e.value;if(y(t)||!S(t))a+="string"==typeof t?t:String(t);else for(const e of t)a+="string"==typeof e?e:String(e)}}return a+=t[e],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===_||y(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=_,t(this)}this.value!==_&&this.committer.commit()}}class V{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}const t=this.__pendingValue;t!==_&&(y(t)?t!==this.value&&this.__commitText(t):t instanceof v?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):S(t)?this.__commitIterable(t):t===f?(this.value=f,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,a="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=a:this.__commitNode(document.createTextNode(a)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const a=new g(e,t.processor,this.options),o=a._clone();a.update(t.values),this.__commitNode(o),this.value=a}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let a,o=0;for(const n of t)a=e[o],void 0===a&&(a=new V(this.options),e.push(a),0===o?a.appendIntoPart(this):a.insertAfterPart(e[o-1])),a.setValue(n),a.commit(),o++;o<e.length&&(e.length=o,this.clear(a&&a.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class N{constructor(t,e,a){if(this.value=void 0,this.__pendingValue=void 0,2!==a.length||""!==a[0]||""!==a[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=a}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=_}}class z extends w{constructor(t,e,a){super(t,e,a),this.single=2===a.length&&""===a[0]&&""===a[1]}_createPart(){return new j(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class j extends k{}let E=!1;(()=>{try{const t={get capture(){return E=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class x{constructor(t,e,a){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=a,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=_,t(this)}if(this.__pendingValue===_)return;const t=this.__pendingValue,e=this.value,a=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||a);a&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=C(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=_}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const C=t=>t&&(E?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function M(t){let e=W.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},W.set(t.type,e));let o=e.stringsArray.get(t.strings);if(void 0!==o)return o;const n=t.strings.join(a);return o=e.keyString.get(n),void 0===o&&(o=new i(t,t.getTemplateElement()),e.keyString.set(n,o)),e.stringsArray.set(t.strings,o),o}const W=new Map,T=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const P=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,a,o){const n=e[0];if("."===n){return new z(t,e.slice(1),a).parts}return"@"===n?[new x(t,e.slice(1),o.eventContext)]:"?"===n?[new N(t,e.slice(1),a)]:new w(t,e,a).parts}handleTextExpression(t){return new V(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const K=(t,...e)=>new v(t,e,"html",P)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,q=(t,e)=>`${t}--${e}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const O=t=>e=>{const o=q(e.type,t);let n=W.get(o);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},W.set(o,n));let r=n.stringsArray.get(e.strings);if(void 0!==r)return r;const s=e.strings.join(a);if(r=n.keyString.get(s),void 0===r){const a=e.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(a,t),r=new i(e,a),n.keyString.set(s,r)}return n.stringsArray.set(e.strings,r),r},R=["html","svg"],U=new Set,Z=(t,e,a)=>{U.add(t);const o=a?a.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:i}=n;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(o,t);const r=document.createElement("style");for(let t=0;t<i;t++){const e=n[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{R.forEach(e=>{const a=W.get(q(e,t));void 0!==a&&a.keyString.forEach(t=>{const{element:{content:e}}=t,a=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{a.add(t)}),u(t,a)})})})(t);const s=o.content;a?function(t,e,a=null){const{element:{content:o},parts:n}=t;if(null==a)return void o.appendChild(e);const i=document.createTreeWalker(o,133,null,!1);let r=d(n),s=0,l=-1;for(;i.nextNode();){for(l++,i.currentNode===a&&(s=p(e),a.parentNode.insertBefore(e,a));-1!==r&&n[r].index===l;){if(s>0){for(;-1!==r;)n[r].index+=s,r=d(n,r);return}r=d(n,r)}}}(a,r,s.firstChild):s.insertBefore(r,s.firstChild),window.ShadyCSS.prepareTemplateStyles(o,t);const l=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(a){s.insertBefore(r,s.firstChild);const t=new Set;t.add(r),u(a,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const A={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},J=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:A,reflect:!1,hasChanged:J};class Y extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,a)=>{const o=this._attributeNameForProperty(a,e);void 0!==o&&(this._attributeToPropertyMap.set(o,a),t.push(o))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const a="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,a,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}static getPropertyDescriptor(t,e,a){return{get(){return this[e]},set(a){const o=this[t];this[e]=a,this._requestUpdate(t,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||G}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const a of e)this.createProperty(a,t[a])}}static _attributeNameForProperty(t,e){const a=e.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,a=J){return a(t,e)}static _propertyValueFromAttribute(t,e){const a=e.type,o=e.converter||A,n="function"==typeof o?o:o.fromAttribute;return n?n(t,a):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const a=e.type,o=e.converter;return(o&&o.toAttribute||A.toAttribute)(t,a)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,a){e!==a&&this._attributeToProperty(t,a)}_propertyToAttribute(t,e,a=G){const o=this.constructor,n=o._attributeNameForProperty(t,a);if(void 0!==n){const t=o._propertyValueToAttribute(e,a);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const a=this.constructor,o=a._attributeToPropertyMap.get(t);if(void 0!==o){const t=a.getPropertyOptions(o);this._updateState=16|this._updateState,this[o]=a._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let a=!0;if(void 0!==t){const o=this.constructor,n=o.getPropertyOptions(t);o._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}Y.finalized=!0;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const X="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol();class L{constructor(t,e){if(e!==D)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(X?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const F=(t,...e)=>{const a=e.reduce((e,a,o)=>e+(t=>{if(t instanceof L)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(a)+t[o+1],t[0]);return new L(a,D)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const Q={};class H extends Y{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,a)=>t.reduceRight((t,a)=>Array.isArray(a)?e(a,t):(t.add(a),t),a),a=e(t,new Set),o=[];a.forEach(t=>o.unshift(t)),this._styles=o}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?X?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Q&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Q}}H.finalized=!0,H.render=(t,a,o)=>{if(!o||"object"!=typeof o||!o.scopeName)throw new Error("The `scopeName` option is required.");const n=o.scopeName,i=T.has(a),r=I&&11===a.nodeType&&!!a.host,s=r&&!U.has(n),l=s?document.createDocumentFragment():a;if(((t,a,o)=>{let n=T.get(a);void 0===n&&(e(a,a.firstChild),T.set(a,n=new V(Object.assign({templateFactory:M},o))),n.appendInto(a)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:O(n)},o)),s){const t=T.get(l);T.delete(l);const o=t.value instanceof g?t.value.template:void 0;Z(n,l,o),e(a,a.firstChild),a.appendChild(l),T.set(a,t)}!i&&r&&window.ShadyCSS.styleElement(a.host)};var B=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,$="[^\\s]+",tt=/\[([^]*?)\]/gm;function et(t,e){for(var a=[],o=0,n=t.length;o<n;o++)a.push(t[o].substr(0,e));return a}var at=function(t){return function(e,a){var o=a[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return o>-1?o:null}};function ot(t){for(var e=[],a=1;a<arguments.length;a++)e[a-1]=arguments[a];for(var o=0,n=e;o<n.length;o++){var i=n[o];for(var r in i)t[r]=i[r]}return t}var nt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],it=["January","February","March","April","May","June","July","August","September","October","November","December"],rt=et(it,3),st={dayNamesShort:et(nt,3),dayNames:nt,monthNamesShort:rt,monthNames:it,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=ot({},st),ct=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},ut={D:function(t){return String(t.getDate())},DD:function(t){return ct(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return ct(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return ct(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return ct(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return ct(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return ct(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return ct(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return ct(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return ct(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return ct(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return ct(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ct(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ct(Math.floor(Math.abs(e)/60),2)+":"+ct(Math.abs(e)%60,2)}},pt=function(t){return+t-1},dt=[null,"[1-9]\\d?"],ht=[null,$],mt=["isPm",$,function(t,e){var a=t.toLowerCase();return a===e.amPm[0]?0:a===e.amPm[1]?1:null}],_t=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var a=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?a:-a}return 0}],ft=(at("monthNamesShort"),at("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var gt=function(t,e,a){if(void 0===e&&(e=ft.default),void 0===a&&(a={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var o=[];e=(e=ft[e]||e).replace(tt,(function(t,e){return o.push(e),"@@@"}));var n=ot(ot({},lt),a);return(e=e.replace(B,(function(e){return ut[e](t,n)}))).replace(/@@@/g,(function(){return o.shift()}))},bt=(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t,e,a,o){o=o||{},a=null==a?{}:a;var n=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=a,t.dispatchEvent(n),n});var vt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},yt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,St=/^\w*$/,wt=/^\./,kt=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Vt=/\\(\\)?/g,Nt=/^\[object .+?Constructor\]$/,zt="object"==typeof vt&&vt&&vt.Object===Object&&vt,jt="object"==typeof self&&self&&self.Object===Object&&self,Et=zt||jt||Function("return this")();var xt,Ct=Array.prototype,Mt=Function.prototype,Wt=Object.prototype,Tt=Et["__core-js_shared__"],Pt=(xt=/[^.]+$/.exec(Tt&&Tt.keys&&Tt.keys.IE_PROTO||""))?"Symbol(src)_1."+xt:"",Kt=Mt.toString,qt=Wt.hasOwnProperty,It=Wt.toString,Ot=RegExp("^"+Kt.call(qt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Rt=Et.Symbol,Ut=Ct.splice,Zt=Bt(Et,"Map"),At=Bt(Object,"create"),Jt=Rt?Rt.prototype:void 0,Gt=Jt?Jt.toString:void 0;function Yt(t){var e=-1,a=t?t.length:0;for(this.clear();++e<a;){var o=t[e];this.set(o[0],o[1])}}function Xt(t){var e=-1,a=t?t.length:0;for(this.clear();++e<a;){var o=t[e];this.set(o[0],o[1])}}function Dt(t){var e=-1,a=t?t.length:0;for(this.clear();++e<a;){var o=t[e];this.set(o[0],o[1])}}function Lt(t,e){for(var a,o,n=t.length;n--;)if((a=t[n][0])===(o=e)||a!=a&&o!=o)return n;return-1}function Ft(t,e){for(var a,o=0,n=(e=function(t,e){if(ae(t))return!1;var a=typeof t;if("number"==a||"symbol"==a||"boolean"==a||null==t||ne(t))return!0;return St.test(t)||!yt.test(t)||null!=e&&t in Object(e)}(e,t)?[e]:ae(a=e)?a:$t(a)).length;null!=t&&o<n;)t=t[te(e[o++])];return o&&o==n?t:void 0}function Qt(t){return!(!oe(t)||(e=t,Pt&&Pt in e))&&(function(t){var e=oe(t)?It.call(t):"";return"[object Function]"==e||"[object GeneratorFunction]"==e}(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t)?Ot:Nt).test(function(t){if(null!=t){try{return Kt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}(t));var e}function Ht(t,e){var a,o,n=t.__data__;return("string"==(o=typeof(a=e))||"number"==o||"symbol"==o||"boolean"==o?"__proto__"!==a:null===a)?n["string"==typeof e?"string":"hash"]:n.map}function Bt(t,e){var a=function(t,e){return null==t?void 0:t[e]}(t,e);return Qt(a)?a:void 0}Yt.prototype.clear=function(){this.__data__=At?At(null):{}},Yt.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},Yt.prototype.get=function(t){var e=this.__data__;if(At){var a=e[t];return"__lodash_hash_undefined__"===a?void 0:a}return qt.call(e,t)?e[t]:void 0},Yt.prototype.has=function(t){var e=this.__data__;return At?void 0!==e[t]:qt.call(e,t)},Yt.prototype.set=function(t,e){return this.__data__[t]=At&&void 0===e?"__lodash_hash_undefined__":e,this},Xt.prototype.clear=function(){this.__data__=[]},Xt.prototype.delete=function(t){var e=this.__data__,a=Lt(e,t);return!(a<0)&&(a==e.length-1?e.pop():Ut.call(e,a,1),!0)},Xt.prototype.get=function(t){var e=this.__data__,a=Lt(e,t);return a<0?void 0:e[a][1]},Xt.prototype.has=function(t){return Lt(this.__data__,t)>-1},Xt.prototype.set=function(t,e){var a=this.__data__,o=Lt(a,t);return o<0?a.push([t,e]):a[o][1]=e,this},Dt.prototype.clear=function(){this.__data__={hash:new Yt,map:new(Zt||Xt),string:new Yt}},Dt.prototype.delete=function(t){return Ht(this,t).delete(t)},Dt.prototype.get=function(t){return Ht(this,t).get(t)},Dt.prototype.has=function(t){return Ht(this,t).has(t)},Dt.prototype.set=function(t,e){return Ht(this,t).set(t,e),this};var $t=ee((function(t){var e;t=null==(e=t)?"":function(t){if("string"==typeof t)return t;if(ne(t))return Gt?Gt.call(t):"";var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}(e);var a=[];return wt.test(t)&&a.push(""),t.replace(kt,(function(t,e,o,n){a.push(o?n.replace(Vt,"$1"):e||t)})),a}));function te(t){if("string"==typeof t||ne(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}function ee(t,e){if("function"!=typeof t||e&&"function"!=typeof e)throw new TypeError("Expected a function");var a=function(){var o=arguments,n=e?e.apply(this,o):o[0],i=a.cache;if(i.has(n))return i.get(n);var r=t.apply(this,o);return a.cache=i.set(n,r),r};return a.cache=new(ee.Cache||Dt),a}ee.Cache=Dt;var ae=Array.isArray;function oe(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function ne(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==It.call(t)}var ie=function(t,e,a){var o=null==t?void 0:Ft(t,e);return void 0===o?a:o},re={cleaning:"Cleaning",auto:"Automatic Cleaning",spot:"Spot Cleaning",edge:"Edge Cleaning",single_room:"Single Room Cleaning",paused:"Paused",idle:"Idle",stop:"Stopped",charging:"Charging","returning home":"Returning Home",returning:"Returning Home",docked:"Docked",unknown:"Unknown",offline:"Offline"},se={gentle:"Gentle",silent:"Silent",standard:"Standard",medium:"Medium",turbo:"Turbo",normal:"Normal",high:"High"},le={name:"Vacuum Card",description:"Vacuum card allows you to control your robot vacuum.",start:"Clean",continue:"Continue",pause:"Pause",stop:"Stop",return_to_base:"Dock",locate:"Locate Vacuum",not_available:"Vacuum is not available"},ce={missing_entity:"Specifying entity is required!"},ue={entity:"Entity (Required)",map:"Map Camera (Optional)",image:"Image (Optional)",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Setting actions and stats options are available exclusively using Code Editor."},pe={status:re,source:se,common:le,error:ce,editor:ue},de={cleaning:"Прибирає",paused:"Пауза",idle:"Очікує",charging:"Заряджається","returning home":"Повертається","segment cleaning":"Зоноване прибирання"},he={gentle:"Делікатний",silent:"Тихий",standard:"Стандартний",medium:"Середній",turbo:"Турбо"},me={name:"Пилосос",description:'Картка "пилосос" дозволяє керувати роботом-пилососом.',start:"Clean",continue:"Продовжити",pause:"Пауза",stop:"Стоп",return_to_base:"На базу",locate:"Знайти",not_available:"Пилосос недоступний"},_e={missing_entity:"Об’єкт є обов’язковим полем!"},fe={entity:"Об’єкт (Required)",map:"Камера для карти (Додатково)",image:"Зображення (Додатково)",compact_view:"Компактний перегляд",compact_view_aria_label_on:"Увімкнути компактний перегляд",compact_view_aria_label_off:"Вимкнути компактний перегляд",show_name:"Показувати ім’я?",show_name_aria_label_on:"Показати ім’я",show_name_aria_label_off:"Приховати ім’я",show_status:"Показувати статус?",show_status_aria_label_on:"Показати статус",show_status_aria_label_off:"Приховати статус",show_toolbar:"Показувати панель дій?",show_toolbar_aria_label_on:"Показати панель дій",show_toolbar_aria_label_off:"Приховати панель дій",code_only_note:"Увага: Опції actions та stats доступні виключно через редактор коду."},ge={status:de,source:he,common:me,error:_e,editor:fe},be={cleaning:"Aan het schoonmaken",paused:"Gepauzeerd",idle:"Inactief",charging:"Aan het opladen","returning home":"Keert terug naar dock"},ve={name:"Stofzuiger kaart",description:"Stofzuiger kaart maakt het makkelijk om je robotstofzuiger te bedienen.",start:"Start",continue:"Doorgaan",pause:"Pauze",stop:"Stop",return_to_base:"Terugkeren",locate:"Zoek stofzuiger"},ye={missing_entity:"Het specificeren van een entiteit is verplicht!"},Se={entity:"Entiteit (Verplicht)",map:"Kaart Camera (Optioneel)",image:"Afbeelding (Optioneel)",compact_view:"Compacte weergave",compact_view_aria_label_on:"Zet compacte weergave aan",compact_view_aria_label_off:"Zet compacte weergave uit",show_name:"Naam laten zien?",show_name_aria_label_on:"Zet weergavenaam aan",show_name_aria_label_off:"Zet weergavenaam uit",show_toolbar:"Werkbalk laten zien?",show_toolbar_aria_label_on:"Zet werkbalk aan",show_toolbar_aria_label_off:"Zet werkbalk uit",code_only_note:"Notitie: Instel acties en status opties zijn alleen beschikbaar in de Code Editor"},we={status:be,common:ve,error:ye,editor:Se},ke={cleaning:"Reinigen",paused:"Pausiert",idle:"Untätig",charging:"Aufladen","returning home":"Rückkehr zu Dockingstation","segment cleaning":"Zimmerreinigung",docked:"Angedockt"},Ve={silent:"Leise",standard:"Normal",medium:"Turbo",turbo:"Max."},Ne={name:"Vacuum Card",description:"Vacuum card ermöglicht es Ihnen, Ihr Staubsaugerroboter zu steuern.",start:"Reinigen",continue:"Weiter",pause:"Pause",stop:"Stop",return_to_base:"Dock",locate:"Staubsauger lokalisieren"},ze={missing_entity:"Angabe der Entität ist erforderlich!"},je={entity:"Entität (Erforderlich)",map:"Map Camera (Optional)",image:"Bild (Optional)",compact_view:"kompakte Ansicht",compact_view_aria_label_on:"Schalte kompakte Ansicht ein",compact_view_aria_label_off:"Schalte kompakte Ansicht aus",show_name:"Zeige Namen",show_name_aria_label_on:"Schalte 'Zeige Namen' ein",show_name_aria_label_off:"Schalte 'Zeige Namen' aus",show_toolbar:"Zeige Toolbar",show_toolbar_aria_label_on:"Schalte 'Zeige Toolbar' ein",show_toolbar_aria_label_off:"Schalte 'Zeige Toolbar' aus",code_only_note:"Hinweis: Das Festlegen von Aktionen und Statistikoptionen ist ausschließlich mit dem Code-Editor möglich."},Ee={status:ke,source:Ve,common:Ne,error:ze,editor:je},xe={cleaning:"Nettoyage",paused:"En pause",idle:"Inactif",charging:"En charge","returning home":"Retour à la base"},Ce={gentle:"Doux",silent:"Silencieux",standard:"Standard",medium:"Moyen",turbo:"Turbo"},Me={name:"Vacuum Carte",description:"Vacuum carte vous permet de contrôler votre robot aspirateur.",start:"Nettoyer",continue:"Continuer",pause:"Pause",stop:"Stop",return_to_base:"Retour base",locate:"Localiser aspirateur",not_available:"L'aspirateur n'est pas disponible"},We={missing_entity:"La spécification de l'entité est requise !"},Te={entity:"Entité (obligatoire)",map:"Caméra de carte (facultatif)",image:"Image (facultatif)",compact_view:"Vue compacte",compact_view_aria_label_on:"Activer la vue compacte",compact_view_aria_label_off:"Désactiver la vue compacte",show_name:"Afficher le nom",show_name_aria_label_on:"Activer affichage du nom",show_name_aria_label_off:"Désactiver affichage du nom",show_status:"Afficher l'état",show_status_aria_label_on:"Activer l'affichage de l'état",show_status_aria_label_off:"Désactiver l'affichage de l'état",show_toolbar:"Afficher la barre d'outils",show_toolbar_aria_label_on:"Activer l'affichage de la barre d'outils",show_toolbar_aria_label_off:"Désactiver l'affichage de la barre d'outils",code_only_note:"Remarque: Les options de réglage des actions et statistiques sont disponibles exclusivement en utilisant l'éditeur de code."},Pe={status:xe,source:Ce,common:Me,error:We,editor:Te},Ke={cleaning:"Sprzątanie",paused:"Wstrzymany",idle:"Bezczynny",charging:"Ładowanie","returning home":"Powrót do bazy"},qe={name:"Vacuum Card",description:"Vacuum card pozwala zdalnie kontrolować odkurzacz.",start:"Sprzątaj",continue:"Kontynuuj",pause:"Wstrzymaj",stop:"Zatrzymaj",return_to_base:"Powrót",locate:"Zlokalizuj odkurzacz"},Ie={missing_entity:"Ustawienie encji jest wymagane!"},Oe={entity:"Encja (wymagane)",map:"Kamera (opcjonalne)",image:"Obrazek (opcjonalne)",compact_view:"Widok kompaktowy",compact_view_aria_label_on:"Włącz widok kompaktowy",compact_view_aria_label_off:"Wyłącz widok kompaktowy",show_name:"Pokaż nazwę",show_name_aria_label_on:"Włącz widok nazwy",show_name_aria_label_off:"Wyłącz widok nazwy",show_toolbar:"Pasek narzędzi",show_toolbar_aria_label_on:"Włącz pasek narzędzi",show_toolbar_aria_label_off:"Wyłącz pasek narzędzi",code_only_note:"Uwaga: Ustawianie opcji i informacji statystyk jest dostępne tylko poprzez edytor kodu YAML."},Re={status:Ke,common:qe,error:Ie,editor:Oe},Ue={cleaning:"In pulizia",paused:"In pausa",idle:"Inattivo",charging:"In carica","returning home":"In rientro alla base"},Ze={name:"Vacuum Card",description:"Vacuum card consente di controllare il tuo aspirapolvere.",start:"Pulisci",continue:"Continua",pause:"Pausa",stop:"Stop",return_to_base:"Base",locate:"Trova aspirapolvere"},Ae={missing_entity:"È necessario specificare l'entità!"},Je={entity:"Entità (Richiesto)",map:"Mappa (Opzionale)",image:"Immagine (Opzionale)",compact_view:"Vista compatta",compact_view_aria_label_on:"Attiva vista compatta",compact_view_aria_label_off:"Disattiva vista compatta",show_name:"Mostra Nome",show_name_aria_label_on:"Attiva nome",show_name_aria_label_off:"Disattiva nome",show_toolbar:"Mostra barra degli strumenti",show_toolbar_aria_label_on:"Attiva barra degli strumenti",show_toolbar_aria_label_off:"Disattiva barra degli strumenti",code_only_note:"NB: La configurazione di azioni e statistiche sono disponibili soltanto nell'editor di codice."},Ge={status:Ue,common:Ze,error:Ae,editor:Je},Ye={cleaning:"Убирает",paused:"Пауза",idle:"Ожидает",charging:"Заряжается","returning home":"Возвращается",returning:"Возвращается",docked:"На базе","segment cleaning":"Уборка зоны/комнаты"},Xe={gentle:"Деликатный",silent:"Тихий",standard:"Стандартный",medium:"Средний",turbo:"Турбо"},De={name:"Пылесос",description:'Карта "пылесос" позволяет управлять роботом-пылесосом.',start:"Запуск",continue:"Продолжить",pause:"Пауза",stop:"Остановить",return_to_base:"На базу",locate:"Найти",not_available:"Пылесос недоступен"},Le={missing_entity:"Объект является обязательным полем!"},Fe={entity:"Объект (Обязательное)",map:"Камера для карты (Опциональное)",image:"Изображение (Опциональное)",compact_view:"Компактный просмотр",compact_view_aria_label_on:"Включить компактный просмотр",compact_view_aria_label_off:"Выключить компактный просмотр",show_name:"Показать название?",show_name_aria_label_on:"Показать название",show_name_aria_label_off:"Скрыть название",show_status:"Показать статус?",show_status_aria_label_on:"Показать статус",show_status_aria_label_off:"Скрыть статус",show_toolbar:"Показать панель действий?",show_toolbar_aria_label_on:"Показать панель действий",show_toolbar_aria_label_off:"Скрыть панель действий",code_only_note:"Внимание: Опции actions и stats доступны исключительно через редактор кода."},Qe={status:Ye,source:Xe,common:De,error:Le,editor:Fe},He={cleaning:"Limpiando",paused:"En pausa",idle:"Inactivo",charging:"Cargando","returning home":"Volviendo a la base",docked:"En la base","segment cleaning":"Limpiando zona"},Be={gentle:"Delicado",silent:"Silencioso",standard:"Estándar",medium:"Medio",turbo:"Turbo"},$e={name:"Vacuum Card",description:"Vacuum card te permite controlar tu robot aspirador.",start:"Comenzar",continue:"Continuar",pause:"Pausar",stop:"Detener",return_to_base:"Volver a la base",locate:"Localizar",not_available:"Vacuum no está disponible"},ta={missing_entity:"¡Se requiere especificar una entidad!"},ea={entity:"Entidad (Requerido)",map:"Map Camera (Opcional)",image:"Imagen (Opcional)",compact_view:"Vista compacta",compact_view_aria_label_on:"Activar vista compacta",compact_view_aria_label_off:"Desactivar vista compacta",show_name:"Nombre a mostrar",show_name_aria_label_on:"Mostrar nombre",show_name_aria_label_off:"Ocultar nombre",show_status:"Mostrar estado",show_status_aria_label_on:"Activar estado de la pantalla",show_status_aria_label_off:"Desactivar estado de la pantalla",show_toolbar:"Mostrar barra de herramientas",show_toolbar_aria_label_on:"Activar la barra de herramientas",show_toolbar_aria_label_off:"Desactivar la barra de herramientas",code_only_note:"Nota: La configuración de las acciones y estadísticas está únicamente disponible a través del Editor de Código."},aa={status:He,source:Be,common:$e,error:ta,editor:ea},oa={cleaning:"Vysává se",paused:"Pozastaveno",idle:"Nečinný",charging:"Nabíjí se","returning home":"Vrací se domů"},na={gentle:"Mírný",silent:"Tichý",standard:"Standardní",medium:"Střední",turbo:"Turbo"},ia={name:"Karta vysavače",description:"Karta vysavače vám dovolí ovládat svůj vysavač.",start:"Začni vysávat",continue:"Pokračuj",pause:"Pozastav",stop:"Zastav",return_to_base:"Vrať se domů",locate:"Lokalizuj",not_available:"Vysavač není dostupný"},ra={missing_entity:"Je vyžadováno specifikování entity!"},sa={entity:"Entita (Povinný)",map:"Mapa (Nepovinný)",image:"Fotka (Nepovinný)",compact_view:"Kompaktní zobrazení",compact_view_aria_label_on:"Zapni kompaktní zobrazení",compact_view_aria_label_off:"Vypni kompaktní zobrazení",show_name:"Zobraz název",show_name_aria_label_on:"Zapni zobrazení názvu",show_name_aria_label_off:"Vypni zobrazení názvu",show_status:"Zobraz status",show_status_aria_label_on:"Zapni zobrazení statusu",show_status_aria_label_off:"Vypni zobrazení statusu",show_toolbar:"Zobraz lištu",show_toolbar_aria_label_on:"Zapni zobrazení lišty",show_toolbar_aria_label_off:"Vypni zobrazení lišty",code_only_note:"Poznámka: Nastavení akcí a infa je dostupné pouze v editoru kódu."},la={status:oa,source:na,common:ia,error:ra,editor:sa},ca={cleaning:"Tisztítás",paused:"Szünet",idle:"Tétlen",charging:"Töltés","returning home":"Hazatérés"},ua={gentle:"Gyengéd",silent:"Csendes",standard:"Alap",medium:"Közepes",turbo:"Turbo"},pa={name:"Porszívó Kártya",description:"Ez a kártya lehetővé teszi, hogy robot porszívódat irányítsd.",start:"Tisztítás",continue:"Folytatás",pause:"Szünet",stop:"Megszakítás",return_to_base:"Hazatérés",locate:"Porszívó megkeresése",not_available:"A porszívó nem elérhető"},da={missing_entity:"Entitás megadása kötelező!"},ha={entity:"Entitás (Kötelező)",map:"Térkép kamera (Opcionális)",image:"Kép (Opcionális)",compact_view:"Kompakt nézet",compact_view_aria_label_on:"Kompakt nézet bekapcsolása",compact_view_aria_label_off:"Kompakt nézet kikapcsolása",show_name:"Név megjelenítése",show_name_aria_label_on:"Név megjelenítése",show_name_aria_label_off:"Név elrejtése",show_status:"Állapot megjelenítése",show_status_aria_label_on:"Állapot megjelenítése",show_status_aria_label_off:"Állapot elrejtése",show_toolbar:"Eszköztár megjelenítése",show_toolbar_aria_label_on:"Eszköztár megjelenítése",show_toolbar_aria_label_off:"Eszköztár elrejtése",code_only_note:"Megjegyzés: Parancsok és statisztikák beállítása csak a kódszerkesztőben elérhetőek."},ma={status:ca,source:ua,common:pa,error:da,editor:ha},_a={cleaning:"מנקה",auto:"ניקוי אוטומטי",spot:"ניקוי אזור",edge:"ניקוי פינה",single_room:"ניקוי חדר יחיד",paused:"מושהה",idle:"סרק",stop:"נעצר",charging:"בטעינה","returning home":"בחזרה הביתה",returning:"בחזרה הביתה",docked:"לתחנה",unknown:"לא ידוע",offline:"כבוי"},fa={gentle:"עדין",silent:"שקט",standard:"רגיל",medium:"בינוני",turbo:"טורבו",normal:"נורמלי",high:"גבוה"},ga={name:"כרטיס שואב",description:"כרטיס שואב מאפשר לך שליטה על שואב האבק שלך.",start:"נקה",continue:"המשך",pause:"השהה",stop:"עצור",return_to_base:"עגינה",locate:"אתר שואב",not_available:"השואב אינו זמין"},ba={missing_entity:"יש צורך לציין ישות!"},va={entity:"ישות (נדרש)",map:"מצלמת מפה (אפשרי)",image:"תמונה (אפשרי)",compact_view:"תצוגה קומפקטית",compact_view_aria_label_on:"החלף תצוגה קומפקטית",compact_view_aria_label_off:"כבה את התצוגה הקומפקטית",show_name:"שם תצוגה",show_name_aria_label_on:"הפעל את שם התצוגה למצב מופעל",show_name_aria_label_off:"כבה את שם התצוגה",show_status:"הצג סטטוס",show_status_aria_label_on:"הפעל את מצב התצוגה למצב פעיל",show_status_aria_label_off:"כבה את מצב התצוגה",show_toolbar:"הצג סרגל כלים",show_toolbar_aria_label_on:"הפעל את סרגל הכלים לתצוגה",show_toolbar_aria_label_off:"כבה את סרגל הכלים לתצוגה",code_only_note:"הערה: הגדרת פעולות ואפשרויות סטטיסטיקה זמינות אך ורק באמצעות עורך הקוד."},ya={status:_a,source:fa,common:ga,error:ba,editor:va},Sa={cleaning:"Städar",paused:"Pausad",idle:"Inaktiv",charging:"Laddar","returning home":"Återvänder hem"},wa={gentle:"Extra försiktig",silent:"Eco - tyst",standard:"Standard",medium:"Medium",turbo:"Turbo"},ka={name:"Dammsugarkort",description:"Dammsugarkort låter dig att kontrollera din robotdammsugare.",start:"Städa",continue:"Fortsätt",pause:"Paus",stop:"Stopp",return_to_base:"Docka",locate:"Lokalisera dammsugare",not_available:"Dammsugare är inte tillgänglig"},Va={missing_entity:"Specificera entitet är obligatoriskt!"},Na={entity:"Entitet (Obligatoriskt)",map:"Kartkamera (Valfritt)",image:"Bild (Valfritt)",compact_view:"Kompakt vy",compact_view_aria_label_on:"Aktivera kompakt vy",compact_view_aria_label_off:"Inaktivera kompakt vy",show_name:"Visa namn",show_name_aria_label_on:"Aktivera namn",show_name_aria_label_off:"Inaktivera namn",show_status:"Visa status",show_status_aria_label_on:"Aktivera status",show_status_aria_label_off:"Inaktivera status",show_toolbar:"Visa verktygsvält",show_toolbar_aria_label_on:"Aktivera verktygsfält",show_toolbar_aria_label_off:"Inaktivera verktygsfält",code_only_note:"Obs! Inställningar för händelser och statistikalternativ är enbart tillgängliga med kodredigeraren."},za={status:Sa,source:wa,common:ka,error:Va,editor:Na},ja={cleaning:"Rengjøring",paused:"Pauset",idle:"Tomgang",charging:"Lader","returning home":"Returnerer hjem"},Ea={gentle:"Skånsom",silent:"Stille",standard:"Standard",medium:"Medium",turbo:"Turbo"},xa={name:"Støvsuger kort",description:"Støvsugerkortet lar deg kontrollere robotstøvsugeren din",start:"Rengjør",continue:"fortsett",pause:"Pause",stop:"Stop",return_to_base:"Dock",locate:"Lokaliser støvsuger",not_available:"Støvsugeren er ikke tilgjengelig"},Ca={missing_entity:"Spesifiserende enhet kreves!"},Ma={entity:"Enhet (påkrevd)",map:"Kartkamera (valgfritt)",image:"Bilde (Valgfritt)",compact_view:"Kompakt visning",compact_view_aria_label_on:"Slå på kompakt visning",compact_view_aria_label_off:"Slå av kompakt visningf",show_name:"Vis navn",show_name_aria_label_on:"Slå visningsnavnet på",show_name_aria_label_off:"Slå visningsnavnet av",show_status:"Vis Status",show_status_aria_label_on:"Slå skjermstatus på",show_status_aria_label_off:"Slå skjermstatus av",show_toolbar:"Vis verktøylinjen",show_toolbar_aria_label_on:"Slå skjermverktøylinjen på",show_toolbar_aria_label_off:"Slå skjermverktøylinjen av",code_only_note:"Merk: Innstillingshandlinger og statistikkalternativer er eksklusivt tilgjengelige ved hjelp av Code Editor."},Wa={status:ja,source:Ea,common:xa,error:Ca,editor:Ma},Ta={cleaning:"Rengjer",paused:"Pausa",idle:"Tomgang",charging:"Ladar","returning home":"Returnerer heim"},Pa={gentle:"Skånsam",silent:"Stille",standard:"Standard",medium:"Medium",turbo:"Turbo"},Ka={name:"Støvsugarkort",description:"Støvsugarkortet let deg kontrollere robotstøvsugaren din",start:"Reingjer",continue:"Fortsett",pause:"Sett på pause",stop:"Stopp",return_to_base:"Dokk",locate:"Lokaliser støvsugar",not_available:"Støvsugaren er ikkje tilgjengeleg"},qa={missing_entity:"Spesifiserande oppføring kravd!"},Ia={entity:"Oppføring (påkravd)",map:"Kartkamera (valfritt)",image:"Bilde (valfritt)",compact_view:"Kompakt vising",compact_view_aria_label_on:"Slå på kompakt vising",compact_view_aria_label_off:"Slå av kompakt vising",show_name:"Vis namn",show_name_aria_label_on:"Slå visingsnanet på",show_name_aria_label_off:"Slå visingsnamnet av",show_status:"Vis status",show_status_aria_label_on:"Slå skjermstatus på",show_status_aria_label_off:"Slå skjermstatus av",show_toolbar:"Vis verktøylinja",show_toolbar_aria_label_on:"Slå skjermverktøylinja på",show_toolbar_aria_label_off:"Slå skjermverktøylinja av",code_only_note:"Merk: Innstillingshandlingar og statistikkalternativ er berre tilgjengeleg ved hjelp av Code Editor."},Oa={status:Ta,source:Pa,common:Ka,error:qa,editor:Ia},Ra={cleaning:"Støvsuger",paused:"Pauset",idle:"Inaktiv",charging:"Lader","returning home":"Returnerer til dock"},Ua={gentle:"Mild",silent:"Stille",standard:"Standard",medium:"Medium",turbo:"Turbo"},Za={name:"Vacuum Card",description:"Vacuum card lader dig kontrollere din robotstøvsuger.",start:"Start",continue:"Fortsæt",pause:"Pause",stop:"Stop",return_to_base:"Gå til dock",locate:"Find støvsuger",not_available:"Støvsuger er ikke tilgængelig"},Aa={missing_entity:"En enhed skal specificeres!"},Ja={entity:"Enhed (Påkrævet)",map:"Map Camera (Valgfrit)",image:"Billede (Valgfrit)",compact_view:"Kompakt visning",compact_view_aria_label_on:"Slå kompakt visning til",compact_view_aria_label_off:"Slå kompakt visning fra",show_name:"Vis navn",show_name_aria_label_on:"Slå visning af navn til",show_name_aria_label_off:"Slå visning af navn fra",show_status:"Vis Status",show_status_aria_label_on:"Slå visning af status til",show_status_aria_label_off:"Slå visning af status fra",show_toolbar:"Vis værktøjslinje",show_toolbar_aria_label_on:"Slå visning af værktøjslinje til",show_toolbar_aria_label_off:"Slå visning af værktøjslinje fra",code_only_note:"Bemærk: Indstilling af actions og statistik er udelukkende muligt via Code Editor."},Ga={status:Ra,source:Ua,common:Za,error:Aa,editor:Ja},Ya={cleaning:"청소중",paused:"일시정지",idle:"대기중",charging:"충전중","returning home":"복귀중"},Xa={gentle:"물걸레",silent:"저소음",standard:"밸런스",medium:"터보",turbo:"최강"},Da={name:"청소기 카드",description:"청소기 카드는 로봇 청소기를 제어합니다.",start:"청소 시작",continue:"청소 재개",pause:"일시정지",stop:"정지",return_to_base:"복귀",locate:"청소기 위치",not_available:"청소기 사용 불가"},La={missing_entity:"구성요소를 선택해주세요."},Fa={entity:"구성요소 (필수 요소)",map:"지도 (선택 사항)",image:"이미지 (선택 사항)",compact_view:"간단히 보기",compact_view_aria_label_on:"간단히 보기 켜기",compact_view_aria_label_off:"간단히 보기 끄기",show_name:"이름 표시",show_name_aria_label_on:"이름 표시 켜기",show_name_aria_label_off:"이름 표시 끄기",show_status:"상태 표시",show_status_aria_label_on:"상태 표시 켜기",show_status_aria_label_off:"상태 표시 끄기",show_toolbar:"툴바 표시",show_toolbar_aria_label_on:"툴바 표시 켜기",show_toolbar_aria_label_off:"툴바 표시 끄기",code_only_note:"동작과 상태 설정은 코드 에디터에서 수정할 수 있습니다."},Qa={status:Ya,source:Xa,common:Da,error:La,editor:Fa},Ha={Cleaning:"Siivoaa",Paused:"Pysäytetty",Idle:"Toimeton",Charging:"Latauksessa","Returning home":"Palaa kotiin"},Ba={Gentle:"Hellävarainen",Silent:"Hiljainen",Standard:"Normaali",Medium:"Keskitaso",Turbo:"Turbo"},$a={name:"Pölynimurikortti",description:"Pölynimurikortti sallii robotti imurin ohjauksen.",start:"Siivoa",continue:"Jatka",pause:"Tauko",stop:"Pysähdy",return_to_base:"Latausasemaan",locate:"Paikanna imuri",not_available:"Imuri ei saatavilla"},to={missing_entity:"Entiteetti puuttuu!"},eo={entity:"Entiteetti (Vaaditaan)",map:"Kartan kamera (Valinnainen)",image:"Kuva (Valinnainen)",compact_view:"Kompakti näkymä",compact_view_aria_label_on:"Kompakti näkymä päälle",compact_view_aria_label_off:"Kompakti näkymä pois",show_name:"Näytä Nimi",show_name_aria_label_on:"Näyttönimi päälle",show_name_aria_label_off:"Näyttönimi pois",show_status:"Näytä Tila",show_status_aria_label_on:"Tilanäyttö päälle",show_status_aria_label_off:"Tilanäyttö pois",show_toolbar:"Näytä työkalurivi",show_toolbar_aria_label_on:"Työkalurivi päälle",show_toolbar_aria_label_off:"Työkalurivi pois",code_only_note:"Huom: Toimintojen ja tilastojen optiot ovat saatavilla ainoastaan koodieditorissa"},ao={status:Ha,source:Ba,common:$a,error:to,editor:eo},oo={cleaning:"Netejant",paused:"En pausa",idle:"Inactiu",charging:"Carregant","returning home":"Tornant a la base",docked:"A la base"},no={gentle:"Delicat",silent:"Silenciós",standard:"Estàndard",medium:"Mitjà",turbo:"Turbo"},io={name:"Vacuum Card",description:"Vacuum card us permet controlar el robot aspirador.",start:"Neteja",continue:"Continua",pause:"Pausa",stop:"Atura",return_to_base:"Torna a la base",locate:"Localitza",not_available:"No disponible"},ro={missing_entity:"Cal especificar una entitat."},so={entity:"Entitat (Requerit)",map:"Càmera de mapa (Opcional)",image:"Imatge (Opcional)",compact_view:"Visualització compacta",compact_view_aria_label_on:"Activar visualització compacta",compact_view_aria_label_off:"Desactivar visualització compacta",show_name:"Mostrar nom",show_name_aria_label_on:"Mostra nom",show_name_aria_label_off:"Amaga nom",show_status:"Mostrar estat",show_status_aria_label_on:"Mostra estat",show_status_aria_label_off:"Amaga estat",show_toolbar:"Mostrar barra d'eines",show_toolbar_aria_label_on:"Mostra barra d'eines",show_toolbar_aria_label_off:"Amaga barra d'eines",code_only_note:"Nota: Configuració de les accions i estadístiques només disponible des de l'Editor de Codi."},lo={status:oo,source:no,common:io,error:ro,editor:so},co={Cleaning:"清掃中",Paused:"暫停中",Idle:"閒置中",Charging:"充電中","Returning home":"正在返回充電座",docked:"返回充電座","segment cleaning":"區域清掃"},uo={Gentle:"拖地",Silent:"安靜",Standard:"標準",Medium:"強力",Turbo:"MAX"},po={name:"Vacuum Card",description:"Vacuum Card 可以讓您控制掃地機器人",start:"開始清掃",continue:"繼續清掃",pause:"暫停清掃",stop:"停止清掃",return_to_base:"返回充電座",locate:"定位掃地機器人",not_available:"掃地機器人並不支援"},ho={missing_entity:"必須指定一個實體!"},mo={entity:"實體 (必填)",map:"地圖 (選填)",image:"圖片 (選填)",compact_view:"精簡檢視",compact_view_aria_label_on:"開啟精簡檢視",compact_view_aria_label_off:"關閉精簡檢視",show_name:"顯示名字",show_name_aria_label_on:"開啟名字顯示",show_name_aria_label_off:"關閉名字顯示",show_status:"顯示狀態",show_status_aria_label_on:"開啟狀態顯示",show_status_aria_label_off:"關閉狀態顯示",show_toolbar:"顯示工具欄",show_toolbar_aria_label_on:"開啟工具欄顯示",show_toolbar_aria_label_off:"關閉工具欄顯示",code_only_note:"提醒: 如果要使用 actions 和 stats 選項，請使用編碼編輯器編輯"},_o={status:co,source:uo,common:po,error:ho,editor:mo},fo={cleaning:"Đang dọn dẹp",paused:"Dừng",idle:"Nghỉ",charging:"Đang sạc","returning home":"Đang về Dock",docked:"Đang ở Dock"},go={gentle:"Nhẹ",silent:"Yên tĩnh",standard:"Tiêu chuẩn",medium:"Vừa phải",turbo:"Tối đa"},bo={name:"Robot hút bụi Card",description:"Robot hút bụi Card cho phép bạn điều khiển robot hút bụi một cách dễ dàng",start:"Dọn dẹp",continue:"Tiếp tục",pause:"Tạm dừng",stop:"Dừng",return_to_base:"Về Dock",locate:"Định vị",not_available:"Thiết bị không khả dụng"},vo={missing_entity:"Khai báo thiếu Entity"},yo={entity:"Entity (Yêu cầu)",map:"Hiển thị sơ đồ   (Tuỳ chọn)",image:"Image (Tuỳ chọn)",compact_view:"Thu gọn",compact_view_aria_label_on:"Xem thu gọn",compact_view_aria_label_off:"Xem mở rộng",show_name:"Hiện tên",show_name_aria_label_on:"Hiện tên",show_name_aria_label_off:"Ẩn tên",show_status:"Hiện trạng thái",show_status_aria_label_on:"Hiện trạng thái",show_status_aria_label_off:"Ẩn trạng thái",show_toolbar:"Hiện thanh công cụ",show_toolbar_aria_label_on:"Hiện thanh công cụ",show_toolbar_aria_label_off:"Ẩn thanh công cụ",code_only_note:"Lưu ý: Cài đặt thao tác và tùy chọn thống kê chỉ có sẵn bằng trình chỉnh sửa mã"},So={status:fo,source:go,common:bo,error:vo,editor:yo},wo={cleaning:"Valo",paused:"Pristabdytas",idle:"Neturi darbo",charging:"Kraunasi","returning home":"Grįžtą namo",docked:"Doke"},ko={gentle:"Švelnus",silent:"Tylus",standard:"Standartinis",medium:"Vidutinis",turbo:"Turbo"},Vo={name:"Siurblio kortelė",description:"Siurblio kortelė leidžia valdyti jūsų robotą siurblį",start:"Valyti",continue:"Tęsti",pause:"Pristabdyti",stop:"Sustabdyti",return_to_base:"Statyti į doką",locate:"Ieškoti siurblio",not_available:"Siurblys yra nepasiekiamas"},No={missing_entity:"Būtina nurodyti entity!"},zo={entity:"Entity (Būtina)",map:"Žemėlapio kamera (Neprivaloma)",image:"Paveikslėlis (Neprivaloma)",compact_view:"Glaustas vaizdas",compact_view_aria_label_on:"Įjungti glaustą vaizdą",compact_view_aria_label_off:"Išjungti glaustą vaizdą",show_name:"Rodyti pavadinimą",show_name_aria_label_on:"Įjungti pavadinimo rodymą",show_name_aria_label_off:"Išjungti pavadinimo rodymą",show_status:"Rodyti būseną",show_status_aria_label_on:"Įjungti būsenos rodymą",show_status_aria_label_off:"Išjungti būsenos rodymą",show_toolbar:"Rodyti įrankių juostą",show_toolbar_aria_label_on:"Įjungti įrankių juostos rodymą",show_toolbar_aria_label_off:"Išjungti įrankių juostos rodymą",code_only_note:"Pastaba: Veiksmų ir statistikos nustatymai gali būti redaguojami tik naudojantis kodo redaguotoju."},jo={status:wo,source:ko,common:Vo,error:No,editor:zo},Eo={en:Object.freeze({__proto__:null,status:re,source:se,common:le,error:ce,editor:ue,default:pe}),uk:Object.freeze({__proto__:null,status:de,source:he,common:me,error:_e,editor:fe,default:ge}),nl:Object.freeze({__proto__:null,status:be,common:ve,error:ye,editor:Se,default:we}),de:Object.freeze({__proto__:null,status:ke,source:Ve,common:Ne,error:ze,editor:je,default:Ee}),fr:Object.freeze({__proto__:null,status:xe,source:Ce,common:Me,error:We,editor:Te,default:Pe}),pl:Object.freeze({__proto__:null,status:Ke,common:qe,error:Ie,editor:Oe,default:Re}),it:Object.freeze({__proto__:null,status:Ue,common:Ze,error:Ae,editor:Je,default:Ge}),ru:Object.freeze({__proto__:null,status:Ye,source:Xe,common:De,error:Le,editor:Fe,default:Qe}),es:Object.freeze({__proto__:null,status:He,source:Be,common:$e,error:ta,editor:ea,default:aa}),cs:Object.freeze({__proto__:null,status:oa,source:na,common:ia,error:ra,editor:sa,default:la}),hu:Object.freeze({__proto__:null,status:ca,source:ua,common:pa,error:da,editor:ha,default:ma}),he:Object.freeze({__proto__:null,status:_a,source:fa,common:ga,error:ba,editor:va,default:ya}),sv:Object.freeze({__proto__:null,status:Sa,source:wa,common:ka,error:Va,editor:Na,default:za}),nb:Object.freeze({__proto__:null,status:ja,source:Ea,common:xa,error:Ca,editor:Ma,default:Wa}),nn:Object.freeze({__proto__:null,status:Ta,source:Pa,common:Ka,error:qa,editor:Ia,default:Oa}),da:Object.freeze({__proto__:null,status:Ra,source:Ua,common:Za,error:Aa,editor:Ja,default:Ga}),ko:Object.freeze({__proto__:null,status:Ya,source:Xa,common:Da,error:La,editor:Fa,default:Qa}),fi:Object.freeze({__proto__:null,status:Ha,source:Ba,common:$a,error:to,editor:eo,default:ao}),ca:Object.freeze({__proto__:null,status:oo,source:no,common:io,error:ro,editor:so,default:lo}),tw:Object.freeze({__proto__:null,status:co,source:uo,common:po,error:ho,editor:mo,default:_o}),vi:Object.freeze({__proto__:null,status:fo,source:go,common:bo,error:vo,editor:yo,default:So}),lt:Object.freeze({__proto__:null,status:wo,source:ko,common:Vo,error:No,editor:zo,default:jo})};function xo(t,e,a){const[o,n]=t.toLowerCase().split(".");let i;try{i=JSON.parse(localStorage.getItem("selectedLanguage"))}catch(t){i=localStorage.getItem("selectedLanguage")}const r=(i||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let s;try{s=Eo[r][o][n]}catch(t){s=Eo.en[o][n]}if(void 0===s&&(s=Eo.en[o][n]),void 0!==s)return""!==e&&""!==a&&(s=s.replace(e,a)),s}customElements.define("vacuum-card-editor",class extends H{static get properties(){return{hass:Object,_config:Object,_toggle:Boolean}}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("vacuum")[0]||"",bt(this,"config-changed",{config:this._config}))}get _entity(){return this._config&&this._config.entity||""}get _map(){return this._config&&this._config.map||""}get _image(){return this._config&&this._config.image||""}get _show_name(){return this._config?this._config.show_name||!0:""}get _show_status(){return this._config?this._config.show_status||!0:""}get _show_toolbar(){return this._config&&this._config.show_toolbar||!0}get _compact_view(){return this._config&&this._config.compact_view||!1}getEntitiesByType(t){return Object.keys(this.hass.states).filter(e=>e.substr(0,e.indexOf("."))===t)}render(){if(!this.hass)return K``;const t=this.getEntitiesByType("vacuum"),e=this.getEntitiesByType("camera");return K`
      <div class="card-config">
        <paper-dropdown-menu
          label="${xo("editor.entity")}"
          @value-changed=${this._valueChanged}
          .configValue=${"entity"}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${t.indexOf(this._entity)}
          >
            ${t.map(t=>K` <paper-item>${t}</paper-item> `)}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu
          label="${xo("editor.entity")}"
          @value-changed=${this._valueChanged}
          .configValue=${"map"}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${e.indexOf(this._map)}
          >
            ${e.map(t=>K` <paper-item>${t}</paper-item> `)}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input
          label="${xo("editor.image")}"
          .value=${this._image}
          .configValue=${"image"}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <p class="option">
          <ha-switch
            aria-label=${xo(this._compact_view?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
            .checked=${!1!==this._compact_view}
            .configValue=${"compact_view"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${xo("editor.compact_view")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${xo(this._show_name?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
            .checked=${!1!==this._show_name}
            .configValue=${"show_name"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${xo("editor.show_name")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${xo(this._show_status?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
            .checked=${!1!==this._show_status}
            .configValue=${"show_status"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${xo("editor.show_status")}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${xo(this._show_name?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
            .checked=${!1!==this._show_toolbar}
            .configValue=${"show_toolbar"}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${xo("editor.show_toolbar")}
        </p>

        <strong>
          ${xo("editor.code_only_note")}
        </strong>
      </div>
    `}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;this["_"+e.configValue]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config={...this._config,[e.configValue]:void 0!==e.checked?e.checked:e.value}),bt(this,"config-changed",{config:this._config}))}static get styles(){return F`
      .card-config paper-dropdown-menu {
        width: 100%;
      }

      .option {
        display: flex;
        align-items: center;
      }

      .option ha-switch {
        margin-right: 10px;
      }
    `}});var Co=F`
  :host {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  ha-card {
    flex-direction: column;
    flex: 1;
    position: relative;
    padding: 0px;
    border-radius: 4px;
    overflow: hidden;
  }

  .preview {
    background: var(--primary-color);
    cursor: pointer;
    overflow: hidden;
    position: relative;
    text-align: center;
  }

  .preview.not-available {
    filter: grayscale(1);
  }

  .map {
    max-width: 95%;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  @keyframes cleaning {
    0% {
      transform: rotate(0) translate(0);
    }
    5% {
      transform: rotate(0) translate(0, -10px);
    }
    10% {
      transform: rotate(0) translate(0, 5px);
    }
    15% {
      transform: rotate(0) translate(0);
    }
    /* Turn left */
    20% {
      transform: rotate(30deg) translate(0);
    }
    25% {
      transform: rotate(30deg) translate(0, -10px);
    }
    30% {
      transform: rotate(30deg) translate(0, 5px);
    }
    35% {
      transform: rotate(30deg) translate(0);
    }
    40% {
      transform: rotate(0) translate(0);
    }
    /* Turn right */
    45% {
      transform: rotate(-30deg) translate(0);
    }
    50% {
      transform: rotate(-30deg) translate(0, -10px);
    }
    55% {
      transform: rotate(-30deg) translate(0, 5px);
    }
    60% {
      transform: rotate(-30deg) translate(0);
    }
    70% {
      transform: rotate(0deg) translate(0);
    }
    /* Staying still */
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes returning {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(0);
    }
    75% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0);
    }
  }

  .vacuum {
    display: block;
    max-width: 90%;
    max-height: 200px;
    image-rendering: crisp-edges;
    margin: 30px auto 20px auto;
  }

  .vacuum.on,
  .vacuum.cleaning,
  .vacuum.auto,
  .vacuum.spot,
  .vacuum.edge,
  .vacuum.single_room {
    animation: cleaning 5s linear infinite;
  }

  .vacuum.returning {
    animation: returning 2s linear infinite;
  }

  .vacuum.paused {
    opacity: 100%;
  }

  .vacuum.docked {
    opacity: 50%;
  }

  .fill-gap {
    flex-grow: 1;
  }

  .header {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--text-primary-color);
  }

  .battery {
    text-align: right;
    font-weight: bold;
    padding: 8px;
  }

  .source {
    text-align: center;
  }

  .status {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status-text {
    color: var(--text-primary-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: calc(20px + 9px); /* size + margin of spinner */
  }

  .status ha-circular-progress {
    --mdc-theme-primary: var(
      --card-background-color
    ); /* hack to override the color */
    min-width: 24px;
    width: 24px;
    height: 24px;
    margin-left: 9px;
  }

  .vacuum-name {
    text-align: center;
    font-weight: bold;
    color: var(--text-primary-color);
    font-size: 16px;
  }

  .not-available .offline {
    text-align: center;
    color: var(--text-primary-color);
    font-size: 16px;
  }

  .metadata {
    margin: 10px auto;
  }

  .stats {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--text-primary-color);
  }

  .stats-block {
    margin: 10px 0px;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    flex-grow: 1;
  }

  .stats-block:last-child {
    border: 0px;
  }

  .stats-value {
    font-size: 20px;
    font-weight: bold;
  }

  ha-icon {
    color: #fff;
  }

  .toolbar {
    background: var(--lovelace-background, var(--primary-background-color));
    min-height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .toolbar ha-icon-button {
    color: var(--primary-color);
    flex-direction: column;
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
    margin: 5px 0;
  }

  .toolbar ha-icon-button:first-child {
    margin-left: 5px;
  }

  .toolbar ha-icon-button:last-child {
    margin-right: 5px;
  }

  .toolbar paper-button {
    color: var(--primary-color);
    flex-direction: column;
    margin-right: 10px;
    padding: 15px 10px;
    cursor: pointer;
  }

  .toolbar ha-icon-button:active,
  .toolbar paper-button:active {
    opacity: 0.4;
    background: rgba(0, 0, 0, 0.1);
  }

  .toolbar paper-button {
    color: var(--primary-color);
    flex-direction: row;
  }

  .toolbar ha-icon {
    color: var(--primary-color);
    padding-right: 15px;
  }
`;const Mo="data:image/png;base64,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";customElements.get("ha-icon-button")||customElements.define("ha-icon-button",class extends(customElements.get("paper-icon-button")){});customElements.define("vacuum-card",class extends H{static get properties(){return{hass:Object,config:Object,requestInProgress:Boolean}}static get styles(){return Co}static async getConfigElement(){return document.createElement("vacuum-card-editor")}static getStubConfig(t,e){const[a]=e.filter(t=>"vacuum"===t.substr(0,t.indexOf(".")));return{entity:a||"",image:"default"}}get entity(){return this.hass.states[this.config.entity]}get map(){return this.hass?this.hass.states[this.config.map]:null}get image(){return"default"===this.config.image?Mo:this.config.image||Mo}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}setConfig(t){if(!t.entity)throw new Error(xo("error.missing_entity"));this.config=t}getCardSize(){return this.config.compact_view?3:8}shouldUpdate(t){return function(t,e,a){if(e.has("config")||a)return!0;if(t.config.entity){var o=e.get("hass");return!o||o.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t)}updated(t){t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}connectedCallback(){super.connectedCallback(),!this.compactView&&this.map&&(this.requestUpdate(),this.thumbUpdater=setInterval(()=>this.requestUpdate(),1e3*(this.config.map_refresh||5)))}disconnectedCallback(){super.disconnectedCallback(),this.map&&clearInterval(this.thumbUpdater)}handleMore(){bt(this,"hass-more-info",{entityId:this.entity.entity_id},{bubbles:!0,composed:!0})}handleSpeed(t){const e=t.target.getAttribute("value");this.callService("set_fan_speed",!1,{fan_speed:e})}callService(t,e=!0,a={}){this.hass.callService("vacuum",t,{entity_id:this.config.entity,...a}),e&&(this.requestInProgress=!0,this.requestUpdate())}getAttributes(t){const{status:e,state:a,fan_speed:o,fan_speed_list:n,battery_level:i,battery_icon:r,friendly_name:s}=t.attributes;return{status:e||a||t.state,fan_speed:o,fan_speed_list:n,battery_level:i,battery_icon:r,friendly_name:s}}renderSource(){const{fan_speed:t,fan_speed_list:e}=this.getAttributes(this.entity);if(!e)return K``;const a=e.indexOf(t);return K`
      <paper-menu-button
        slot="dropdown-trigger"
        .horizontalAlign=${"right"}
        .verticalAlign=${"top"}
        .verticalOffset=${40}
        .noAnimations=${!0}
        @click="${t=>t.stopPropagation()}"
      >
        <paper-button slot="dropdown-trigger">
          <ha-icon icon="mdi:fan"></ha-icon>
          <span show=${!0}>
            ${xo("source."+t)||t}
          </span>
        </paper-button>
        <paper-listbox
          slot="dropdown-content"
          selected=${a}
          @click="${t=>this.handleSpeed(t)}"
        >
          ${e.map(t=>K`<paper-item value=${t}
                >${xo("source."+t)||t}</paper-item
              >`)}
        </paper-listbox>
      </paper-menu-button>
    `}renderMapOrImage(t){return this.compactView?K``:this.map?this.hass.states[this.config.map]&&this.hass.states[this.config.map].attributes.entity_picture?K`<img
            class="map"
            src="${this.hass.states[this.config.map].attributes.entity_picture}&v=${+new Date}"
          />`:K``:this.image?K`<img class="vacuum ${t}" src="${this.image}" />`:K``}renderStats(t){const{stats:e={}}=this.config;return(e[t]||e.default||[]).map(({entity_id:t,attribute:e,unit:a,subtitle:o})=>{if(!t&&!e)return K``;const n=t?this.hass.states[t].state:ie(this.entity.attributes,e);return K`
        <div class="stats-block">
          <span class="stats-value">${n}</span>
          ${a}
          <div class="stats-subtitle">${o}</div>
        </div>
      `})}renderName(){const{friendly_name:t}=this.getAttributes(this.entity);return this.showName?K`
      <div class="vacuum-name">
        ${t}
      </div>
    `:K``}renderStatus(){const{status:t}=this.getAttributes(this.entity),e=xo("status."+t)||t;return this.showStatus?K`
      <div class="status">
        <span class="status-text" alt=${e}>
          ${e}
        </span>
        <ha-circular-progress
          .active=${this.requestInProgress}
          size="small"
        ></ha-circular-progress>
      </div>
    `:K``}renderToolbar(t){if(!this.showToolbar)return K``;switch(t){case"on":case"auto":case"spot":case"edge":case"single_room":case"cleaning":return K`
          <div class="toolbar">
            <paper-button @click="${()=>this.callService("pause")}">
              <ha-icon icon="hass:pause"></ha-icon>
              ${xo("common.pause")}
            </paper-button>
            <paper-button @click="${()=>this.callService("stop")}">
              <ha-icon icon="hass:stop"></ha-icon>
              ${xo("common.stop")}
            </paper-button>
            <paper-button @click="${()=>this.callService("return_to_base")}">
              <ha-icon icon="hass:home-map-marker"></ha-icon>
              ${xo("common.return_to_base")}
            </paper-button>
          </div>
        `;case"paused":return K`
          <div class="toolbar">
            <paper-button @click="${()=>this.callService("start")}">
              <ha-icon icon="hass:play"></ha-icon>
              ${xo("common.continue")}
            </paper-button>
            <paper-button @click="${()=>this.callService("return_to_base")}">
              <ha-icon icon="hass:home-map-marker"></ha-icon>
              ${xo("common.return_to_base")}
            </paper-button>
          </div>
        `;case"returning":return K`
          <div class="toolbar">
            <paper-button @click="${()=>this.callService("start")}">
              <ha-icon icon="hass:play"></ha-icon>
              ${xo("common.continue")}
            </paper-button>
            <paper-button @click="${()=>this.callService("pause")}">
              <ha-icon icon="hass:pause"></ha-icon>
              ${xo("common.pause")}
            </paper-button>
          </div>
        `;case"docked":case"idle":default:{const{actions:e=[]}=this.config,a=e.map(({name:t,service:e,icon:a,service_data:o})=>K`<ha-icon-button
            icon="${a}"
            title="${t}"
            @click="${()=>{const[t,a]=e.split(".");this.hass.callService(t,a,o)}}"
          ></ha-icon-button>`),o=K`
          <ha-icon-button
            icon="hass:home-map-marker"
            title="${xo("common.return_to_base")}"
            @click="${()=>this.callService("return_to_base")}"
          >
          </ha-icon-button>
        `;return K`
          <div class="toolbar">
            <ha-icon-button
              icon="hass:play"
              title="${xo("common.start")}"
              @click="${()=>this.callService("start")}"
            >
            </ha-icon-button>

            <ha-icon-button
              icon="mdi:map-marker"
              title="${xo("common.locate")}"
              @click="${()=>this.callService("locate",!1)}"
            >
            </ha-icon-button>

            ${"idle"===t?o:""}
            <div class="fill-gap"></div>
            ${a}
          </div>
        `}}}render(){if(!this.entity)return K`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${xo("common.not_available")}
              </div>
            <div>
          </div>
        </ha-card>
      `;const{state:t}=this.entity,{battery_level:e,battery_icon:a}=this.getAttributes(this.entity);return K`
      <ha-card>
        <div
          class="preview"
          @click="${()=>this.handleMore()}"
          ?more-info="true"
        >
          <div class="header">
            <div class="source">
              ${this.renderSource()}
            </div>
            <div class="battery">
              ${e}% <ha-icon icon="${a}"></ha-icon>
            </div>
          </div>

          ${this.renderMapOrImage(t)}

          <div class="metadata">
            ${this.renderName()} ${this.renderStatus()}
          </div>

          <div class="stats">
            ${this.renderStats(t)}
          </div>
        </div>

        ${this.renderToolbar(t)}
      </ha-card>
    `}}),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-card",name:xo("common.name"),description:xo("common.description")});
