/**
 * Returns the value of the first element in the array that satisfies the provided testing function. 
 * Otherwise undefined is returned.
 * 
 * @param {Array} array     - The array to filter
 * @param {Function} callback  - The expression to evaluate.
 * 
 * @returns {*} - The value of the first element in the array that satisfies the provided 
 *                    testing function; otherwise, undefined is returned.
 */

function find(array, callback) {

	for (var i = 0; i < array.length; i++) {
        if(callback(array[i])) return array[i];
    }
}