/**
 * returns the first index of the passed array that satisfies the condition provided in the callback function
 * 
 * @param {Array} array 
 * @param {Function} callback 
 */

function findIndex(array, callback){
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< HEAD
=======
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

>>>>>>> develop
=======
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

>>>>>>> Stashed changes
=======
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

>>>>>>> Stashed changes
    for(var i = 0; i < array.length; i++){
        if (callback(array[i])) return i;
    }
    return undefined;
}