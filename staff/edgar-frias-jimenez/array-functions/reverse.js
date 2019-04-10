'use strict';

/**
 * Function that given an array it will returns a new array reversed.
 *
 * @param {Array} array The array that you want to reverse.
 *
 * @returns {Array} The new array reversed!
 */

function reverse(array) {
  var newArray = [];

  // helper array to flip the original array
  for( var i = array.length-1; i >= 0; i--) {
    newArray[newArray.length] = array[i];
  }

  // here you overwrite the original array values
  for(var i = 0; i < newArray.length; i++) {
    array[i] = newArray[i];
  }

  console.log('Array reversed:', array);
}