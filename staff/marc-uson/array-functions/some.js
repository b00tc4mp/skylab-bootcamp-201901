/**
 * 
 * @param {Array} array 
 * @param {any} value 
 * @param {Function} callback 
 */

function some(array, callback){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for(var i = 0; i< array.length; i++) if (callback(array[i])) return true;

    return false;
    
}