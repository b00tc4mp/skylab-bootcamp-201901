'use strict';
/**
 * Function that gets the first item inside of an array and return it, it also modify the length of the given array.
 *
 * @param {Array} array The given array to extract the element
 *
 *
 * @returns The element that you want to extract from the array.
 */

function shift(array) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  if (array.length !== 0) {
    var returnedEelement = array[0];
    var arrayHelper = array;

    for (var i = 0; i < array.length; i++) {
      array[i] = arrayHelper[i+1];
    }

    array.length = array.length-1;

    return returnedEelement;
  }

  return undefined;
}