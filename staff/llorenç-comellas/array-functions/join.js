/**
 * method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), 
 * separated by commas or a specified separator string. If the array has only one item, then that item will be 
 * returned without using the separator.
 * @param {Array} array 
 * @param {string} separator 
 * 
 * @returns {string} 
 */
function join(array, separator) {
    var results = '';
    for (var i = 0; i < array.length; i++) {
        results += array[i];
        if (i < array.length - 1) {
            results += separator
        }
    }
    return results
}


