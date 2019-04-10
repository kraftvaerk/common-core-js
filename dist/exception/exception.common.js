"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.function.name");

// invalid response error
var InvalidResponseError = function InvalidResponseError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var exc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.name = 'InvalidResponseError';
  this.message = message;
  this.exc = exc;
};

InvalidResponseError.prototype = new Error(); // not implemented error

var InvalidArgumentError = function InvalidArgumentError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var exc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.name = 'InvalidArgumentError';
  this.message = message;
  this.exc = exc;
};

InvalidArgumentError.prototype = new Error(); // not implemented error

var NotImplementedError = function NotImplementedError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var exc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  this.name = 'NotImplementedError';
  this.message = message;
  this.exc = exc;
};

NotImplementedError.prototype = new Error();
var _default = {
  InvalidResponseError: InvalidResponseError,
  InvalidArgumentError: InvalidArgumentError,
  NotImplementedError: NotImplementedError
};
exports.default = _default;