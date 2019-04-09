
/**It will add each number of the array depeding if an initial value has been declared.
 * 
 * @param {array} array array to iterate
 * @param {function} callback function to call
 * @param {number} initial number to initialize
 */

var reduce = (function(array, callback, initial) {
  "use strict";
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

  var i, acc = [], initial, newArray = [];

    if (initial === undefined){
      acc[0] = array[0];
      for (i = 1; i < array.length ; i++){
        acc[0] = callback(acc[0], array[i]);
      }
    } else {
      acc[0] = initial;
      for (i = 0; i < array.length; i++){
        acc[0] = callback(acc[0], array[i]);
      }
    }
    newArray[0] = acc[0];
    return newArray
});
