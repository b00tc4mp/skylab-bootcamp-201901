'use strict';

/**
 *
 * Function that applies a callback into an accumulator. Then it returns a unique value.
 *
 * @param {Array} array The array that will be transform and reduced.
 * @param {function} callback Function that will transform each array value.
 * @param {[Value]} initialValue Optional - If passed, it will be the first item to transform.
 *
 * @returns The product of the callback over the accumulator.
 */

function reduce(array, callback, initialValue) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var i = 1;
  var prevValue = array[0];
  var currentValue = array[1];

  if (initialValue) {
    i = 0;
    prevValue = initialValue;
  }

  for (i; i < array.length; i++) {
    currentValue = array[i];
    prevValue = callback(prevValue, currentValue);
  }

  return prevValue;
}
