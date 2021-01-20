(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[79],{

/***/ "./resources/js/Pages/Dashboard/Sale/Create.js":
/*!*****************************************************!*\
  !*** ./resources/js/Pages/Dashboard/Sale/Create.js ***!
  \*****************************************************/
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
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Shared_POSLayout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Shared/POSLayout */ "./resources/js/Shared/POSLayout.js");
/* harmony import */ var _Shared_TextInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Shared/TextInput */ "./resources/js/Shared/TextInput.js");
/* harmony import */ var _Shared_Icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Shared/Icon */ "./resources/js/Shared/Icon.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_8__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var Create = function Create() {
  var _usePage$props = Object(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_3__["usePage"])().props,
      app = _usePage$props.app,
      auth = _usePage$props.auth,
      data = _usePage$props.data,
      errors = _usePage$props.errors;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      searching = _useState2[0],
      setSearching = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      sending = _useState4[0],
      setSending = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    type: 'Sale',
    customer: data.customer.id,
    customerData: data.customer,
    amount: 0,
    discountTotal: 0,
    discount: data.customer.discount || 0,
    tax: 0,
    delivery: 0,
    total: 0,
    items: [],
    searchInputName: 'searchProduct',
    searchProduct: '',
    searchCustomer: '',
    prevSearch: '',
    results: [],
    searchProductResults: [],
    searchCustomerResults: [],
    showPanel: false,
    showNumPad: false,
    numPad: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    message: null,
    showPayPanel: false,
    isSearchCustomer: false,
    paymethods: data.paymethods,
    payments: [],
    paid: 0,
    due: 0,
    change: 0
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      values = _useState6[0],
      setValues = _useState6[1];

  var iconClasses = classnames__WEBPACK_IMPORTED_MODULE_4___default()('w-5 h-5 mx-auto', {
    'text-gray-800 fill-current': false,
    'text-gray-800 hover:text-gray-800 fill-current': true
  });
  var iconClassesBtn = classnames__WEBPACK_IMPORTED_MODULE_4___default()('w-6 h-6 mx-auto', {
    'text-gray-200 fill-current': false,
    'text-gray-200 hover:text-gray-200 fill-current': true
  });

  function handleChange(e) {
    var key = e.target.name;
    var value = e.target.value;
    setValues(function (values) {
      var _objectSpread2;

      return _objectSpread(_objectSpread({}, values), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, key, value), _defineProperty(_objectSpread2, "message", null), _objectSpread2));
    });
  }

  function handleSearchProduct(e) {
    e.preventDefault();

    if (values.searchProduct == '') {
      setValues(function (values) {
        return _objectSpread(_objectSpread({}, values), {}, {
          message: 'Search can not be empty.'
        });
      });
    } else {
      setSearching(true);
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.post(route('sell.search.product', data.store.id), {
        search: values.searchProduct
      }).then(function (response) {
        setSearching(false);
        var prevSearch = values.searchProduct;
        setValues(function (values) {
          return _objectSpread(_objectSpread({}, values), {}, {
            searchProduct: response.data.data.length == 0 ? prevSearch : '',
            prevSearch: prevSearch,
            searchProductResults: response.data.data,
            showPanel: response.data.data.length > 0 ? true : false,
            message: response.data.message
          });
        });
      })["catch"](function (error) {
        console.log(error.response);
        setValues(function (values) {
          return _objectSpread(_objectSpread({}, values), {}, {
            errors: error.response.data.errors
          });
        });
        setSending(false);
        setSearching(false);
      });
    }
  }

  function handleSearchCustomer(e) {
    e.preventDefault();

    if (values.searchCustomer == '') {
      setValues(function (values) {
        return _objectSpread(_objectSpread({}, values), {}, {
          message: 'Search can not be empty.'
        });
      });
    } else {
      setSearching(true);
      axios__WEBPACK_IMPORTED_MODULE_8___default.a.post(route('sell.search.customer', data.store.id), {
        search: values.searchCustomer
      }).then(function (response) {
        setSearching(false);
        var prevSearch = values.searchCustomer;
        setValues(function (values) {
          return _objectSpread(_objectSpread({}, values), {}, {
            searchCustomer: response.data.data.length == 0 ? prevSearch : '',
            prevSearch: prevSearch,
            searchCustomerResults: response.data.data,
            showPanel: response.data.data.length > 0 ? true : false,
            message: response.data.message
          });
        });
      })["catch"](function (error) {
        console.log(error.response);
        setValues(function (values) {
          return _objectSpread(_objectSpread({}, values), {}, {
            errors: error.response.data.errors
          });
        });
        setSending(false);
        setSearching(false);
      });
    }
  }

  function changeCustomer(e) {
    e.preventDefault();
    var toggle = !values.isSearchCustomer;
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, {
        isSearchCustomer: toggle
      });
    });
  }

  function addToList(product) {
    var items = values.items;
    var amount = values.amount;
    var total = values.total;
    amount += (product.price - product.discount) * product.quantity;
    var discountTotal = amount * values.discount / 100;
    total = amount - discountTotal + values.tax + values.delivery;
    items.push(product);
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, {
        amount: amount,
        discountTotal: discountTotal,
        total: total,
        items: items,
        searchProductResults: [],
        showPanel: false,
        message: null
      });
    });
  }

  function choseCustomer(customer) {
    var amount = values.amount;
    var discountTotal = amount * customer.discount / 100;
    var total = amount - discountTotal + values.tax + values.delivery;
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, {
        amount: amount,
        discountTotal: discountTotal,
        discount: customer.discount,
        total: total,
        customer: customer.id,
        customerData: customer
      });
    });
  }

  function cancelsearch() {
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, {
        searchProductResults: [],
        searchCustomerResults: [],
        isSearchCustomer: false,
        showPanel: false,
        message: null
      });
    });
  }

  function addAndRemove(e, i, action) {
    e.preventDefault();
    var value = e.target.value;
    var items = values.items;
    var amount = values.amount;
    var discountTotal = amount * values.discount / 100;
    var total = amount - discountTotal + values.tax + values.delivery;
    amount -= (items[i].price - items[i].discount) * items[i].quantity;

    switch (action) {
      case '-':
        items[i].quantity = items[i].quantity - 1;
        break;

      case '+':
        if (items[i].quantity + 1 <= items[i].qty_available) {
          items[i].quantity = items[i].quantity + 1;
        }

        break;
    }

    if (items[i].quantity == 0) {
      items[i].quantity = 1;
    }

    amount += (items[i].price - items[i].discount) * items[i].quantity;
    discountTotal = amount * values.discount / 100;
    total = amount - discountTotal + values.tax + values.delivery;
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, {
        amount: amount,
        discountTotal: discountTotal,
        total: total,
        items: items
      });
    });
  }

  function choseMethod(e, method, i) {
    e.preventDefault();

    if (values.items.length > 0) {
      var methods = values.paymethods;
      var defaultCurr = {};

      for (var p = 0; p < data.currency.length; p++) {
        if (data.currency[p].is_default) {
          defaultCurr = data.currency[p];
          break;
        }
      }

      if (!method.isSelected) {
        method.isSelected = true;
        methods[i] = method;
      }

      var payMethod = {
        id: method.id,
        method: method.id,
        name: method.name,
        currencies: data.currency,
        currency: defaultCurr.id,
        rate: defaultCurr.rate,
        prevAmount: 0,
        amount: '',
        paid: '',
        change: '',
        reference: ''
      };
      var payments = values.payments;
      payments.push(payMethod);
      setValues(function (values) {
        return _objectSpread(_objectSpread({}, values), {}, {
          payments: payments,
          paymethods: methods,
          showPanel: true,
          showPayPanel: true
        });
      });
    }

    return false;
  }

  function cancelMethod(e, i) {
    e.preventDefault();
    var payments = values.payments;

    if (values.paid > 0) {
      var paid = values.paid;
      paid = paid - payments[i].amount * payments[i].rate;
      var change = paid - values.total;
      change = change < 0 ? 0 : change;
      var due = values.total - paid;
      setValues(function (values) {
        return _objectSpread(_objectSpread({}, values), {}, {
          paid: paid,
          due: due < 0 ? 0 : due,
          change: change
        });
      });
    }

    payments.splice(i, 1);
    setValues(function (values) {
      return _objectSpread(_objectSpread({}, values), {}, {
        payments: payments
      });
    });
  }

  function paymentChange(e, i) {
    e.preventDefault();
    var payments = values.payments;
    var value = e.target.value;
    var key = e.target.name;

    if (key == 'currency') {
      for (var p = 0; p < payments[i].currencies.length; p++) {
        if (payments[i].currencies[p].id == value) {
          payments[i].rate = payments[i].currencies[p].rate;
          break;
        }
      }
    }

    payments[i][key] = value;

    if (key == 'amount') {
      var paid = 0;

      for (var j = 0; j < payments.length; j++) {
        if (j != i) {
          paid += parseFloat(payments[j].amount * payments[j].rate);
        }
      }

      value = value == '' ? 0 : value;
      paid = paid + parseFloat(value) * payments[i].rate;
      payments[i]['paid'] = value;
      var change = paid - values.total;
      change = change < 0 ? 0 : change;
      var due = values.total - paid;
      setValues(function (values) {
        return _objectSpread(_objectSpread({}, values), {}, {
          payments: payments,
          paid: paid,
          due: due < 0 ? 0 : due,
          change: change
        });
      });
    } else {
      setValues(function (values) {
        return _objectSpread(_objectSpread({}, values), {}, {
          payments: payments
        });
      });
    }
  }

  function proceedPayment(e) {
    e.preventDefault();

    if (values.items.length > 0 && values.payments.length > 0) {
      setSending(true);
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_2__["Inertia"].post(route('sell.post', data.store.id), values).then(function () {
        setSending(false);
      });
    }

    return false;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "POS Sale")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "grid grid-cols-8 bg-gray-400 rounded h-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative col-span-2 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: data.store.image,
    className: "w-16"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    className: "text-lg font-medium"
  }, data.store.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    className: "text-xs font-medium"
  }, data.store.code), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "text-xs font-italic"
  }, data.store.slogan))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "mt-2 border-t border-gray-600"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full py-1 text-gray-700 font-medium"
  }, "Customer ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-800"
  }, values.customerData.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "bg-".concat(values.isSearchCustomer ? 'blue' : 'gray', "-500 text-xs text-").concat(values.isSearchCustomer ? 'blue' : 'gray', "-700 p-1 rounded"),
    onClick: function onClick(e) {
      return changeCustomer(e);
    }
  }, "Change"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full py-1 text-gray-700 font-medium"
  }, "Amount ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-800"
  }, values.amount.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full py-1 text-gray-700 font-medium"
  }, "Discount % ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-800"
  }, values.discount.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full py-1 text-gray-700 font-medium"
  }, "Discount Total ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-800"
  }, values.discountTotal.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full py-1 text-gray-700 font-medium"
  }, "Tax ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-800"
  }, values.tax.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full py-1 text-gray-700 font-medium"
  }, "Delivery ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-800"
  }, values.delivery.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full border-t border-gray-500"
  }), data.currency.map(function (_ref, i) {
    var id = _ref.id,
        code = _ref.code,
        rate = _ref.rate,
        is_default = _ref.is_default;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: "cur".concat(i),
      className: "w-full text-".concat(is_default ? 'xl' : 'xs', " text-gray-").concat(is_default ? '900' : '600', " font-medium")
    }, "Total ", code, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "float-right text-semibold text-gray-".concat(is_default ? '900' : '600')
    }, is_default ? (values.total * rate).toFixed(2) : (values.total / rate).toFixed(2)));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full border-t border-gray-500"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "paid",
    className: "w-full text-xl text-gray-900 font-medium"
  }, "Paid", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-900"
  }, values.paid.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "due",
    className: "w-full text-xl text-gray-900 font-medium"
  }, "Due", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-900"
  }, values.due.toFixed(2))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: "change",
    className: "w-full text-xl text-gray-900 font-medium"
  }, "Change", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "float-right text-semibold text-gray-900"
  }, values.change.toFixed(2)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "absolute bottom-0 grid grid-cols-3 gap-4 justify-items-auto py-2 pr-2"
  }, values.paymethods.map(function (method, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "pm".concat(method.id),
      onClick: function onClick(e) {
        return choseMethod(e, method, i);
      },
      className: "text-center text-md text-gray-800 font-semibold bg-gray-".concat(method.isSelected ? '600' : '500', " flex justify-center items-center px-4 py-2 rounded")
    }, method.name);
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative bg-gray-800 ".concat(!values.showPanel ? 'col-span-6 rounded-r' : 'col-span-4', " rounded-l-xl p-2")
  }, !values.isSearchCustomer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleSearchProduct(e);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "form-input rounded-md shadow-sm block w-5/6",
    label: "",
    name: "searchProduct",
    type: "text",
    disable: false,
    readonly: false,
    must: false,
    errors: errors.searchProduct,
    value: values.searchProduct,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "w-1/6 block bg-gray-500 hover:bg-gray-600 text-white font-sm py-3 px-4 rounded ml-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_Icon__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "search",
    className: iconClasses
  }))), values.message && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "flex w-full mt-2 p-1 text-sm text-red-600 italic bg-red-200 rounded transition duration-500 ease-in-out"
  }, values.message)), values.isSearchCustomer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: function onSubmit(e) {
      return handleSearchCustomer(e);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_TextInput__WEBPACK_IMPORTED_MODULE_6__["default"], {
    className: "form-input rounded-md shadow-sm block w-5/6",
    label: "",
    name: "searchCustomer",
    type: "text",
    disable: false,
    readonly: false,
    must: false,
    errors: errors.searchCustomer,
    value: values.searchCustomer,
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "w-1/6 block bg-blue-500 hover:bg-blue-600 text-white font-sm py-3 px-4 rounded ml-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_Icon__WEBPACK_IMPORTED_MODULE_7__["default"], {
    name: "search",
    className: iconClasses
  }))), values.message && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "flex w-full mt-2 p-1 text-sm text-red-600 italic bg-red-200 rounded transition duration-500 ease-in-out"
  }, values.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full mt-2 border-t border-gray-600"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table-auto w-full text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", {
    className: "bg-gray-400"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "px-4 py-2"
  }, "Item"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "px-4 py-2 text-right"
  }, "Qty"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "px-4 py-2 text-right"
  }, "Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "px-4 py-2 text-right"
  }, "Disc."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    className: "px-4 py-2 text-right"
  }, "Total"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
    className: "text-gray-200"
  }, values.items.map(function (product, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "pr".concat(i),
      className: "border-b"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "px-4 py-2"
    }, product.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "px-4 py-2 flex justify-center items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: function onClick(e) {
        return addAndRemove(e, i, '-');
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_Icon__WEBPACK_IMPORTED_MODULE_7__["default"], {
      name: "minusbtn",
      className: iconClassesBtn
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "quantity",
      className: "w-20 p-2 bg-gray-700 float-right text-center rounded",
      value: product.quantity,
      onChange: function onChange(e) {
        return handleQty(e, i);
      },
      disabled: true
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: function onClick(e) {
        return addAndRemove(e, i, '+');
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_Icon__WEBPACK_IMPORTED_MODULE_7__["default"], {
      name: "plusbtn",
      className: iconClassesBtn
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "px-4 py-2 text-right"
    }, product.price.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "px-4 py-2 text-right"
    }, product.discount.toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "px-4 py-2 text-right"
    }, ((product.price.toFixed(2) - product.discount.toFixed(2)) * product.quantity).toFixed(2)));
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative h-full overflow-auto transition duration-500 ease-in-out bg-gray-700 ".concat(values.showPanel ? 'col-span-2' : 'hidden', " p-2")
  }, values.searchProductResults.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "w-full text-gray-200 text-md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full p-1 border-b border-gray-400 pb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "p-2 bg-gray-100 text-gray-600 text-center rounded font-semibold",
    onClick: function onClick() {
      return cancelsearch();
    }
  }, "Cancel")), values.searchProductResults.map(function (product, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: "sp".concat(i),
      className: "flex w-full p-1 border-b border-gray-400"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "w-5/6 h-full"
    }, product.name, " (", product.qty_available, ") ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-sm px-1 rounded mr-2 float-right bg-gray-200 text-gray-800"
    }, product.price)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "w-1/6 p-2 h-full bg-gray-400 text-gray-700 text-center rounded font-semibold",
      onClick: function onClick() {
        return addToList(product);
      }
    }, "+"));
  })), values.searchCustomerResults.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "w-full text-gray-200 text-md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "w-full p-1 border-b border-gray-400 pb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "p-2 bg-gray-100 text-gray-600 text-center rounded font-semibold",
    onClick: function onClick() {
      return cancelsearch();
    }
  }, "Cancel")), values.searchCustomerResults.map(function (customer, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: "sp".concat(i),
      className: "flex w-full p-1 border-b border-gray-400"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "w-5/6 h-full"
    }, "(", customer.code, ") ", customer.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "w-1/6 p-2 h-full bg-blue-500 text-blue-700 text-center rounded font-semibold",
      onClick: function onClick() {
        return choseCustomer(customer);
      }
    }, "+"));
  })), values.showPayPanel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    disabled: sending,
    onClick: function onClick(e) {
      return proceedPayment(e);
    },
    className: "w-full items-center py-4 bg-blue-600 border border-transparent rounded-md font-semibold text-md text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring-blue disabled:opacity-25 transition ease-in-out duration-150 mb-2"
  }, "Pay"), values.payments.map(function (method, i) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: "lpm".concat(i),
      className: "w-full p-2 mb-1 rounded bg-gray-800"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      className: "text-md font-semibold text-gray-400 pb-1 mb-1 border-b border-gray-600"
    }, method.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "float-right bg-red-700 text-red-300 text-xs rounded px-1",
      onClick: function onClick(e) {
        return cancelMethod(e, i);
      }
    }, "Cancel")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      name: "currency",
      value: method.currency,
      onChange: function onChange(e) {
        return paymentChange(e, i);
      },
      className: "w-1/3 bg-gray-300 text-gray-700 font-semibold rounded-l focus:outline-none"
    }, method.currencies.map(function (_ref2) {
      var id = _ref2.id,
          code = _ref2.code,
          rate = _ref2.rate;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        className: "text-right",
        key: "pmc".concat(id),
        value: id
      }, code);
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "amount",
      className: "w-2/3 p-2 bg-gray-300 text-gray-700 font-semibold text-right text-center rounded-r focus:outline-none",
      value: method.amount,
      onChange: function onChange(e) {
        return paymentChange(e, i);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full flex pt-1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "text-sm text-gray-400"
    }, "Referece"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      name: "reference",
      className: "w-full p-2 bg-gray-300 text-gray-700 font-semibold text-right text-center rounded focus:outline-none",
      value: method.reference,
      onChange: function onChange(e) {
        return paymentChange(e, i);
      }
    }))));
  })))));
}; // Persisten layout
// Docs: https://inertiajs.com/pages#persistent-layouts


Create.layout = function (page) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_POSLayout__WEBPACK_IMPORTED_MODULE_5__["default"], {
    children: page,
    header: 'POS'
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Create);

/***/ }),

/***/ "./resources/js/Shared/POSHeader.js":
/*!******************************************!*\
  !*** ./resources/js/Shared/POSHeader.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Icon */ "./resources/js/Shared/Icon.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var props = _extends({}, _ref);

  var _usePage$props = Object(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__["usePage"])().props,
      app = _usePage$props.app,
      auth = _usePage$props.auth,
      data = _usePage$props.data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "bg-white border-b w-full p-4 md:py-0 md:px-12 text-sm d:text-md flex justify-between items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mt-2 mb-2 mr-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "font-italic text-md text-gray-600 leading-tight"
  }, props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "font-semibold text-md text-gray-700 leading-tight"
  }, " | ", auth.user.fname)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__["InertiaLink"], {
    href: route('store.show', data.store.id)
  }, app.name))));
});

/***/ }),

/***/ "./resources/js/Shared/POSLayout.js":
/*!******************************************!*\
  !*** ./resources/js/Shared/POSLayout.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Layout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
/* harmony import */ var _inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var _MainMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainMenu */ "./resources/js/Shared/MainMenu.js");
/* harmony import */ var _FlashMessages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FlashMessages */ "./resources/js/Shared/FlashMessages.js");
/* harmony import */ var _TopHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TopHeader */ "./resources/js/Shared/TopHeader.js");
/* harmony import */ var _POSHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./POSHeader */ "./resources/js/Shared/POSHeader.js");







function Layout(_ref) {
  var children = _ref.children,
      header = _ref.header;
  var app = Object(_inertiajs_inertia_react__WEBPACK_IMPORTED_MODULE_1__["usePage"])().props.app;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, {
    key: "layout"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__["default"], {
    titleTemplate: "".concat(app.name, " | %s")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "h-screen flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "md:flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_POSHeader__WEBPACK_IMPORTED_MODULE_6__["default"], null, header)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex flex-grow overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "w-full overflow-hidden overflow-y-auto bg-gray-300 p-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FlashMessages__WEBPACK_IMPORTED_MODULE_4__["default"], null), children)))));
}

/***/ }),

/***/ "./resources/js/Shared/TextInput.js":
/*!******************************************!*\
  !*** ./resources/js/Shared/TextInput.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var label = _ref.label,
      name = _ref.name,
      className = _ref.className,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? [] : _ref$errors,
      disable = _ref.disable,
      readonly = _ref.readonly,
      must = _ref.must,
      props = _objectWithoutProperties(_ref, ["label", "name", "className", "errors", "disable", "readonly", "must"]);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  }, label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "block font-medium text-sm text-gray-700",
    htmlFor: name
  }, label, " ", must && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-red-700"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", _extends({
    id: name,
    name: name
  }, props, {
    className: "shadow-none appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow ".concat(errors.length ? 'border border-red-500' : ''),
    disabled: disable,
    readOnly: readonly
  })), errors && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "text-red-500 text-xs italic"
  }, errors[0]));
});

/***/ })

}]);