
/**
 * Iterates an array and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evalute.
 * @returns {boolean} True if all values match the expression, otherwise false.
 */

var every = function (array, callback) {
    var i = 0;

    while (i < array.length) {
        if (callback(array[i])) {
            i++;
        } else {
            return false;
        }
    }

    return true;
}