// get query string parameters from a given string/url
// i.e. ('http://www.google.com?x=y&z=null') => returns { x: y, z: null }
// @url:        string => url string
// @keys:       string/array => 0-* keys you wish to extract from the url
export const urlParams = (url, keys = []) => {
    if (!url || typeof url !== 'string') throw new TypeError('invalid url', url);
    if ( !(keys instanceof Array) ) keys = [keys];                                                  // ensure keys is an array
    if (keys.length) keys = keys.map((index, item) => { return item.toString().toLowerCase(); });   // lowercase all keys

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

        if (!keys.length || keys.indexOf(key) > -1) result[key] = value;
    }

    // return result
    return result;
};
