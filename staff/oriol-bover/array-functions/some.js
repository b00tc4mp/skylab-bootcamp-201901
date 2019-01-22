/**
 * Abstraction of some
 * 
 * Iterate an array and tests whether at least one element in the array passes the test implemented by the provided function.
 * 
 * 
 * @param {Array} array 
 * @param {Function} callback 
 * 
 * @returns {Boolean} true if the callback function returns a truthy value for any array element; otherwise, false.
 */

function some(array, callback) {
    if(!(array instanceof Array)) throw TypeError(array+' should be Array type');
    if(!(callback instanceof Function)) throw TypeError(callback+' should be Array type');


    for (var i = 0; i < array.length; i++) {
        var element = array[i];     
        if(callback(element))
            return true;
    }

    return false;
}