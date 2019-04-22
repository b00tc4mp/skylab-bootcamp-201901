'use strict';

/**
 * Function that concatenate values from an array and returns a string.
 *
 * @param {array} array The array we want to concatenate.
 * @param {[string]} element Optional - If is given it will be inserted between array values.
 *
 * @return {string} The final string with the concatenated array.
 */
function join(array, element) {
	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  var helper = '';
  for (var i = 0; i < array.length; i++) {
    helper += array[i];

    if (i != (array.length-1)) {
      if(element) {
        helper += element;
      } else {
        helper += ',';
      }
    }
  }

  return helper;
}