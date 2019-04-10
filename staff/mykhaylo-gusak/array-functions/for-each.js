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
// }\\\



var result = [];
var numbers = [1, 2, 3, 4, 5, 6];
var n = 0;
var newArray = [];

function forEach(array,callback) {

	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

	if (n <= array.length - 1) {

		newArray[n] = callback(array[n]);
        n++;
		forEach(array,0);
		
	};
  
	return newArray;


};






result = forEach(numbers,);

console.log(result);

