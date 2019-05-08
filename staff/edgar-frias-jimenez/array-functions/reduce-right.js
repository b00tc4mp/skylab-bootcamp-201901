'use strict';

/**
 *
 * Function that applies a callback into an accumulator from right to left. Then it returns a unique value.
 *
 * @param {Array} array The array that will be transform and reduced.
 * @param {Function} callback Function that will transform each array value.
 * @param {[Value]} initialValue Optional - If passed, it will be the first item to transform.
 *
 * @returns The product of the callback over the accumulator.
 */

function reduceRight(array, callback, initialValue) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

  var arrLength = array.length-1;
  var i = arrLength - 1;
  var prevValue = array[arrLength];
  var currentValue = array[arrLength-1];

  if (initialValue) {
    i = arrLength;
    prevValue = initialValue;
  }

  for (i; i >= 0; i--) {
    currentValue = array[i];
    prevValue = callback(prevValue, currentValue);
  }

  return prevValue;
}