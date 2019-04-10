"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.formToObject = exports.parameterizeUrl = exports.parameterize = exports.urlParams = exports.replaceStringParams = exports.replaceObjectParams = exports.replacePlaceholderParams = exports.extend = exports.clone = exports.parseJSON = exports.stringify = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.object.assign");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// convert an object to a json string
var stringify = function stringify(object) {
  return JSON.stringify(object);
}; // parse a json string to a js object


exports.stringify = stringify;

var parseJSON = function parseJSON(json) {
  return JSON.parse(json);
}; // does a deep clone of an object (functions not allowed)


exports.parseJSON = parseJSON;

var clone = function clone(object) {
  return parseJSON(stringify(object));
}; // extends source object with the destination object
// i.e. ( {a: 'b' }, { c: 'd' }) => returns { a: 'b', c: ''d }
// @source:     object => default object to extend
// @destination:object => object used to extend the source


exports.clone = clone;

var extend = function extend(source, destination) {
  return Object.assign({}, source, destination);
}; // replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values


exports.extend = extend;

var replacePlaceholderParams = function replacePlaceholderParams(placeholder, values, limit) {
  if (!placeholder) return '';
  if (typeof placeholder !== 'string') throw new TypeError('invalid placeholder or placeholder is not an string', placeholder);
  values = values instanceof Array ? values : [values];
  var regex = /{\d}|{\d,\d}|{\d,\d-\d}/g; // trim the placeholder to size base on the array of values length

  var index = -1;
  var count = values.length;
  var tag = "{".concat(count - 1, "}"); // placeholder tags start at index 0

  var nextTag = "{".concat(count, "}"); // detect if next tag exists

  var tagExistsInPlaceholder = placeholder.indexOf(tag) > -1;
  var nextTagExistsInPlaceholder = placeholder.indexOf(nextTag) > -1;
  var trimToIndex = placeholder.indexOf(tag) + tag.length;
  placeholder = limit ? placeholder.substring(0, tagExistsInPlaceholder && nextTagExistsInPlaceholder ? trimToIndex : placeholder.length) : placeholder; // insert values in placeholder tags

  var result = placeholder.replace(regex, function (match) {
    // introducing index based string manipulation (from-to index)
    var substring = match.substring(1, match.length - 1).split(','); // [..., x-y]

    var substringStartIndex = substring.length === 1 ? 0 : substring[1].split('-')[0]; // check substring values

    var substringLength = substring.length === 1 ? undefined : substring[1].split('-')[1]; // declare substring length

    var manipulated = ++index < count ? values[index] !== undefined ? values[index].toString().substring(substringStartIndex, substringLength) : null : match;
    return manipulated;
  });
  return result;
}; // replace placeholder parameters inside an object with provided values
// i.e. ( { a: '{0}', b: { c: {1} }}, ['value-a', 'value-c'] ) => returns an object with values replaced using the values array
// @model:      object => defaults to {}
// @values:     object/array => 26 or [26]


exports.replacePlaceholderParams = replacePlaceholderParams;

var replaceObjectParams = function replaceObjectParams(model, values) {
  if (!model) return {};
  if (_typeof(model) !== 'object' && model.constructor === Object) throw new TypeError("invalid model or model is not an object", model);
  values = values instanceof Array ? values : [values];
  var regexJSONPlaceholder = /"{\d}"/g;
  var regexPlaceholderIndex = /{(.*?)}/;
  var stringified = stringify(model);
  var result = stringified.replace(regexJSONPlaceholder, function (match) {
    var placeholderIndex = match.match(regexPlaceholderIndex);
    var index = placeholderIndex.length > 0 ? placeholderIndex[1] : -1;
    return index > -1 && index < values.length ? stringify(values[index]) : match;
  });
  return parseJSON(result);
}; // replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params


exports.replaceObjectParams = replaceObjectParams;

var replaceStringParams = function replaceStringParams()
/* flat object */
{
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var regex = /{(.*?)}/g;
  var result = string.replace(regex, function (match) {
    return object[match.substring(1, match.length - 1)];
  });
  return result;
}; // get query string parameters from a given string/url
// i.e. ('http://www.google.com?x=y&z=null') => returns { x: y, z: null }
// @url:        string => url string
// @keys:       string/array => 0-* keys you wish to extract from the url


exports.replaceStringParams = replaceStringParams;

var urlParams = function urlParams(url) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!url || typeof url !== 'string') throw new TypeError('invalid url', url);
  if (!(keys instanceof Array)) keys = [keys]; // ensure keys is an array

  if (keys.length) keys = keys.map(function (index, item) {
    return item.toString().toLowerCase();
  }); // lowercase all keys

  var startIndex = url.indexOf('?');
  var params = url.substring(startIndex + 1);
  var kvps = params.split('&');
  var result = {}; // nothing found

  if (!kvps.length) return result; // pacakage params

  for (var i = 0; i < kvps.length; i++) {
    var kvp = kvps[i].split('=');
    var key = kvp[0].toLowerCase();
    var value = kvp[1];
    if (!keys.length || keys.indexOf(key) > -1) result[key] = value;
  } // return result


  return result;
}; // parameterizes an object
// i.e. { a: 'b' } => returns ?a=b
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &


exports.urlParams = urlParams;

var parameterize = function parameterize() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';
  var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '&';
  return (prefix || '') + Object.entries(data).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return "".concat(key, "=").concat(value);
  }).join(append);
}; // parameterizes a url given an object
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
// @replace:    boolean => replace the entire query string; defaults to false
// @encode:     boolean => encode uri component result


exports.parameterize = parameterize;

var parameterizeUrl = function parameterizeUrl() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';
  var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '&';
  var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var replace = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var encode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var parameterized = parameterize(data, replace ? prefix : append, append);
  var indexOfPrefix = url.indexOf(prefix);
  var result = replace ? url.substring(0, indexOfPrefix) + parameterized : url + parameterized;
  return encode ? encodeURIComponent(result) : result;
}; // [REFERENCE]: https://code.lengstorf.com/get-form-values-as-json/
// @elements:    html elements[] => html elements to objectify
// @exclusions:  values to exclude[] => values to ignore


exports.parameterizeUrl = parameterizeUrl;

var formToObject = function formToObject() {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var exclusions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [''];
  // no elements
  if (!elements || !elements.length) return {}; // helper functions

  var isValidElement = function isValidElement(element) {
    return element.name && element.value;
  };

  var isValidValue = function isValidValue(element) {
    return !exclusions.includes(!['checkbox', 'radio'].includes(element.type) || element.checked);
  };

  var isCheckbox = function isCheckbox(element) {
    return element.type === 'checkbox';
  };

  var isMultiSelect = function isMultiSelect(element) {
    return element.options && element.multiple;
  };

  var getSelectValues = function getSelectValues(options) {
    return [].reduce.call(options, function (values, option) {
      return option.selected ? values.concat(option.value) : values;
    }, []);
  }; // form to data


  return [].reduce.call(elements, function (data, element) {
    if (isValidElement(element) && isValidValue(element)) {
      if (isCheckbox(element)) data[element.name] = (data[element.name] || []).concat(element.value);else if (isMultiSelect(element)) data[element.name] = getSelectValues(element);else data[element.name] = element.value;
    }

    return data;
  }, {});
}; // export defaults


exports.formToObject = formToObject;
var _default = {
  stringify: stringify,
  parseJSON: parseJSON,
  clone: clone,
  extend: extend,
  replacePlaceholderParams: replacePlaceholderParams,
  replaceObjectParams: replaceObjectParams,
  replaceStringParams: replaceStringParams,
  urlParams: urlParams,
  parameterize: parameterize,
  parameterizeUrl: parameterizeUrl,
  formToObject: formToObject
};
exports.default = _default;