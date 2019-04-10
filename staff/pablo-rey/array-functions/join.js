'use strict';

/**
 * Concatenate all elements  in a string separated by the separator
 * 
 * @param {Array} array 
 * @param {string} separator Optional. Inserted between each element. Default: ,
 * 
 * @returns {string} All elements concatenated with the separator between
 */
function join (array, separator) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var result = array[0];
  var _separator = arguments.length === 1 ? ',' : String(separator);
  for (var k = 1; k < array.length; k++) {
    result = result + _separator + array[k];
  }
  return result;
}