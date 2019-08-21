/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/demo/Main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/autobind-decorator/lib/esm/index.js":
/*!***********************************************************!*\
  !*** ../node_modules/autobind-decorator/lib/esm/index.js ***!
  \***********************************************************/
/*! exports provided: boundMethod, boundClass, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boundMethod\", function() { return boundMethod; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boundClass\", function() { return boundClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return autobind; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/**\n * Return a descriptor removing the value and returning a getter\n * The getter will return a .bind version of the function\n * and memoize the result against a symbol on the instance\n */\nfunction boundMethod(target, key, descriptor) {\n  var fn = descriptor.value;\n\n  if (typeof fn !== 'function') {\n    throw new TypeError(\"@boundMethod decorator can only be applied to methods not: \".concat(_typeof(fn)));\n  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the\n  // getter for the property which is being replaced. This causes infinite\n  // recursion and an \"Out of stack space\" error.\n\n\n  var definingProperty = false;\n  return {\n    configurable: true,\n    get: function get() {\n      // eslint-disable-next-line no-prototype-builtins\n      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {\n        return fn;\n      }\n\n      var boundFn = fn.bind(this);\n      definingProperty = true;\n      Object.defineProperty(this, key, {\n        configurable: true,\n        get: function get() {\n          return boundFn;\n        },\n        set: function set(value) {\n          fn = value;\n          delete this[key];\n        }\n      });\n      definingProperty = false;\n      return boundFn;\n    },\n    set: function set(value) {\n      fn = value;\n    }\n  };\n}\n/**\n * Use boundMethod to bind all methods on the target.prototype\n */\n\nfunction boundClass(target) {\n  // (Using reflect to get all keys including symbols)\n  var keys; // Use Reflect if exists\n\n  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {\n    keys = Reflect.ownKeys(target.prototype);\n  } else {\n    keys = Object.getOwnPropertyNames(target.prototype); // Use symbols if support is provided\n\n    if (typeof Object.getOwnPropertySymbols === 'function') {\n      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));\n    }\n  }\n\n  keys.forEach(function (key) {\n    // Ignore special case target method\n    if (key === 'constructor') {\n      return;\n    }\n\n    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding\n\n    if (typeof descriptor.value === 'function') {\n      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));\n    }\n  });\n  return target;\n}\nfunction autobind() {\n  if (arguments.length === 1) {\n    return boundClass.apply(void 0, arguments);\n  }\n\n  return boundMethod.apply(void 0, arguments);\n}\n\n//# sourceURL=webpack:///../node_modules/autobind-decorator/lib/esm/index.js?");

/***/ }),

/***/ "../node_modules/debounce/index.js":
/*!*****************************************!*\
  !*** ../node_modules/debounce/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Returns a function, that, as long as it continues to be invoked, will not\n * be triggered. The function will be called after it stops being called for\n * N milliseconds. If `immediate` is passed, trigger the function on the\n * leading edge, instead of the trailing. The function also has a property 'clear' \n * that is a function which will clear the timer to prevent previously scheduled executions. \n *\n * @source underscore.js\n * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/\n * @param {Function} function to wrap\n * @param {Number} timeout in ms (`100`)\n * @param {Boolean} whether to execute at the beginning (`false`)\n * @api public\n */\nfunction debounce(func, wait, immediate){\n  var timeout, args, context, timestamp, result;\n  if (null == wait) wait = 100;\n\n  function later() {\n    var last = Date.now() - timestamp;\n\n    if (last < wait && last >= 0) {\n      timeout = setTimeout(later, wait - last);\n    } else {\n      timeout = null;\n      if (!immediate) {\n        result = func.apply(context, args);\n        context = args = null;\n      }\n    }\n  };\n\n  var debounced = function(){\n    context = this;\n    args = arguments;\n    timestamp = Date.now();\n    var callNow = immediate && !timeout;\n    if (!timeout) timeout = setTimeout(later, wait);\n    if (callNow) {\n      result = func.apply(context, args);\n      context = args = null;\n    }\n\n    return result;\n  };\n\n  debounced.clear = function() {\n    if (timeout) {\n      clearTimeout(timeout);\n      timeout = null;\n    }\n  };\n  \n  debounced.flush = function() {\n    if (timeout) {\n      result = func.apply(context, args);\n      context = args = null;\n      \n      clearTimeout(timeout);\n      timeout = null;\n    }\n  };\n\n  return debounced;\n};\n\n// Adds compatibility for ES modules\ndebounce.debounce = debounce;\n\nmodule.exports = debounce;\n\n\n//# sourceURL=webpack:///../node_modules/debounce/index.js?");

/***/ }),

/***/ "../node_modules/detect-passive-events/lib/index.js":
/*!**********************************************************!*\
  !*** ../node_modules/detect-passive-events/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// adapted from https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md\nvar detectPassiveEvents = {\n  update: function update() {\n    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {\n      var passive = false;\n      var options = Object.defineProperty({}, 'passive', {\n        get: function get() {\n          passive = true;\n        }\n      });\n      // note: have to set and remove a no-op listener instead of null\n      // (which was used previously), becasue Edge v15 throws an error\n      // when providing a null callback.\n      // https://github.com/rafrex/detect-passive-events/pull/3\n      var noop = function noop() {};\n      window.addEventListener('testPassiveEventSupport', noop, options);\n      window.removeEventListener('testPassiveEventSupport', noop, options);\n      detectPassiveEvents.hasSupport = passive;\n    }\n  }\n};\n\ndetectPassiveEvents.update();\nexports.default = detectPassiveEvents;\n\n//# sourceURL=webpack:///../node_modules/detect-passive-events/lib/index.js?");

/***/ }),

/***/ "../node_modules/fontfaceobserver/fontfaceobserver.standalone.js":
/*!***********************************************************************!*\
  !*** ../node_modules/fontfaceobserver/fontfaceobserver.standalone.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* Font Face Observer v2.1.0 - © Bram Stein. License: BSD-3-Clause */(function(){function l(a,b){document.addEventListener?a.addEventListener(\"scroll\",b,!1):a.attachEvent(\"scroll\",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener(\"DOMContentLoaded\",function c(){document.removeEventListener(\"DOMContentLoaded\",c);a()}):document.attachEvent(\"onreadystatechange\",function k(){if(\"interactive\"==document.readyState||\"complete\"==document.readyState)document.detachEvent(\"onreadystatechange\",k),a()})};function t(a){this.a=document.createElement(\"div\");this.a.setAttribute(\"aria-hidden\",\"true\");this.a.appendChild(document.createTextNode(a));this.b=document.createElement(\"span\");this.c=document.createElement(\"span\");this.h=document.createElement(\"span\");this.f=document.createElement(\"span\");this.g=-1;this.b.style.cssText=\"max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;\";this.c.style.cssText=\"max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;\";\nthis.f.style.cssText=\"max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;\";this.h.style.cssText=\"display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;\";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}\nfunction u(a,b){a.a.style.cssText=\"max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:\"+b+\";\"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+\"px\";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||\"normal\";this.weight=c.weight||\"normal\";this.stretch=c.stretch||\"normal\"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\\/([0-9]+)(?:\\.([0-9]+))(?:\\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}\nfunction K(){if(null===E){var a=document.createElement(\"div\");try{a.style.font=\"condensed 100px sans-serif\"}catch(b){}E=\"\"!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:\"\",\"100px\",b].join(\" \")}\nB.prototype.load=function(a,b){var c=this,k=a||\"BESbswy\",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(\"\"+n+\"ms timeout exceeded\")):document.fonts.load(L(c,'\"'+c.family+'\"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(\"\"+n+\"ms timeout exceeded\"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},\nb)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\\/([0-9]+)(?:\\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(\"\"+\nn+\"ms timeout exceeded\"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement(\"div\");d.dir=\"ltr\";u(e,L(c,\"sans-serif\"));u(p,L(c,\"serif\"));u(q,L(c,\"monospace\"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,\nL(c,'\"'+c.family+'\",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'\"'+c.family+'\",serif'));A(q,function(a){h=a;v()});u(q,L(c,'\"'+c.family+'\",monospace'))})})}; true?module.exports=B:(undefined);}());\n\n\n//# sourceURL=webpack:///../node_modules/fontfaceobserver/fontfaceobserver.standalone.js?");

/***/ }),

/***/ "../src/demo/Main.js":
/*!***************************!*\
  !*** ../src/demo/Main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(autobind) {/* harmony import */ var lib_SmoothScroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib/SmoothScroll */ \"../src/lib/SmoothScroll.js\");\n/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! debounce */ \"../node_modules/debounce/index.js\");\n/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fontfaceobserver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fontfaceobserver */ \"../node_modules/fontfaceobserver/fontfaceobserver.standalone.js\");\n/* harmony import */ var fontfaceobserver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fontfaceobserver__WEBPACK_IMPORTED_MODULE_2__);\nvar _class;\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\n\n\n\nlet Main = (_class = class Main {\n  constructor() {\n    document.addEventListener(\"DOMContentLoaded\", this._onDomContentLoaded);\n  }\n\n  _onDomContentLoaded() {\n    document.removeEventListener(\"DOMContentLoaded\", this._onDomContentLoaded);\n    this._smoothScroll = new lib_SmoothScroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.querySelector('.scrollable'));\n    window.addEventListener(\"resize\", Object(debounce__WEBPACK_IMPORTED_MODULE_1__[\"debounce\"])(this._onResize, 100));\n    Promise.all([new fontfaceobserver__WEBPACK_IMPORTED_MODULE_2___default.a('Playfair Display').load(), new fontfaceobserver__WEBPACK_IMPORTED_MODULE_2___default.a('Source Sans Pro').load()]).then(() => {\n      if (this._smoothScroll) this._smoothScroll.resize();\n    });\n\n    this._update();\n  }\n\n  _update() {\n    if (this._smoothScroll) this._smoothScroll.update();\n    window.requestAnimationFrame(this._update);\n  } //-----------------------------------------------------o handlers\n\n\n  _onResize() {\n    if (this._smoothScroll) this._smoothScroll.resize();\n  }\n\n}, (_applyDecoratedDescriptor(_class.prototype, \"_onDomContentLoaded\", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, \"_onDomContentLoaded\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"_update\", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, \"_update\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"_onResize\", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, \"_onResize\"), _class.prototype)), _class);\nnew Main();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! autobind-decorator */ \"../node_modules/autobind-decorator/lib/esm/index.js\")[\"default\"]))\n\n//# sourceURL=webpack:///../src/demo/Main.js?");

/***/ }),

/***/ "../src/lib/SmoothScroll.js":
/*!**********************************!*\
  !*** ../src/lib/SmoothScroll.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(autobind) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SmoothScroll; });\n/* harmony import */ var detect_passive_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! detect-passive-events */ \"../node_modules/detect-passive-events/lib/index.js\");\n/* harmony import */ var detect_passive_events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(detect_passive_events__WEBPACK_IMPORTED_MODULE_0__);\nvar _class;\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\n\n/**\n * Smooth scroll\n * @author Léo Chéron\n */\n\nlet SmoothScroll = (_class = class SmoothScroll {\n  constructor(dom, options = {}) {\n    this.dom = dom;\n    this.options = options; // physics\n\n    this.vy = 0;\n    this.percent = 0;\n    this.x = 0;\n    this.y = this._y = 0;\n    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;\n    this._easing = isFirefox ? 0.35 : 0.13;\n    this._frictionTouchRelease = 0.95;\n    this._ratio = this.options.ratio || 1;\n    this._firstScroll = true;\n    this._enabled = true;\n    this._deltaArray = [0, 0, 0];\n    this._isStopped = true;\n\n    this._scrollify();\n  }\n\n  resize(boundingHeight) {\n    this.height = this.dom.getBoundingClientRect().height;\n    this.boundingHeight = boundingHeight || window.innerHeight;\n    this.update(true);\n  }\n\n  update(now = false) {\n    if (this.enabled) {\n      if (!this._dragging && (now || this._mode == 'touch' || this._mode == 'trackpad')) {\n        this.y = this._y;\n        this.vy = 0;\n      } else {\n        this.y += (this._y - this.y) * this._easing;\n        this.vy = this._y - this.y;\n      }\n    }\n\n    this.percent = this.y / (this.height - this.boundingHeight);\n    if (!this.preventDomUpdate || now) this._updateDom();\n  }\n\n  destroy() {\n    if (this._dummy) this._dummy.parentNode.removeChild(this._dummy);\n    window.removeEventListener('scroll', this._onScroll);\n    this.dom.removeEventListener(this._wheelEvent, this._onMouseWheel);\n  }\n\n  reset() {\n    this._y = 0;\n    this.update(true);\n  } //-----------------------------------------------------o getters & setters\n\n\n  set enabled(value) {\n    this._enabled = value;\n\n    if (!value) {\n      if (this._dummy) this._dummy.style.display = \"none\"; // this.dom.style.willChange = '';\n    } else {\n      // this.dom.style.willChange = \"transform\";\n      if (this._dummy) this._dummy.style.display = '';\n      window.scrollTo(0, this.y);\n      this.resize();\n    }\n  }\n\n  get enabled() {\n    return this._enabled;\n  }\n\n  set height(value) {\n    this._height = value;\n    if (this._dummy) this._dummy.style.height = this._height + \"px\";\n  }\n\n  get height() {\n    return this._height;\n  } //-----------------------------------------------------o private\n\n\n  _updateDom() {\n    const y = ((this.y + 0.01) * 100 | 0) / 100; // rounding values\n\n    if (y !== this._oy) {\n      let translate = \"translate3d(\" + this.x + \"px,\" + -y + \"px,0)\";\n      this.dom.style.transform = translate;\n    }\n\n    this._oy = this.y;\n  }\n\n  _scrollify() {\n    // update dom to make things work\n    this.dom.style.position = \"fixed\"; // this.dom.style.willChange = \"transform\";\n\n    this._dummy = document.createElement(\"div\");\n    this._dummy.style.position = \"absolute\";\n    this._dummy.style.top = 0;\n    this._dummy.style.left = 0;\n    this._dummy.style.width = \"1px\";\n    this._dummy.style.visibility = \"hidden\";\n    this.dom.parentNode.appendChild(this._dummy); // events\n\n    const passive = detect_passive_events__WEBPACK_IMPORTED_MODULE_0___default.a.hasSupport ? {\n      passive: true\n    } : false;\n    window.addEventListener('scroll', this._onScroll, passive);\n    this._wheelEvent = \"onwheel\" in document.createElement(\"div\") ? \"wheel\" : // Modern browsers support \"wheel\"\n    document.onmousewheel !== undefined ? \"mousewheel\" : // Webkit and IE support at least \"mousewheel\"\n    \"DOMMouseScroll\"; // let's assume that remaining browsers are older Firefox\n\n    this.dom.addEventListener(this._wheelEvent, this._onMouseWheel, passive);\n    this.dom.addEventListener('touchstart', this._onTouchStart, passive);\n  }\n\n  _analyzeArray(deltaY) {\n    const deltaArray0Abs = Math.abs(this._deltaArray[0]),\n          deltaArray1Abs = Math.abs(this._deltaArray[1]),\n          deltaArray2Abs = Math.abs(this._deltaArray[2]),\n          deltaAbs = Math.abs(deltaY);\n\n    if (deltaAbs > deltaArray2Abs && deltaArray2Abs > deltaArray1Abs && deltaArray1Abs > deltaArray0Abs) {\n      this._wheelAcceleration = true;\n    } else if (deltaAbs < deltaArray2Abs && deltaArray2Abs <= deltaArray1Abs) {\n      this._wheelAcceleration = false;\n      this._mode = 'trackpad';\n    }\n\n    this._deltaArray.shift();\n\n    this._deltaArray.push(deltaY);\n  } //-----------------------------------------------------o handlers\n\n\n  _onMouseWheel(e) {\n    if (!this._mode || this._mode == 'touch') this._mode = 'mouse';\n    this._dragging = false;\n    const deltaY = event.wheelDelta && !event.deltaY ? -event.wheelDelta : event.deltaY;\n    clearTimeout(this._timer);\n    this._timer = setTimeout(() => {\n      this._deltaArray = [0, 0, 0];\n      this._isStopped = true;\n    }, 150);\n\n    if (this._isStopped) {\n      this._isStopped = false;\n      if (this._wheelAcceleration) this._mode = 'mouse';\n      this._wheelAcceleration = true;\n    }\n\n    this._analyzeArray(deltaY);\n  }\n\n  _onTouchStart(e) {\n    this._dragging = false;\n    this._mode = \"touch\";\n  }\n\n  _onScroll(e) {\n    // user is dragging the scroll thumb\n    if (this._isStopped) this._dragging = true;\n\n    if (this.enabled) {\n      this._y = this.thumb ? Math.round(this.thumb.percent * (this.height - this.boundingHeight)) : window.scrollY || window.pageYOffset;\n\n      if (this._firstScroll) {\n        this.y = this._oy = this._y;\n        this.update(true);\n        this._firstScroll = false;\n      }\n    }\n  }\n\n}, (_applyDecoratedDescriptor(_class.prototype, \"_onMouseWheel\", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, \"_onMouseWheel\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"_onTouchStart\", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, \"_onTouchStart\"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, \"_onScroll\", [autobind], Object.getOwnPropertyDescriptor(_class.prototype, \"_onScroll\"), _class.prototype)), _class);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! autobind-decorator */ \"../node_modules/autobind-decorator/lib/esm/index.js\")[\"default\"]))\n\n//# sourceURL=webpack:///../src/lib/SmoothScroll.js?");

/***/ })

/******/ });