import parameterize from '../parameterize';

// parameterizes a url given an object
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
// @replace:    boolean => replace the entire query string; defaults to false
// @encode:     boolean => encode uri component result
const parameterizeUrl = (data = {}, prefix = '?', append = '&', url = '', replace = false, encode = false) => {
    const parameterized = parameterize(data, (replace ? prefix : append), append);
    const indexOfPrefix = url.indexOf(prefix);
    const result = (replace) ? (url.substring(0, indexOfPrefix) + parameterized) : (url + parameterized);
    return encode ? encodeURIComponent(result) : result;
};

export default parameterizeUrl;
