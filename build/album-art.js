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
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,e=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,r=new RegExp(`${s}|${i}`);class n{constructor(t,e){this.parts=[],this.element=e;const i=[],n=[],a=document.createTreeWalker(e.content,133,null,!1);let l=0,d=-1,u=0;const{strings:p,values:{length:m}}=t;for(;u<m;){const t=a.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)o(e[t].name,"$lit$")&&i++;for(;i-- >0;){const e=p[u],s=c.exec(e)[2],i=s.toLowerCase()+"$lit$",n=t.getAttribute(i);t.removeAttribute(i);const o=n.split(r);this.parts.push({type:"attribute",index:d,name:s,strings:o}),u+=o.length-1}}"TEMPLATE"===t.tagName&&(n.push(t),a.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(s)>=0){const s=t.parentNode,n=e.split(r),a=n.length-1;for(let e=0;e<a;e++){let i,r=n[e];if(""===r)i=h();else{const t=c.exec(r);null!==t&&o(t[2],"$lit$")&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(r)}s.insertBefore(i,t),this.parts.push({type:"node",index:++d})}""===n[a]?(s.insertBefore(h(),t),i.push(t)):t.data=n[a],u+=a}}else if(8===t.nodeType)if(t.data===s){const e=t.parentNode;null!==t.previousSibling&&d!==l||(d++,e.insertBefore(h(),t)),l=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let e=-1;for(;-1!==(e=t.data.indexOf(s,e+1));)this.parts.push({type:"node",index:-1}),u++}}else a.currentNode=n.pop()}for(const t of i)t.parentNode.removeChild(t)}}const o=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},a=t=>-1!==t.index,h=()=>document.createComment(""),c=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function l(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,133,null,!1);let n=u(i),o=i[n],a=-1,h=0;const c=[];let l=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===l&&(l=null),e.has(t)&&(c.push(t),null===l&&(l=t)),null!==l&&h++;void 0!==o&&o.index===a;)o.index=null!==l?-1:o.index-h,n=u(i,n),o=i[n]}c.forEach(t=>t.parentNode.removeChild(t))}const d=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)e++;return e},u=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(a(e))return s}return-1};
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
const p=new WeakMap,m=t=>"function"==typeof t&&p.has(t),A={},f={};
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
class y{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const e=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let n,o=0,h=0,c=r.nextNode();for(;o<i.length;)if(n=i[o],a(n)){for(;h<n.index;)h++,"TEMPLATE"===c.nodeName&&(s.push(c),r.currentNode=c.content),null===(c=r.nextNode())&&(r.currentNode=s.pop(),c=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return t&&(document.adoptNode(e),customElements.upgrade(e)),e}}
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
 */const g=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),_=` ${s} `;class S{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",r=!1;for(let n=0;n<t;n++){const t=this.strings[n],o=t.lastIndexOf("\x3c!--");r=(o>-1||r)&&-1===t.indexOf("--\x3e",o+1);const a=c.exec(t);e+=null===a?t+(r?_:i):t.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==g&&(e=g.createHTML(e)),t.innerHTML=e,t}}
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
 */const b=t=>null===t||!("object"==typeof t||"function"==typeof t),w=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class v{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new x(this)}_getValue(){const t=this.strings,e=t.length-1,s=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=s[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!w(t))return t}let i="";for(let r=0;r<e;r++){i+=t[r];const e=s[r];if(void 0!==e){const t=e.value;if(b(t)||!w(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===A||b(t)&&t===this.value||(this.value=t,m(t)||(this.committer.dirty=!0))}commit(){for(;m(this.value);){const t=this.value;this.value=A,t(this)}this.value!==A&&this.committer.commit()}}class N{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(h()),this.endNode=t.appendChild(h())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=h()),t.__insert(this.endNode=h())}insertAfterPart(t){t.__insert(this.startNode=h()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=A,t(this)}const t=this.__pendingValue;t!==A&&(b(t)?t!==this.value&&this.__commitText(t):t instanceof S?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):w(t)?this.__commitIterable(t):t===f?(this.value=f,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof y&&this.value.template===e)this.value.update(t.values);else{const s=new y(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)s=e[i],void 0===s&&(s=new N(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){e(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=A,t(this)}if(this.__pendingValue===A)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=A}}class C extends v{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new T(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class T extends x{}let V=!1;(()=>{try{const t={get capture(){return V=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class E{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;m(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=A,t(this)}if(this.__pendingValue===A)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=U(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=A}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const U=t=>t&&(V?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
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
 */;function O(t){let e=j.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},j.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const r=t.strings.join(s);return i=e.keyString.get(r),void 0===i&&(i=new n(t,t.getTemplateElement()),e.keyString.set(r,i)),e.stringsArray.set(t.strings,i),i}const j=new Map,R=new WeakMap;
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
 */const k=new
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
class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new C(t,e.slice(1),s).parts}if("@"===r)return[new E(t,e.slice(1),i.eventContext)];if("?"===r)return[new P(t,e.slice(1),s)];return new v(t,e,s).parts}handleTextExpression(t){return new N(t)}};
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
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const I=(t,...e)=>new S(t,e,"html",k)
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
 */,B=(t,e)=>`${t}--${e}`;let q=!0;void 0===window.ShadyCSS?q=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),q=!1);const F=t=>e=>{const i=B(e.type,t);let r=j.get(i);void 0===r&&(r={stringsArray:new WeakMap,keyString:new Map},j.set(i,r));let o=r.stringsArray.get(e.strings);if(void 0!==o)return o;const a=e.strings.join(s);if(o=r.keyString.get(a),void 0===o){const s=e.getTemplateElement();q&&window.ShadyCSS.prepareTemplateDom(s,t),o=new n(e,s),r.keyString.set(a,o)}return r.stringsArray.set(e.strings,o),o},z=["html","svg"],M=new Set,$=(t,e,s)=>{M.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{z.forEach(e=>{const s=j.get(B(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),l(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,133,null,!1);let o=u(r),a=0,h=-1;for(;n.nextNode();){h++;for(n.currentNode===s&&(a=d(e),s.parentNode.insertBefore(e,s));-1!==o&&r[o].index===h;){if(a>0){for(;-1!==o;)r[o].index+=a,o=u(r,o);return}o=u(r,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const h=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==h)e.insertBefore(h.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),l(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const X={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},L=(t,e)=>e!==t&&(e==e||t==t),H={attribute:!0,type:String,converter:X,reflect:!1,hasChanged:L};class W extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=H){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdateInternal(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||H}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=L){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||X,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||X.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=H){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,s){let i=!0;if(void 0!==t){const r=this.constructor;s=s||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}W.finalized=!0;
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
const G=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol();class Q{constructor(t,e){if(e!==Y)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(G?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const J=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof Q)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new Q(s,Y)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Z={};class D extends W{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?e(s,t):(t.add(s),t),s),s=e(t,new Set),i=[];s.forEach(t=>i.unshift(t)),this._styles=i}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!G){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new Q(String(e),Y)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?G?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==Z&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return Z}}D.finalized=!0,D.render=(t,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const r=i.scopeName,n=R.has(s),o=q&&11===s.nodeType&&!!s.host,a=o&&!M.has(r),h=a?document.createDocumentFragment():s;if(((t,s,i)=>{let r=R.get(s);void 0===r&&(e(s,s.firstChild),R.set(s,r=new N(Object.assign({templateFactory:O},i))),r.appendInto(s)),r.setValue(t),r.commit()})(t,h,Object.assign({templateFactory:F(r)},i)),a){const t=R.get(h);R.delete(h);const i=t.value instanceof y?t.value.template:void 0;$(r,h,i),e(s,s.firstChild),s.appendChild(h),R.set(s,t)}!n&&o&&window.ShadyCSS.styleElement(s.host)};class K{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((s,i)=>{const r=indexedDB.open(t,1);r.onerror=()=>i(r.error),r.onsuccess=()=>s(r.result),r.onupgradeneeded=()=>{r.result.createObjectStore(e)}})}_withIDBStore(t,e){return this._dbp.then(s=>new Promise((i,r)=>{const n=s.transaction(this.storeName,t);n.oncomplete=()=>i(),n.onabort=n.onerror=()=>r(n.error),e(n.objectStore(this.storeName))}))}}let tt;function et(){return tt||(tt=new K),tt}function st(t,e=et()){let s;return e._withIDBStore("readonly",e=>{s=e.get(t)}).then(()=>s.result)}function it(t,e,s=et()){return s._withIDBStore("readwrite",s=>{s.put(e,t)})}const rt=async({artist:t,album:e})=>{const s=new URLSearchParams;s.set("api_key","956c1818ded606576d6941de5ff793a5"),s.set("artist",t),s.set("format","json"),s.set("autoCorrect","true"),e?(s.set("method","album.getinfo"),s.set("album",e)):s.set("method","artist.getinfo");const i=await fetch("https://ws.audioscrobbler.com/2.0/?"+s);return await i.json()},nt=(t,e)=>e.map(e=>{const{provider:s,key:i}=e;return s(i?t[i]:t)}),ot=[{provider:async({artist:t,album:e})=>{const s=await rt({artist:t,album:e}),{album:{image:i}}=s;return i[i.length-1]["#text"]}}],at=[{provider:async t=>{if(!t)throw Error("Cannot search without a proper mbid");const e=await fetch(`https://webservice.fanart.tv/v3/music/${t}&?api_key=639fca5adcf955a19f9a04f8985e9ded&format=json`);if(200===e.status){const t=await e.json(),{artistbackground:s}=t;if(s)return s[0].url}throw Error("no art found in provider fanart")},key:"mbid"},{provider:async t=>{const e=await fetch("https://www.theaudiodb.com/api/v1/json/1/search.php?s="+encodeURIComponent(t));if(200===e.status){const t=await e.json(),{artists:s}=t;if(s)return s[0].strArtistThumb||s[0].strArtistFanart}throw Error("no art found in provider audiodb")},key:"artist"}];function ht(t){return new Promise((e,s)=>Promise.resolve(t).then(s,e))}function ct(t){return ht(Promise.all([...t].map(ht)))}customElements.define("album-art",class extends D{static get properties(){return{artist:{type:String},album:{type:String},art:{type:String},cache:{type:Boolean},customStore:{type:Object},_cache:{type:Object},objectFit:{type:String}}}static get styles(){return J`
      img {
        width: 100%;
        height: 100%;
      }
      p {
        margin: 0;
      }
    `}constructor(){super(),this.art="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC",this._cache={},this.customStore=new K("album-art-db","album-art-store"),this.objectFit="cover"}render(){return I`
      ${this.album?I`
            <img
              src="${this.art}"
              alt="${this.artist} - ${this.album}"
              style="object-fit: ${this.objectFit}"
              loading="lazy"
            />
          `:I`
            <img
              src="${this.art}"
              alt="${this.artist}"
              style="object-fit: ${this.objectFit}"
              loading="lazy"
            />
          `}
    `}async connectedCallback(){if(super.connectedCallback(),!this.artist)return;const t={artist:this.artist,album:this.album};if(this._cache[`${this.artist}-${this.album}`])return void(this.art=this._cache[`${this.artist}-${this.album}`]);const e=await this.getArt(t);this.cache=!("false"===this.getAttribute("cache")),this.cache&&e?this.art=e:this.updateArt(t)}dispatch(){const t=new CustomEvent("art",{detail:{art:this.art},bubbles:!0,composed:!0});this.dispatchEvent(t)}updated(t){t.forEach(async(t,e)=>{if(this.cache=!("false"===this.getAttribute("cache")),"artist"===e||"album"===e){if(this._cache[`${this.artist}-${this.album}`])return this.art=this._cache[`${this.artist}-${this.album}`],void this.dispatch();{const t={artist:this.artist,album:this.album},e=await this.getArt(t);this.cache&&e?(this.art=e,this.dispatch()):this.updateArt(t)}}})}isEmptyArt(t){const e="https://res.cloudinary.com/jsmusicdb-com/image/fetch/";return t===e||t===e+"null"}async getArt({artist:t,album:e}){return e?await st(`${t}-${e}`,this.customStore):await st(""+t,this.customStore)}async updateArt({artist:t,album:e}){let s="https://res.cloudinary.com/jsmusicdb-com/image/fetch/";if(e){try{s+=await(async({artist:t,album:e})=>{const s={artist:t,album:e};return await ct(nt(s,ot))})({artist:t,album:e}),this.isEmptyArt(s)&&(s=null)}catch(t){s=null}s&&(this._cache[`${t}-${e}`]=s,this.cache&&it(`${t}-${e}`,s,this.customStore)),this.art=s||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADrCAMAAAC/1JHnAAAANlBMVEUAAAB5eXmCgoKKioqSkpKbm5uioqKrq6uzs7O6urrCwsLIyMjPz8/W1tbc3Nzi4uLp6eny8vJV+G/uAAAAAXRSTlMAQObYZgAAAflJREFUeF7swAEJAAAAwjD7pzbHYVsEAAAAAAAAAAAAAAAAAAAAAABwdu6+NUMQigI4vmul2vf/shsUO4xyuRGDK+f8vUE/lKvZ9VGvh9aXQiuttBr3SkRY0/5KaP3P0EorrS3nvOWcy+TWkpxWX7FhbZNaazTqEr9OaM1O3UenNpe1OtWPXmayJvVzbJnFWq1ClHExfcZ/H+llDmtB6dVha9CUxQIbZrCuGNHrElMC5nGTbgVV368u1QMr3JrVGd/2TjZ9Yp1sa9EY1G6aO7FBsrXZk/qw+Q0ndhVsjaAOYXUVa82gDmKdWKs9ANszFX8r0YrlJu4jqUcVM0Kt5nj6tg9lQXmSZ92Op837YI6Vx4q0elSb56CSFYHWhmH91cBGgdYVtWYk+A+BVo/30tFoTGI5Vjx4hWR0Q7GIs9b+FF6cdaF0J3EQZUVV9VdQsap3LFVQuUVZUwfUTOeICT6h1vXCiTh8qherkWzNnVrbGVg3l1UhaRZrvLc2hcSOtXEOszZxzeFegntE7v35Tsd39b+fwfBsjWemPAvnNw5+u+I3SX5rZg/BC70h7PlhLxd79Nh7yZ5a9kqzB553G8burPAuEu+Y8e4grbTSSit/c4G/G0IrrbR+tAMHBAAAAAiC+r+6IcIiAAAAAAAAAAAAAAAAAAAAAAAOUBYM+EbO8tcAAAAASUVORK5CYII="}else{try{s+=await(async t=>{const e=await rt({artist:t}),{artist:{mbid:s}}=e,i={mbid:s,artist:t};return await ct(nt(i,at))})(this.artist),this.isEmptyArt(s)&&(s=null)}catch(t){s=null}s&&(this._cache[`${t}-${e}`]=s,this.cache&&it(""+t,s,this.customStore)),this.art=s||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADrCAAAAACtYT4JAAAAAnRSTlMAAHaTzTgAAAN7SURBVHja7dxBTxNBGMbx/ei7ZSm1ptTQKlCIADWIoJdygIshmugBw4WL4YYcSFRjAhYSAmSUnW2BdndmvfG++/9dTCiXh93Ozrz7xCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+zOR2HYTjVVh+0Wwnv1DQnfRWFD1XVRq2G457rjBqFWTTeyL3sqGE4pfeqVroHp8Zc/fgwE2kNG9tc8da5GTieT9O2dEVt2VTNI3PPzcf0L7CpKqvN9OK3eehgKvn5pKaojSTS9Hczas/uLda0XdbK/lhUc72ubXnqJIGWr8azmpN68pmerLVkCT40WXpJ1gVdz9Z2PzPrYbIWN3R9XTcyo5rTpqqVeC3Jupud9XLh9sNIzaE1ybqfndV0VS1OZcpapnu4TGtTqZ45ZdpL2D3iynUZ9ojp3v+gDHv/oO45061wVpfpWYlmMEH6biN+d2+2NpcOEpuBMiWamQbrebPwONAnZ/CvcOw/PAKMmFAZtZF9C0cv1SXdyPu6anu6Dt9x5FzatxIjJV2IqNbOv3/jpeHztXV3qVfFjVpyuxBPBz9tjuwRqzLDjnUh7p6b04N2xPg5Z2vw93ktKGpWF2LGfpRuBaNu5lm9mX4qbweYtU+wn0U5Y0TTkbWn6Ln2f5N2G2xyLdnfnZe/r190X9Vbc4LuYlcXomL/XXRlNTUxtQl3FyJRN26RlAvrnq8kPFHNbPJbHSF7+vy52e2k25fVVGQsxb4uxD89b9a2iCmxvwsRxt6o6fT/se8U/e8vwpY/q5mQsBL730uFqwWyJrfAEwlfV+f7xrBAVLsSP/JTe4H3yIWyrgpYnIr0A4pk7SrJqmsQSheCLoRgdCHoQohHF4IuhHx0IehCyEcXgi6EbG/oQgjuQvjv33jp0/dLY0z/247kLkSBqM0v9+fhZztVdWGHXYjPNyP74XORXQiH+UEX4jzj/Hokrwvh3x1GOzeZc4mzjqI9hT22Vd7nTX37sroQLsvpVc0fcffntNzF9oi6eOmY5x/XdPwXEiu2C3HifHmxG6m4sPbbuu1+UXMhpQtRYNDU+Ol5K7VXUbAULxTrQvTbCqbEdcfEX14Xws1WHP54s36dkL8SF+1C/BLRhSiQdduf9WJW/KndvjPfU9KFKJJ1X0kXAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQI+/Md3TUNB1jrAAAAAASUVORK5CYII="}this.dispatch(),this.requestUpdate()}});
//# sourceMappingURL=album-art.js.map
