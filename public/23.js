(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./resources/js/Pages/Admin/User/Edit.js":
/*!***********************************************!*\
  !*** ./resources/js/Pages/Admin/User/Edit.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Shared_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Shared/Layout */ "./resources/js/Shared/Layout.js");
/* harmony import */ var _Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Shared/TextInput */ "./resources/js/Shared/TextInput.js");
/* harmony import */ var _Shared_SelectInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Shared/SelectInput */ "./resources/js/Shared/SelectInput.js");
/* harmony import */ var _Shared_FileInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Shared/FileInput */ "./resources/js/Shared/FileInput.js");
/* harmony import */ var _Shared_ProfileCard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../Shared/ProfileCard */ "./resources/js/Shared/ProfileCard.js");
/* harmony import */ var _Shared_DataCard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../Shared/DataCard */ "./resources/js/Shared/DataCard.js");
/* harmony import */ var _Shared_LoadingButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../Shared/LoadingButton */ "./resources/js/Shared/LoadingButton.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }













var Edit = function Edit() {
  var _usePage = Object(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__["usePage"])(),
      auth = _usePage.auth,
      errors = _usePage.errors,
      data = _usePage.data;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      sending = _useState2[0],
      setSending = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    fname: data.fname || '',
    lname: data.lname || '',
    code: data.code || '',
    dob: data.dob || '',
    sex: data.sex || '',
    identification: data.identification || '',
    identificationType: data.identificationType || '',
    address: data.address || '',
    phone: data.phone || '',
    username: data.username || '',
    email: data.email || '',
    avatar: data.avatar
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      values = _useState4[0],
      setValues = _useState4[1];

  function handleChange(e) {
    var key = e.target.name;
    var value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, _defineProperty({}, key, value));
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__["Inertia"].post(route('user.update', data.id), values).then(function () {
      setSending(false);
    });
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    key: "uprofile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "Edit")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_ProfileCard__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "md:col-span-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-4 sm:px-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-lg font-medium text-gray-900"
  }, "Edit User"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "mt-1 text-sm text-gray-600"
  }, "Edit user's personal informations"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_DataCard__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "px-4 py-5 sm:p-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-6 gap-6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-span-6 sm:col-span-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "First Name",
    name: "fname",
    type: "text",
    disable: false,
    readonly: false,
    must: true,
    errors: errors.fname,
    value: values.fname,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Last Name",
    name: "lname",
    type: "text",
    disable: false,
    readonly: false,
    must: true,
    errors: errors.lname,
    value: values.lname,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Code",
    name: "code",
    type: "text",
    disable: true,
    readonly: true,
    must: false,
    errors: errors.code,
    value: values.code,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Date of Birth",
    name: "dob",
    type: "date",
    disable: false,
    readonly: false,
    must: true,
    errors: errors.dob,
    value: values.dob,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_SelectInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Sex",
    name: "sex",
    must: true,
    errors: errors.sex,
    value: values.sex,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ''
  }, "Choose Sex"), data.sexes.map(function (_ref, i) {
    var code = _ref.code,
        name = _ref.name;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: code,
      value: code
    }, name);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_SelectInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Identity Type",
    name: "identificationType",
    must: true,
    errors: errors.identificationType,
    value: values.identificationType,
    onChange: handleChange
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ''
  }, "Choose Identity Type"), data.identityType.map(function (_ref2, i) {
    var code = _ref2.code,
        name = _ref2.name;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: code,
      value: code
    }, name);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Identity Number",
    name: "identification",
    type: "text",
    disable: false,
    readonly: false,
    must: true,
    errors: errors.identification,
    value: values.identification,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Userame",
    name: "username",
    type: "text",
    disable: true,
    readonly: true,
    errors: errors.username,
    value: values.username,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Email",
    name: "email",
    type: "email",
    disable: true,
    readonly: true,
    errors: errors.email,
    value: values.email,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Phone Number",
    name: "phone",
    type: "text",
    disable: false,
    readonly: false,
    must: true,
    errors: errors.phone,
    value: values.phone,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "form-input rounded-md shadow-sm mt-4 block w-full",
    label: "Address",
    name: "address",
    type: "text",
    disable: false,
    readonly: false,
    must: true,
    errors: errors.address,
    value: values.address,
    onChange: handleChange
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center justify-end px-4 py-3 bg-gray-100 text-right sm:px-6 rounded-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_LoadingButton__WEBPACK_IMPORTED_MODULE_10__["default"], {
    type: "submit",
    loading: sending,
    className: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150 ml-4"
  }, "Update"))))));
}; // Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts


Edit.layout = function (page) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_Layout__WEBPACK_IMPORTED_MODULE_4__["default"], {
    children: page,
    header: 'Edit User'
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ })

}]);