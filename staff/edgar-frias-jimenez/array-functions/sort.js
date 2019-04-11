'use strict';
/**
 *
 * Function that sort elements and then return the resulting array.
 *
 * @param {Array} array The array desired to sort.
 *
 * @returns The array sorted.
 */

function sort(array, callback){
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (arguments.length > 1 && (typeof callback !== 'function')) throw TypeError(callback + ' is not a function');

  var arrayLength = array.length;

  for (var j = 0; j < arrayLength-1; j++) {
    for (var i = 0; i < arrayLength; i++) {
      if (callback) {
        callback(array[i], array[i+1]);
      } else if (array[i] > array[i + 1]) {
        var swap = array[i + 1];
        array[i + 1] = array[i];
        array[i] = swap;
      }
    }
  }

  return array;
}
