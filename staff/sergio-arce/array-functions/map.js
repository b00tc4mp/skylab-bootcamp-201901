/**
 * creates a new array with the results of calling a provided 
 * function on every element in the calling array.
 * 
 * @param {Array} arr The array to iterate.
 * @param {Function} callback The expression to evaluate.
 * 
 * @returns {Array}
 */

function map(arr, callback){

	if (!(arr instanceof Array)) throw TypeError(`${arr} in not an array`);
	if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);

	var newArry = [];
	for (var i = 0; i < arr.length; i++) {
 		newArry[i] = callback(arr[i])
	}
	return newArry;
}