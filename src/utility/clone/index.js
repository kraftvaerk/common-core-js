import parseJSON from './parseJSON';
import stringify from './stringify';

// does a deep clone of an object (functions not allowed)
export const clone = (object) => { return parseJSON(stringify(object)); };
