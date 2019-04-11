'use strict';

/**
 * creates and returns a new string by concatenating all of the elements in an array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
 * 
 * @param {Array} arr The array to concatenate.
 * @param {[*]} separator The specified separator string.
 * 
 * @returns {String} The concatenating string.
 */
function join(arr, separator) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    var result = '';
    for(var i = 0; i < arr.length; i++) {
        result += arr[i];
        if(separator && arr.length > 1 && i < arr.length-1) {
            result += separator;
        } else if(separator === undefined && i < arr.length-1) {
            result += ',';
        }
    }
    return result;
}