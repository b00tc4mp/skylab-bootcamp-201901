/**
 * 
 * Abstraction some
 * 
 * this method tests whether at least one element in the array 
 * passes the test implemented by the provided function.
 * 
 * @param {Array} array - Array to find if there is some that satisfies function
 * @param {Function} callback - function to satisfy
 * 
 * @throws {TypeError} - when array is not an Array
 * @throws {TypeError} - when callback is not a Function
 * 
 * @returns {Boolean} - true is there is some, false if theres is any
 */

function some(array, callback){

    
    if(!(array instanceof Array)) throw TypeError(array+' should be an Array')

    if (!(callback instanceof Function)) throw TypeError(callback + ' should be a function')

    for (var i=0; i<array.length; i++){
        var value = array[i]
        if (callback(value)) return true
    }

    return false

}