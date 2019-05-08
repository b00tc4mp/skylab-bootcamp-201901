
/**
 * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
 * @param {array} array array to iterate
 * @param {function} callback function to apply;
 */

var filter = (function(array, callback){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    
    var i, newArray = [], j = 0;

    for (i = 0; i < array.length; i++){
        if (callback(array[i])){
            newArray[j] = array[i];
            j++
        }
    }
    return newArray;
});