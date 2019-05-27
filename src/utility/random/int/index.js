/**
 * Gets random integer inside range or snap to min/max values.
 *
 * randInt([min], [max]):Number
 *
 * randomInt();      // 448740433
 * randomInt();      // -31797596
 * randomInt(0, 10); // 7
 * randomInt(0, 10); // 5
*/

import MAX_INT from '../../constant/MAX_INT';
import MIN_INT from '../../constant/MIN_INT';
import randomRange from '../range';

function randomInt(min, max){
    min = min === null ? MIN_INT : ~~min; // eslint-disable-line no-param-reassign
    max = max === null ? MAX_INT : ~~max; // eslint-disable-line no-param-reassign

    // can't be max + 0.5 otherwise it will round up if `rand`
    // returns `max` causing it to overflow range.
    // -0.5 and + 0.49 are required to avoid bias caused by rounding
    return Math.round( randomRange(min - 0.5, max + 0.499999999999) );
}

export default randomInt;
