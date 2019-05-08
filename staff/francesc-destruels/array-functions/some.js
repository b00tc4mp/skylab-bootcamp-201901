

/**
 * The some() method tests whether at least one element in the array passes the test implemented by the provided function.
 * @param {array} array array to iterate
 * @param {function} callback function to proces the array
 */

var some = (function(array, callback){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var i;

    for (i = 0; i < array.length; i++){
        if(callback(array[i]) === true) {
            return true
        }
    }

    return false;
});