/**
 * Gets a random number inside range or snap to min/max values
 *
 * randomNumber([min], [max]):Number
 *
 * randomNumber();      // 448740433.55274725
 * randomNumber();      // -31797596.097682
 * randomNumber(0, 10); // 7.369723
 * randomNumber(0, 10); // 5.987042
 */

import MAX_INT from '../../constant/MAX_INT';
import MIN_INT from '../../constant/MIN_INT';

function randomNumber(min, max){
    min = min === null ? MIN_INT : min; // eslint-disable-line no-param-reassign
    max = max === null ? MAX_INT : max; // eslint-disable-line no-param-reassign

    return min + (max - min) * Math.random();
}

export default randomNumber;
