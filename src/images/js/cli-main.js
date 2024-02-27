/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/bundled.css":
/*!*****************************!*\
  !*** ./src/css/bundled.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://tvscientific-theme/./src/css/bundled.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_bundled_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/bundled.css */ \"./src/css/bundled.css\");\n/* harmony import */ var _js_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/_nav */ \"./src/js/_nav.js\");\n/* harmony import */ var _js_nav__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_nav__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n//# sourceURL=webpack://tvscientific-theme/./src/index.js?");

/***/ }),

/***/ "./src/js/_nav.js":
/*!************************!*\
  !*** ./src/js/_nav.js ***!
  \************************/
/***/ (() => {

eval("const mobileNavTrigger = document.getElementById(\"mobile-nav-trigger\");\n\nconst mainNavMenu = document.getElementById(\"main-nav-menu\");\n\nconst menuItems = Array.prototype.slice.call( document.querySelectorAll(\".menu-item\") );\n\nconst mobileNavOpen = document.getElementById(\"mobile-nav-open\") || null;\n\nconst mobileNavClose = document.getElementById(\"mobile-nav-close\") || null;\n\nconst mobileNavDropdownOpen = document.getElementById(\"mobile-nav-dropdown-open\") || null;\n\nif( mobileNavOpen  ) {\n  mobileNavOpen.addEventListener(\"click\", function() {\n    mobileNavClose.classList.remove(\"hidden\");\n    mobileNavOpen.classList.add(\"hidden\");\n    mainNavMenu.classList.add(\"active\");\n    document.body.classList.add(\"mobile-open\");\n  });\n}\n\nif( mobileNavClose ) {\n  mobileNavClose.addEventListener(\"click\", function() {\n    mobileNavClose.classList.add(\"hidden\");\n    mobileNavOpen.classList.remove(\"hidden\");\n    mainNavMenu.classList.remove(\"active\");\n    document.body.classList.remove(\"mobile-open\");\n  });\n}\n\n\nmenuItems.forEach(item => {\n\n  item.addEventListener(\"click\", function(e) {\n    // item.querySelector(\".sub-menu-caret\").classList.toggle(\"rotate-90\");\n    if(item.querySelector(\".child-dropdown\")) {\n    item.querySelector(\".child-dropdown\").classList.add(\"active\");\n    }\n\n    mobileNavDropdownOpen.classList.remove(\"hidden\");\n    mobileNavClose.classList.add(\"hidden\");\n    mobileNavOpen.classList.add(\"hidden\");\n  });\n  \n});\n\nif( mobileNavDropdownOpen ) {\n\n\nmobileNavDropdownOpen.addEventListener(\"click\", function(e) {\n  // e.preventDefault();\n  console.log(\"mobileNavDropdownOpen clicked\");\n \n  menuItems.forEach(item => {\n \n    if(item.querySelector(\".child-dropdown\")) {\n\n      item.querySelector(\".child-dropdown\").classList.remove(\"active\");\n\n    }\n  });\n\n  mobileNavDropdownOpen.classList.add(\"hidden\");\n  mobileNavClose.classList.remove(\"hidden\");\n  mobileNavOpen.classList.add(\"hidden\");\n\n});\n\n}\nfunction getCookie (name) {\n  let value = `; ${document.cookie}`;\n  let parts = value.split(`; ${name}=`);\n  if (parts.length === 2) return parts.pop().split(';').shift();\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", (event) => {\n  document.addEventListener('click', function (event) {\n    if (!event.target.matches('svg')) return;\n    event.preventDefault();\n    document.querySelector('.header-banner').style.display = 'none';\n    document.cookie = 'banner=closed;max-age=${60 * 60 * 24 * 14};';\n\n  }, false);\n  let bannerVis = getCookie('banner');\n  if(bannerVis == 'closed') {\n    document.querySelector('.header-banner').classList.add('hidden');\n  }\n});\n\n\n//# sourceURL=webpack://tvscientific-theme/./src/js/_nav.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;