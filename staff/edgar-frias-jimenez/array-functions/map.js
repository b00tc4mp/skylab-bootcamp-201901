'use strict';
/**
 * Function that creates a new array as a result of apply a callback above each element inside an given array.
 *
 * @param {Array} array The array where to apply our callback.
 * @param {function} callback Function that will be applied to each element inside the given array.
 *
 * @returns Array as a result of the callback over the given array elements.
 */

function map(array, callback) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var helperArray = [];

  for (var i = 0; i < array.length; i++) {
    helperArray[i] = callback(array[i]);
  }

  return helperArray;
}
