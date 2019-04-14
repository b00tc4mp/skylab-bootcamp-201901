/**
 * create a new array with the elements that meet 
 * the condition given by the callback
 * 
 * @param {Array} arr - The array to filter
 * @param {Function} callback - The expression to evaluate.
 * 
 * @returns {Array} - A new array with the elements that pass the test. 
 * If no elements pass the test, an empty array will be returned.
 */

function filter(arr, callback) {
    if (!(arr instanceof Array)) throw TypeError(`${arr} is not an array`);
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
            result[result.length] = arr[i];
        }
    }
    return result;
}
