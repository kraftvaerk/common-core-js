/**
 * String interpolation. Format/replace tokens with object properties.
 *
 * interpolate(str, replacements[, syntax]):String
 *
 * const tmpl = 'Hello {{name}}!';
 * interpolate(tmpl, {name: 'World'});       // "Hello World!"
 *
 * const tmpl = 'Hello {{name.first}}!';
 * interpolate(tmpl, {name: {first: 'Lorem'}}); // "Hello Lorem!"
 *
 * It uses a mustache-like syntax by default but you can set your own
 * format if needed. You can also use Arrays for the replacements
 * (since Arrays are objects as well):
 *
 * // matches everything inside "${}"
 * const syntax = /\$\{([^}]+)\}/g;
 * const tmpl = "Hello ${0}!";
 * interpolate(tmpl, ['Foo Bar'], syntax); // "Hello Foo Bar!"
 */

// Typecast a value to a String, using an empty string value for null or undefined.
function toString(val){
    return val === null ? '' : val.toString();
}

/**
 * get "nested" object property
 * Returns nested property value. Will return undefined if property doesn't exist.
 * var lorem = {
 *        ipsum : {
 *            dolor : {
 *                sit : 'amet'
 *            }
 *        }
 *    };
 *
 * get(lorem, 'ipsum.dolor.sit'); // "amet"
 * get(lorem, 'foo.bar');         // undefined
 */
function get(obj, prop){
    let parts = prop.split('.'); // eslint-disable-line
    let last = parts.pop(); // eslint-disable-line

    while (prop = parts.shift()) { // eslint-disable-line
        obj = obj[prop]; // eslint-disable-line
        if (obj === null) return;
    }

    return obj[last]; // eslint-disable-line
}

// String interpolation
const stache = /\{\{([^}]+)\}\}/g; // mustache-like
function interpolate(template, replacements, syntax){
    template = toString(template); // eslint-disable-line no-param-reassign

    const replaceFn = function(match, prop){
        return toString( get(replacements, prop) );
    };

    return template.replace(syntax || stache, replaceFn);
}

export default interpolate;
