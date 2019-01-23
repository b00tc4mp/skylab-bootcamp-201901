/**
 * Abstraction of filter.
 * 
 * Iterates an array and creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {*} array 
 * @param {*} callback
 * 
 * 
 * @returns {Array} 
 */

function filter(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

     var res = [];

     for (var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            res[res.length] = array[i];
        }
    }
    return res;
}; 