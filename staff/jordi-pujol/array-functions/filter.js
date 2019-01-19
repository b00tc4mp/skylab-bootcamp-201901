/**
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 * @param {*} thisArg
 * 
 *  @throws {TypeError} if it is not an array or a function
 * 
 * @returns {Array} new array
 */

function filter(arr, callback, thisArg){
    
    if (arguments.length > 2) throw Error('too many arguments');

    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');




}