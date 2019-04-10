/**
 *
 * Function that filters an array with a provided callback, and then returns a new array in results.
 *
 * @param {Array} array Array to filter.
 * @param {Function} callback Function callback to filter the given array.
 *
 * @returns {Array} Array as a result after been filtered.
 */

function filter(array, callback) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var newArray = [];

  for (var i = 0; i < array.length; i++) {
		if (callback(array[i])) {
      newArray[newArray.length] = array[i];
    };
  }

  return newArray;
}