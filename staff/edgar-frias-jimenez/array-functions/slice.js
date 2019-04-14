'use strict';
/**
 *
 * Function that returns an array that's a copy from the array given from start to end.
 *
 * @param {Array} array The array given where you take the content.
 * @param {number} start The index where to start taking elements.
 * @param {number} end The end where to stop taking elements.
 *
 * @returns New array with the content from start to end.
 */
function slice(array, start, end){
  if (array === undefined) throw TypeError(array + ' is not an array');
  if (typeof start !== 'number') throw TypeError(start + ' is not a number');
  if (typeof end !== 'number') throw TypeError(end + ' is not a number');

  if (start === 0) { // star is 0
    if(end === 'undefined') { // end is undefined and nothing applies to the array
      return array;
    } else if (end > 0 || end >= array.length) { // end is at least 1 or gretaer than array.length
      var helperArray = [];
      for(var i = 0; i < end; i++) {
        helperArray[helperArray.length] = array[i];
      }
      return helperArray;
    }
  } else if (start >= array.length) { // start is array.length or greater then nothing is done
    return new Array;
  } else if (start > 0) { // start is greater than 0
    if (end >= 1) { // end is positive
      var helperArray = [];
      for(var i = start; i < end; i++) {
        helperArray[helperArray.length] = array[i];
      }
      return helperArray;
    } else if (end < 0) { // end is negative index
      var helperArray = [];
      for(var i = start; i < (array.length+end); i++) {
        helperArray[helperArray.length] = array[i];
      }
      return helperArray;
    }
  } else if (start < 0) { // start is negative
    if (end >= 0 || Math.abs(end) >= Math.abs(start)) { // end is 0, positive value or greater than start, we return empty array.
      return new Array;
    } else if (end < 0) { // end is negative but smaller than start
      var helperArray = [];
      for(var i = array.length+start; i <= (array.length-1)+end; i++) {
        helperArray[helperArray.length] = array[i];
      }

      return helperArray;
    }
  }
};
