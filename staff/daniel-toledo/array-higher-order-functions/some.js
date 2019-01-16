/**
 * 
 * Abstraction some
 * 
 * this method tests whether at least one element in the array 
 * passes the test implemented by the provided function.
 * 
 * @param {Array} arr - Array to find if there is some that satisfies function
 * @param {Function} callback - function to satisfy
 * 
 * @returns {Boolean} - true is there is some, false if theres is any
 */

function some(arr, callback){

    if(arguments.length >2) throw Error('too many arguments')

    if(!(arr instanceof Array)) throw TypeError(arr+' should be an Array')

    if (!(callback instanceof Function)) throw TypeError(func + ' should be a function')

    for (var i=0; i<arr.length; i++){
        var value = arr[i]
        if (callback(value)) return true
    }

    return false

}