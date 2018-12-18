// invalid response error
const InvalidResponseError = function (message = '', exc = null) {
    this.name = 'InvalidResponseError';
    this.message = message;
    this.exc = exc;
};
InvalidResponseError.prototype = new Error();

// not implemented error
const InvalidArgumentError = function (message = '', exc = null) {
    this.name = 'InvalidArgumentError';
    this.message = message;
    this.exc = exc;
};
InvalidArgumentError.prototype = new Error();

// not implemented error
const NotImplementedError = function (message = '', exc = null) {
    this.name = 'NotImplementedError';
    this.message = message;
    this.exc = exc;
};
NotImplementedError.prototype = new Error();

export default { 
    InvalidResponseError, 
    InvalidArgumentError, 
    NotImplementedError
};