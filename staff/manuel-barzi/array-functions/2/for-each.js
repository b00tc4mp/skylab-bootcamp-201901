/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
function forEach(array, callback) {
	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
<<<<<<< Updated upstream:staff/manuel-barzi/array-functions/2/for-each.js

=======
	
>>>>>>> Stashed changes:staff/marc-uson/array-functions/for-each.js
	for (var i = 0; i < array.length; i++)
		callback(array[i], i);
}