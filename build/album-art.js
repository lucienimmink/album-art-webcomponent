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
const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null)=>{for(;e!==s;){const s=e.nextSibling;t.removeChild(e),e=s}},r={},n={},o=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${o}--\x3e`,h=new RegExp(`${o}|${a}`),c="$lit$";class l{constructor(t,e){this.parts=[],this.element=e;const s=[],i=[],r=document.createTreeWalker(e.content,133,null,!1);let n=0,a=-1,l=0;const{strings:u,values:{length:A}}=t;for(;l<A;){const t=r.nextNode();if(null!==t){if(a++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:s}=e;let i=0;for(let t=0;t<s;t++)d(e[t].name,c)&&i++;for(;i-- >0;){const e=u[l],s=m.exec(e)[2],i=s.toLowerCase()+c,r=t.getAttribute(i);t.removeAttribute(i);const n=r.split(h);this.parts.push({type:"attribute",index:a,name:s,strings:n}),l+=n.length-1}}"TEMPLATE"===t.tagName&&(i.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(o)>=0){const i=t.parentNode,r=e.split(h),n=r.length-1;for(let e=0;e<n;e++){let s,n=r[e];if(""===n)s=p();else{const t=m.exec(n);null!==t&&d(t[2],c)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-c.length)+t[3]),s=document.createTextNode(n)}i.insertBefore(s,t),this.parts.push({type:"node",index:++a})}""===r[n]?(i.insertBefore(p(),t),s.push(t)):t.data=r[n],l+=n}}else if(8===t.nodeType)if(t.data===o){const e=t.parentNode;null!==t.previousSibling&&a!==n||(a++,e.insertBefore(p(),t)),n=a,this.parts.push({type:"node",index:a}),null===t.nextSibling?t.data="":(s.push(t),a--),l++}else{let e=-1;for(;-1!==(e=t.data.indexOf(o,e+1));)this.parts.push({type:"node",index:-1}),l++}}else r.currentNode=i.pop()}for(const t of s)t.parentNode.removeChild(t)}}const d=(t,e)=>{const s=t.length-e.length;return s>=0&&t.slice(s)===e},u=t=>-1!==t.index,p=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
class A{constructor(t,e,s){this.__parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this.__parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,r=document.createTreeWalker(t,133,null,!1);let n,o=0,a=0,h=r.nextNode();for(;o<i.length;)if(n=i[o],u(n)){for(;a<n.index;)a++,"TEMPLATE"===h.nodeName&&(e.push(h),r.currentNode=h.content),null===(h=r.nextNode())&&(r.currentNode=e.pop(),h=r.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(h.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(h,n.name,n.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}
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
 */class f{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!1;for(let i=0;i<t;i++){const t=this.strings[i],r=t.lastIndexOf("\x3c!--");s=(r>-1||s)&&-1===t.indexOf("--\x3e",r+1);const n=m.exec(t);e+=null===n?t+(s?o:a):t.substr(0,n.index)+n[1]+n[2]+c+n[3]+o}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
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
 */const _=t=>null===t||!("object"==typeof t||"function"==typeof t),g=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class y{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new S(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(_(t)||!g(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class S{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||_(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class v{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(p()),this.endNode=t.appendChild(p())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=p()),t.__insert(this.endNode=p())}insertAfterPart(t){t.__insert(this.startNode=p()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}const t=this.__pendingValue;t!==r&&(_(t)?t!==this.value&&this.__commitText(t):t instanceof f?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):g(t)?this.__commitIterable(t):t===n?(this.value=n,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=s:this.__commitNode(document.createTextNode(s)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof A&&this.value.template===e)this.value.update(t.values);else{const s=new A(e,t.processor,this.options),i=s._clone();s.update(t.values),this.__commitNode(i),this.value=s}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const r of t)void 0===(s=e[i])&&(s=new v(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(r),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class b{constructor(t,e,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=r}}class w extends y{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new x(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class x extends S{}let C=!1;try{const t={get capture(){return C=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class N{constructor(t,e,s){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;e(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=this.__pendingValue,s=this.value,i=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),n=null!=t&&(null==s||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),n&&(this.__options=P(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const P=t=>t&&(C?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
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
 */const V=new class{handleAttributeExpressions(t,e,s,i){const r=e[0];if("."===r){return new w(t,e.slice(1),s).parts}return"@"===r?[new N(t,e.slice(1),i.eventContext)]:"?"===r?[new b(t,e.slice(1),s)]:new y(t,e,s).parts}handleTextExpression(t){return new v(t)}};
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
 */function T(t){let e=E.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(o);return void 0===(s=e.keyString.get(i))&&(s=new l(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const E=new Map,U=new WeakMap;
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
(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.1.1");const O=(t,...e)=>new f(t,e,"html",V),j=133;
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
 */function R(t,e){const{element:{content:s},parts:i}=t,r=document.createTreeWalker(s,j,null,!1);let n=B(i),o=i[n],a=-1,h=0;const c=[];let l=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===l&&(l=null),e.has(t)&&(c.push(t),null===l&&(l=t)),null!==l&&h++;void 0!==o&&o.index===a;)o.index=null!==l?-1:o.index-h,o=i[n=B(i,n)]}c.forEach(t=>t.parentNode.removeChild(t))}const k=t=>{let e=11===t.nodeType?0:1;const s=document.createTreeWalker(t,j,null,!1);for(;s.nextNode();)e++;return e},B=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(u(e))return s}return-1};
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
const q=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),F=!1);const I=t=>e=>{const s=q(e.type,t);let i=E.get(s);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},E.set(s,i));let r=i.stringsArray.get(e.strings);if(void 0!==r)return r;const n=e.strings.join(o);if(void 0===(r=i.keyString.get(n))){const s=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(s,t),r=new l(e,s),i.keyString.set(n,r)}return i.stringsArray.set(e.strings,r),r},z=["html","svg"],M=new Set,X=(t,e,s)=>{M.add(t);const i=s?s.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:n}=r;if(0===n)return void window.ShadyCSS.prepareTemplateStyles(i,t);const o=document.createElement("style");for(let t=0;t<n;t++){const e=r[t];e.parentNode.removeChild(e),o.textContent+=e.textContent}(t=>{z.forEach(e=>{const s=E.get(q(e,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),R(t,s)})})})(t);const a=i.content;s?function(t,e,s=null){const{element:{content:i},parts:r}=t;if(null==s)return void i.appendChild(e);const n=document.createTreeWalker(i,j,null,!1);let o=B(r),a=0,h=-1;for(;n.nextNode();){for(h++,n.currentNode===s&&(a=k(e),s.parentNode.insertBefore(e,s));-1!==o&&r[o].index===h;){if(a>0){for(;-1!==o;)r[o].index+=a,o=B(r,o);return}o=B(r,o)}}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,t);const h=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==h)e.insertBefore(h.cloneNode(!0),e.firstChild);else if(s){a.insertBefore(o,a.firstChild);const t=new Set;t.add(o),R(s,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const W={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},$=(t,e)=>e!==t&&(e==e||t==t),L={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:$},H=Promise.resolve(!0),G=1,Y=4,Q=8,J=16,Z=32,K="finalized";class D extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=H,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,s)=>{const i=this._attributeNameForProperty(s,e);void 0!==i&&(this._attributeToPropertyMap.set(i,s),t.push(i))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=L){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(e){const i=this[t];this[s]=e,this._requestUpdate(t,i)},configurable:!0,enumerable:!0})}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(K)||t.finalize(),this[K]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of e)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=$){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e.type,i=e.converter||W,r="function"==typeof i?i:i.fromAttribute;return r?r(t,s):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const s=e.type,i=e.converter;return(i&&i.toAttribute||W.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=L){const i=this.constructor,r=i._attributeNameForProperty(t,s);if(void 0!==r){const t=i._propertyValueToAttribute(e,s);if(void 0===t)return;this._updateState=this._updateState|Q,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=this._updateState&~Q}}_attributeToProperty(t,e){if(this._updateState&Q)return;const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i)||L;this._updateState=this._updateState|J,this[i]=s._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~J}}_requestUpdate(t,e){let s=!0;if(void 0!==t){const i=this.constructor,r=i._classProperties.get(t)||L;i._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||this._updateState&J||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):s=!1}!this._hasRequestedUpdate&&s&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Y;const s=this._updatePromise;this._updatePromise=new Promise((s,i)=>{t=s,e=i});try{await s}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&Y}get hasUpdated(){return this._updateState&G}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&G||(this._updateState=this._updateState|G,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Y}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}D[K]=!0;
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
const tt="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol();class st{constructor(t,e){if(e!==et)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(tt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const it=(t,...e)=>{const s=e.reduce((e,s,i)=>e+(t=>{if(t instanceof st)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]);return new st(s,et)};
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
(window.litElementVersions||(window.litElementVersions=[])).push("2.2.1");const rt=t=>t.flat?t.flat(1/0):function t(e,s=[]){for(let i=0,r=e.length;i<r;i++){const r=e[i];Array.isArray(r)?t(r,s):s.push(r)}return s}(t);class nt extends D{static finalize(){super.finalize.call(this),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){rt(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?tt?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof f&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}nt.finalized=!0,nt.render=(t,e,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const r=s.scopeName,n=U.has(e),o=F&&11===e.nodeType&&!!e.host,a=o&&!M.has(r),h=a?document.createDocumentFragment():e;if(((t,e,s)=>{let r=U.get(e);void 0===r&&(i(e,e.firstChild),U.set(e,r=new v(Object.assign({templateFactory:T},s))),r.appendInto(e)),r.setValue(t),r.commit()})(t,h,Object.assign({templateFactory:I(r)},s)),a){const t=U.get(h);U.delete(h);const s=t.value instanceof A?t.value.template:void 0;X(r,h,s),i(e,e.firstChild),e.appendChild(h),U.set(e,t)}!n&&o&&window.ShadyCSS.styleElement(e.host)};class ot{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise((s,i)=>{const r=indexedDB.open(t,1);r.onerror=()=>i(r.error),r.onsuccess=()=>s(r.result),r.onupgradeneeded=()=>{r.result.createObjectStore(e)}})}_withIDBStore(t,e){return this._dbp.then(s=>new Promise((i,r)=>{const n=s.transaction(this.storeName,t);n.oncomplete=()=>i(),n.onabort=n.onerror=()=>r(n.error),e(n.objectStore(this.storeName))}))}}let at;function ht(){return at||(at=new ot),at}function ct(t,e=ht()){let s;return e._withIDBStore("readonly",e=>{s=e.get(t)}).then(()=>s.result)}function lt(t,e,s=ht()){return s._withIDBStore("readwrite",s=>{s.put(e,t)})}const dt=async({artist:t,album:e})=>{const s=new URLSearchParams;s.set("api_key","956c1818ded606576d6941de5ff793a5"),s.set("artist",t),s.set("format","json"),s.set("autoCorrect","true"),e?(s.set("method","album.getinfo"),s.set("album",e)):s.set("method","artist.getinfo");const i=await fetch(`https://ws.audioscrobbler.com/2.0/?${s}`);return await i.json()},ut=(t,e)=>e.map(e=>{const{provider:s,key:i}=e;return s(i?t[i]:t)}),pt=[{provider:async({artist:t,album:e})=>{const s=await dt({artist:t,album:e}),{album:{image:i}}=s;return i[i.length-1]["#text"]}}],mt=[{provider:async t=>{if(!t)throw Error("Cannot search without a proper mbid");const e=await fetch(`https://webservice.fanart.tv/v3/music/${t}&?api_key=639fca5adcf955a19f9a04f8985e9ded&format=json`);if(200===e.status){const t=await e.json(),{artistbackground:s}=t;if(s)return s[0].url}throw Error("no art found in provider fanart")},key:"mbid"},{provider:async t=>{const e=await fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(t)}`);if(200===e.status){const t=await e.json(),{artists:s}=t;if(s)return s[0].strArtistThumb||s[0].strArtistFanart}throw Error("no art found in provider audiodb")},key:"artist"}];function At(t){return new Promise((e,s)=>Promise.resolve(t).then(s,e))}function ft(t){return At(Promise.all([...t].map(At)))}const _t=async t=>{const e=await dt({artist:t}),{artist:{mbid:s}}=e,i={mbid:s,artist:t};return await ft(ut(i,mt))},gt=async({artist:t,album:e})=>{const s={artist:t,album:e};return await ft(ut(s,pt))},yt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADrCAMAAAC/1JHnAAAANlBMVEUAAAB5eXmCgoKKioqSkpKbm5uioqKrq6uzs7O6urrCwsLIyMjPz8/W1tbc3Nzi4uLp6eny8vJV+G/uAAAAAXRSTlMAQObYZgAAAflJREFUeF7swAEJAAAAwjD7pzbHYVsEAAAAAAAAAAAAAAAAAAAAAABwdu6+NUMQigI4vmul2vf/shsUO4xyuRGDK+f8vUE/lKvZ9VGvh9aXQiuttBr3SkRY0/5KaP3P0EorrS3nvOWcy+TWkpxWX7FhbZNaazTqEr9OaM1O3UenNpe1OtWPXmayJvVzbJnFWq1ClHExfcZ/H+llDmtB6dVha9CUxQIbZrCuGNHrElMC5nGTbgVV368u1QMr3JrVGd/2TjZ9Yp1sa9EY1G6aO7FBsrXZk/qw+Q0ndhVsjaAOYXUVa82gDmKdWKs9ANszFX8r0YrlJu4jqUcVM0Kt5nj6tg9lQXmSZ92Op837YI6Vx4q0elSb56CSFYHWhmH91cBGgdYVtWYk+A+BVo/30tFoTGI5Vjx4hWR0Q7GIs9b+FF6cdaF0J3EQZUVV9VdQsap3LFVQuUVZUwfUTOeICT6h1vXCiTh8qherkWzNnVrbGVg3l1UhaRZrvLc2hcSOtXEOszZxzeFegntE7v35Tsd39b+fwfBsjWemPAvnNw5+u+I3SX5rZg/BC70h7PlhLxd79Nh7yZ5a9kqzB553G8burPAuEu+Y8e4grbTSSit/c4G/G0IrrbR+tAMHBAAAAAiC+r+6IcIiAAAAAAAAAAAAAAAAAAAAAAAOUBYM+EbO8tcAAAAASUVORK5CYII=",St="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOsAAADrCAAAAACtYT4JAAAAAnRSTlMAAHaTzTgAAAN7SURBVHja7dxBTxNBGMbx/ei7ZSm1ptTQKlCIADWIoJdygIshmugBw4WL4YYcSFRjAhYSAmSUnW2BdndmvfG++/9dTCiXh93Ozrz7xCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+zOR2HYTjVVh+0Wwnv1DQnfRWFD1XVRq2G457rjBqFWTTeyL3sqGE4pfeqVroHp8Zc/fgwE2kNG9tc8da5GTieT9O2dEVt2VTNI3PPzcf0L7CpKqvN9OK3eehgKvn5pKaojSTS9Hczas/uLda0XdbK/lhUc72ubXnqJIGWr8azmpN68pmerLVkCT40WXpJ1gVdz9Z2PzPrYbIWN3R9XTcyo5rTpqqVeC3Jupud9XLh9sNIzaE1ybqfndV0VS1OZcpapnu4TGtTqZ45ZdpL2D3iynUZ9ojp3v+gDHv/oO45061wVpfpWYlmMEH6biN+d2+2NpcOEpuBMiWamQbrebPwONAnZ/CvcOw/PAKMmFAZtZF9C0cv1SXdyPu6anu6Dt9x5FzatxIjJV2IqNbOv3/jpeHztXV3qVfFjVpyuxBPBz9tjuwRqzLDjnUh7p6b04N2xPg5Z2vw93ktKGpWF2LGfpRuBaNu5lm9mX4qbweYtU+wn0U5Y0TTkbWn6Ln2f5N2G2xyLdnfnZe/r190X9Vbc4LuYlcXomL/XXRlNTUxtQl3FyJRN26RlAvrnq8kPFHNbPJbHSF7+vy52e2k25fVVGQsxb4uxD89b9a2iCmxvwsRxt6o6fT/se8U/e8vwpY/q5mQsBL730uFqwWyJrfAEwlfV+f7xrBAVLsSP/JTe4H3yIWyrgpYnIr0A4pk7SrJqmsQSheCLoRgdCHoQohHF4IuhHx0IehCyEcXgi6EbG/oQgjuQvjv33jp0/dLY0z/247kLkSBqM0v9+fhZztVdWGHXYjPNyP74XORXQiH+UEX4jzj/Hokrwvh3x1GOzeZc4mzjqI9hT22Vd7nTX37sroQLsvpVc0fcffntNzF9oi6eOmY5x/XdPwXEiu2C3HifHmxG6m4sPbbuu1+UXMhpQtRYNDU+Ol5K7VXUbAULxTrQvTbCqbEdcfEX14Xws1WHP54s36dkL8SF+1C/BLRhSiQdduf9WJW/KndvjPfU9KFKJJ1X0kXAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQI+/Md3TUNB1jrAAAAAASUVORK5CYII=",vt="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY/j//z8DAAj8Av6IXwbgAAAAAElFTkSuQmCC";customElements.define("album-art",class extends nt{static get properties(){return{artist:{type:String},album:{type:String},art:{type:String},cache:{type:Boolean},customStore:{type:Object},_cache:{type:Object},objectFit:{type:String}}}static get styles(){return it`
      img {
        width: 100%;
        height: 100%;
      }
      p {
        margin: 0;
      }
    `}constructor(){super(),this.art=vt,this._cache={},this.customStore=new ot("album-art-db","album-art-store"),this.objectFit="cover"}render(){return O`
      ${this.album?O`
            <img
              src="${this.art}"
              alt="${this.artist} - ${this.album}"
              style="object-fit: ${this.objectFit}"
              loading="lazy"
            />
          `:O`
            <img
              src="${this.art}"
              alt="${this.artist}"
              style="object-fit: ${this.objectFit}"
              loading="lazy"
            />
          `}
    `}async connectedCallback(){if(super.connectedCallback(),!this.artist)return;const t={artist:this.artist,album:this.album};if(this._cache[`${this.artist}-${this.album}`])return void(this.art=this._cache[`${this.artist}-${this.album}`]);const e=await this.getArt(t);this.cache=!("false"===this.getAttribute("cache")),this.cache&&e?this.art=e:this.updateArt(t)}dispatch(){const t=new CustomEvent("art",{detail:{art:this.art},bubbles:!0,composed:!0});this.dispatchEvent(t)}updated(t){t.forEach(async(t,e)=>{if(this.cache=!("false"===this.getAttribute("cache")),"artist"===e){if(this._cache[`${this.artist}-${this.album}`])return this.art=this._cache[`${this.artist}-${this.album}`],void this.dispatch();{const t={artist:this.artist,album:this.album},e=await this.getArt(t);this.cache&&e?(this.art=e,this.dispatch()):this.updateArt(t)}}})}isEmptyArt(t){const e="https://res.cloudinary.com/jsmusicdb-com/image/fetch/";return t===e||t===`${e}null`}async getArt({artist:t,album:e}){return e?await ct(`${t}-${e}`,this.customStore):await ct(`${t}`,this.customStore)}async updateArt({artist:t,album:e}){let s="https://res.cloudinary.com/jsmusicdb-com/image/fetch/";if(e){try{s+=await gt({artist:t,album:e}),this.isEmptyArt(s)&&(s=null)}catch(t){s=null}s&&(this._cache[`${t}-${e}`]=s,this.cache&&lt(`${t}-${e}`,s,this.customStore)),this.art=s||yt}else{try{s+=await _t(this.artist),this.isEmptyArt(s)&&(s=null)}catch(t){s=null}s&&(this._cache[`${t}-${e}`]=s,this.cache&&lt(`${t}`,s,this.customStore)),this.art=s||St}this.dispatch(),this.requestUpdate()}});
//# sourceMappingURL=album-art.js.map
