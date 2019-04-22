'use strict';
/**
 *
 * Function that adds a new element/s to the given array and returns the new length of it.
 *
 * @param {Array} array The array where to insert the new element.
 * @param {*} element The desired element to add.
 *
 * @returns The array's new length.
 */

function push(array, element) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (element === undefined) throw TypeError(element + ' is not a valid element');

  if (arguments.length > 1) {
    for(var i = 1; i < arguments.length; i++) {
      array[array.length] = arguments[i];
    }
  } else {
    array[array.length] = element;
  }

  return array.length;
};