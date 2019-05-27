/**
 * Returns a random hexadecimal string
 *
 * randomHex([size=6]):String
 *
 * randomHex();   // "dd8575"
 * randomHex();   // "e6baeb"
 * randomHex(2);  // "a2"
 * randomHex(30); // "effd7e2ad9a4a3067e30525fab983a"
 */
import choice from '../choice';

const CHARS = '0123456789abcdef'.split('');
const DEFAULT_SIZE = 6;
let hex = '';

function generateHex(size) {
    hex = '';

    while (size--) { // eslint-disable-line no-param-reassign
        hex += choice(CHARS);
    }

    return hex;
}

const randomHex = (size = DEFAULT_SIZE) => generateHex(size > 0 ? size : DEFAULT_SIZE);

export default randomHex;
