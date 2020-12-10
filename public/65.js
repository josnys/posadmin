(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[65],{

/***/ "./resources/js/Pages/Components/StoreFront.js":
/*!*****************************************************!*\
  !*** ./resources/js/Pages/Components/StoreFront.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils */ "./resources/js/utils.js");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var data = _ref.data,
      props = _objectWithoutProperties(_ref, ["data"]);

  var auth = Object(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__["usePage"])().props.auth;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "md:flex shadow-lg max-w-lg md:max-w-2xl h-32 mt-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6",
    src: data.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full md:w-2/3 px-4 py-4 bg-white rounded-r-lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-xl text-gray-700 font-medium mr-auto"
  }, data.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "text-gray-600 font-semibold tracking-tighter"
  }, data.code, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
    className: "text-gray-500 text-sm italic"
  }, data.type))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "text-sm text-gray-700 mt-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-end mt-4 top-auto"
  }, Object(_utils__WEBPACK_IMPORTED_MODULE_2__["can"])(auth.user, 'read-store') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__["InertiaLink"], {
    href: route('store.show', data.id),
    className: "ml-auto bg-blue-600 text-gray-200 px-2 py-2 rounded-md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Icon, {
    name: 'eye',
    className: 'fill-current w-5 h-5 mr-2'
  }), "View"))));
});

/***/ }),

/***/ "./resources/js/utils.js":
/*!*******************************!*\
  !*** ./resources/js/utils.js ***!
  \*******************************/
/*! exports provided: filesize, toFormData, createSlug, isPar, can, dateTimeFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filesize", function() { return filesize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toFormData", function() { return toFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSlug", function() { return createSlug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPar", function() { return isPar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "can", function() { return can; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateTimeFormat", function() { return dateTimeFormat; });
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns/format */ "./node_modules/date-fns/esm/format/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function filesize(size) {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
} // Transforms key/value pairs to FormData() object

function toFormData() {
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';
  var formData = new FormData();

  for (var _i = 0, _Object$keys = Object.keys(values); _i < _Object$keys.length; _i++) {
    var field = _Object$keys[_i];

    if (values[field] == 'true') {
      formData.append(field, 1);
    } else if (values[field] == 'false') {
      formData.append(field, 0);
    } else {
      formData.append(field, values[field]);
    }
  } // NOTE: When working with Laravel PUT/PATCH requests and FormData
  // you SHOULD send POST request and fake the PUT request like this.
  // More info: http://stackoverflow.com/q/50691938


  if (method.toUpperCase() === 'PUT') {
    formData.append('_method', 'PUT');
  }

  console.log('formData', formData);
  return formData;
}
function createSlug(string) {
  var _diactricMap;

  if (string.length == 0) {
    return "";
  }

  string = string.replace(' ', '-');
  var diactricMap = (_diactricMap = {
    "á": "a",
    "à": "a",
    "ä": "a",
    "â": "a",
    "Á": "A",
    "À": "A",
    "Â": "A",
    "Ä": "A",
    "é": "e",
    "è": "e",
    "ë": "e",
    "ê": "e",
    "É": "E",
    "È": "E",
    "Ê": "E",
    "Ë": "E",
    "í": "i",
    "ì": "i",
    "ï": "i",
    "î": "i",
    "Í": "I",
    "Ì": "I",
    "Ï": "I",
    "Î": "I",
    "ö": "o",
    "ó": "o",
    "ò": "o",
    "ő": "o",
    "ô": "o"
  }, _defineProperty(_diactricMap, "\xF6", "o"), _defineProperty(_diactricMap, "Ö", "O"), _defineProperty(_diactricMap, "Ó", "O"), _defineProperty(_diactricMap, "Ő", "O"), _defineProperty(_diactricMap, "Ô", "O"), _defineProperty(_diactricMap, "\xD6", "O"), _defineProperty(_diactricMap, "ü", "u"), _defineProperty(_diactricMap, "ú", "u"), _defineProperty(_diactricMap, "ù", "u"), _defineProperty(_diactricMap, "ű", "u"), _defineProperty(_diactricMap, "\xFC", "u"), _defineProperty(_diactricMap, "û", "u"), _defineProperty(_diactricMap, "Ü", "U"), _defineProperty(_diactricMap, "Ú", "U"), _defineProperty(_diactricMap, "Ù", "U"), _defineProperty(_diactricMap, "Ű", "U"), _defineProperty(_diactricMap, "Û", "U"), _defineProperty(_diactricMap, "ç", "c"), _defineProperty(_diactricMap, "Ç", "C"), _defineProperty(_diactricMap, "'", ""), _defineProperty(_diactricMap, "’", ""), _defineProperty(_diactricMap, " ", "-"), _defineProperty(_diactricMap, ".", "-"), _diactricMap);
  var diactrics = Object.keys(diactricMap);

  for (var diactricIndex = 0; diactricIndex < diactrics.length; diactricIndex++) {
    var from = diactrics[diactricIndex];
    var to = diactricMap[from];
    string = string.replace(from, to);
  }

  return string.toLowerCase().replace(/[^a-z0-9_-]/gi, '');
}
function isPar(a) {
  var b = a % 2;

  if (b == 0) {
    return true;
  } else {
    return false;
  }
}
function can(user, permission) {
  if (user.can.indexOf(permission) > -1) {
    return true;
  }

  return false;
}
function dateTimeFormat(date) {
  return Object(date_fns_format__WEBPACK_IMPORTED_MODULE_0__["default"])(new Date(date), 'dd MMM yyyy, hh:ii aa');
}

/***/ })

}]);