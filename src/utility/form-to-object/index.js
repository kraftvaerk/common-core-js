// [REFERENCE]: https://code.lengstorf.com/get-form-values-as-json/
// @elements:    html elements[] => html elements to objectify
// @exclusions:  values to exclude[] => values to ignore



// helper functions
const isValidElement = (element) => {
    return element.name && element.value;
};
const isValidValue = (element, exclusions) => {
    return !exclusions.includes(
        (!['checkbox', 'radio'].includes(element.type) || element.checked)
    );
};
const isCheckbox = (element) => {
    return element.type === 'checkbox';
};
const isFileupload = (element) => {
    return element.type === 'file';
};
const isMultiSelect = (element) => {
    return element.options && element.multiple;
};
const getSelectedFiles = (element) => {
    const result = [];
    for (let i = 0; i < element.files.length; i++) result.push(element.files[i]);
    return result.length ? result : null;
};
const getSelectValues = (options) => [].reduce.call(options, (values, option) => {
    return option.selected ? values.concat(option.value) : values;
}, []);

const formToObject = (elements = [], exclusions = []) => {
    // no elements
    if (!elements || !elements.length) return {};

    // form to data
    return [].reduce.call(elements, (data, element) => {
        if (isValidElement(element, exclusions) && isValidValue(element)) {
            if (isCheckbox(element)) data[element.name] = (data[element.name] || []).concat(element.value);
            else if (isMultiSelect(element)) data[element.name] = getSelectValues(element);
            else if (isFileupload(element)) data[element.name] = getSelectedFiles(element);
            else data[element.name] = element.value;
        }
        return data;
    }, {});
};

export default formToObject;
