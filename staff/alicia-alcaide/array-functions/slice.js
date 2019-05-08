/**
 * Returns a new array with the elements between start index and end index (this not included)
 * 
 * @param {Array}    array  Array to iterate
 * @param {[number]} begin  Zero-based index at which to begin extraction.
 * @param {[number]} end    Zero-based index before which to end extraction. 
 *                          slice extracts up to but not including end.
 * 
 * @returns {Array} A new array containing the extracted elements.
 */

'use strict'; 

 function slice (array, begin, end) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  var start = begin || 0;
  var last = end || array.length;
  var result = [];
  for (var i = start; i < last; i++) {
    result[i-start] = array[i];
  }
  return result;
} 