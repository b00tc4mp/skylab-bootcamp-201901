'use strict';
/**
 * Method executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 * @param {*} array array to iterate
 * @param {*} callback Function to execute on each value in the array
 * @param {*} initialValue Object to use as the first argument to the first call of the callback
 */
function reduceRight(array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    var acc = array[array.length - 1];
    if (initialValue) {
        acc = initialValue;
        var a = array.length -1;
    }else{
        a = array.length-2;
    }
    
    for (var i = a; i >= 0; i--) {
        acc = callback(acc, array[i]);

    }
    return acc;
};