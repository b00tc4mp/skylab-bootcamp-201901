/**
 * Abstracting of shift
 * 
 * The shift() method removes the first 
 * element from an array and returns that removed element. 
 * This method changes the length of the array.
 * 
 * @param {array} array - the array to create the segment copy
 * 
 * @returns {*} - new Array with the elements from array
 */

 function shift(array){
  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  var firstElement = array.length > 0 ? array[0] : undefined;

  for (var i = 1; i < array.length; i++) array[i-1] = array[i];

  array.length = firstElement === undefined ? 0 : array.length - 1;
  
  return firstElement;
 }