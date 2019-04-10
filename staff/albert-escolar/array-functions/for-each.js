'use strict';

/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
// function forEach(array, callback) {
// 	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
// 	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

// 	for (var i = 0; i < array.length; i++)
// 		callback(array[i], i);
// }


//RECURSIVE (without for)

var array = [1, 2, 3];

function forEach(array, callback) {
	if(!(array instanceof Array))throw TypeError('undefined is not an array')
	var i = 0;
	var newArray = [];
	function looper() {
		if (i <= array.length-1) {
			newArray[i] = callback(array[i], i);
			i += 1;
			looper();
		}

	}
	looper();
	return newArray;
}

forEach(array, function (x, b) {return x + b });