import WHITE_SPACES from '../../constant/WHITE_SPACES';

// Typecast a value to a String, using an empty string value for null or undefined.
function toString(val){
    return val === null ? '' : val.toString();
}

/**
 * rtrim(str, [chars]):String
 *
 * Remove chars or white-spaces from end of string.
 * chars is an array of chars to remove from the end
 * of the string. If chars is not specified, Unicode
 * whitespace chars will be used instead.
 *
 * rtrim('   lorem ipsum   ');      // "   lorem ipsum"
 * rtrim('--lorem ipsum--', ['-']); // "--lorem ipsum"
 *
 */
export function rtrim(str, chars) {
    str = toString(str); // eslint-disable-line no-param-reassign
    chars = chars || WHITE_SPACES; // eslint-disable-line no-param-reassign

    let end = str.length - 1;
    const charLen = chars.length;
    let found = true;
    let i;
    let c;

    while (found && end >= 0) {
        found = false;
        i = -1;
        c = str.charAt(end);

        while (++i < charLen) {
            if (c === chars[i]) {
                found = true;
                end--;
                break;
            }
        }
    }

    return (end >= 0) ? str.substring(0, end + 1) : '';
}

/**
 * ltrim(str, [chars])
 *
 * Remove chars or white-spaces from beginning of string.
 * chars is an array of chars to remove from the beginning
 * of the string. If chars is not specified, Unicode
 * whitespace chars will be used instead.
 *
 * ltrim('   lorem ipsum   ');      // "lorem ipsum   "
 * ltrim('--lorem ipsum--', ['-']); // "lorem ipsum--"
 *
 */

export function ltrim(str, chars) {
    str = toString(str); // eslint-disable-line no-param-reassign
    chars = chars || WHITE_SPACES; // eslint-disable-line no-param-reassign

    let start = 0;
    const len = str.length;
    const charLen = chars.length;
    let found = true;
    let i;
    let c;

    while (found && start < len) {
        found = false;
        i = -1;
        c = str.charAt(start);

        while (++i < charLen) {
            if (c === chars[i]) {
                found = true;
                start++;
                break;
            }
        }
    }

    return (start >= len) ? '' : str.substr(start, len);
}

/**
 * trim(str, [chars]):String
 *
 * Remove chars or white-spaces from beginning and end of string.
 * chars is an array of chars to remove from the beginning and end
 * of the string. If chars is not specified, Unicode whitespace chars will be used instead.
 *
 * trim('   lorem ipsum   ');             // "lorem ipsum"
 * trim('-+-lorem ipsum-+-', ['-', '+']); // "lorem ipsum"
 *
 */
export function trim(str, chars) {
    chars = chars || WHITE_SPACES; // eslint-disable-line no-param-reassign
    return ltrim(rtrim(toString(str), chars), chars);
}

export default trim;
