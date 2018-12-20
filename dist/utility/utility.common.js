'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h['return']&&h['return']()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),_typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},stringify=exports.stringify=function(a){return JSON.stringify(a)},parseJSON=exports.parseJSON=function(a){return JSON.parse(a)},clone=exports.clone=function(a){return parseJSON(stringify(a))},extend=exports.extend=function(a,b){return Object.assign({},a,b)},replacePlaceholderParams=exports.replacePlaceholderParams=function(a,b,c){if(!a)return'';if('string'!=typeof a)throw new TypeError('invalid placeholder or placeholder is not an string',a);b=b instanceof Array?b:[b];var d=/{\d}|{\d,\d}|{\d,\d-\d}/g,e=-1,f=b.length,g='{'+(f-1)+'}',h=-1<a.indexOf(g),i=-1<a.indexOf('{'+f+'}'),j=a.indexOf(g)+g.length;// trim the placeholder to size base on the array of values length
// placeholder tags start at index 0
// detect if next tag exists
a=c?a.substring(0,h&&i?j:a.length):a;// insert values in placeholder tags
var k=a.replace(d,function(a){// introducing index based string manipulation (from-to index)
var c=a.substring(1,a.length-1).split(','),d=1===c.length?0:c[1].split('-')[0],g=1===c.length?void 0:c[1].split('-')[1],h=++e<f?b[e]===void 0?null:b[e].toString().substring(d,g):a;// [..., x-y]
// check substring values
// declare substring length
return h});return k},replaceObjectParams=exports.replaceObjectParams=function(a,b){if(!a)return{};if('object'!==('undefined'==typeof a?'undefined':_typeof(a))&&a.constructor===Object)throw new TypeError('invalid model or model is not an object',a);b=b instanceof Array?b:[b];var c=/"{\d}"/g,d=/{(.*?)}/,e=stringify(a),f=e.replace(c,function(a){var c=a.match(d),e=0<c.length?c[1]:-1;return-1<e&&e<b.length?stringify(b[e]):a});return parseJSON(f)},replaceStringParams=exports.replaceStringParams=function()/* flat object */{var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:'',b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=/{(.*?)}/g,d=a.replace(c,function(a){return b[a.substring(1,a.length-1)]});return d},urlParams=exports.urlParams=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[];if(!a||'string'!=typeof a)throw new TypeError('invalid url',a);b instanceof Array||(b=[b]),b.length&&(b=b.map(function(a,b){return b.toString().toLowerCase()}));// lowercase all keys
var c=a.indexOf('?'),d=a.substring(c+1),e=d.split('&'),f={};// nothing found
if(!e.length)return f;// pacakage params
for(var g=0;g<e.length;g++){var h=e[g].split('='),j=h[0].toLowerCase(),k=h[1];(!b.length||-1<b.indexOf(j))&&(f[j]=k)}// return result
return f},parameterize=exports.parameterize=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'?',c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:'&';return(b||'')+Object.entries(a).map(function(a){var b=_slicedToArray(a,2),c=b[0],d=b[1];return c+'='+d}).join(c)},parameterizeUrl=exports.parameterizeUrl=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:'?',c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:'&',d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:'',e=!!(4<arguments.length&&arguments[4]!==void 0)&&arguments[4],f=!!(5<arguments.length&&arguments[5]!==void 0)&&arguments[5],g=parameterize(a,e?b:c,c),h=d.indexOf(b),i=e?d.substring(0,h)+g:d+g;return f?encodeURIComponent(i):i},formToObject=exports.formToObject=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:[],b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:[''];// no elements
if(!a||!a.length)return{};// helper functions
var c=function(a){return a.name&&a.value},d=function(a){return!b.includes(!['checkbox','radio'].includes(a.type)||a.checked)},e=function(a){return'checkbox'===a.type},f=function(a){return a.options&&a.multiple},g=function(a){return[].reduce.call(a,function(a,b){return b.selected?a.concat(b.value):a},[])};// form to data
return[].reduce.call(a,function(a,b){return c(b)&&d(b)&&(e(b)?a[b.name]=(a[b.name]||[]).concat(b.value):f(b)?a[b.name]=g(b):a[b.name]=b.value),a},{})};// convert an object to a json string
// parse a json string to a js object
// does a deep clone of an object (functions not allowed)
// extends source object with the destination object
// i.e. ( {a: 'b' }, { c: 'd' }) => returns { a: 'b', c: ''d }
// @source:     object => default object to extend
// @destination:object => object used to extend the source
// replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values
// replace placeholder parameters inside an object with provided values
// i.e. ( { a: '{0}', b: { c: {1} }}, ['value-a', 'value-c'] ) => returns an object with values replaced using the values array
// @model:      object => defaults to {}
// @values:     object/array => 26 or [26]
// replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params
// get query string parameters from a given string/url
// i.e. ('http://www.google.com?x=y&z=null') => returns { x: y, z: null }
// @url:        string => url string
// @keys:       string/array => 0-* keys you wish to extract from the url
// parameterizes an object
// i.e. { a: 'b' } => returns ?a=b
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
// parameterizes a url given an object
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
// @replace:    boolean => replace the entire query string; defaults to false
// @encode:     boolean => encode uri component result
// [REFERENCE]: https://code.lengstorf.com/get-form-values-as-json/
// @elements:    html elements[] => html elements to objectify
// @exclusions:  values to exclude[] => values to ignore 
// export defaults
exports.default={stringify:stringify,parseJSON:parseJSON,clone:clone,extend:extend,replacePlaceholderParams:replacePlaceholderParams,replaceObjectParams:replaceObjectParams,replaceStringParams:replaceStringParams,urlParams:urlParams,parameterize:parameterize,parameterizeUrl:parameterizeUrl,formToObject:formToObject};