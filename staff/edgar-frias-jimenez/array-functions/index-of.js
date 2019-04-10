'use strict';

/**
 *
 * A function that returns the first index that corresponds with the position in the array of the given value.
 *
 * @param {Array} array Array where you want to find an item.
 * @param {Value} element Element you want to search inside the provided array.
 *
 * @returns {Value} Value of the index from the element you search for.
 */

function indexOf(array, element) {
  if (array === undefined) throw TypeError(array + ' is not an array');
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  if (element === undefined) throw TypeError(element + ' is not a valid element');
  if (typeof element !== 'number') throw TypeError(element + ' is not a valid element');

  var helperVal = 0;
  for(var i = 0; i < array.length; i++) {
    if(array[i] === element) {
      return helperVal >= i ? helperVal : helperVal = i;
    } else if (i === array.length-1){
      return -1;
    }
  }
}