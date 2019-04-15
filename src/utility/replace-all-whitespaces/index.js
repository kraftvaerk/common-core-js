const replaceAllWhitespaces = (string = '', replaceWith = '') => {
    if (typeof string !== 'string') throw new TypeError('string argument is not a string', string);
    if (typeof replaceWith !== 'string') throw new TypeError('replaceWith argument is not a string', replaceWith);

    return string.replace(/\s+/g, replaceWith);
};

export default replaceAllWhitespaces;
