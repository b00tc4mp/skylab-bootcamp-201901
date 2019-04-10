'use strict';

/**
 * Function that will return the given array without its last value.
 *
 * @param {Array} array The given array.
 *
 * @returns An array without its last value.
 */

function pop(array) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  if (array.length) {
    array.length-=1;

    return array;
  }
}
