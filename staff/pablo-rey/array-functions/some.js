/**
 * Iterates an array and evaluates an expression on each of its values, returning true if any of them match it. Otherwise returns false.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evalute.
 * 
 * @returns {boolean} True if at least one value match the expression, otherwise false.
 */
function some(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array))  {
            return true;
        }
    }
    return false;
}