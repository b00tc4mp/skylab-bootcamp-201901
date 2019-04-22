
'use strict';

/**
 * method creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {Array} array array to iterate
 * @param {Function} callback to test each element of the array.
 */
function filter(array, callback) {
   if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
   if((typeof callback !== 'function')) throw TypeError(callback + ' is not a function');
   var newArray = [];
   for(var i=0; i<array.length;i++){
      if(callback(array[i])){
         newArray[newArray.length] = array[i];
      }

   }
   return newArray;

}
