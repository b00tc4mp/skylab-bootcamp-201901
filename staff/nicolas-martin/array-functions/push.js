/**
 * Add one or more elements at the end of the array
 * 
 * @param {Array} array 
 * @param {*} element 
 * 
 * @returns {number} - the new length of the array
 */

function push() {
    var array = arguments[0];
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    for (var i = 1; i < arguments.length; i++) {
        array[array.length] = arguments[i];   
    }
    return array.length;
}