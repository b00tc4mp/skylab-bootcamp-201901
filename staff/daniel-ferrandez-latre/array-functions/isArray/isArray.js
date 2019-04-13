/**
 * Check wheter the param entered is an Array or not
 * 
 * @param {Array} array The array to iterate.
 * 
 * @returns {boolean} True if all values match the expression, otherwise false.
 */
function isArray(array) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(arguments.length > 1) {
        throw new Error(' to many arguments passed.');
    }
    return array instanceof Array;
}