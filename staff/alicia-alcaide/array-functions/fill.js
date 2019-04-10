/**
 * Fills (modifies) all the elements of an array from a start index (default zero) to an end index 
 * (default array length) with a static value. It returns the modified array. 
 *
 * @param {Array} array     Array to iterate
 * @param {*} value         value used to fill the element of the array
 * @param {number} start    index to start filling. Default 0
 * @param {[number]} end    index to end filling. Default the length of the array
 */

'use strict';


function fill (array, value, start, end) {

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof value !== 'string' && typeof value !== 'number') throw TypeError(value + ' is not a number or string');
  if (typeof start !== 'number')  throw TypeError(start + '(start) is not a number');
  if (typeof end !== 'undefined' && typeof end !== 'number') throw TypeError(end + ' is not a number');
  
  var posStart = start || 0;
  var posEnd = end || array.length;
  while (posStart < posEnd) {
    array[posStart] = value;
    posStart++;
  }
  return array;

}
