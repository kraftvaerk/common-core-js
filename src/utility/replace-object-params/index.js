import stringify from './stringify';
import parseJSON from './parseJSON';

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
