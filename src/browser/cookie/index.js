const ERROR_NAME_MISSING = 'Missing name';

// [REFERENCE]: https://github.com/akinjide/cookiet/blob/master/cookiet.js
const cookie = {
    get: (name) => {
        if (!name) throw new Error(ERROR_NAME_MISSING);

        let result = null;
        const parts = document.cookie.split(name + '=');

        if (parts.length === 2) result = decodeURIComponent(parts.pop().split(';').shift());

        return JSON.parse(result);
    },
    set: (name = '', value = {}, expires = 14, path = '/', strict = true) => { // security options not exposed by default as they are already optimized for safety
        if (!name) throw new Error(ERROR_NAME_MISSING);

        // key/value pair
        const data = `${encodeURIComponent(name)}=${encodeURIComponent(JSON.stringify(value))};`;

        // using "expires" because IE doesn't support "max-age".
        const datetime = new Date(new Date().getTime() + parseInt(expires, 10) * 1000 * 60 * 60 * 24);
        const expiration = `Expires=${datetime.toUTCString()};`;

        // path
        const location = `Path=${path};`;

        // security
        const security = (strict) ? 'Domain;HttpOnly;Secure;SameSite=Strict' : '';

        // set the cookie
        document.cookie = `${data}${expiration}${location}${security}`;

        return true;
    },
    del: (name) => {
        document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
};

export default cookie;
