/**
 * Abstracting of unshift
 * 
 * Adds one or more elements to the beginning of an array 
 * this method change the original array
 * 
 * @param {Array} array - array to working with
 * @param {*} element - element to add at the beggining of the array
 * 
 * @returns {*} - returns the new length of the array 
 */

 function unshift(array){
  if (!(array instanceof Array)) 
    throw TypeError(array + ' is not an array');
  for (var j = arguments.length - 1; j > 0; j--) {
      for (var i = array.length; i > 0; i--) {
        array[i] = array[i-1];
      }
      array[0] = arguments[j];
  }
  return array.length;
 }