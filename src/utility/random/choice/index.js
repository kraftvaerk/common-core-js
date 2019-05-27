/**
 * Returns a random element from the supplied arguments
 * or from the array (if single argument is an array).
 *
 * choice(...items):*
 *
 * choice(1, 2, 3, 4, 5); // 3
 *
 * choice(['lorem', 'ipsum', 'dolor']); // 'dolor'
 */
import randomInt from '../int';

function choice(items) {
    const target = (arguments.length === 1 && Array.isArray(items)) ? items : arguments;
    return target[ randomInt(0, target.length - 1) ];
}

export default choice;
