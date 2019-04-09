/**
 * creates a new array with the results of calling a provided 
 * function on every element in the calling array.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */

function map(arr, callback){
	var newArry = [];
	for (var i = 0; i < arr.length; i++) {
 		newArry[i] = callback(arr[i])
	}
	return newArry;
}