'use strict';
/**
 * The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.
 * @param {Array} array 
 * @param {Number} valorinicial 
 * @param {Number} valorfinal 
 */
function slice(array, valorinicial, valorfinal){
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof valorinicial !== 'number') throw new TypeError(valorinicial + ' is not a number');
  if (typeof valorfinal !== 'number') throw new TypeError(valorfinal + ' is not a number');
  var acc = [];
  var index = 0;
   for ( var i = valorinicial; i <= valorfinal; i++){ 
     acc[index] = array[i];  
     index++;
   }
   return acc;
  }