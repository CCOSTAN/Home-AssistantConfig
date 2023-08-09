function t(t,e,i,n){var r,s=arguments.length,a=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var o=t.length-1;o>=0;o--)(r=t[o])&&(a=(s<3?r(a):s>3?r(e,i,a):r(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a}const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},n=`{{lit-${String(Math.random()).slice(2)}}}`,r=`\x3c!--${n}--\x3e`,s=new RegExp(`${n}|${r}`),a="$lit$";class o{constructor(t,e){this.parts=[],this.element=e;const i=[],r=[],o=document.createTreeWalker(e.content,133,null,!1);let c=0,d=-1,p=0;const{strings:f,values:{length:m}}=t;for(;p<m;){const t=o.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let n=0;for(let t=0;t<i;t++)l(e[t].name,a)&&n++;for(;n-- >0;){const e=f[p],i=u.exec(e)[2],n=i.toLowerCase()+a,r=t.getAttribute(n);t.removeAttribute(n);const o=r.split(s);this.parts.push({type:"attribute",index:d,name:i,strings:o}),p+=o.length-1}}"TEMPLATE"===t.tagName&&(r.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(n)>=0){const n=t.parentNode,r=e.split(s),o=r.length-1;for(let e=0;e<o;e++){let i,s=r[e];if(""===s)i=h();else{const t=u.exec(s);null!==t&&l(t[2],a)&&(s=s.slice(0,t.index)+t[1]+t[2].slice(0,-a.length)+t[3]),i=document.createTextNode(s)}n.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===r[o]?(n.insertBefore(h(),t),i.push(t)):t.data=r[o],p+=o}}else if(8===t.nodeType)if(t.data===n){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(h(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),p++}else{let e=-1;for(;-1!==(e=t.data.indexOf(n,e+1));)this.parts.push({type:"node",index:-1}),p++}}else o.currentNode=r.pop()}for(const n of i)n.parentNode.removeChild(n)}}const l=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},c=t=>-1!==t.index,h=()=>document.createComment(""),u=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function d(t,e){const{element:{content:i},parts:n}=t,r=document.createTreeWalker(i,133,null,!1);let s=f(n),a=n[s],o=-1,l=0;const c=[];let h=null;for(;r.nextNode();){o++;const t=r.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(c.push(t),null===h&&(h=t)),null!==h&&l++;void 0!==a&&a.index===o;)a.index=null!==h?-1:a.index-l,s=f(n,s),a=n[s]}c.forEach((t=>t.parentNode.removeChild(t)))}const p=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},f=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(c(e))return i}return-1};const m=new WeakMap,g=t=>(...e)=>{const i=t(...e);return m.set(i,!0),i},_=t=>"function"==typeof t&&m.has(t),b={},y={};class v{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const i of this.__parts)void 0!==i&&i.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),i=[],n=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let s,a=0,o=0,l=r.nextNode();for(;a<n.length;)if(s=n[a],c(s)){for(;o<s.index;)o++,"TEMPLATE"===l.nodeName&&(i.push(l),r.currentNode=l.content),null===(l=r.nextNode())&&(r.currentNode=i.pop(),l=r.nextNode());if("node"===s.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(l,s.name,s.strings,this.options));a++}else this.__parts.push(void 0),a++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}const w=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),S=` ${n} `;class x{constructor(t,e,i,n){this.strings=t,this.values=e,this.type=i,this.processor=n}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const l=u.exec(t);e+=null===l?t+(i?S:r):t.substr(0,l.index)+l[1]+l[2]+a+l[3]+n}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==w&&(e=w.createHTML(e)),t.innerHTML=e,t}}const k=t=>null===t||!("object"==typeof t||"function"==typeof t),O=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class T{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let n=0;n<i.length-1;n++)this.parts[n]=this._createPart()}_createPart(){return new M(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!O(t))return t}let n="";for(let r=0;r<e;r++){n+=t[r];const e=i[r];if(void 0!==e){const t=e.value;if(k(t)||!O(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e],n}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class M{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===b||k(t)&&t===this.value||(this.value=t,_(t)||(this.committer.dirty=!0))}commit(){for(;_(this.value);){const t=this.value;this.value=b,t(this)}this.value!==b&&this.committer.commit()}}class C{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}const t=this.__pendingValue;t!==b&&(k(t)?t!==this.value&&this.__commitText(t):t instanceof x?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):O(t)?this.__commitIterable(t):t===y?(this.value=y,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof v&&this.value.template===e)this.value.update(t.values);else{const i=new v(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,n=0;for(const r of t)i=e[n],void 0===i&&(i=new C(this.options),e.push(i),0===n?i.appendIntoPart(this):i.insertAfterPart(e[n-1])),i.setValue(r),i.commit(),n++;n<e.length&&(e.length=n,this.clear(i&&i.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class E{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}if(this.__pendingValue===b)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=b}}class P extends T{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new A(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class A extends M{}let N=!1;(()=>{try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class j{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;_(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=b,t(this)}if(this.__pendingValue===b)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),n=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=$(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=b}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const $=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);function H(t){let e=R.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},R.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(n);return i=e.keyString.get(r),void 0===i&&(i=new o(t,t.getTemplateElement()),e.keyString.set(r,i)),e.stringsArray.set(t.strings,i),i}const R=new Map,V=new WeakMap;const D=new class{handleAttributeExpressions(t,e,i,n){const r=e[0];if("."===r){return new P(t,e.slice(1),i).parts}if("@"===r)return[new j(t,e.slice(1),n.eventContext)];if("?"===r)return[new E(t,e.slice(1),i)];return new T(t,e,i).parts}handleTextExpression(t){return new C(t)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const L=(t,...e)=>new x(t,e,"html",D),F=(t,e)=>`${t}--${e}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const z=t=>e=>{const i=F(e.type,t);let r=R.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},R.set(i,r));let s=r.stringsArray.get(e.strings);if(void 0!==s)return s;const a=e.strings.join(n);if(s=r.keyString.get(a),void 0===s){const i=e.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(i,t),s=new o(e,i),r.keyString.set(a,s)}return r.stringsArray.set(e.strings,s),s},U=["html","svg"],q=new Set,Y=(t,e,i)=>{q.add(t);const n=i?i.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(0===s)return void window.ShadyCSS.prepareTemplateStyles(n,t);const a=document.createElement("style");for(let c=0;c<s;c++){const t=r[c];t.parentNode.removeChild(t),a.textContent+=t.textContent}(t=>{U.forEach((e=>{const i=R.get(F(e,t));void 0!==i&&i.keyString.forEach((t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach((t=>{i.add(t)})),d(t,i)}))}))})(t);const o=n.content;i?function(t,e,i=null){const{element:{content:n},parts:r}=t;if(null==i)return void n.appendChild(e);const s=document.createTreeWalker(n,133,null,!1);let a=f(r),o=0,l=-1;for(;s.nextNode();)for(l++,s.currentNode===i&&(o=p(e),i.parentNode.insertBefore(e,i));-1!==a&&r[a].index===l;){if(o>0){for(;-1!==a;)r[a].index+=o,a=f(r,a);return}a=f(r,a)}}(i,a,o.firstChild):o.insertBefore(a,o.firstChild),window.ShadyCSS.prepareTemplateStyles(n,t);const l=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)e.insertBefore(l.cloneNode(!0),e.firstChild);else if(i){o.insertBefore(a,o.firstChild);const t=new Set;t.add(a),d(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const B={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},W=(t,e)=>e!==t&&(e==e||t==t),G={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:W},Z="finalized";class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach(((e,i)=>{const n=this._attributeNameForProperty(i,e);void 0!==n&&(this._attributeToPropertyMap.set(n,i),t.push(n))})),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach(((t,e)=>this._classProperties.set(e,t)))}}static createProperty(t,e=G){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const r=this[t];this[e]=n,this.requestUpdateInternal(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||G}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(Z)||t.finalize(),this[Z]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=W){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,n=e.converter||B,r="function"==typeof n?n:n.fromAttribute;return r?r(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,n=e.converter;return(n&&n.toAttribute||B.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((t=>this._enableUpdatingResolver=t)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((t,e)=>this[e]=t)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=G){const n=this.constructor,r=n._attributeNameForProperty(t,i);if(void 0!==r){const t=n._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,n=i._attributeToPropertyMap.get(t);if(void 0!==n){const t=i.getPropertyOptions(n);this._updateState=16|this._updateState,this[n]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let n=!0;if(void 0!==t){const r=this.constructor;i=i||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(i){throw t=!1,this._markUpdated(),i}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((t,e)=>this._propertyToAttribute(e,this[e],t))),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}J[Z]=!0;const X=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function K(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):X(t,e)}const Q=(t,e,i)=>{Object.defineProperty(e,i,t)},tt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t});const et=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol();class nt{constructor(t,e){if(e!==it)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(et?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const rt={};class st extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight(((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t)),i),i=e(t,new Set),n=[];i.forEach((t=>n.unshift(t))),this._styles=n}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map((t=>{if(t instanceof CSSStyleSheet&&!et){const e=Array.prototype.slice.call(t.cssRules).reduce(((t,e)=>t+e.cssText),"");return new nt(String(e),it)}return t}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?et?this.renderRoot.adoptedStyleSheets=t.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t=>t.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==rt&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)})))}render(){return rt}}st.finalized=!0,st.render=(t,e,n)=>{if(!n||"object"!=typeof n||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,s=V.has(e),a=I&&11===e.nodeType&&!!e.host,o=a&&!q.has(r),l=o?document.createDocumentFragment():e;if(((t,e,n)=>{let r=V.get(e);void 0===r&&(i(e,e.firstChild),V.set(e,r=new C(Object.assign({templateFactory:H},n))),r.appendInto(e)),r.setValue(t),r.commit()})(t,l,Object.assign({templateFactory:z(r)},n)),o){const t=V.get(l);V.delete(l);const n=t.value instanceof v?t.value.template:void 0;Y(r,l,n),i(e,e.firstChild),e.appendChild(l),V.set(e,t)}!s&&a&&window.ShadyCSS.styleElement(e.host)};class at{constructor(t){this.startPress=e=>{t().then((t=>{t&&t.startPress(e)}))},this.endPress=()=>{t().then((t=>{t&&t.endPress()}))},this.startFocus=()=>{t().then((t=>{t&&t.startFocus()}))},this.endFocus=()=>{t().then((t=>{t&&t.endFocus()}))},this.startHover=()=>{t().then((t=>{t&&t.startHover()}))},this.endHover=()=>{t().then((t=>{t&&t.endHover()}))}}}const ot=new WeakMap,lt=g((t=>e=>{if(!(e instanceof M)||e instanceof A||"style"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=e,{style:n}=i.element;let r=ot.get(e);void 0===r&&(n.cssText=i.strings.join(" "),ot.set(e,r=new Set)),r.forEach((e=>{e in t||(r.delete(e),-1===e.indexOf("-")?n[e]=null:n.removeProperty(e))}));for(const s in t)r.add(s),-1===s.indexOf("-")?n[s]=t[s]:n.setProperty(s,t[s])})),ct=new WeakMap,ht=g((t=>e=>{if(!(e instanceof C))throw new Error("unsafeHTML can only be used in text bindings");const i=ct.get(e);if(void 0!==i&&k(t)&&t===i.value&&e.value===i.fragment)return;const n=document.createElement("template");n.innerHTML=t;const r=document.importNode(n.content,!0);e.setValue(r),ct.set(e,{value:t,fragment:r})}));class ut{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const i of e)this.classes.add(i)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach((e=>t+=e+" ")),this.element.setAttribute("class",t)}}}const dt=new WeakMap,pt=g((t=>e=>{if(!(e instanceof M)||e instanceof A||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=e,{element:n}=i;let r=dt.get(e);void 0===r&&(n.setAttribute("class",i.strings.join(" ")),dt.set(e,r=new Set));const s=n.classList||new ut(n);r.forEach((e=>{e in t||(s.remove(e),r.delete(e))}));for(const a in t){const e=t[a];e!=r.has(a)&&(e?(s.add(a),r.add(a)):(s.remove(a),r.delete(a)))}"function"==typeof s.commit&&s.commit()}));var ft=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,mt="[1-9]\\d?",gt="\\d\\d",_t="[^\\s]+",bt=/\[([^]*?)\]/gm;function yt(t,e){for(var i=[],n=0,r=t.length;n<r;n++)i.push(t[n].substr(0,e));return i}var vt=function(t){return function(e,i){var n=i[t].map((function(t){return t.toLowerCase()})),r=n.indexOf(e.toLowerCase());return r>-1?r:null}};function wt(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var n=0,r=e;n<r.length;n++){var s=r[n];for(var a in s)t[a]=s[a]}return t}var St=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],xt=["January","February","March","April","May","June","July","August","September","October","November","December"],kt=yt(xt,3),Ot={dayNamesShort:yt(St,3),dayNames:St,monthNamesShort:kt,monthNames:xt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},Tt=wt({},Ot),Mt=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},Ct={D:function(t){return String(t.getDate())},DD:function(t){return Mt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return Mt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return Mt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return Mt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return Mt(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return Mt(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return Mt(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return Mt(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return Mt(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return Mt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return Mt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+Mt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+Mt(Math.floor(Math.abs(e)/60),2)+":"+Mt(Math.abs(e)%60,2)}},Et=function(t){return+t-1},Pt=[null,mt],At=[null,_t],Nt=["isPm",_t,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],jt=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],$t=(vt("monthNamesShort"),vt("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var Ht=function(t,e,i){if(void 0===e&&(e=$t.default),void 0===i&&(i={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var n=[];e=(e=$t[e]||e).replace(bt,(function(t,e){return n.push(e),"@@@"}));var r=wt(wt({},Tt),i);return(e=e.replace(ft,(function(e){return Ct[e](t,r)}))).replace(/@@@/g,(function(){return n.shift()}))};function Rt(t){var e=t.split(":").map(Number);return 3600*e[0]+60*e[1]+e[2]}var Vt=function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric"})}:function(t){return Ht(t,"mediumDate")},Dt=function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleString(e,{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"2-digit"})}:function(t){return Ht(t,"haDateTime")},Lt=function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}return!1}()?function(t,e){return t.toLocaleTimeString(e,{hour:"numeric",minute:"2-digit"})}:function(t){return Ht(t,"shortTime")},Ft=function(t){return t<10?"0"+t:t};function It(t){return t.substr(0,t.indexOf("."))}var zt="hass:bookmark",Ut=["closed","locked","off"],qt=new Set(["fan","input_boolean","light","switch","group","automation"]),Yt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},Bt=new Set(["call-service","divider","section","weblink","cast","select"]),Wt={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},Gt={alert:"hass:alert",automation:"hass:playlist-play",calendar:"hass:calendar",camera:"hass:video",climate:"hass:thermostat",configurator:"hass:settings",conversation:"hass:text-to-speech",device_tracker:"hass:account",fan:"hass:fan",group:"hass:google-circles-communities",history_graph:"hass:chart-line",homeassistant:"hass:home-assistant",homekit:"hass:home-automation",image_processing:"hass:image-filter-frames",input_boolean:"hass:drawing",input_datetime:"hass:calendar-clock",input_number:"hass:ray-vertex",input_select:"hass:format-list-bulleted",input_text:"hass:textbox",light:"hass:lightbulb",mailbox:"hass:mailbox",notify:"hass:comment-alert",person:"hass:account",plant:"hass:flower",proximity:"hass:apple-safari",remote:"hass:remote",scene:"hass:google-pages",script:"hass:file-document",sensor:"hass:eye",simple_alarm:"hass:bell",sun:"hass:white-balance-sunny",switch:"hass:flash",timer:"hass:timer",updater:"hass:cloud-upload",vacuum:"hass:robot-vacuum",water_heater:"hass:thermometer",weblink:"hass:open-in-new"};function Zt(t,e){if(t in Gt)return Gt[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"hass:bell-plus";case"armed_night":return"hass:bell-sleep";case"disarmed":return"hass:bell-outline";case"triggered":return"hass:bell-ring";default:return"hass:bell"}case"binary_sensor":return e&&"off"===e?"hass:radiobox-blank":"hass:checkbox-marked-circle";case"cover":return"closed"===e?"hass:window-closed":"hass:window-open";case"lock":return e&&"unlocked"===e?"hass:lock-open":"hass:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"hass:cast-connected":"hass:cast";case"zwave":switch(e){case"dead":return"hass:emoticon-dead";case"sleeping":return"hass:sleep";case"initializing":return"hass:timer-sand";default:return"hass:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),zt}}var Jt=function(t){Yt(window,"haptic",t)},Xt=function(t,e){return function(t,e,i){void 0===i&&(i=!0);var n,r=It(e),s="group"===r?"homeassistant":r;switch(r){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return t.callService(s,n,{entity_id:e})}(t,e,Ut.includes(t.states[e].state))},Kt=function(t,e,i,n,r){var s;if(r&&i.double_tap_action?s=i.double_tap_action:n&&i.hold_action?s=i.hold_action:!n&&i.tap_action&&(s=i.tap_action),s||(s={action:"more-info"}),!s.confirmation||s.confirmation.exemptions&&s.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||confirm(s.confirmation.text||"Are you sure you want to "+s.action+"?"))switch(s.action){case"more-info":(s.entity||i.entity||i.camera_image)&&(Yt(t,"hass-more-info",{entityId:s.entity?s.entity:i.entity?i.entity:i.camera_image}),s.haptic&&Jt(s.haptic));break;case"navigate":s.navigation_path&&(function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),Yt(window,"location-changed",{replace:i})}(0,s.navigation_path),s.haptic&&Jt(s.haptic));break;case"url":s.url_path&&window.open(s.url_path),s.haptic&&Jt(s.haptic);break;case"toggle":i.entity&&(Xt(e,i.entity),s.haptic&&Jt(s.haptic));break;case"call-service":if(!s.service)return;var a=s.service.split(".",2),o=a[0],l=a[1],c=Object.assign({},s.service_data);"entity"===c.entity_id&&(c.entity_id=i.entity),e.callService(o,l,c),s.haptic&&Jt(s.haptic);break;case"fire-dom-event":Yt(t,"ll-custom",s),s.haptic&&Jt(s.haptic)}},Qt={humidity:"hass:water-percent",illuminance:"hass:brightness-5",temperature:"hass:thermometer",pressure:"hass:gauge",power:"hass:flash",signal_strength:"hass:wifi"},te={binary_sensor:function(t){var e=t.state&&"off"===t.state;switch(t.attributes.device_class){case"battery":return e?"hass:battery":"hass:battery-outline";case"cold":return e?"hass:thermometer":"hass:snowflake";case"connectivity":return e?"hass:server-network-off":"hass:server-network";case"door":return e?"hass:door-closed":"hass:door-open";case"garage_door":return e?"hass:garage":"hass:garage-open";case"gas":case"power":case"problem":case"safety":case"smoke":return e?"hass:shield-check":"hass:alert";case"heat":return e?"hass:thermometer":"hass:fire";case"light":return e?"hass:brightness-5":"hass:brightness-7";case"lock":return e?"hass:lock":"hass:lock-open";case"moisture":return e?"hass:water-off":"hass:water";case"motion":return e?"hass:walk":"hass:run";case"occupancy":case"presence":return e?"hass:home-outline":"hass:home";case"opening":return e?"hass:square":"hass:square-outline";case"plug":return e?"hass:power-plug-off":"hass:power-plug";case"sound":return e?"hass:music-note-off":"hass:music-note";case"vibration":return e?"hass:crop-portrait":"hass:vibrate";case"window":return e?"hass:window-closed":"hass:window-open";default:return e?"hass:radiobox-blank":"hass:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"hass:garage-open":"hass:garage";case"door":return e?"hass:door-open":"hass:door-closed";case"shutter":return e?"hass:window-shutter-open":"hass:window-shutter";case"blind":return e?"hass:blinds-open":"hass:blinds";case"window":return e?"hass:window-open":"hass:window-closed";default:return Zt("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in Qt)return Qt[e];if("battery"===e){var i=Number(t.state);if(isNaN(i))return"hass:battery-unknown";var n=10*Math.round(i/10);return n>=100?"hass:battery":n<=0?"hass:battery-alert":"hass:battery-"+n}var r=t.attributes.unit_of_measurement;return"°C"===r||"°F"===r?"hass:thermometer":Zt("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?Zt("input_datetime"):"hass:calendar":"hass:clock"}};const ee=(t,e,i,n)=>{n=n||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},ie=(t,e)=>{if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){if(t.constructor!==e.constructor)return!1;let i,n;if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(i=n;0!=i--;)if(!ie(t[i],e[i]))return!1;return!0}if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(i of t.entries())if(!e.has(i[0]))return!1;for(i of t.entries())if(!ie(i[1],e.get(i[0])))return!1;return!0}if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(i of t.entries())if(!e.has(i[0]))return!1;return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(e)){if(n=t.length,n!==e.length)return!1;for(i=n;0!=i--;)if(t[i]!==e[i])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();const r=Object.keys(t);if(n=r.length,n!==Object.keys(e).length)return!1;for(i=n;0!=i--;)if(!Object.prototype.hasOwnProperty.call(e,r[i]))return!1;for(i=n;0!=i--;){const n=r[i];if(!ie(t[n],e[n]))return!1}return!0}return t!=t&&e!=e},ne="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0;class re extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.cancelled=!1,this.isRepeating=!1,this.ripple=document.createElement("mwc-ripple")}connectedCallback(){Object.assign(this.style,{position:"fixed",width:ne?"100px":"50px",height:ne?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),this.ripple.primary=!0,["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach((t=>{document.addEventListener(t,(()=>{this.cancelled=!0,this.timer&&(this.stopAnimation(),clearTimeout(this.timer),this.timer=void 0,this.isRepeating&&this.repeatTimeout&&(clearInterval(this.repeatTimeout),this.isRepeating=!1))}),{passive:!0})}))}bind(t,e){t.actionHandler&&ie(e,t.actionHandler.options)||(t.actionHandler?(t.removeEventListener("touchstart",t.actionHandler.start),t.removeEventListener("touchend",t.actionHandler.end),t.removeEventListener("touchcancel",t.actionHandler.end),t.removeEventListener("mousedown",t.actionHandler.start),t.removeEventListener("click",t.actionHandler.end),t.removeEventListener("keyup",t.actionHandler.handleEnter)):t.addEventListener("contextmenu",(t=>{const e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1})),t.actionHandler={options:e},e.disabled||(t.actionHandler.start=i=>{let n,r;this.cancelled=!1,i.touches?(n=i.touches[0].clientX,r=i.touches[0].clientY):(n=i.clientX,r=i.clientY),e.hasHold&&(this.held=!1,this.timer=window.setTimeout((()=>{this.startAnimation(n,r),this.held=!0,e.repeat&&!this.isRepeating&&(this.isRepeating=!0,this.repeatTimeout=setInterval((()=>{ee(t,"action",{action:"hold"})}),e.repeat))}),this.holdTime))},t.actionHandler.end=t=>{if(["touchend","touchcancel"].includes(t.type)&&this.cancelled)return void(this.isRepeating&&this.repeatTimeout&&(clearInterval(this.repeatTimeout),this.isRepeating=!1));const i=t.target;t.cancelable&&t.preventDefault(),e.hasHold&&(clearTimeout(this.timer),this.isRepeating&&this.repeatTimeout&&clearInterval(this.repeatTimeout),this.isRepeating=!1,this.stopAnimation(),this.timer=void 0),e.hasHold&&this.held?e.repeat||ee(i,"action",{action:"hold"}):e.hasDoubleClick?"click"===t.type&&t.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,ee(i,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,ee(i,"action",{action:"double_tap"})):ee(i,"action",{action:"tap"})},t.actionHandler.handleEnter=t=>{13===t.keyCode&&t.currentTarget.actionHandler.end(t)},t.addEventListener("touchstart",t.actionHandler.start,{passive:!0}),t.addEventListener("touchend",t.actionHandler.end),t.addEventListener("touchcancel",t.actionHandler.end),t.addEventListener("mousedown",t.actionHandler.start,{passive:!0}),t.addEventListener("click",t.actionHandler.end),t.addEventListener("keyup",t.actionHandler.handleEnter)))}startAnimation(t,e){Object.assign(this.style,{left:`${t}px`,top:`${e}px`,display:null}),this.ripple.disabled=!1,this.ripple.startPress(),this.ripple.unbounded=!0}stopAnimation(){this.ripple.endPress(),this.ripple.disabled=!0,this.style.display="none"}}customElements.define("button-card-action-handler",re);const se=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("button-card-action-handler"))return t.querySelector("button-card-action-handler");const e=document.createElement("button-card-action-handler");return t.appendChild(e),e})();i&&i.bind(t,e)},ae=g(((t={})=>e=>{se(e.committer.element,t)}));function oe(t,e){(function(t){return"string"==typeof t&&t.includes(".")&&1===parseFloat(t)})(t)&&(t="100%");var i=function(t){return"string"==typeof t&&t.includes("%")}(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),i&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function le(t){return Math.min(1,Math.max(0,t))}function ce(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function he(t){return t<=1?100*Number(t)+"%":t}function ue(t){return 1===t.length?"0"+t:String(t)}function de(t,e,i){t=oe(t,255),e=oe(e,255),i=oe(i,255);var n=Math.max(t,e,i),r=Math.min(t,e,i),s=0,a=0,o=(n+r)/2;if(n===r)a=0,s=0;else{var l=n-r;switch(a=o>.5?l/(2-n-r):l/(n+r),n){case t:s=(e-i)/l+(e<i?6:0);break;case e:s=(i-t)/l+2;break;case i:s=(t-e)/l+4}s/=6}return{h:s,s:a,l:o}}function pe(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*i*(e-t):i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t}function fe(t,e,i){t=oe(t,255),e=oe(e,255),i=oe(i,255);var n=Math.max(t,e,i),r=Math.min(t,e,i),s=0,a=n,o=n-r,l=0===n?0:o/n;if(n===r)s=0;else{switch(n){case t:s=(e-i)/o+(e<i?6:0);break;case e:s=(i-t)/o+2;break;case i:s=(t-e)/o+4}s/=6}return{h:s,s:l,v:a}}function me(t,e,i,n){var r=[ue(Math.round(t).toString(16)),ue(Math.round(e).toString(16)),ue(Math.round(i).toString(16))];return n&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function ge(t){return _e(t)/255}function _e(t){return parseInt(t,16)}var be={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function ye(t){var e={r:0,g:0,b:0},i=1,n=null,r=null,s=null,a=!1,o=!1;return"string"==typeof t&&(t=function(t){if(t=t.trim().toLowerCase(),0===t.length)return!1;var e=!1;if(be[t])t=be[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var i=xe.rgb.exec(t);if(i)return{r:i[1],g:i[2],b:i[3]};if(i=xe.rgba.exec(t),i)return{r:i[1],g:i[2],b:i[3],a:i[4]};if(i=xe.hsl.exec(t),i)return{h:i[1],s:i[2],l:i[3]};if(i=xe.hsla.exec(t),i)return{h:i[1],s:i[2],l:i[3],a:i[4]};if(i=xe.hsv.exec(t),i)return{h:i[1],s:i[2],v:i[3]};if(i=xe.hsva.exec(t),i)return{h:i[1],s:i[2],v:i[3],a:i[4]};if(i=xe.hex8.exec(t),i)return{r:_e(i[1]),g:_e(i[2]),b:_e(i[3]),a:ge(i[4]),format:e?"name":"hex8"};if(i=xe.hex6.exec(t),i)return{r:_e(i[1]),g:_e(i[2]),b:_e(i[3]),format:e?"name":"hex"};if(i=xe.hex4.exec(t),i)return{r:_e(i[1]+i[1]),g:_e(i[2]+i[2]),b:_e(i[3]+i[3]),a:ge(i[4]+i[4]),format:e?"name":"hex8"};if(i=xe.hex3.exec(t),i)return{r:_e(i[1]+i[1]),g:_e(i[2]+i[2]),b:_e(i[3]+i[3]),format:e?"name":"hex"};return!1}(t)),"object"==typeof t&&(ke(t.r)&&ke(t.g)&&ke(t.b)?(e=function(t,e,i){return{r:255*oe(t,255),g:255*oe(e,255),b:255*oe(i,255)}}(t.r,t.g,t.b),a=!0,o="%"===String(t.r).substr(-1)?"prgb":"rgb"):ke(t.h)&&ke(t.s)&&ke(t.v)?(n=he(t.s),r=he(t.v),e=function(t,e,i){t=6*oe(t,360),e=oe(e,100),i=oe(i,100);var n=Math.floor(t),r=t-n,s=i*(1-e),a=i*(1-r*e),o=i*(1-(1-r)*e),l=n%6;return{r:255*[i,a,s,s,o,i][l],g:255*[o,i,i,a,s,s][l],b:255*[s,s,o,i,i,a][l]}}(t.h,n,r),a=!0,o="hsv"):ke(t.h)&&ke(t.s)&&ke(t.l)&&(n=he(t.s),s=he(t.l),e=function(t,e,i){var n,r,s;if(t=oe(t,360),e=oe(e,100),i=oe(i,100),0===e)r=i,s=i,n=i;else{var a=i<.5?i*(1+e):i+e-i*e,o=2*i-a;n=pe(o,a,t+1/3),r=pe(o,a,t),s=pe(o,a,t-1/3)}return{r:255*n,g:255*r,b:255*s}}(t.h,n,s),a=!0,o="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(i=t.a)),i=ce(i),{ok:a,format:t.format||o,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:i}}var ve="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",we="[\\s|\\(]+("+ve+")[,|\\s]+("+ve+")[,|\\s]+("+ve+")\\s*\\)?",Se="[\\s|\\(]+("+ve+")[,|\\s]+("+ve+")[,|\\s]+("+ve+")[,|\\s]+("+ve+")\\s*\\)?",xe={CSS_UNIT:new RegExp(ve),rgb:new RegExp("rgb"+we),rgba:new RegExp("rgba"+Se),hsl:new RegExp("hsl"+we),hsla:new RegExp("hsla"+Se),hsv:new RegExp("hsv"+we),hsva:new RegExp("hsva"+Se),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ke(t){return Boolean(xe.CSS_UNIT.exec(String(t)))}var Oe=function(){function t(e,i){var n;if(void 0===e&&(e=""),void 0===i&&(i={}),e instanceof t)return e;"number"==typeof e&&(e=function(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}(e)),this.originalInput=e;var r=ye(e);this.originalInput=e,this.r=r.r,this.g=r.g,this.b=r.b,this.a=r.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(n=i.format)&&void 0!==n?n:r.format,this.gradientType=i.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=r.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t=this.toRgb(),e=t.r/255,i=t.g/255,n=t.b/255;return.2126*(e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))+.7152*(i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=ce(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.toHsv=function(){var t=fe(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=fe(this.r,this.g,this.b),e=Math.round(360*t.h),i=Math.round(100*t.s),n=Math.round(100*t.v);return 1===this.a?"hsv("+e+", "+i+"%, "+n+"%)":"hsva("+e+", "+i+"%, "+n+"%, "+this.roundA+")"},t.prototype.toHsl=function(){var t=de(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=de(this.r,this.g,this.b),e=Math.round(360*t.h),i=Math.round(100*t.s),n=Math.round(100*t.l);return 1===this.a?"hsl("+e+", "+i+"%, "+n+"%)":"hsla("+e+", "+i+"%, "+n+"%, "+this.roundA+")"},t.prototype.toHex=function(t){return void 0===t&&(t=!1),me(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),function(t,e,i,n,r){var s,a=[ue(Math.round(t).toString(16)),ue(Math.round(e).toString(16)),ue(Math.round(i).toString(16)),ue((s=n,Math.round(255*parseFloat(s)).toString(16)))];return r&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))&&a[3].startsWith(a[3].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0)+a[3].charAt(0):a.join("")}(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),i=Math.round(this.b);return 1===this.a?"rgb("+t+", "+e+", "+i+")":"rgba("+t+", "+e+", "+i+", "+this.roundA+")"},t.prototype.toPercentageRgb=function(){var t=function(t){return Math.round(100*oe(t,255))+"%"};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*oe(t,255))};return 1===this.a?"rgb("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%)":"rgba("+t(this.r)+"%, "+t(this.g)+"%, "+t(this.b)+"%, "+this.roundA+")"},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+me(this.r,this.g,this.b,!1),e=0,i=Object.entries(be);e<i.length;e++){var n=i[e],r=n[0];if(t===n[1])return r}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!=t?t:this.format;var i=!1,n=this.a<1&&this.a>=0;return e||!n||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(i=this.toRgbString()),"prgb"===t&&(i=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(i=this.toHexString()),"hex3"===t&&(i=this.toHexString(!0)),"hex4"===t&&(i=this.toHex8String(!0)),"hex8"===t&&(i=this.toHex8String()),"name"===t&&(i=this.toName()),"hsl"===t&&(i=this.toHslString()),"hsv"===t&&(i=this.toHsvString()),i||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.l+=e/100,i.l=le(i.l),new t(i)},t.prototype.brighten=function(e){void 0===e&&(e=10);var i=this.toRgb();return i.r=Math.max(0,Math.min(255,i.r-Math.round(-e/100*255))),i.g=Math.max(0,Math.min(255,i.g-Math.round(-e/100*255))),i.b=Math.max(0,Math.min(255,i.b-Math.round(-e/100*255))),new t(i)},t.prototype.darken=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.l-=e/100,i.l=le(i.l),new t(i)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.s-=e/100,i.s=le(i.s),new t(i)},t.prototype.saturate=function(e){void 0===e&&(e=10);var i=this.toHsl();return i.s+=e/100,i.s=le(i.s),new t(i)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var i=this.toHsl(),n=(i.h+e)%360;return i.h=n<0?360+n:n,new t(i)},t.prototype.mix=function(e,i){void 0===i&&(i=50);var n=this.toRgb(),r=new t(e).toRgb(),s=i/100;return new t({r:(r.r-n.r)*s+n.r,g:(r.g-n.g)*s+n.g,b:(r.b-n.b)*s+n.b,a:(r.a-n.a)*s+n.a})},t.prototype.analogous=function(e,i){void 0===e&&(e=6),void 0===i&&(i=30);var n=this.toHsl(),r=360/i,s=[this];for(n.h=(n.h-(r*e>>1)+720)%360;--e;)n.h=(n.h+r)%360,s.push(new t(n));return s},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);for(var i=this.toHsv(),n=i.h,r=i.s,s=i.v,a=[],o=1/e;e--;)a.push(new t({h:n,s:r,v:s})),s=(s+o)%1;return a},t.prototype.splitcomplement=function(){var e=this.toHsl(),i=e.h;return[this,new t({h:(i+72)%360,s:e.s,l:e.l}),new t({h:(i+216)%360,s:e.s,l:e.l})]},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var i=this.toHsl(),n=i.h,r=[this],s=360/e,a=1;a<e;a++)r.push(new t({h:(n+a*s)%360,s:i.s,l:i.l}));return r},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}();function Te(t,e){return void 0===t&&(t=""),void 0===e&&(e={}),new Oe(t,e)}function Me(t){return t.substr(0,t.indexOf("."))}function Ce(t){return"var"===t.substring(0,3)?window.getComputedStyle(document.documentElement).getPropertyValue(t.substring(4).slice(0,-1)).trim():t}function Ee(t,e){const i=new Oe(Ce(t));if(i.isValid){const t=i.mix("black",100-e).toString();if(t)return t}return t}function Pe(...t){const e=t=>t&&"object"==typeof t;return t.reduce(((t,i)=>(Object.keys(i).forEach((n=>{const r=t[n],s=i[n];Array.isArray(r)&&Array.isArray(s)?t[n]=r.concat(...s):e(r)&&e(s)?t[n]=Pe(r,s):t[n]=s})),t)),{})}function Ae(t,e){let i=[];return t&&t.forEach((t=>{let n=t;e&&e.forEach((e=>{e.id&&t.id&&e.id==t.id&&(n=Pe(n,e))})),i.push(n)})),e&&(i=i.concat(e.filter((e=>!t||!t.find((t=>!(!t.id||!e.id)&&t.id==e.id)))))),i}const Ne=((t,...e)=>{const i=e.reduce(((e,i,n)=>e+(t=>{if(t instanceof nt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[n+1]),t[0]);return new nt(i,it)})`
  :host {
    position: relative;
    display: block;
  }
  ha-card {
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: normal;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                          supported by Chrome, Opera and Firefox */
  }
  ha-card.disabled {
    pointer-events: none;
    cursor: default;
  }
  :host(.tooltip) .tooltiptext {
    pointer-events: none;
    opacity: 0;
    text-align: center;
    padding: 4px;
    border-radius: var(--ha-card-border-radius, 4px);
    box-shadow: var(
      --ha-card-box-shadow,
      0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14),
      0px 1px 3px 0px rgba(0, 0, 0, 0.12)
    );
    background: var(--ha-card-background, var(--card-background-color, white));
    border: 1px solid var(--primary-text-color);
    color: var(--primary-text-color);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
  :host(.tooltip:hover) span.tooltiptext {
    opacity: 1;
    transition-delay: 1.5s;
  }
  ha-icon {
    display: inline-block;
    margin: auto;
    --mdc-icon-size: 100%;
    --iron-icon-width: 100%;
    --iron-icon-height: 100%;
  }
  ha-card.button-card-main {
    padding: 4% 0px;
    text-transform: none;
    font-weight: 400;
    font-size: 1.2rem;
    align-items: center;
    text-align: center;
    letter-spacing: normal;
    width: 100%;
  }
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  #overlay {
    align-items: flex-start;
    justify-content: flex-end;
    padding: 8px 7px;
    opacity: 0.5;
    /* DO NOT override items below */
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
  }
  #lock {
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    margin: unset;
    width: 24px;
  }
  .invalid {
    animation: blink 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  }
  .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 1s, opacity 1s linear;
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  [rotating] {
    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
  }

  #container {
    display: grid;
    width: 100%;
    height: 100%;
    text-align: center;
    align-items: center;
  }
  #img-cell {
    display: flex;
    grid-area: i;
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    align-self: center;
    justify-self: center;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  ha-icon#icon {
    height: 100%;
    width: 100%;
    max-height: 100%;
    position: absolute;
  }
  img#icon {
    display: block;
    height: auto;
    width: 100%;
    position: absolute;
  }
  #name {
    grid-area: n;
    max-width: 100%;
    align-self: center;
    justify-self: center;
    /* margin: auto; */
  }
  #state {
    grid-area: s;
    max-width: 100%;
    align-self: center;
    justify-self: center;
    /* margin: auto; */
  }

  #label {
    grid-area: l;
    max-width: 100%;
    align-self: center;
    justify-self: center;
  }

  #container.vertical {
    grid-template-areas: 'i' 'n' 's' 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content min-content min-content;
  }
  /* Vertical No Icon */
  #container.vertical.no-icon {
    grid-template-areas: 'n' 's' 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content 1fr;
  }
  #container.vertical.no-icon #state {
    align-self: center;
  }
  #container.vertical.no-icon #name {
    align-self: end;
  }
  #container.vertical.no-icon #label {
    align-self: start;
  }

  /* Vertical No Icon No Name */
  #container.vertical.no-icon.no-name {
    grid-template-areas: 's' 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  #container.vertical.no-icon.no-name #state {
    align-self: end;
  }
  #container.vertical.no-icon.no-name #label {
    align-self: start;
  }

  /* Vertical No Icon No State */
  #container.vertical.no-icon.no-state {
    grid-template-areas: 'n' 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  #container.vertical.no-icon.no-state #name {
    align-self: end;
  }
  #container.vertical.no-icon.no-state #label {
    align-self: start;
  }

  /* Vertical No Icon No Label */
  #container.vertical.no-icon.no-label {
    grid-template-areas: 'n' 's';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  #container.vertical.no-icon.no-label #name {
    align-self: end;
  }
  #container.vertical.no-icon.no-label #state {
    align-self: start;
  }

  /* Vertical No Icon No Label No Name */
  #container.vertical.no-icon.no-label.no-name {
    grid-template-areas: 's';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  #container.vertical.no-icon.no-label.no-name #state {
    align-self: center;
  }
  /* Vertical No Icon No Label No State */
  #container.vertical.no-icon.no-label.no-state {
    grid-template-areas: 'n';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  #container.vertical.no-icon.no-label.no-state #name {
    align-self: center;
  }

  /* Vertical No Icon No Name No State */
  #container.vertical.no-icon.no-name.no-state {
    grid-template-areas: 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  #container.vertical.no-icon.no-name.no-state #label {
    align-self: center;
  }

  #container.icon_name_state {
    grid-template-areas: 'i n' 'l l';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr min-content;
  }

  #container.icon_name {
    grid-template-areas: 'i n' 's s' 'l l';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr min-content min-content;
  }

  #container.icon_state {
    grid-template-areas: 'i s' 'n n' 'l l';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr min-content min-content;
  }

  #container.name_state {
    grid-template-areas: 'i' 'n' 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr min-content min-content;
  }
  #container.name_state.no-icon {
    grid-template-areas: 'n' 'l';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
  #container.name_state.no-icon #name {
    align-self: end;
  }
  #container.name_state.no-icon #label {
    align-self: start;
  }

  #container.name_state.no-icon.no-label {
    grid-template-areas: 'n';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  #container.name_state.no-icon.no-label #name {
    align-self: center;
  }

  /* icon_name_state2nd default */
  #container.icon_name_state2nd {
    grid-template-areas: 'i n' 'i s' 'i l';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr min-content 1fr;
  }
  #container.icon_name_state2nd #name {
    align-self: end;
  }
  #container.icon_name_state2nd #state {
    align-self: center;
  }
  #container.icon_name_state2nd #label {
    align-self: start;
  }

  /* icon_name_state2nd No Label */
  #container.icon_name_state2nd.no-label {
    grid-template-areas: 'i n' 'i s';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr 1fr;
  }
  #container.icon_name_state2nd #name {
    align-self: end;
  }
  #container.icon_name_state2nd #state {
    align-self: start;
  }

  /* icon_state_name2nd Default */
  #container.icon_state_name2nd {
    grid-template-areas: 'i s' 'i n' 'i l';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr min-content 1fr;
  }
  #container.icon_state_name2nd #state {
    align-self: end;
  }
  #container.icon_state_name2nd #name {
    align-self: center;
  }
  #container.icon_state_name2nd #label {
    align-self: start;
  }

  /* icon_state_name2nd No Label */
  #container.icon_state_name2nd.no-label {
    grid-template-areas: 'i s' 'i n';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr 1fr;
  }
  #container.icon_state_name2nd #state {
    align-self: end;
  }
  #container.icon_state_name2nd #name {
    align-self: start;
  }

  #container.icon_label {
    grid-template-areas: 'i l' 'n n' 's s';
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr min-content min-content;
  }

  [style*='--aspect-ratio'] > :first-child {
    width: 100%;
  }
  [style*='--aspect-ratio'] > img {
    height: auto;
  }
  @supports (--custom: property) {
    [style*='--aspect-ratio'] {
      position: relative;
    }
    [style*='--aspect-ratio']::before {
      content: '';
      display: block;
      padding-bottom: calc(100% / (var(--aspect-ratio)));
    }
    [style*='--aspect-ratio'] > :first-child {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
    }
  }
`;const je=(t,e,i,n)=>{if(!((t,e,i)=>{const[n,r]=t.split(".",2);return Number(n)>e||Number(n)===e&&Number(r)>=i})(t.config.version,0,109))return function(t,e){let i;const n=Me(e.entity_id);return"binary_sensor"===n?(e.attributes.device_class&&(i=t(`state.${n}.${e.attributes.device_class}.${e.state}`)),i||(i=t(`state.${n}.default.${e.state}`))):i=e.attributes.unit_of_measurement&&!["unknown","unavailable"].includes(e.state)?e.state:"zwave"===n?["initializing","dead"].includes(e.state)?t(`state.zwave.query_stage.${e.state}`,"query_stage",e.attributes.query_stage):t(`state.zwave.default.${e.state}`):t(`state.${n}.${e.state}`),i||(i=t(`state.default.${e.state}`)||t(`component.${n}.state.${e.state}`)||e.state),i}(e,i);if("unknown"===i.state||"unavailable"===i.state)return e(`state.default.${i.state}`);if(i.attributes.unit_of_measurement)return`${i.state} ${i.attributes.unit_of_measurement}`;const r=Me(i.entity_id);if("input_datetime"===r){let t;if(!i.attributes.has_time)return t=new Date(i.attributes.year,i.attributes.month-1,i.attributes.day),Vt(t,n);if(!i.attributes.has_date){const e=new Date;return t=new Date(e.getFullYear(),e.getMonth(),e.getDay(),i.attributes.hour,i.attributes.minute),Lt(t,n)}return t=new Date(i.attributes.year,i.attributes.month-1,i.attributes.day,i.attributes.hour,i.attributes.minute),Dt(t,n)}return i.attributes.device_class&&e(`component.${r}.state.${i.attributes.device_class}.${i.state}`)||e(`component.${r}.state._.${i.state}`)||i.state};var $e=Function.prototype.toString,He=Object.create,Re=Object.defineProperty,Ve=Object.getOwnPropertyDescriptor,De=Object.getOwnPropertyNames,Le=Object.getOwnPropertySymbols,Fe=Object.getPrototypeOf,Ie=Object.prototype,ze=Ie.hasOwnProperty,Ue=Ie.propertyIsEnumerable,qe="function"==typeof Le,Ye="function"==typeof WeakMap,Be=function(t,e){if(!t.constructor)return He(null);var i=t.constructor,n=t.__proto__||Fe(t);if(i===e.Object)return n===e.Object.prototype?{}:He(n);if(~$e.call(i).indexOf("[native code]"))try{return new i}catch(r){}return He(n)},We=function(t,e,i,n){var r=Be(t,e);for(var s in n.set(t,r),t)ze.call(t,s)&&(r[s]=i(t[s],n));if(qe){var a=Le(t),o=a.length;if(o)for(var l=0,c=void 0;l<o;l++)c=a[l],Ue.call(t,c)&&(r[c]=i(t[c],n))}return r},Ge=function(t,e,i,n){var r=Be(t,e);n.set(t,r);var s=qe?De(t).concat(Le(t)):De(t),a=s.length;if(a)for(var o=0,l=void 0,c=void 0;o<a;o++)if("callee"!==(l=s[o])&&"caller"!==l)if(c=Ve(t,l)){c.get||c.set||(c.value=i(t[l],n));try{Re(r,l,c)}catch(h){r[l]=c.value}}else r[l]=i(t[l],n);return r},Ze=Array.isArray,Je="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void(console&&console.error&&console.error('Unable to locate global object, returning "this".'));function Xe(t,e){var i=!(!e||!e.isStrict),n=e&&e.realm||Je,r=i?Ge:We,s=function(t,e){if(!t||"object"!=typeof t)return t;if(e.has(t))return e.get(t);var a,o,l,c=t.constructor;if(c===n.Object)return r(t,n,s,e);if(Ze(t)){if(i)return Ge(t,n,s,e);var h=t.length;a=new c,e.set(t,a);for(var u=0;u<h;u++)a[u]=s(t[u],e);return a}if(t instanceof n.Date)return new c(t.getTime());if(t instanceof n.RegExp)return(a=new c(t.source,t.flags||(l="",(o=t).global&&(l+="g"),o.ignoreCase&&(l+="i"),o.multiline&&(l+="m"),o.unicode&&(l+="u"),o.sticky&&(l+="y"),l))).lastIndex=t.lastIndex,a;if(n.Map&&t instanceof n.Map)return a=new c,e.set(t,a),t.forEach((function(t,i){a.set(i,s(t,e))})),a;if(n.Set&&t instanceof n.Set)return a=new c,e.set(t,a),t.forEach((function(t){a.add(s(t,e))})),a;if(n.Blob&&t instanceof n.Blob)return a=new Blob([t],{type:t.type});if(n.Buffer&&n.Buffer.isBuffer(t))return a=n.Buffer.allocUnsafe?n.Buffer.allocUnsafe(t.length):new c(t.length),e.set(t,a),t.copy(a),a;if(n.ArrayBuffer){if(n.ArrayBuffer.isView(t))return a=new c(t.buffer.slice(0)),e.set(t,a),a;if(t instanceof n.ArrayBuffer)return a=t.slice(0),e.set(t,a),a}return"function"==typeof t.then||t instanceof Error||n.WeakMap&&t instanceof n.WeakMap||n.WeakSet&&t instanceof n.WeakSet?t:r(t,n,s,e)};return s(t,function(){if(Ye)return new WeakMap;var t=He({has:function(e){return!!~t._keys.indexOf(e)},set:function(e,i){t._keys.push(e),t._values.push(i)},get:function(e){return t._values[t._keys.indexOf(e)]}});return t._keys=[],t._values=[],t}())}Xe.strict=function(t,e){return Xe(t,{isStrict:!0,realm:e?e.realm:void 0})};let Ke=window.cardHelpers;const Qe=new Promise((async t=>{Ke&&t(),window.loadCardHelpers&&(Ke=await window.loadCardHelpers(),window.cardHelpers=Ke,t())}));console.info("%c  BUTTON-CARD  \n%c Version 3.5.0 ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"button-card",name:"Button-Card",preview:!1,description:"A massively customizable custom button card"});let ti=class extends st{constructor(){super(...arguments),this._cards={},this._cardsConfig={},this._entities=[],this._initial_setup_complete=!1,this._rippleHandlers=new at((()=>this._ripple))}set hass(t){this._hass=t,Object.keys(this._cards).forEach((t=>{this._cards[t].hass=this._hass})),this._initial_setup_complete||this._initConnected()}disconnectedCallback(){super.disconnectedCallback(),this._clearInterval()}connectedCallback(){super.connectedCallback(),this._initial_setup_complete?this._startTimerCountdown():this._initConnected()}_initConnected(){void 0!==this._hass&&void 0!==this._config&&this.isConnected&&(this._initial_setup_complete=!0,this._startTimerCountdown())}_startTimerCountdown(){if(this._config&&this._config.entity&&"timer"===Me(this._config.entity)){const t=this._hass.states[this._config.entity];this._startInterval(t)}}_createCard(t){if(Ke)return Ke.createCardElement(t);{const e=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return n("hui-error-card",{type:"error",error:t,config:e})},n=function(t,e){var n=window.document.createElement(t);try{n.setConfig(e)}catch(n){return console.error(t,n),i(n.message,e)}return n};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var r=t.type;if(r&&r.startsWith("custom:"))r=r.substr("custom:".length);else if(e)if(Bt.has(r))r="hui-"+r+"-row";else{if(!t.entity)return i("Invalid config given.",t);var s=t.entity.split(".",1)[0];r="hui-"+(Wt[s]||"text")+"-entity-row"}else r="hui-"+r+"-card";if(customElements.get(r))return n(r,t);var a=i("Custom element doesn't exist: "+t.type+".",t);a.style.display="None";var o=setTimeout((function(){a.style.display=""}),2e3);return customElements.whenDefined(t.type).then((function(){clearTimeout(o),Yt(a,"ll-rebuild",{},a)})),a}(t);return Qe.then((()=>{Yt(e,"ll-rebuild",{})})),e}}static get styles(){return Ne}render(){if(!this._config||!this._hass)return L``;this._stateObj=this._config.entity?this._hass.states[this._config.entity]:void 0;try{return this._evaledVariables=this._config.variables?this._objectEvalTemplate(this._stateObj,this._config.variables):void 0,this._cardHtml()}catch(t){t.stack?console.error(t.stack):console.error(t);const e=document.createElement("hui-error-card");return e.setConfig({type:"error",error:t.toString(),origConfig:this._config}),L` ${e} `}}shouldUpdate(t){return!(!this._hasTemplate&&!t.has("_timeRemaining")&&!function(t,e){if(e.has("_config"))return!0;const i=e.get("_hass");if(i)return t._entities.some((function(e){return(null==i?void 0:i.states[e])!==t._hass.states[e]}));return!1}(this,t))&&(this._expandTriggerGroups(),!0)}updated(t){if(super.updated(t),this._config&&this._config.entity&&"timer"===Me(this._config.entity)&&t.has("_hass")){const e=this._hass.states[this._config.entity],i=t.get("_hass");(i?i.states[this._config.entity]:void 0)!==e?this._startInterval(e):e||this._clearInterval()}}_clearInterval(){this._interval&&(window.clearInterval(this._interval),this._interval=void 0)}_startInterval(t){this._clearInterval(),this._calculateRemaining(t),"active"===t.state&&(this._interval=window.setInterval((()=>this._calculateRemaining(t)),1e3))}_calculateRemaining(t){t.attributes.remaining&&(this._timeRemaining=function(t){var e=Rt(t.attributes.remaining);if("active"===t.state){var i=(new Date).getTime(),n=new Date(t.last_changed).getTime();e=Math.max(e-(i-n)/1e3,0)}return e}(t))}_computeTimeDisplay(t){if(t)return function(t){var e=Math.floor(t/3600),i=Math.floor(t%3600/60),n=Math.floor(t%3600%60);return e>0?e+":"+Ft(i)+":"+Ft(n):i>0?i+":"+Ft(n):n>0?""+n:null}(this._timeRemaining||Rt(t.attributes.duration))}_getMatchingConfigState(t){if(!this._config.state)return;const e=this._config.state.find((t=>"template"===t.operator));if(!t&&!e)return;let i;const n=this._config.state.find((e=>{if(!e.operator)return t&&this._getTemplateOrValue(t,e.value)==t.state;switch(e.operator){case"==":return t&&t.state==this._getTemplateOrValue(t,e.value);case"<=":return t&&t.state<=this._getTemplateOrValue(t,e.value);case"<":return t&&t.state<this._getTemplateOrValue(t,e.value);case">=":return t&&t.state>=this._getTemplateOrValue(t,e.value);case">":return t&&t.state>this._getTemplateOrValue(t,e.value);case"!=":return t&&t.state!=this._getTemplateOrValue(t,e.value);case"regex":return!(!t||!t.state.match(this._getTemplateOrValue(t,e.value)));case"template":return this._getTemplateOrValue(t,e.value);case"default":return i=e,!1;default:return!1}}));return!n&&i?i:n}_evalTemplate(t,e){try{return new Function("states","entity","user","hass","variables","html",`'use strict'; ${e}`).call(this,this._hass.states,t,this._hass.user,this._hass,this._evaledVariables,L)}catch(i){const t=e.length<=100?e.trim():`${e.trim().substring(0,98)}...`;throw i.message=`${i.name}: ${i.message} in '${t}'`,i.name="ButtonCardJSTemplateError",i}}_objectEvalTemplate(t,e){const i=Xe(e);return this._getTemplateOrValue(t,i)}_getTemplateOrValue(t,e){if(["number","boolean"].includes(typeof e))return e;if(!e)return e;if("object"==typeof e)return Object.keys(e).forEach((i=>{e[i]=this._getTemplateOrValue(t,e[i])})),e;const i=e.trim();return"[[["===i.substring(0,3)&&"]]]"===i.slice(-3)?this._evalTemplate(t,i.slice(3,-3)):e}_getDefaultColorForState(t){switch(t.state){case"on":return this._config.color_on;case"off":return this._config.color_off;default:return this._config.default_color}}_getColorForLightEntity(t,e){let i=this._config.default_color;return t&&("on"===t.state?t.attributes.rgb_color?(i=`rgb(${t.attributes.rgb_color.join(",")})`,t.attributes.brightness&&(i=Ee(i,(t.attributes.brightness+245)/5))):e&&t.attributes.color_temp&&t.attributes.min_mireds&&t.attributes.max_mireds?(i=function(t,e,i){const n=new Oe("rgb(255, 160, 0)"),r=new Oe("rgb(166, 209, 255)"),s=new Oe("white"),a=(t-e)/(i-e)*100;return a<50?Te(r).mix(s,2*a).toRgbString():Te(s).mix(n,2*(a-50)).toRgbString()}(t.attributes.color_temp,t.attributes.min_mireds,t.attributes.max_mireds),t.attributes.brightness&&(i=Ee(i,(t.attributes.brightness+245)/5))):i=t.attributes.brightness?Ee(this._getDefaultColorForState(t),(t.attributes.brightness+245)/5):this._getDefaultColorForState(t):i=this._getDefaultColorForState(t)),i}_buildCssColorAttribute(t,e){let i,n="";return(null==e?void 0:e.color)?n=e.color:"auto"!==this._config.color&&"off"===(null==t?void 0:t.state)?n=this._config.color_off:this._config.color&&(n=this._config.color),i="auto"==n||"auto-no-temperature"==n?this._getColorForLightEntity(t,"auto-no-temperature"!==n):n||(t?this._getDefaultColorForState(t):this._config.default_color),i}_buildIcon(t,e){if(!this._config.show_icon)return;let i;if(null==e?void 0:e.icon)i=e.icon;else if(this._config.icon)i=this._config.icon;else{if(!t)return;i=function(t){if(!t)return zt;if(t.attributes.icon)return t.attributes.icon;var e=It(t.entity_id);return e in te?te[e](t):Zt(e,t.state)}(t)}return this._getTemplateOrValue(t,i)}_buildEntityPicture(t,e){if(!this._config.show_entity_picture||!t&&!e&&!this._config.entity_picture)return;let i;return(null==e?void 0:e.entity_picture)?i=e.entity_picture:this._config.entity_picture?i=this._config.entity_picture:t&&(i=t.attributes&&t.attributes.entity_picture?t.attributes.entity_picture:void 0),this._getTemplateOrValue(t,i)}_buildStyleGeneric(t,e,i){var n,r;let s={};if((null===(n=this._config.styles)||void 0===n?void 0:n[i])&&(s=Object.assign(s,...this._config.styles[i])),null===(r=null==e?void 0:e.styles)||void 0===r?void 0:r[i]){let t={};t=Object.assign(t,...e.styles[i]),s=Object.assign(Object.assign({},s),t)}return Object.keys(s).forEach((e=>{s[e]=this._getTemplateOrValue(t,s[e])})),s}_buildCustomStyleGeneric(t,e,i){var n,r,s,a;let o={};if((null===(r=null===(n=this._config.styles)||void 0===n?void 0:n.custom_fields)||void 0===r?void 0:r[i])&&(o=Object.assign(o,...this._config.styles.custom_fields[i])),null===(a=null===(s=null==e?void 0:e.styles)||void 0===s?void 0:s.custom_fields)||void 0===a?void 0:a[i]){let t={};t=Object.assign(t,...e.styles.custom_fields[i]),o=Object.assign(Object.assign({},o),t)}return Object.keys(o).forEach((e=>{o[e]=this._getTemplateOrValue(t,o[e])})),o}_buildName(t,e){if(!1===this._config.show_name)return;let i;var n;return(null==e?void 0:e.name)?i=e.name:this._config.name?i=this._config.name:t&&(i=t.attributes&&t.attributes.friendly_name?t.attributes.friendly_name:(n=t.entity_id).substr(n.indexOf(".")+1)),this._getTemplateOrValue(t,i)}_buildStateString(t){var e;let i;if(this._config.show_state&&t&&t.state){const n=this._buildUnits(t);n?i=`${t.state} ${n}`:"timer"===Me(t.entity_id)?"idle"===t.state||0===this._timeRemaining?i=je(this._hass,this._hass.localize,t,this._hass.language):(i=this._computeTimeDisplay(t),"paused"===t.state&&(i+=` (${je(this._hass,this._hass.localize,t,this._hass.language)})`)):i=(null===(e=this._config)||void 0===e?void 0:e.show_units)||"sensor"!==Me(t.entity_id)?je(this._hass,this._hass.localize,t,this._hass.language):t.state}return i}_buildUnits(t){var e;let i;return t&&this._config.show_units&&(i=(null===(e=t.attributes)||void 0===e?void 0:e.unit_of_measurement)&&!this._config.units?t.attributes.unit_of_measurement:this._config.units?this._config.units:void 0),i}_buildLastChanged(t,e){return this._config.show_last_changed&&t?L`
          <ha-relative-time
            id="label"
            class="ellipsis"
            .hass="${this._hass}"
            .datetime="${t.last_changed}"
            style=${lt(e)}
          ></ha-relative-time>
        `:void 0}_buildLabel(t,e){if(!this._config.show_label)return;let i;return i=(null==e?void 0:e.label)?e.label:this._config.label,this._getTemplateOrValue(t,i)}_buildCustomFields(t,e){let i=L``;const n={},r={};return this._config.custom_fields&&Object.keys(this._config.custom_fields).forEach((e=>{const i=this._config.custom_fields[e];i.card?r[e]=this._objectEvalTemplate(t,i.card):n[e]=this._getTemplateOrValue(t,i)})),(null==e?void 0:e.custom_fields)&&Object.keys(e.custom_fields).forEach((i=>{const s=e.custom_fields[i];s.card?r[i]=this._objectEvalTemplate(t,s.card):n[i]=this._getTemplateOrValue(t,s)})),Object.keys(n).forEach((r=>{if(null!=n[r]){const s=Object.assign(Object.assign({},this._buildCustomStyleGeneric(t,e,r)),{"grid-area":r});i=L`
          ${i}
          <div id=${r} class="ellipsis" style=${lt(s)}>
            ${n[r]&&"html"===n[r].type?n[r]:ht(n[r])}
          </div>
        `}})),Object.keys(r).forEach((n=>{if(null!=r[n]){const s=Object.assign(Object.assign({},this._buildCustomStyleGeneric(t,e,n)),{"grid-area":n});let a;ie(this._cardsConfig[n],r[n])?a=this._cards[n]:(a=this._createCard(r[n]),this._cards[n]=a,this._cardsConfig[n]=Xe(r[n])),a.hass=this._hass,i=L`
          ${i}
          <div
            id=${n}
            @action=${this._stopPropagation}
            @click=${this._stopPropagation}
            @touchstart=${this._stopPropagation}
            @mousedown=${this._stopPropagation}
            @mouseup=${this._stopPropagation}
            @touchend=${this._stopPropagation}
            @touchcancel=${this._stopPropagation}
            style=${lt(s)}
          >
            ${a}
          </div>
        `}})),i}_isClickable(t){let e=!0;const i=this._getTemplateOrValue(t,this._config.tap_action.action),n=this._getTemplateOrValue(t,this._config.hold_action.action),r=this._getTemplateOrValue(t,this._config.double_tap_action.action);return e="none"!=i||"none"!=n||"none"!=r,e}_rotate(t){return!!(null==t?void 0:t.spin)}_blankCardColoredHtml(t){const e=Object.assign({background:"none","box-shadow":"none","border-style":"none"},t);return L`
      <ha-card class="disabled" style=${lt(e)}>
        <div></div>
      </ha-card>
    `}_cardHtml(){var t,e;const i=this._getMatchingConfigState(this._stateObj),n=this._buildCssColorAttribute(this._stateObj,i);let r=n,s={},a={};const o={},l=this._buildStyleGeneric(this._stateObj,i,"lock"),c=this._buildStyleGeneric(this._stateObj,i,"card"),h=this._buildStyleGeneric(this._stateObj,i,"tooltip"),u={"button-card-main":!0,disabled:!this._isClickable(this._stateObj)};switch((null===(t=this._config)||void 0===t?void 0:t.tooltip)&&this.classList.add("tooltip"),c.width&&(this.style.setProperty("flex","0 0 auto"),this.style.setProperty("max-width","fit-content")),this._config.color_type){case"blank-card":return this._blankCardColoredHtml(c);case"card":case"label-card":{const t=function(t){const e=new Oe(Ce(t));return e.isValid&&e.getLuminance()>.5?"rgb(62, 62, 62)":"rgb(234, 234, 234)"}(n);s.color=t,a.color=t,s["background-color"]=n,s=Object.assign(Object.assign({},s),c),r="inherit";break}default:s=c}this._config.aspect_ratio?(o["--aspect-ratio"]=this._config.aspect_ratio,s.position="absolute"):o.display="inline",this.style.setProperty("--button-card-light-color",this._getColorForLightEntity(this._stateObj,!0)),this.style.setProperty("--button-card-light-color-no-temperature",this._getColorForLightEntity(this._stateObj,!1)),a=Object.assign(Object.assign({},a),l);const d=this._config.extra_styles?L`
          <style>
            ${this._getTemplateOrValue(this._stateObj,this._config.extra_styles)}
          </style>
        `:L``;return L`
      ${d}
      <div id="aspect-ratio" style=${lt(o)}>
        <ha-card
          id="card"
          class=${pt(u)}
          style=${lt(s)}
          @action=${this._handleAction}
          @focus="${this.handleRippleFocus}"
          @blur="${this.handleRippleBlur}"
          @mousedown="${this.handleRippleActivate}"
          @mouseup="${this.handleRippleDeactivate}"
          @touchstart="${this.handleRippleActivate}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}"
          .actionHandler=${ae({hasDoubleClick:"none"!==this._config.double_tap_action.action,hasHold:"none"!==this._config.hold_action.action,repeat:this._config.hold_action.repeat})}
          .config="${this._config}"
        >
          ${this._buttonContent(this._stateObj,i,r)}
          <mwc-ripple id="ripple"></mwc-ripple>
        </ha-card>
      </div>
      ${this._getLock(a)}
      ${(null===(e=this._config)||void 0===e?void 0:e.tooltip)?L`
            <span class="tooltiptext" style=${lt(h)}>
              ${this._getTemplateOrValue(this._stateObj,this._config.tooltip)}
            </span>
          `:""}
    `}_getLock(t){return this._config.lock&&this._getTemplateOrValue(this._stateObj,this._config.lock.enabled)?L`
        <div
          id="overlay"
          style=${lt(t)}
          @action=${this._handleUnlockType}
          .actionHandler=${ae({hasDoubleClick:"double_tap"===this._config.lock.unlock,hasHold:"hold"===this._config.lock.unlock})}
          .config="${this._config}"
        >
          <ha-icon id="lock" icon="mdi:lock-outline"></ha-icon>
        </div>
      `:L``}_buttonContent(t,e,i){const n=this._buildName(t,e),r=(null==e?void 0:e.state_display)||this._config.state_display||void 0,s=this._config.show_state&&r?this._getTemplateOrValue(t,r):void 0,a=s||this._buildStateString(t),o=function(t,e){if(!t&&!e)return;let i;return i=e?t?`${t}: ${e}`:e:t,i}(n,a);switch(this._config.layout){case"icon_name_state":case"name_state":return this._gridHtml(t,e,this._config.layout,i,o,void 0);default:return this._gridHtml(t,e,this._config.layout,i,n,a)}}_gridHtml(t,e,i,n,r,s){const a=this._getIconHtml(t,e,n),o=[i],l=this._buildLabel(t,e),c=this._buildStyleGeneric(t,e,"name"),h=this._buildStyleGeneric(t,e,"state"),u=this._buildStyleGeneric(t,e,"label"),d=this._buildLastChanged(t,u),p=this._buildStyleGeneric(t,e,"grid");return a||o.push("no-icon"),r||o.push("no-name"),s||o.push("no-state"),l||d||o.push("no-label"),L`
      <div id="container" class=${o.join(" ")} style=${lt(p)}>
        ${a||""}
        ${r?L`
              <div id="name" class="ellipsis" style=${lt(c)}>
                ${"html"===r.type?r:ht(r)}
              </div>
            `:""}
        ${s?L`
              <div id="state" class="ellipsis" style=${lt(h)}>
                ${"html"===s.type?s:ht(s)}
              </div>
            `:""}
        ${l&&!d?L`
              <div id="label" class="ellipsis" style=${lt(u)}>
                ${"html"===l.type?l:ht(l)}
              </div>
            `:""}
        ${d||""} ${this._buildCustomFields(t,e)}
      </div>
    `}_getIconHtml(t,e,i){const n=this._buildIcon(t,e),r=this._buildEntityPicture(t,e),s=this._buildStyleGeneric(t,e,"entity_picture"),a=this._buildStyleGeneric(t,e,"icon"),o=this._buildStyleGeneric(t,e,"img_cell"),l=this._buildStyleGeneric(t,e,"card"),c=Object.assign({color:i,width:this._config.size,position:this._config.aspect_ratio||l.height?"absolute":"relative"},a),h=Object.assign(Object.assign({},c),s),u=this._buildLiveStream(h);return n||r?L`
        <div id="img-cell" style=${lt(o)}>
          ${!n||r||u?"":L`
                <ha-icon
                  style=${lt(c)}
                  .icon="${n}"
                  id="icon"
                  ?rotating=${this._rotate(e)}
                ></ha-icon>
              `}
          ${u||""}
          ${r&&!u?L`
                <img
                  src="${r}"
                  style=${lt(h)}
                  id="icon"
                  ?rotating=${this._rotate(e)}
                />
              `:""}
        </div>
      `:void 0}_buildLiveStream(t){return this._config.show_live_stream&&this._config.entity&&"camera"===Me(this._config.entity)?L`
        <hui-image
          .hass=${this._hass}
          .cameraImage=${this._config.entity}
          .entity=${this._config.entity}
          cameraView="live"
          style=${lt(t)}
        ></hui-image>
      `:void 0}_configFromLLTemplates(t,e){const i=e.template;if(!i)return e;let n,r={};const s=i&&Array.isArray(i)?i:[i];return null==s||s.forEach((e=>{var i;if(!(null===(i=t.config.button_card_templates)||void 0===i?void 0:i[e]))throw new Error(`Button-card template '${e}' is missing!`);const s=this._configFromLLTemplates(t,t.config.button_card_templates[e]);r=Pe(r,s),n=Ae(n,s.state)})),r=Pe(r,e),r.state=Ae(n,e.state),r}setConfig(t){if(!t)throw new Error("Invalid configuration");this._cards={},this._cardsConfig={};const e=function(){let t=document.querySelector("home-assistant");if(t=t&&t.shadowRoot,t=t&&t.querySelector("home-assistant-main"),t=t&&t.shadowRoot,t=t&&t.querySelector("app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver"),t=t&&t.shadowRoot||t,t=t&&t.querySelector("ha-panel-lovelace"),t=t&&t.shadowRoot,t=t&&t.querySelector("hui-root"),t){const e=t.lovelace;return e.current_view=t.___curView,e}return null}()||function(){let t=document.querySelector("hc-main");if(t=t&&t.shadowRoot,t=t&&t.querySelector("hc-lovelace"),t=t&&t.shadowRoot,t=t&&(t.querySelector("hui-view")||t.querySelector("hui-panel-view")),t){const e=t.lovelace;return e.current_view=t.___curView,e}return null}();let i=Xe(t);i=this._configFromLLTemplates(e,i),this._config=Object.assign(Object.assign({type:"custom:button-card",group_expand:!1,hold_action:{action:"none"},double_tap_action:{action:"none"},layout:"vertical",size:"40%",color_type:"icon",show_name:!0,show_state:!1,show_icon:!0,show_units:!0,show_label:!1,show_entity_picture:!1,show_live_stream:!1,card_size:3},i),{default_color:"DUMMY",color_off:"DUMMY",color_on:"DUMMY",lock:Object.assign({enabled:!1,duration:5,unlock:"tap"},i.lock)}),this._config.entity&&qt.has(Me(this._config.entity))?this._config=Object.assign({tap_action:{action:"toggle"}},this._config):this._config=Object.assign({tap_action:{action:"more-info"}},this._config),this._config.default_color="var(--primary-text-color)","icon"!==this._config.color_type?this._config.color_off="var(--card-background-color)":this._config.color_off="var(--paper-item-icon-color)",this._config.color_on="var(--paper-item-icon-active-color)";const n=JSON.stringify(this._config);if(this._entities=[],Array.isArray(this._config.triggers_update)?this._entities=[...this._config.triggers_update]:"string"==typeof this._config.triggers_update&&"all"!==this._config.triggers_update&&this._entities.push(this._config.triggers_update),"all"!==this._config.triggers_update){const t=new RegExp(/states\[\s*('|\\")([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)\1\s*\]/,"gm"),e=new RegExp(/states\[\s*('|\\")([a-zA-Z0-9_]+\.[a-zA-Z0-9_]+)\1\s*\]/,"m"),i=n.match(t);null==i||i.forEach((t=>{const i=t.match(e);i&&!this._entities.includes(i[2])&&this._entities.push(i[2])}))}this._config.entity&&!this._entities.includes(this._config.entity)&&this._entities.push(this._config.entity),this._expandTriggerGroups();const r=new RegExp("\\[\\[\\[.*\\]\\]\\]","m");this._hasTemplate=!("all"!==this._config.triggers_update||!n.match(r)),this._initial_setup_complete||this._initConnected()}_loopGroup(t){t&&t.forEach((t=>{var e,i;(null===(e=this._hass)||void 0===e?void 0:e.states[t])&&("group"===Me(t)&&(null===(i=this._hass.states[t].attributes)||void 0===i?void 0:i.entity_id)?this._loopGroup(this._hass.states[t].attributes.entity_id):this._entities.includes(t)||this._entities.push(t))}))}_expandTriggerGroups(){var t;this._hass&&(null===(t=this._config)||void 0===t?void 0:t.group_expand)&&this._entities&&this._entities.forEach((t=>{var e,i;"group"===Me(t)&&this._loopGroup(null===(i=null===(e=this._hass)||void 0===e?void 0:e.states[t].attributes)||void 0===i?void 0:i.entity_id)}))}getCardSize(){var t;return(null===(t=this._config)||void 0===t?void 0:t.card_size)||3}_evalActions(t,e){const i=Xe(t),n=t=>t?(Object.keys(t).forEach((e=>{"object"==typeof t[e]?t[e]=n(t[e]):t[e]=this._getTemplateOrValue(this._stateObj,t[e])})),t):t;return i[e]=n(i[e]),!i[e].confirmation&&i.confirmation&&(i[e].confirmation=n(i.confirmation)),i}handleRippleActivate(t){this._ripple.then((e=>e&&e.startPress&&this._rippleHandlers.startPress(t)))}handleRippleDeactivate(){this._ripple.then((t=>t&&t.endPress&&this._rippleHandlers.endPress()))}handleRippleFocus(){this._ripple.then((t=>t&&t.startFocus&&this._rippleHandlers.startFocus()))}handleRippleBlur(){this._ripple.then((t=>t&&t.endFocus&&this._rippleHandlers.endFocus()))}_handleAction(t){var e;if(null===(e=t.detail)||void 0===e?void 0:e.action)switch(t.detail.action){case"tap":this._handleTap();break;case"hold":this._handleHold();break;case"double_tap":this._handleDblTap()}}_handleTap(){const t=this._config;t&&Kt(this,this._hass,this._evalActions(t,"tap_action"),!1,!1)}_handleHold(){const t=this._config;t&&Kt(this,this._hass,this._evalActions(t,"hold_action"),!0,!1)}_handleDblTap(){const t=this._config;t&&Kt(this,this._hass,this._evalActions(t,"double_tap_action"),!1,!0)}_handleUnlockType(t){const e=this._config;e&&e.lock.unlock===t.detail.action&&this._handleLock()}_handleLock(){const t=this.shadowRoot.getElementById("lock");if(!t)return;if(this._config.lock.exemptions){if(!this._hass.user.name||!this._hass.user.id)return;let e=!1;if(this._config.lock.exemptions.forEach((t=>{(!e&&t.user===this._hass.user.id||t.username===this._hass.user.name)&&(e=!0)})),!e)return t.classList.add("invalid"),void window.setTimeout((()=>{t&&t.classList.remove("invalid")}),3e3)}const e=this.shadowRoot.getElementById("overlay");if(e.style.setProperty("pointer-events","none"),t){const e=document.createAttribute("icon");e.value="mdi:lock-open-outline",t.attributes.setNamedItem(e),t.classList.add("hidden")}window.setTimeout((()=>{if(e.style.setProperty("pointer-events",""),t){t.classList.remove("hidden");const e=document.createAttribute("icon");e.value="mdi:lock-outline",t.attributes.setNamedItem(e)}}),1e3*this._config.lock.duration)}_stopPropagation(t){t.stopPropagation()}};var ei,ii,ni;t([K()],ti.prototype,"_hass",void 0),t([K()],ti.prototype,"_config",void 0),t([K()],ti.prototype,"_timeRemaining",void 0),t([(ei="mwc-ripple",(t,e)=>{const i={async get(){return await this.updateComplete,this.renderRoot.querySelector(ei)},enumerable:!0,configurable:!0};return void 0!==e?Q(i,t,e):tt(i,t)})],ti.prototype,"_ripple",void 0),t([(ii={passive:!0},(t,e)=>void 0!==e?((t,e,i)=>{Object.assign(e[i],t)})(ii,t,e):((t,e)=>Object.assign(Object.assign({},e),{finisher(i){Object.assign(i.prototype[e.key],t)}}))(ii,t))],ti.prototype,"handleRippleActivate",null),ti=t([(ni="button-card",t=>"function"==typeof t?((t,e)=>(window.customElements.define(t,e),e))(ni,t):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(ni,t))],ti);
