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
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,a=null)=>{for(;e!==a;){const a=e.nextSibling;t.removeChild(e),e=a}},a=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${a}--\x3e`,n=new RegExp(`${a}|${r}`);class o{constructor(t,e){this.parts=[],this.element=e;const r=[],o=[],s=document.createTreeWalker(e.content,133,null,!1);let u=0,d=-1,p=0;const{strings:h,values:{length:m}}=t;for(;p<m;){const t=s.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:a}=e;let r=0;for(let t=0;t<a;t++)i(e[t].name,"$lit$")&&r++;for(;r-- >0;){const e=h[p],a=c.exec(e)[2],r=a.toLowerCase()+"$lit$",o=t.getAttribute(r);t.removeAttribute(r);const i=o.split(n);this.parts.push({type:"attribute",index:d,name:a,strings:i}),p+=i.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),s.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const a=t.parentNode,o=e.split(n),s=o.length-1;for(let e=0;e<s;e++){let r,n=o[e];if(""===n)r=l();else{const t=c.exec(n);null!==t&&i(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),r=document.createTextNode(n)}a.insertBefore(r,t),this.parts.push({type:"node",index:++d})}""===o[s]?(a.insertBefore(l(),t),r.push(t)):t.data=o[s],p+=s}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&d!==u||(d++,e.insertBefore(l(),t)),u=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(r.push(t),d--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),p++}}else s.currentNode=o.pop()}for(const t of r)t.parentNode.removeChild(t)}}const i=(t,e)=>{const a=t.length-e.length;return a>=0&&t.slice(a)===e},s=t=>-1!==t.index,l=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function u(t,e){const{element:{content:a},parts:r}=t,n=document.createTreeWalker(a,133,null,!1);let o=p(r),i=r[o],s=-1,l=0;const c=[];let u=null;for(;n.nextNode();){s++;const t=n.currentNode;for(t.previousSibling===u&&(u=null),e.has(t)&&(c.push(t),null===u&&(u=t)),null!==u&&l++;void 0!==i&&i.index===s;)i.index=null!==u?-1:i.index-l,o=p(r,o),i=r[o]}c.forEach(t=>t.parentNode.removeChild(t))}const d=t=>{let e=11===t.nodeType?0:1;const a=document.createTreeWalker(t,133,null,!1);for(;a.nextNode();)e++;return e},p=(t,e=-1)=>{for(let a=e+1;a<t.length;a++){const e=t[a];if(s(e))return a}return-1};
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
const h=new WeakMap,m=t=>"function"==typeof t&&h.has(t),g={},f={};
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
class b{constructor(t,e,a){this.__parts=[],this.template=t,this.processor=e,this.options=a}update(t){let e=0;for(const a of this.__parts)void 0!==a&&a.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),a=[],r=this.template.parts,n=document.createTreeWalker(e,133,null,!1);let o,i=0,l=0,c=n.nextNode();for(;i<r.length;)if(o=r[i],s(o)){for(;l<o.index;)l++,"TEMPLATE"===c.nodeName&&(a.push(c),n.currentNode=c.content),null===(c=n.nextNode())&&(n.currentNode=a.pop(),c=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,o.name,o.strings,this.options));i++}else this.__parts.push(void 0),i++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const y=` ${a} `;class v{constructor(t,e,a,r){this.strings=t,this.values=e,this.type=a,this.processor=r}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let o=0;o<t;o++){const t=this.strings[o],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const s=c.exec(t);e+=null===s?t+(n?y:r):t.substr(0,s.index)+s[1]+s[2]+"$lit$"+s[3]+a}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
 */const S=t=>null===t||!("object"==typeof t||"function"==typeof t),w=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class _{constructor(t,e,a){this.dirty=!0,this.element=t,this.name=e,this.strings=a,this.parts=[];for(let t=0;t<a.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new k(this)}_getValue(){const t=this.strings,e=t.length-1;let a="";for(let r=0;r<e;r++){a+=t[r];const e=this.parts[r];if(void 0!==e){const t=e.value;if(S(t)||!w(t))a+="string"==typeof t?t:String(t);else for(const e of t)a+="string"==typeof e?e:String(e)}}return a+=t[e],a}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class k{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===g||S(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=g,t(this)}this.value!==g&&this.committer.commit()}}class z{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(l()),this.endNode=t.appendChild(l())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=l()),t.__insert(this.endNode=l())}insertAfterPart(t){t.__insert(this.startNode=l()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}const t=this.__pendingValue;t!==g&&(S(t)?t!==this.value&&this.__commitText(t):t instanceof v?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):w(t)?this.__commitIterable(t):t===f?(this.value=f,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,a="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=a:this.__commitNode(document.createTextNode(a)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof b&&this.value.template===e)this.value.update(t.values);else{const a=new b(e,t.processor,this.options),r=a._clone();a.update(t.values),this.__commitNode(r),this.value=a}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let a,r=0;for(const n of t)a=e[r],void 0===a&&(a=new z(this.options),e.push(a),0===r?a.appendIntoPart(this):a.insertAfterPart(e[r-1])),a.setValue(n),a.commit(),r++;r<e.length&&(e.length=r,this.clear(a&&a.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,a){if(this.value=void 0,this.__pendingValue=void 0,2!==a.length||""!==a[0]||""!==a[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=a}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=g}}class V extends _{constructor(t,e,a){super(t,e,a),this.single=2===a.length&&""===a[0]&&""===a[1]}_createPart(){return new U(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class U extends k{}let R=!1;(()=>{try{const t={get capture(){return R=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class T{constructor(t,e,a){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=a,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=g,t(this)}if(this.__pendingValue===g)return;const t=this.__pendingValue,e=this.value,a=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),r=null!=t&&(null==e||a);a&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=N(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=g}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const N=t=>t&&(R?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function O(t){let e=P.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},P.set(t.type,e));let r=e.stringsArray.get(t.strings);if(void 0!==r)return r;const n=t.strings.join(a);return r=e.keyString.get(n),void 0===r&&(r=new o(t,t.getTemplateElement()),e.keyString.set(n,r)),e.stringsArray.set(t.strings,r),r}const P=new Map,E=new WeakMap;
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
 */const j=new
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
class{handleAttributeExpressions(t,e,a,r){const n=e[0];if("."===n){return new V(t,e.slice(1),a).parts}return"@"===n?[new T(t,e.slice(1),r.eventContext)]:"?"===n?[new x(t,e.slice(1),a)]:new _(t,e,a).parts}handleTextExpression(t){return new z(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const M=(t,...e)=>new v(t,e,"html",j)
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
 */,q=(t,e)=>`${t}--${e}`;let W=!0;void 0===window.ShadyCSS?W=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),W=!1);const K=t=>e=>{const r=q(e.type,t);let n=P.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},P.set(r,n));let i=n.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(a);if(i=n.keyString.get(s),void 0===i){const a=e.getTemplateElement();W&&window.ShadyCSS.prepareTemplateDom(a,t),i=new o(e,a),n.keyString.set(s,i)}return n.stringsArray.set(e.strings,i),i},X=["html","svg"],C=new Set,F=(t,e,a)=>{C.add(t);const r=a?a.element:document.createElement("template"),n=e.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(r,t);const i=document.createElement("style");for(let t=0;t<o;t++){const e=n[t];e.parentNode.removeChild(e),i.textContent+=e.textContent}(t=>{X.forEach(e=>{const a=P.get(q(e,t));void 0!==a&&a.keyString.forEach(t=>{const{element:{content:e}}=t,a=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{a.add(t)}),u(t,a)})})})(t);const s=r.content;a?function(t,e,a=null){const{element:{content:r},parts:n}=t;if(null==a)return void r.appendChild(e);const o=document.createTreeWalker(r,133,null,!1);let i=p(n),s=0,l=-1;for(;o.nextNode();){for(l++,o.currentNode===a&&(s=d(e),a.parentNode.insertBefore(e,a));-1!==i&&n[i].index===l;){if(s>0){for(;-1!==i;)n[i].index+=s,i=p(n,i);return}i=p(n,i)}}}(a,i,s.firstChild):s.insertBefore(i,s.firstChild),window.ShadyCSS.prepareTemplateStyles(r,t);const l=s.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(a){s.insertBefore(i,s.firstChild);const t=new Set;t.add(i),u(a,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const Y={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},Z=(t,e)=>e!==t&&(e==e||t==t),A={attribute:!0,type:String,converter:Y,reflect:!1,hasChanged:Z};class D extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,a)=>{const r=this._attributeNameForProperty(a,e);void 0!==r&&(this._attributeToPropertyMap.set(r,a),t.push(r))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=A){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const a="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,a,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}static getPropertyDescriptor(t,e,a){return{get(){return this[e]},set(a){const r=this[t];this[e]=a,this._requestUpdate(t,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||A}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const a of e)this.createProperty(a,t[a])}}static _attributeNameForProperty(t,e){const a=e.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,a=Z){return a(t,e)}static _propertyValueFromAttribute(t,e){const a=e.type,r=e.converter||Y,n="function"==typeof r?r:r.fromAttribute;return n?n(t,a):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const a=e.type,r=e.converter;return(r&&r.toAttribute||Y.toAttribute)(t,a)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,a){e!==a&&this._attributeToProperty(t,a)}_propertyToAttribute(t,e,a=A){const r=this.constructor,n=r._attributeNameForProperty(t,a);if(void 0!==n){const t=r._propertyValueToAttribute(e,a);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const a=this.constructor,r=a._attributeToPropertyMap.get(t);if(void 0!==r){const t=a.getPropertyOptions(r);this._updateState=16|this._updateState,this[r]=a._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}_requestUpdate(t,e){let a=!0;if(void 0!==t){const r=this.constructor,n=r.getPropertyOptions(t);r._valueHasChanged(this[t],e,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):a=!1}!this._hasRequestedUpdate&&a&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}D.finalized=!0;
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
const J="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol();class L{constructor(t,e){if(e!==I)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(J?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const H=(t,...e)=>{const a=e.reduce((e,a,r)=>e+(t=>{if(t instanceof L)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(a)+t[r+1],t[0]);return new L(a,I)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const G={};class Q extends D{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const e=(t,a)=>t.reduceRight((t,a)=>Array.isArray(a)?e(a,t):(t.add(a),t),a),a=e(t,new Set),r=[];a.forEach(t=>r.unshift(t)),this._styles=r}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?J?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==G&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return G}}Q.finalized=!0,Q.render=(t,a,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const n=r.scopeName,o=E.has(a),i=W&&11===a.nodeType&&!!a.host,s=i&&!C.has(n),l=s?document.createDocumentFragment():a;if(((t,a,r)=>{let n=E.get(a);void 0===n&&(e(a,a.firstChild),E.set(a,n=new z(Object.assign({templateFactory:O},r))),n.appendInto(a)),n.setValue(t),n.commit()})(t,l,Object.assign({templateFactory:K(n)},r)),s){const t=E.get(l);E.delete(l);const r=t.value instanceof b?t.value.template:void 0;F(n,l,r),e(a,a.firstChild),a.appendChild(l),E.set(a,t)}!o&&i&&window.ShadyCSS.styleElement(a.host)};var B=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,$="[^\\s]+",tt=/\[([^]*?)\]/gm;function et(t,e){for(var a=[],r=0,n=t.length;r<n;r++)a.push(t[r].substr(0,e));return a}var at=function(t){return function(e,a){var r=a[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return r>-1?r:null}};function rt(t){for(var e=[],a=1;a<arguments.length;a++)e[a-1]=arguments[a];for(var r=0,n=e;r<n.length;r++){var o=n[r];for(var i in o)t[i]=o[i]}return t}var nt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ot=["January","February","March","April","May","June","July","August","September","October","November","December"],it=et(ot,3),st={dayNamesShort:et(nt,3),dayNames:nt,monthNamesShort:it,monthNames:ot,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},lt=rt({},st),ct=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},ut={D:function(t){return String(t.getDate())},DD:function(t){return ct(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return ct(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return ct(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return ct(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return ct(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return ct(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return ct(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return ct(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return ct(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return ct(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return ct(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ct(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+ct(Math.floor(Math.abs(e)/60),2)+":"+ct(Math.abs(e)%60,2)}},dt=function(t){return+t-1},pt=[null,"[1-9]\\d?"],ht=[null,$],mt=["isPm",$,function(t,e){var a=t.toLowerCase();return a===e.amPm[0]?0:a===e.amPm[1]?1:null}],gt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var a=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?a:-a}return 0}],ft=(at("monthNamesShort"),at("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var bt=function(t,e,a){if(void 0===e&&(e=ft.default),void 0===a&&(a={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var r=[];e=(e=ft[e]||e).replace(tt,(function(t,e){return r.push(e),"@@@"}));var n=rt(rt({},lt),a);return(e=e.replace(B,(function(e){return ut[e](t,n)}))).replace(/@@@/g,(function(){return r.shift()}))},yt=(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t,e,a,r){r=r||{},a=null==a?{}:a;var n=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});return n.detail=a,t.dispatchEvent(n),n});var vt={Cleaning:"Cleaning",Paused:"Paused",Idle:"Idle",Charging:"Charging","Returning home":"Returning home"},St={Gentle:"Gentle",Silent:"Silent",Standard:"Standard",Medium:"Medium",Turbo:"Turbo"},wt={name:"Vacuum Card",description:"Vacuum card allows you to control your robot vacuum.",start:"Clean",continue:"Continue",pause:"Pause",stop:"Stop",return_to_base:"Dock",locate:"Locate vacuum",not_available:"Vacuum is not available"},_t={missing_entity:"Specifying entity is required!"},kt={entity:"Entity (Required)",map:"Map Camera (Optional)",image:"Image (Optional)",compact_view:"Compact View",compact_view_aria_label_on:"Toggle compact view on",compact_view_aria_label_off:"Toggle compact view off",show_name:"Show Name",show_name_aria_label_on:"Toggle display name on",show_name_aria_label_off:"Toggle display name off",show_status:"Show Status",show_status_aria_label_on:"Toggle display status on",show_status_aria_label_off:"Toggle display status off",show_toolbar:"Show Toolbar",show_toolbar_aria_label_on:"Toggle display toolbar on",show_toolbar_aria_label_off:"Toggle display toolbar off",code_only_note:"Note: Setting actions and stats options are available exclusively using Code Editor."},zt={status:vt,source:St,common:wt,error:_t,editor:kt},xt={Cleaning:"Прибирає",Paused:"Пауза",Idle:"Очікує",Charging:"Заряджається","Returning home":"Повертається","Segment cleaning":"Зоноване прибирання"},Vt={Gentle:"Делікатний",Silent:"Тихий",Standard:"Стандартний",Medium:"Середній",Turbo:"Турбо"},Ut={name:"Пилосос",description:'Картка "пилосос" дозволяє керувати роботом-пилососом.',start:"Clean",continue:"Продовжити",pause:"Пауза",stop:"Стоп",return_to_base:"На базу",locate:"Знайти",not_available:"Пилосос недоступний"},Rt={missing_entity:"Об’єкт є обов’язковим полем!"},Tt={entity:"Об’єкт (Required)",map:"Камера для карти (Додатково)",image:"Зображення (Додатково)",compact_view:"Компактний перегляд",compact_view_aria_label_on:"Увімкнути компактний перегляд",compact_view_aria_label_off:"Вимкнути компактний перегляд",show_name:"Показати ім’я?",show_name_aria_label_on:"Показати ім’я",show_name_aria_label_off:"Приховати ім’я",show_status:"Показати статус?",show_status_aria_label_on:"Показати статус",show_status_aria_label_off:"Приховати статус",show_toolbar:"Показати панель дій?",show_toolbar_aria_label_on:"Показати панель дій",show_toolbar_aria_label_off:"Приховати панель дій",code_only_note:"Увага: Опції actions та stats доступні виключно через редактор коду."},Nt={status:xt,source:Vt,common:Ut,error:Rt,editor:Tt},Ot={Cleaning:"Aan het schoonmaken",Paused:"Gepauzeerd",Idle:"Inactief",Charging:"Aan het opladen","Returning home":"Keert terug naar dock"},Pt={name:"Stofzuiger kaart",description:"Stofzuiger kaart maakt het makkelijk om je robotstofzuiger te bedienen.",start:"Start",continue:"Doorgaan",pause:"Pauze",stop:"Stop",return_to_base:"Terugkeren",locate:"Zoek stofzuiger"},Et={missing_entity:"Het specificeren van een entiteit is verplicht!"},jt={entity:"Entiteit (Verplicht)",map:"Kaart Camera (Optioneel)",image:"Afbeelding (Optioneel)",compact_view:"Compacte weergave",compact_view_aria_label_on:"Zet compacte weergave aan",compact_view_aria_label_off:"Zet compacte weergave uit",show_name:"Naam laten zien?",show_name_aria_label_on:"Zet weergavenaam aan",show_name_aria_label_off:"Zet weergavenaam uit",show_toolbar:"Werkbalk laten zien?",show_toolbar_aria_label_on:"Zet werkbalk aan",show_toolbar_aria_label_off:"Zet werkbalk uit",code_only_note:"Notitie: Instel acties en status opties zijn alleen beschikbaar in de Code Editor"},Mt={status:Ot,common:Pt,error:Et,editor:jt},qt={Cleaning:"Reinigen",Paused:"Pausiert",Idle:"Untätig",Charging:"Aufladen","Returning home":"Rückkehr zu Dockingstation"},Wt={name:"Vacuum Card",description:"Vacuum card ermöglicht es Ihnen, Ihr Staubsaugerroboter zu steuern.",start:"Reinigen",continue:"Weiter",pause:"Pause",stop:"Stop",return_to_base:"Dock",locate:"Staubsauger lokalisieren"},Kt={missing_entity:"Angabe der Entität ist erforderlich!"},Xt={entity:"Entität (Erforderlich)",map:"Map Camera (Optional)",image:"Bild (Optional)",compact_view:"kompakte Ansicht",compact_view_aria_label_on:"Schalte kompakte Ansicht ein",compact_view_aria_label_off:"Schalte kompakte Ansicht aus",show_name:"Zeige Namen",show_name_aria_label_on:"Schalte 'Zeige Namen' ein",show_name_aria_label_off:"Schalte 'Zeige Namen' aus",show_toolbar:"Zeige Toolbar",show_toolbar_aria_label_on:"Schalte 'Zeige Toolbar' ein",show_toolbar_aria_label_off:"Schalte 'Zeige Toolbar' aus",code_only_note:"Hinweis: Das Festlegen von Aktionen und Statistikoptionen ist ausschließlich mit dem Code-Editor möglich."},Ct={status:qt,common:Wt,error:Kt,editor:Xt},Ft={Cleaning:"Nettoyage",Paused:"En pause",Idle:"Inactif",Charging:"En charge","Returning home":"Retour à la base"},Yt={Gentle:"Doux",Silent:"Silencieux",Standard:"Standard",Medium:"Moyen",Turbo:"Turbo"},Zt={name:"Vacuum Carte",description:"Vacuum carte vous permet de contrôler votre robot aspirateur.",start:"Nettoyer",continue:"Continuer",pause:"Pause",stop:"Stop",return_to_base:"Retour base",locate:"Localiser aspirateur",not_available:"L'aspirateur n'est pas disponible"},At={missing_entity:"La spécification de l'entité est requise !"},Dt={entity:"Entité (obligatoire)",map:"Caméra de carte (facultatif)",image:"Image (facultatif)",compact_view:"Vue compacte",compact_view_aria_label_on:"Activer la vue compacte",compact_view_aria_label_off:"Désactiver la vue compacte",show_name:"Afficher le nom",show_name_aria_label_on:"Activer affichage du nom",show_name_aria_label_off:"Désactiver affichage du nom",show_status:"Afficher l'état",show_status_aria_label_on:"Activer l'affichage de l'état",show_status_aria_label_off:"Désactiver l'affichage de l'état",show_toolbar:"Afficher la barre d'outils",show_toolbar_aria_label_on:"Activer l'affichage de la barre d'outils",show_toolbar_aria_label_off:"Désactiver l'affichage de la barre d'outils",code_only_note:"Remarque: Les options de réglage des actions et statistiques sont disponibles exclusivement en utilisant l'éditeur de code."},Jt={status:Ft,source:Yt,common:Zt,error:At,editor:Dt},It={Cleaning:"Sprzątanie",Paused:"Wstrzymany",Idle:"Bezczynny",Charging:"Ładowanie","Returning home":"Powrót do bazy"},Lt={name:"Vacuum Card",description:"Vacuum card pozwala zdalnie kontrolować odkurzacz.",start:"Sprzątaj",continue:"Kontyntynuj",pause:"Wstrzymaj",stop:"Zatrzymaj",return_to_base:"Powrót",locate:"Zlokalizuj odkurzacz"},Ht={missing_entity:"Ustawienie encji jest wymagane!"},Gt={entity:"Encja (wymagane)",map:"Kamera (opcjonalne)",image:"Obrazek (opcjonalne)",compact_view:"Widok kompaktowy",compact_view_aria_label_on:"Włącz widok kompaktowy",compact_view_aria_label_off:"Wyłącz widok kompaktowy",show_name:"Pokaż nazwę",show_name_aria_label_on:"Włącz widok nazwy",show_name_aria_label_off:"Wyłącz widok nazwy",show_toolbar:"Pasek narzędzi",show_toolbar_aria_label_on:"Włącz pasek narzędzi",show_toolbar_aria_label_off:"Wyłącz pasek narzędzi",code_only_note:"Uwaga: Ustawianie opcji i informacji statystyk jest dostępne tylko poprzez edytor kodu YAML."},Qt={status:It,common:Lt,error:Ht,editor:Gt},Bt={Cleaning:"In pulizia",Paused:"In pausa",Idle:"Inattivo",Charging:"In carica","Returning home":"In rientro alla base"},$t={name:"Vacuum Card",description:"Vacuum card consente di controllare il tuo aspirapolvere.",start:"Pulisci",continue:"Continua",pause:"Pausa",stop:"Stop",return_to_base:"Base",locate:"Trova aspirapolvere"},te={missing_entity:"È necessario specificare l'entità!"},ee={entity:"Entità (Richiesto)",map:"Mappa (Opzionale)",image:"Immagine (Opzionale)",compact_view:"Vista compatta",compact_view_aria_label_on:"Attiva vista compatta",compact_view_aria_label_off:"Disattiva vista compatta",show_name:"Mostra Nome",show_name_aria_label_on:"Attiva nome",show_name_aria_label_off:"Disattiva nome",show_toolbar:"Mostra barra degli strumenti",show_toolbar_aria_label_on:"Attiva barra degli strumenti",show_toolbar_aria_label_off:"Disattiva barra degli strumenti",code_only_note:"NB: La configurazione di azioni e statistiche sono disponibili soltanto nell'editor di codice."},ae={status:Bt,common:$t,error:te,editor:ee},re={Cleaning:"Убирает",Paused:"Пауза",Idle:"Ожидает",Charging:"Заряжается","Returning home":"Возвращается","Segment cleaning":"Уборка зоны/комнаты"},ne={Gentle:"Деликатный",Silent:"Тихий",Standard:"Стандартный",Medium:"Средний",Turbo:"Турбо"},oe={name:"Пылесос",description:'Карта "пылесос" позволяет управлять роботом-пылесосом.',start:"Запуск",continue:"Продолжить",pause:"Пауза",stop:"Остановить",return_to_base:"На базу",locate:"Найти",not_available:"Пылесос недоступен"},ie={missing_entity:"Объект является обязательным полем!"},se={entity:"Объект (Обязательное)",map:"Камера для карты (Опциональное)",image:"Изображение (Опциональное)",compact_view:"Компактный просмотр",compact_view_aria_label_on:"Включить компактный просмотр",compact_view_aria_label_off:"Выключить компактный просмотр",show_name:"Показать название?",show_name_aria_label_on:"Показать название",show_name_aria_label_off:"Скрыть название",show_status:"Показать статус?",show_status_aria_label_on:"Показать статус",show_status_aria_label_off:"Скрыть статус",show_toolbar:"Показать панель действий?",show_toolbar_aria_label_on:"Показать панель действий",show_toolbar_aria_label_off:"Скрыть панель действий",code_only_note:"Внимание: Опции actions и stats доступны исключительно через редактор кода."},le={status:re,source:ne,common:oe,error:ie,editor:se},ce={Cleaning:"Limpiando",Paused:"En pausa",Idle:"Inactivo",Charging:"Cargando","Returning home":"Volviendo a la base"},ue={Gentle:"Delicado",Silent:"Silencioso",Standard:"Standard",Medium:"Medio",Turbo:"Turbo"},de={name:"Vacuum Card",description:"Vacuum card te permite controlar tu robot aspirador.",start:"Conenzar",continue:"Continuar",pause:"Pausar",stop:"Detener",return_to_base:"Volver a la base",locate:"Encontrar"},pe={missing_entity:"¡Se requiere especificar una entidad!"},he={entity:"Entidad (Requerido)",map:"Map Camera (Opcional)",image:"Imágen (Opcional)",compact_view:"Vista compacta",compact_view_aria_label_on:"Activar vista compacta",compact_view_aria_label_off:"Desactivar vista compacta",show_name:"Nombre a mostrar",show_name_aria_label_on:"Mostrar nombre",show_name_aria_label_off:"Ocultar nombre",show_toolbar:"Mostrar barra de herramientas",show_toolbar_aria_label_on:"Activar la barra de herramientas",show_toolbar_aria_label_off:"Desactivar la barra de herramientas",code_only_note:"Nota: La configuración de las acciones y estadísticas está únicamente disponible a través del Editor de Código."},me={status:ce,source:ue,common:de,error:pe,editor:he},ge={Cleaning:"Vysává se",Paused:"Pozastaveno",Idle:"Nečinný",Charging:"Nabíjí se","Returning home":"Vrací se domů"},fe={Gentle:"Mírný",Silent:"Tichý",Standard:"Standardní",Medium:"Střední",Turbo:"Turbo"},be={name:"Karta vysavače",description:"Karta vysavače vám dovolí ovládat svůj vysavač.",start:"Začni vysávat",continue:"Pokračuj",pause:"Pozastav",stop:"Zastav",return_to_base:"Vrať se domů",locate:"Lokalizuj",not_available:"Vysavač není dostupný"},ye={missing_entity:"Je vyžadováno specifikování entity!"},ve={entity:"Entita (Povinný)",map:"Mapa (Nepovinný)",image:"Fotka (Nepovinný)",compact_view:"Kompaktní zobrazení",compact_view_aria_label_on:"Zapni kompaktní zobrazení",compact_view_aria_label_off:"Vypni kompaktní zobrazení",show_name:"Zobraz název",show_name_aria_label_on:"Zapni zobrazení názvu",show_name_aria_label_off:"Vypni zobrazení názvu",show_status:"Zobraz status",show_status_aria_label_on:"Zapni zobrazení statusu",show_status_aria_label_off:"Vypni zobrazení statusu",show_toolbar:"Zobraz lištu",show_toolbar_aria_label_on:"Zapni zobrazení lišty",show_toolbar_aria_label_off:"Vypni zobrazení lišty",code_only_note:"Poznámka: Nastavení akcí a infa je dostupné pouze v editoru kódu."},Se={status:ge,source:fe,common:be,error:ye,editor:ve},we={Cleaning:"Tisztítás",Paused:"Szünet",Idle:"Tétlen",Charging:"Töltés","Returning home":"Hazatérés"},_e={Gentle:"Gyengéd",Silent:"Csendes",Standard:"Alap",Medium:"Közepes",Turbo:"Turbo"},ke={name:"Porszívó Kártya",description:"Ez a kártya lehetővé teszi, hogy robot porszívódat irányítsd.",start:"Tisztítás",continue:"Folytatás",pause:"Szünet",stop:"Megszakítás",return_to_base:"Hazatérés",locate:"Porszívó megkeresése",not_available:"A porszívó nem elérhető"},ze={missing_entity:"Entitás megadása kötelező!"},xe={entity:"Entitás (Kötelező)",map:"Térkép kamera (Opcionális)",image:"Kép (Opcionális)",compact_view:"Kompakt nézet",compact_view_aria_label_on:"Kompakt nézet bekapcsolása",compact_view_aria_label_off:"Kompakt nézet kikapcsolása",show_name:"Név megjelenítése",show_name_aria_label_on:"Név megjelenítése",show_name_aria_label_off:"Név elrejtése",show_status:"Állapot megjelenítése",show_status_aria_label_on:"Állapot megjelenítése",show_status_aria_label_off:"Állapot elrejtése",show_toolbar:"Eszköztár megjelenítése",show_toolbar_aria_label_on:"Eszköztár megjelenítése",show_toolbar_aria_label_off:"Eszköztár elrejtése",code_only_note:"Megjegyzés: Parancsok és statisztikák beállítása csak a kódszerkesztőben elérhetőek."},Ve={status:we,source:_e,common:ke,error:ze,editor:xe},Ue={en:Object.freeze({__proto__:null,status:vt,source:St,common:wt,error:_t,editor:kt,default:zt}),uk:Object.freeze({__proto__:null,status:xt,source:Vt,common:Ut,error:Rt,editor:Tt,default:Nt}),nl:Object.freeze({__proto__:null,status:Ot,common:Pt,error:Et,editor:jt,default:Mt}),de:Object.freeze({__proto__:null,status:qt,common:Wt,error:Kt,editor:Xt,default:Ct}),fr:Object.freeze({__proto__:null,status:Ft,source:Yt,common:Zt,error:At,editor:Dt,default:Jt}),pl:Object.freeze({__proto__:null,status:It,common:Lt,error:Ht,editor:Gt,default:Qt}),it:Object.freeze({__proto__:null,status:Bt,common:$t,error:te,editor:ee,default:ae}),ru:Object.freeze({__proto__:null,status:re,source:ne,common:oe,error:ie,editor:se,default:le}),es:Object.freeze({__proto__:null,status:ce,source:ue,common:de,error:pe,editor:he,default:me}),cs:Object.freeze({__proto__:null,status:ge,source:fe,common:be,error:ye,editor:ve,default:Se}),hu:Object.freeze({__proto__:null,status:we,source:_e,common:ke,error:ze,editor:xe,default:Ve})};function Re(t,e,a){const[r,n]=t.split(".");let o;try{o=JSON.parse(localStorage.getItem("selectedLanguage"))}catch(t){o=localStorage.getItem("selectedLanguage")}const i=(o||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let s;try{s=Ue[i][r][n]}catch(t){s=Ue.en[r][n]}if(void 0===s&&(s=Ue.en[r][n]),void 0!==s)return""!==e&&""!==a&&(s=s.replace(e,a)),s}customElements.define("vacuum-card-editor",class extends Q{static get properties(){return{hass:Object,_config:Object,_toggle:Boolean}}setConfig(t){this._config=t,this._config.entity||(this._config.entity=this.getEntitiesByType("vacuum")[0]||"",yt(this,"config-changed",{config:this._config}))}get _entity(){return this._config&&this._config.entity||""}get _map(){return this._config&&this._config.map||""}get _image(){return this._config&&this._config.image||""}get _show_name(){return this._config?this._config.show_name||!0:""}get _show_status(){return this._config?this._config.show_status||!0:""}get _show_toolbar(){return this._config&&this._config.show_toolbar||!0}get _compact_view(){return this._config&&this._config.compact_view||!1}getEntitiesByType(t){return Object.keys(this.hass.states).filter(e=>e.substr(0,e.indexOf("."))===t)}render(){if(!this.hass)return M``;const t=this.getEntitiesByType("vacuum"),e=this.getEntitiesByType("camera");return M`
      <div class="card-config">
        <paper-dropdown-menu
          label="${Re("editor.entity")}"
          @value-changed=${this._valueChanged}
          .configValue=${"entity"}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${t.indexOf(this._entity)}
          >
            ${t.map(t=>M` <paper-item>${t}</paper-item> `)}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu
          label="${Re("editor.entity")}"
          @value-changed=${this._valueChanged}
          .configValue=${"map"}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${e.indexOf(this._map)}
          >
            ${e.map(t=>M` <paper-item>${t}</paper-item> `)}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input
          label="${Re("editor.image")}"
          .value=${this._image}
          .configValue=${"image"}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <ha-switch
          style="margin: 10px auto;"
          aria-label=${Re(this._compact_view?"editor.compact_view_aria_label_off":"editor.compact_view_aria_label_on")}
          .checked=${!1!==this._compact_view}
          .configValue=${"compact_view"}
          @change=${this._valueChanged}
        >
          ${Re("editor.compact_view")}
        </ha-switch>

        <ha-switch
          style="margin: 10px auto;"
          aria-label=${Re(this._show_name?"editor.show_name_aria_label_off":"editor.show_name_aria_label_on")}
          .checked=${!1!==this._show_name}
          .configValue=${"show_name"}
          @change=${this._valueChanged}
        >
          ${Re("editor.show_name")}
        </ha-switch>

        <ha-switch
          style="margin: 10px auto;"
          aria-label=${Re(this._show_status?"editor.show_status_aria_label_off":"editor.show_status_aria_label_on")}
          .checked=${!1!==this._show_status}
          .configValue=${"show_status"}
          @change=${this._valueChanged}
        >
          ${Re("editor.show_status")}
        </ha-switch>

        <ha-switch
          style="margin: 10px auto;"
          aria-label=${Re(this._show_name?"editor.show_toolbar_aria_label_off":"editor.show_toolbar_aria_label_on")}
          .checked=${!1!==this._show_toolbar}
          .configValue=${"show_toolbar"}
          @change=${this._valueChanged}
        >
          ${Re("editor.show_toolbar")}
        </ha-switch>

        <strong>
          ${Re("editor.code_only_note")}
        </strong>
      </div>
    `}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;this["_"+e.configValue]!==e.value&&(e.configValue&&(""===e.value?delete this._config[e.configValue]:this._config={...this._config,[e.configValue]:void 0!==e.checked?e.checked:e.value}),yt(this,"config-changed",{config:this._config}))}static get styles(){return H`
      .card-config paper-dropdown-menu {
        width: 100%;
      }
    `}});var Te=H`
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
  }

  .preview.not-available {
    filter: grayscale(1);
  }

  .map {
    display: block;
    max-width: 100%;
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

  .vacuum.cleaning {
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

  .status paper-spinner {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin-left: 9px;
  }

  .vacuum-name {
    text-align: center;
    font-weight: bold;
    color: var(--text-primary-color);
    font-size: 16px;
  }

  .not-available {
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

  .stats-hours {
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
`;const Ne="data:image/png;base64,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";customElements.get("ha-icon-button")||customElements.define("ha-icon-button",class extends(customElements.get("paper-icon-button")){});customElements.define("vacuum-card",class extends Q{static get properties(){return{hass:Object,config:Object,mapUrl:String,requestInProgress:Boolean}}static get styles(){return Te}static async getConfigElement(){return document.createElement("vacuum-card-editor")}static getStubConfig(t,e){const[a]=e.filter(t=>"vacuum"===t.substr(0,t.indexOf(".")));return{entity:a||"",image:"default"}}get entity(){return this.hass.states[this.config.entity]}get map(){return this.hass.states[this.config.map]}get image(){return"default"===this.config.image?Ne:this.config.image||Ne}get showName(){return void 0===this.config.show_name||this.config.show_name}get showStatus(){return void 0===this.config.show_status||this.config.show_status}get showToolbar(){return void 0===this.config.show_toolbar||this.config.show_toolbar}get compactView(){return void 0!==this.config.compact_view&&this.config.compact_view}setConfig(t){if(!t.entity)throw new Error(Re("error.missing_entity"));this.config=t}getCardSize(){return 2}shouldUpdate(t){return function(t,e,a){if(e.has("config")||a)return!0;if(t.config.entity){var r=e.get("hass");return!r||r.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t)}updated(t){if(this.map){const t=this.map.attributes.entity_picture+"&t="+(new Date).getTime(),e=new Image;e.onload=()=>{this.mapUrl=t},e.src=t}t.get("hass")&&t.get("hass").states[this.config.entity].state!==this.hass.states[this.config.entity].state&&(this.requestInProgress=!1)}handleMore(){yt(this,"hass-more-info",{entityId:this.entity.entity_id},{bubbles:!0,composed:!0})}handleSpeed(t){const e=t.target.getAttribute("value");this.callService("set_fan_speed",!1,{fan_speed:e})}callService(t,e=!0,a={}){this.hass.callService("vacuum",t,{entity_id:this.config.entity,...a}),e&&(this.requestInProgress=!0,this.requestUpdate())}getAttributes(t){const{status:e,state:a,fan_speed:r,fan_speed_list:n,battery_level:o,battery_icon:i,friendly_name:s}=t.attributes;return{status:e||a,fan_speed:r,fan_speed_list:n,battery_level:o,battery_icon:i,friendly_name:s}}renderSource(){const{fan_speed:t,fan_speed_list:e}=this.getAttributes(this.entity);if(!e)return M``;const a=e.indexOf(t);return M`
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
            ${Re("source."+t)||t}
          </span>
        </paper-button>
        <paper-listbox
          slot="dropdown-content"
          selected=${a}
          @click="${t=>this.handleSpeed(t)}"
        >
          ${e.map(t=>M`<paper-item value=${t}
                >${Re("source."+t)||t}</paper-item
              >`)}
        </paper-listbox>
      </paper-menu-button>
    `}renderMapOrImage(t){return this.compactView?M``:this.map?M` <img class="map" src="${this.mapUrl}" /> `:this.image?M` <img class="vacuum ${t}" src="${this.image}" /> `:M``}renderStats(t){const{stats:e={}}=this.config;return(e[t]||e.default||[]).map(({attribute:t,unit:e,subtitle:a})=>M`
        <div class="stats-block">
          <span class="stats-hours">${this.entity.attributes[t]}</span>
          ${e}
          <div class="stats-subtitle">${a}</div>
        </div>
      `)}renderName(){const{friendly_name:t}=this.getAttributes(this.entity);return this.showName?M`
      <div class="vacuum-name">
        ${t}
      </div>
    `:M``}renderStatus(){const{status:t}=this.getAttributes(this.entity),e=Re("status."+t)||t;return this.showStatus?M`
      <div class="status">
        <span class="status-text" alt=${e}>
          ${e}
        </span>
        <paper-spinner ?active=${this.requestInProgress}></paper-spinner>
      </div>
    `:M``}renderToolbar(t){if(!this.showToolbar)return M``;switch(t){case"cleaning":return M`
          <div class="toolbar">
            <paper-button @click="${()=>this.callService("pause")}">
              <ha-icon icon="hass:pause"></ha-icon>
              ${Re("common.pause")}
            </paper-button>
            <paper-button @click="${()=>this.callService("stop")}">
              <ha-icon icon="hass:stop"></ha-icon>
              ${Re("common.stop")}
            </paper-button>
            <paper-button @click="${()=>this.callService("return_to_base")}">
              <ha-icon icon="hass:home-map-marker"></ha-icon>
              ${Re("common.return_to_base")}
            </paper-button>
          </div>
        `;case"paused":return M`
          <div class="toolbar">
            <paper-button @click="${()=>this.callService("start")}">
              <ha-icon icon="hass:play"></ha-icon>
              ${Re("common.continue")}
            </paper-button>
            <paper-button @click="${()=>this.callService("return_to_base")}">
              <ha-icon icon="hass:home-map-marker"></ha-icon>
              ${Re("common.return_to_base")}
            </paper-button>
          </div>
        `;case"returning":return M`
          <div class="toolbar">
            <paper-button @click="${()=>this.callService("start")}">
              <ha-icon icon="hass:play"></ha-icon>
              ${Re("common.continue")}
            </paper-button>
            <paper-button @click="${()=>this.callService("pause")}">
              <ha-icon icon="hass:pause"></ha-icon>
              ${Re("common.pause")}
            </paper-button>
          </div>
        `;case"docked":case"idle":default:{const{actions:e=[]}=this.config,a=e.map(({name:t,service:e,icon:a,service_data:r})=>M`<ha-icon-button
            icon="${a}"
            title="${t}"
            @click="${()=>{const[t,a]=e.split(".");this.hass.callService(t,a,r)}}"
          ></ha-icon-button>`),r=M`
          <ha-icon-button
            icon="hass:home-map-marker"
            title="${Re("common.return_to_base")}"
            @click="${()=>this.callService("return_to_base")}"
          >
          </ha-icon-button>
        `;return M`
          <div class="toolbar">
            <ha-icon-button
              icon="hass:play"
              title="${Re("common.start")}"
              @click="${()=>this.callService("start")}"
            >
            </ha-icon-button>

            <ha-icon-button
              icon="mdi:crosshairs-gps"
              title="${Re("common.locate")}"
              @click="${()=>this.callService("locate",!1)}"
            >
            </ha-icon-button>

            ${"idle"===t?r:""}
            <div class="fill-gap"></div>
            ${a}
          </div>
        `}}}render(){if(!this.entity)return M`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${Re("common.not_available")}
              </div>
            <div>
          </div>
        </ha-card>
      `;const{state:t}=this.entity,{battery_level:e,battery_icon:a}=this.getAttributes(this.entity);return M`
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
    `}}),window.customCards=window.customCards||[],window.customCards.push({preview:!0,type:"vacuum-card",name:Re("common.name"),description:Re("common.description")});
