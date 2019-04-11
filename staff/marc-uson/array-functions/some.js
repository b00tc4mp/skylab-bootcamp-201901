/**
 * 
 * @param {Array} array 
 * @param {any} value 
 * @param {Function} callback 
 */

function some(array, callback){
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an arrayyyy');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for(var i = 0; i< array.length; i++) if (callback(array[i])) return true;

    return false;
    
}