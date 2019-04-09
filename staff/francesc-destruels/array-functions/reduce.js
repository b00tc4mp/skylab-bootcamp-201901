
/**It will add each number of the array depeding if an initial value has been declared.
 * 
 * @param {array} array array to iterate
 * @param {function} callback function to call
 * @param {number} initial number to initialize
 */

function reduce(array, callback, initial) {
  var i, acc, initial, newArray = [];

    if (initial === undefined){
      acc = array[0];
      for (i = 1; i < array.length ; i++){
        acc = callback(acc, array[i]);
      }
    } else {
      acc = initial;
      for (i = 0; i < array.length; i++){
        acc = callback(acc, array[i]);
      }
    }
    newArray[0] = acc;
    return newArray
}

var array3 =  [1, 3, 3]