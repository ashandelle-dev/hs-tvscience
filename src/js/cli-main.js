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
eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://tvscientific-theme/./src/css/bundled.css?\n}");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_bundled_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/bundled.css */ \"./src/css/bundled.css\");\n/* harmony import */ var _js_nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/_nav */ \"./src/js/_nav.js\");\n/* harmony import */ var _js_nav__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_nav__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\n\n//# sourceURL=webpack://tvscientific-theme/./src/index.js?\n}");

/***/ }),

/***/ "./src/js/_nav.js":
/*!************************!*\
  !*** ./src/js/_nav.js ***!
  \************************/
/***/ (() => {

eval("{const mobileNavTrigger = document.getElementById(\"mobile-nav-trigger\");\r\n\r\nconst mainNavMenu = document.getElementById(\"main-nav-menu\");\r\n\r\nconst menuItems = Array.prototype.slice.call( document.querySelectorAll(\".menu-item\") );\r\n\r\nconst mobileNavOpen = document.getElementById(\"mobile-nav-open\") || null;\r\n\r\nconst mobileNavClose = document.getElementById(\"mobile-nav-close\") || null;\r\n\r\nconst mobileNavDropdownOpen = document.getElementById(\"mobile-nav-dropdown-open\") || null;\r\n\r\nif( mobileNavOpen  ) {\r\n  mobileNavOpen.addEventListener(\"click\", function() {\r\n    mobileNavClose.classList.remove(\"hidden\");\r\n    mobileNavOpen.classList.add(\"hidden\");\r\n    mainNavMenu.classList.add(\"active\");\r\n    document.body.classList.add(\"mobile-open\");\r\n  });\r\n}\r\n\r\nif( mobileNavClose ) {\r\n  mobileNavClose.addEventListener(\"click\", function() {\r\n    mobileNavClose.classList.add(\"hidden\");\r\n    mobileNavOpen.classList.remove(\"hidden\");\r\n    mainNavMenu.classList.remove(\"active\");\r\n    document.body.classList.remove(\"mobile-open\");\r\n  });\r\n}\r\n\r\n\r\nmenuItems.forEach(item => {\r\n\r\n  item.addEventListener(\"click\", function(e) {\r\n    // item.querySelector(\".sub-menu-caret\").classList.toggle(\"rotate-90\");\r\n    if(item.querySelector(\".child-dropdown\")) {\r\n    item.querySelector(\".child-dropdown\").classList.add(\"active\");\r\n    }\r\n\r\n    mobileNavDropdownOpen.classList.remove(\"hidden\");\r\n    mobileNavClose.classList.add(\"hidden\");\r\n    mobileNavOpen.classList.add(\"hidden\");\r\n  });\r\n  \r\n});\r\n\r\nif( mobileNavDropdownOpen ) {\r\n\r\n\r\nmobileNavDropdownOpen.addEventListener(\"click\", function(e) {\r\n  // e.preventDefault();\r\n  console.log(\"mobileNavDropdownOpen clicked\");\r\n \r\n  menuItems.forEach(item => {\r\n \r\n    if(item.querySelector(\".child-dropdown\")) {\r\n\r\n      item.querySelector(\".child-dropdown\").classList.remove(\"active\");\r\n\r\n    }\r\n  });\r\n\r\n  mobileNavDropdownOpen.classList.add(\"hidden\");\r\n  mobileNavClose.classList.remove(\"hidden\");\r\n  mobileNavOpen.classList.add(\"hidden\");\r\n\r\n});\r\n\r\n}\r\nfunction getCookie (name) {\r\n  let value = `; ${document.cookie}`;\r\n  let parts = value.split(`; ${name}=`);\r\n  if (parts.length === 2) return parts.pop().split(';').shift();\r\n}\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", (event) => {\r\n  document.addEventListener('click', function (event) {\r\n    if (!event.target.matches('svg')) return;\r\n    event.preventDefault();\r\n    document.querySelector('.header-banner').style.display = 'none';\r\n    document.cookie = 'banner=closed;max-age=${60 * 60 * 24 * 14};';\r\n\r\n  }, false);\r\n  let bannerVis = getCookie('banner');\r\n  if(bannerVis == 'closed') {\r\n    document.querySelector('.header-banner').classList.add('hidden');\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://tvscientific-theme/./src/js/_nav.js?\n}");

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