/**
 * check if at least one element of the array complies with the condition implemented by the provided function.
 *
 * @param {Array} arr - The array to work
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {Boolean} - tests whether at least one element 
 * in the array passes the test implemented by the provided function.
 */

function some(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            return true;
        }
    }
    return false;
}
