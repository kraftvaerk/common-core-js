// replaces placeholder values sing the object properties; object must be a of single depth
// i.e. (/api/{userID}/get/email, { userID: 123 } => returns userID placeholder replaced with the object.userID value
// @string:     string => string with placeholder params {n}
// @object:     object => flat object with properties matching the placeholder params
export const replaceStringParams = (string = '', object = {} /* flat object */) => {
    const regex = /{(.*?)}/g;
    const result = string.replace(regex, (match) => { return object[match.substring(1, match.length - 1)]; });
    return result;
};
