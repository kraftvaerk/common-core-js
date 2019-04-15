// extends source object with the destination object
// i.e. ( {a: 'b' }, { c: 'd' }) => returns { a: 'b', c: ''d }
// @source:     object => default object to extend
// @destination:object => object used to extend the source
export const extend = (source, destination) => { return Object.assign({}, source, destination); };
