/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
function forEach(array, callback) {
	for (var i = 0; i < array.length; i++)
		callback(array[i], i);
}