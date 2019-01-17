/**
 * Abstraction of some.
 * 
 * Tests whether at least one element in the array passes the test implemented by the provided function.
 * 
 * @param {*} array 
 * @param {*} callback 
 * 
 * @throws {TypeError} -if array is not an array.
 * @throws {TypeError} -if callback is not an function.
 * 
 * @returns {Boolean}
 */

function some(array,callback){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i =0; i < array.length; i++) {
        if (callback(array[i]) === true) return true; 
    }
    return false
};
