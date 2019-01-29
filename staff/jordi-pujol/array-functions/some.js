/**
 * 
 * Abstraction of some
 * 
 * Tests whether at least one element in the array passes the test implemented by the provided function
 * 
 * @param {Array} arr 
 * @param {Function} callback
 * 
 * @throws {TypeError} If arr is not an array or callback not a function
 * 
 * @returns {Boolean} If callback is true or not
 */

function some(arr, callback){

    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')
    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function') 

    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i]) === true) return true
    }

    return false
}