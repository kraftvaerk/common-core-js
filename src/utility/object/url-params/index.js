// get query string parameters from a given string/url
// i.e. ('http://www.google.com?x=y&z=null') => returns { x: y, z: null }
// @url:        string => url string
// @keys:       string/array => 0-* keys you wish to extract from the url
function urlParams(url, keys = []) {
    if (!url || typeof url !== 'string') {
        throw new TypeError('invalid url', url);
    }

    // ensure keys is an array
    let keysArray;
    if (!(keys instanceof Array)) {
        keysArray = [keys];
    }

    // lowercase all keys
    let keysLowercase;
    if (keysArray.length) {
        keysLowercase = keysArray.map((index, item) => { return item.toString().toLowerCase(); });
    }

    const startIndex = url.indexOf('?');
    const params = url.substring(startIndex + 1);
    const kvps = params.split('&');
    const result = {};

    // nothing found
    if (!kvps.length) return result;

    // pacakage params
    for (let i = 0; i < kvps.length; i++) {
        const kvp = kvps[i].split('=');
        const key = kvp[0].toLowerCase();
        const value = kvp[1];

        if (!keysLowercase.length || keysLowercase.indexOf(key) > -1) result[key] = value;
    }

    // return result
    return result;
}

export default urlParams;
