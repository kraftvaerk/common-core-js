// parameterizes an object
// i.e. { a: 'b' } => returns ?a=b
// @data:       object => object to parameterize; defaults to {}
// @prefix:     string => prefix character; defaults to ?
// @append:     string => joining character; defaults to &
function parameterize(data = {}, prefix = '?', append = '&'){
    return (prefix || '') + Object.entries(data).map( ([key, value]) => { return `${key}=${value}`; }).join(append);
}

export default parameterize;
