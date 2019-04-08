/**
 * Returns true if the array includes the value
 * 
 * @param {Array} array 
 * @param {*} value 
 * 
 * @returns {boolean} True if the array includes the value
 */
function includes (array, value) {
    for (var i = 0; i < array.length; i++ ) {
        if (array[i] === value) return true;
    }
    return false;
}