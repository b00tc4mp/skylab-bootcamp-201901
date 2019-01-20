/**
 * 
 * Abstraction of filter
 * 
 * Creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 * @param {*} thisArg
 * 
 *  @throws {TypeError} if it is not an array or a function
 * 
 * @returns {Array} new array
 */

function filter(arr, callback){
    
    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')
    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function') 

    var ret = [];

    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i]) === true){

            ret[ret.length] = arr[i]
        }
    }

    return ret
}