'use strict';

/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
function forEach(array, callback) {
	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

	for (var i = 0; i < array.length; i++)
		callback(array[i], i);
}

// var letters = ["a", "b", "c", "d", "e", "f"];
// var num = 0;
// var letters2 = [];

// (function loop(array, newArray, index) {
// 	if (index <= array.length - 1) {
// 		newArray[index] = array[index];
// 		index++
// 		loop(array, newArray, index);
// 	}
// })(letters, letters2, num);


// function forEach(array, callback) {
// 	callback(array, newArray, index);
// }

// console.log(forEach(letters, loop, letters2, num));


// For:

// var array = ["a","b","c","d","e","f"];
// var index = 0;
// var newArray = [];

// (function loop (array, newArray, index){

//   if (index <= array.length-1){
//      newArray[index] = array[index];
//      index++
//      loop(array, newArray, index);
//   }

// // })(array, newArray, index);

// function forEach(array, callback) {
// 	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
//  	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
// 	function forEach(array, callback, index) {
// 		if (index < array.length) {
// 			callback(array[index], index)

// 			_forEach(array, callback, index + 1);
// 		}
// 		_forEach(array, callback, 0);
// 	}
// }