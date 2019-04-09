/**
 * Returns true if the array includes the value
 * 
 * @param {Array} array 
 * @param {*} value 
 * 
 * @returns {boolean} True if the array includes the value
 */
function includes (array, value) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
    if (arguments.length === 1) return false;

    for (var i = 0; i < array.length; i++ ) {
        if (array[i] === value) return true;
    }
    return false;
}