/**It will add each number of the array depeding if an initial value has been declared starting from the last value.
 * 
 * @param {array} array array to iterate
 * @param {function} callback function to call
 * @param {number} initial number to initialize
 */

function reduceright(array, callback, initial) {
    var i, acc, initial, newArray = [];
  
      if (initial === undefined){
        acc = array[array.length -1];
        for (i = array.length -2; i >= 0; i--){
          acc = callback(acc, array[i]);
        }
      } else {
        acc = initial;
        for (i = array.length -1; i >= 0; i--){
          acc = callback(acc, array[i]);
        }
      }
      newArray[0] = acc;
      return newArray
  }
  
  var array3 =  [1, 3, 3]