'use strict';

/**
 * Function that lets you concatenate an array inside another array
 *
 * @param {Array} arrayA The array which is the target where you will put the content from the second array.
 * @param {Array} arrayB The array that you will put inside the first array.
 *
 * @returns {Array} The sum of the two arrays.
 */

function concat(arrayA, arrayB) {
  if (!(arrayA instanceof Array)) throw TypeError(arrayA + ' is not an array');
  if (arrayA === undefined) throw new TypeError(arrayA + ' invalid element');

  var arrayResult = [];

  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];

    if (element instanceof Array) {
      for(var j = 0; j < element.length; j++) {
        arrayResult[arrayResult.length] = element[j];
      }
    } else {
      arrayResult[arrayResult.length] = element;
    }
  }

  return arrayResult;
}
