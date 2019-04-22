/**
 * Returns New array with the value returned by the callback for each element
 * 
 * @param {Array} array  the array to iterate
 * @param {Function} callbackfn  the expression to evaluate
 * 
 * @returns {Array} New array with the value returned by the callback for each element
 */

'use strict';

 function map (array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function');


    var newArry = [];
	for (var i = 0; i < array.length; i++) {
 		newArry[i] = callback(array[i])
	}
	return newArry;

} 
