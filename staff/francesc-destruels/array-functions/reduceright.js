/**It will add each number of the array depeding if an initial value has been declared starting from the last value.
 * 
 * @param {array} array array to iterate
 * @param {function} callback function to call
 * @param {number} initial number to initialize
 */

var reduceright = (function(array, callback, initial) {
  "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    var i, acc = [], initial, newArray = [];
  
      if (initial === undefined){
        acc[0] = array[array.length -1];
        for (i = array.length -2; i >= 0; i--){
          acc[0] = callback(acc[0], array[i]);
        }
      } else {
        acc = initial;
        for (i = array.length -1; i >= 0; i--){
          acc[0] = callback(acc[0], array[i]);
        }
      }
      newArray[0] = acc[0];
      return newArray
  });
  