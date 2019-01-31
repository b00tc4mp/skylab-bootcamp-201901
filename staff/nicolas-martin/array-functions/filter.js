/**
 * Abstraction of filter.
 * 
 * creates a new array with all elements that pass the 
 * test implemented by callback function.
 * 
 * @param {Array} array - The array to filter
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {*} - A new array with the elements that pass the test. 
 * If no elements pass the test, an empty array will be returned.
 */
function filter(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) result[result.length] = array[i];
    }
    return result;
}