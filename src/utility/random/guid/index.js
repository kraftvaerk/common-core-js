/**
 * Generates a pseudo-random Globally Unique Identifier
 *
 * guid():String
 *
 * Since the total number of GUIDs is 2^122 the chance of
 * generating the same value twice is negligible.
 *
 * Important: this method uses Math.random by default so the
 * UUID isn't safe (sequence of outputs can be predicted in some cases),
 *
 * Returns pseudo-random guid (UUID v4)
 * IMPORTANT: it's not totally "safe" since randomHex/choice uses Math.random
 * by default and sequences can be predicted in some cases.
 */

import choice from '../choice';
import randomHex from '../hex';

export function guid() {
    return (
        randomHex(8) + '-' +
        randomHex(4) + '-' +
        // v4 UUID always contain "4" at this position to specify it was
        // randomly generated
        '4' + randomHex(3) + '-' +
        // v4 UUID always contain chars [a,b,8,9] at this position
        choice(8, 9, 'a', 'b') + randomHex(3) + '-' +
        randomHex(12)
    );
}

export default guid;
