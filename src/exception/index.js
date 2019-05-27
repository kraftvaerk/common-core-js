const InvalidResponseError = function (message = '', exc = null) {
    this.name = 'InvalidResponseError';
    this.message = message;
    this.exc = exc;
};
InvalidResponseError.prototype = new Error();

const InvalidArgumentError = function (message = '', exc = null) {
    this.name = 'InvalidArgumentError';
    this.message = message;
    this.exc = exc;
};
InvalidArgumentError.prototype = new Error();


const NotImplementedError = function (message = '', exc = null) {
    this.name = 'NotImplementedError';
    this.message = message;
    this.exc = exc;
};
NotImplementedError.prototype = new Error();

class CustomError extends Error {
    constructor(message = '', ...args) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...args);

        this.name = 'CustomError';

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }

        // Custom debugging information
        this.message = message;
        this.date = new Date();
    }
}

class InvalidResponse extends CustomError {
    constructor(message = '', ...args) {
        super(message, ...args);

        this.name = 'InvalidResponseError';
    }
}

class InvalidArgument extends CustomError {
    constructor(message = '', ...args) {
        super(message, ...args);

        this.name = 'InvalidArgumentError';
    }
}

class NotImplemented extends CustomError {
    constructor(message = '', ...args) {
        super(message, ...args);

        this.name = 'NotImplementedError';
    }
}

export default {
    InvalidResponseError,
    InvalidArgumentError,
    NotImplementedError,

    InvalidResponse,
    InvalidArgument,
    NotImplemented
};
