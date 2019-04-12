'use strict';
/**
 * Method executes a reducer function (that you provide) on each member of the array resulting in a single output value.
 * 
 * @param {*} array 
 * @param {*} callback 
 * @param {*} initialValue 
 */
function reduceRight(array, callback, initialValue) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');
    var acc = array[array.length];
    if (initialValue) {
        acc = initialValue;
        var a = 0;
    }else{
        a = array.length;
    }
    for (var i = a; i = 0; i--) {
        acc = callback(acc, array[i]);

    } 
    return acc;
};