'use strict';

/**
 * Add new items to end of an array
 * 
 * @param {Array} array 
 * @param {*} ...items to add
 * 
 * @returns number of items added
 */
function push (array) {
  if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  for (var k = 1; k < arguments.length; k++) {
    array[array.length] = arguments[k];
  }
  return arguments.length - 1;
}