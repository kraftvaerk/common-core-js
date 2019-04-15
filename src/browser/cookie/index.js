import stringify from '../../utility/stringify';
import parseJSON from '../../utility/parse-json';



// [REFERENCE]: https://github.com/akinjide/cookiet/blob/master/cookiet.js
const core = {
    get: (name, def = null /* default value */) => {
        if (!name) throw new Error('core.get.name required');

        let result = null;
        const parts = document.cookie.split(name + '=');

        if (parts.length === 2) result = decodeURIComponent(parts.pop().split(';').shift());

        return parseJSON(result) || def;
    },
    set: (name = '', value = {}, expires = 14, path = '/', strict = true) => {
        if (!name) throw new Error('core.set.name required');

        // key/value pair
        const data = `${encodeURIComponent(name)}=${encodeURIComponent(stringify(value))};`;

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

const cookie = {
    get: (name, def /* default value */) => { return core.get(name, def); },
    set: (name, value, expires, path, strict) => { core.set(name, value, expires, path, strict); }, // security options not exposed by default as they are already optimized for safety
    del: (name) => { core.del(name); }
};


export default cookie;
