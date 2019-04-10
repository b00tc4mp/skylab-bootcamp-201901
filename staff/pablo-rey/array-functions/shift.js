'use strict';

/**
 * Removes the first element of an array and returns it
 * 
 * @param {Array} array 
 * 
 * @returns {*} The element removed
 */
function shift(array) {
  if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var len = array.length;
  var result = array[0];
  for(var i = 0; i < len - 1; i++) {
    array[i] = array[i+1];
  }
  array.length = len - 1;  
  return result;
}