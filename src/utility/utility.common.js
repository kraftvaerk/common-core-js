// convert an object to a json string
export const stringify = (object) => { return JSON.stringify(object); };

// parse a json string to a js object
export const parseJSON = (json) => { return JSON.parse(json); };

// does a deep clone of an object (functions not allowed)
export const clone = (object) => { return parseJSON(stringify(object)); };

// extends source object with the destination object
// i.e. ( {a: 'b' }, { c: 'd' }) => returns { a: 'b', c: ''d }
// @source:     object => default object to extend
// @destination:object => object used to extend the source
export const extend = (source, destination) => { return Object.assign({}, source, destination); };

// replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values
export const replacePlaceholderParams = (placeholder, values, limit) => {
    if (!placeholder) return '';
    if (typeof placeholder !== 'string') throw new TypeError('invalid placeholder or placeholder is not an string', placeholder);
    values = values instanceof Array ? values : [values];
    const regex = /{\d}|{\d,\d}|{\d,\d-\d}/g;

    // trim the placeholder to size base on the array of values length
    let index = -1;
    const count = values.length; 
    const tag = `{${count - 1}}`; // placeholder tags start at index 0
    const nextTag = `{${count}}`; // detect if next tag exists
    const tagExistsInPlaceholder = placeholder.indexOf(tag) > -1;
    const nextTagExistsInPlaceholder = placeholder.indexOf(nextTag) > -1;
    const trimToIndex = placeholder.indexOf(tag) + tag.length;
    placeholder = (limit) ? placeholder.substring(0, (tagExistsInPlaceholder && nextTagExistsInPlaceholder) ? trimToIndex : placeholder.length) : placeholder;

    // insert values in placeholder tags
    let result = placeholder.replace(regex, (match) => { 
        // introducing index based string manipulation (from-to index)
        const substring = match.substring(1, match.length - 1).split(','); // [..., x-y]
        const substringStartIndex = (substring.length === 1) ? 0 : substring[1].split('-')[0]; // check substring values
        const substringLength = (substring.length === 1) ? undefined : substring[1].split('-')[1]; // declare substring length
        const manipulated = (++index < count) ? (values[index] !== undefined ? values[index].toString().substring(substringStartIndex, substringLength) : null) : match;
        return manipulated;
    });

    return result;
};

// replace placeholder parameters inside an object with provided values
// i.e. ( { a: '{0}', b: { c: {1} }}, ['value-a', 'value-c'] ) => returns an object with values replaced using the values array
// @model:      object => defaults to {}
// @values:     object/array => 26 or [26]
export const replaceObjectParams = (model, values) => {
    if (!model) return {};
    if (typeof model !== 'object' && model.constructor === Object) throw new TypeError("invalid model or model is not an object", model);
    values = values instanceof Array ? values : [values];

    const regexJSONPlaceholder = /"{\d}"/g;
    const regexPlaceholderIndex = /{(.*?)}/;

    const stringified = stringify(model);
    const result = stringified.replace(regexJSONPlaceholder, (match) => { 
        const placeholderIndex = match.match(regexPlaceholderIndex);
        const index = (placeholderIndex.length > 0) ? placeholderIndex[1] : -1;
        return (index > -1 && index < values.length) ? stringify(values[index]) : match;
    });

    return parseJSON(result);
};

// replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params
export const replaceStringParams = (string = '', object = {} /* flat object */) => {
    const regex = /{(.*?)}/g;
    let result = string.replace(regex, (match) => { return object[match.substring(1, match.length - 1)]; });
    return result;
};

// get query string parameters from a given string/url
// i.e. ('http://www.google.com?x=y&z=null') => returns { x: y, z: null }
// @url:        string => url string
// @keys:       string/array => 0-* keys you wish to extract from the url
export const urlParams = (url, keys = []) => {
    if (!url || typeof url !== 'string') throw new TypeError('invalid url', url);
    if ( !(keys instanceof Array) ) keys = [keys];                                                  // ensure keys is an array
    if (keys.length) keys = keys.map((index, item) => { return item.toString().toLowerCase(); });   // lowercase all keys

    const startIndex = url.indexOf('?');
    let params = url.substring(startIndex + 1);
    let kvps = params.split('&');
    let result = {};

    // nothing found
    if (!kvps.length) return result;

    // pacakage params
    for (var i = 0; i < kvps.length; i++) {
        const kvp = kvps[i].split('=');
        const key = kvp[0].toLowerCase();
        const value = kvp[1];

        if (!keys.length || keys.indexOf(key) > -1) result[key] = value;
    }

    // return result
    return result;
};

// parameterizes an object
// i.e. { a: 'b' } => returns ?a=b
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
export const parameterize = (data = {}, prefix = '?', append = '&') => {
    return (prefix || '') + Object.entries(data).map( ([key, value]) => { return `${key}=${value}`; }).join(append);
};

// parameterizes a url given an object
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
// @replace:    boolean => replace the entire query string; defaults to false
// @encode:     boolean => encode uri component result
export const parameterizeUrl = (data = {}, prefix = '?', append = '&', url = '', replace = false, encode = false) => {
    const parameterized = parameterize(data, (replace ? prefix : append), append);
    const indexOfPrefix = url.indexOf(prefix);
    const result = (replace) ? (url.substring(0, indexOfPrefix) + parameterized) : (url + parameterized);
    return encode ? encodeURIComponent(result) : result;
};

// [REFERENCE]: https://code.lengstorf.com/get-form-values-as-json/
// @elements:    html elements[] => html elements to objectify
// @exclusions:  values to exclude[] => values to ignore 
export const formToObject = (elements = [], exclusions = ['']) => {
    // no elements
    if (!elements || !elements.length) return {};

    // helper functions
    const isValidElement = (element) => {
        return element.name && element.value;
    };
    const isValidValue = (element) => {
        return !exclusions.includes(
            (!['checkbox', 'radio'].includes(element.type) || element.checked)
        );
    };
    const isCheckbox = (element) => {
        return element.type === 'checkbox';
    };
    const isMultiSelect = (element) => {
        return element.options && element.multiple;
    };
    const getSelectValues = (options) => [].reduce.call(options, (values, option) => {
        return option.selected ? values.concat(option.value) : values;
    }, []);

    // form to data
    return [].reduce.call(elements, (data, element) => {
        if (isValidElement(element) && isValidValue(element)) {
            if (isCheckbox(element)) data[element.name] = (data[element.name] || []).concat(element.value);
            else if (isMultiSelect(element)) data[element.name] = getSelectValues(element);
            else data[element.name] = element.value;
        }
        return data;
    }, {});
};

// export defaults
export default {
    stringify,
    parseJSON,
    clone,
    extend,
    replacePlaceholderParams,
    replaceObjectParams,
    replaceStringParams,
    urlParams,
    parameterize,
    parameterizeUrl, 
    formToObject
};
