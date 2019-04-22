'use strict';
/**
 *  method applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value.
 * 
 * @param {Array} Arrays and/or values to concatenate into a new array. If valueN is undefined, concat returns a shallow copy of the existing array on which it is called. See the description below for more details.
 * @param {callback} function (variable to save, array to iterates) Function to execute on each element in the array, taking four arguments
 *  
 * @returns {Array} A new Array instance. 
 */

function reduceRight(array, callback) {

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
	if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
  if (typeof array === 'undefined') throw new TypeError(array + ' is undefined');

  var newArray = [];

  for (var i = array.length -1; i >= 0  ;i--){

    newArray = callback(newArray, array[i]);

  }

 return newArray;

}