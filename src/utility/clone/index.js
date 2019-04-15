import parseJSON from '../parse-json';
import stringify from '../stringify';

// does a deep clone of an object (functions not allowed)
const clone = (object) => { return parseJSON(stringify(object)); };

export default clone;
