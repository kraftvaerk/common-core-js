// replace placeholder parameters inside a string with provided values
// i.e. ('You are {0} years old {1}', [32], null, true ) => returns the resulting string with values replaced using the values array
// @placholder: string => "You are {0} years old"
// @values:     object/array => 26 or [26]
// @regex:      regex => defaults to digits {0}, {1}... {n} */
// @limit:      boolean => trim result to length of values
const replacePlaceholderParams = (placeholder, values, limit) => {
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

export default replacePlaceholderParams;
