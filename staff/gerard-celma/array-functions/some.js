/**
 * Abstraction of some.
 * 
 * The some() method checks if any of the elements in an array pass a test (provided as a function).
 * 
 * @param {Array} arr 
 * @param {Function} callback
 * 
 * @throws {TypeError} - If array is not an array
 * @throws {TypeError} - If callback is not a function
 */

function some(arr,callback) {
    if(!(arr instanceof Array)) throw TypeError(arr+' should be an array');
    if(!(callback instanceof Function)) throw TypeError(callback+' should be a function');

    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];     
        if(callback(item))
            return true;
    }

    return false;
};
