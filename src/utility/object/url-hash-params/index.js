
function urlHashParams(hash) {
    if (typeof hash !== 'string'){
        throw new TypeError('invalid hash, must be a string with "#" prefix', hash);
    }

    const hashTrim = hash.indexOf('#') === 0 ? hash.substring(1) : hash;

    // result
    return unescape(hashTrim).split('&').reduce((acc, cur) => {
        const kvp = cur.split('=');
        acc[kvp[0]] = kvp[1];
        return acc;
    }, {}) || {};
}

export default urlHashParams;
