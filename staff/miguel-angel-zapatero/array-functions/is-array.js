/**
 * Determines if the passed value is an Array or not.
 * 
 * @param {Array} array The array to check. 
 * 
 * @returns {boolean} True if is an array, otherwise false.
 */

function isArray(array) {
    if (array instanceof Array) return true;
    return false;
}