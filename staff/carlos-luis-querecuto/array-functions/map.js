'use strict';

/**
 * Gives you a new array made of elements that were modified each one by your callback
 * 
 * @param {Array} array The array to operate
 * @param {Expresion} callback The expression to evalute with each element of the array
 * 
 * @return {array} a new array made of modified elements
 */
function map(array,callback){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    var array2= [];
    for (var i = 0; i < array.length; i++){
        array2[i]=callback(array[i])
    }
    return array2;
}