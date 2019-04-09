/**
 * Iterate an array and evaluate an expression on each of its values, returning a new array with the values that match it.
 * 
 * @param {Array} arr The array to iterate
 * @param {Function} callback The expression to evaluate
 * 
 * @returns {Array} The new array
 */
function filter(arr, callback) {
    var result = [];
    var j = 0;
    for(var i = 0; i < arr.length; i++) {
        if(callback(arr[i])) {
            result[j] = arr[i];
            j++; 
        }
    }
    return result;
}