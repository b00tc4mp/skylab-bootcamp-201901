'use strict';

/**
 * Remove the last elementof an array
 * 
 * @param {Array} array 
 * 
 * @returns element deleted
 */
function pop (array) {
  if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var result = array[array.length-1];
  array.length = array.length - 1;
  return result;
}