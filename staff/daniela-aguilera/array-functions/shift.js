'use strict';
/**
 * Method removes the first element from an array and returns that removed element. This method changes the length of the array.
 * 
 * @param {Array} array 
 * 
 * @returns {*} 
 */

function shift(array) {
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  var temp = array[0];
  var acc = [];

  for (var i = 1; i <= array.length - 1; i++) {
    acc[i - 1] = array[i];
  }
  array = acc;
  return temp;
}