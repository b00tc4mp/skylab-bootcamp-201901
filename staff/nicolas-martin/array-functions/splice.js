/**
 * Abstracting of splice
 * 
 * Changes the contents of an array by removing or replacing 
 * existing elements and/or adding new elements.
 * 
 * @param {number} start - Index at which to start changing the array
 * if greater than the length of the array, actual starting index will 
 * be set to the length of the array. If start is not a number it will be
 * set to the length to the array
 * 
 * @param {number} deleteCount - An integer indicating the number of old array 
 * elements to remove.
 * 
 * @returns {Array} - An array containing the deleted elements. 
 * If only one element is removed, an array of one element is returned. 
 * If no elements are removed, an empty array is returned.
 */

 function splice(array, start, deleteCount){
  if (!(array instanceof Array)) 
    throw TypeError(array + ' is not an array');

  var result = [], cont = 0;
  start = start > array.length ? array.length : 
          start === undefined ? array.length : 
          start < 0 ? array.length + start :
          typeof start !== 'number' ? 0 : start;
  var from = start;
  // deleteCount = deleteCount > array.length - start ? array.length :
  //               deleteCount === undefined ? 0 : deleteCount;

  deleteCount = deleteCount === undefined ? 0 : deleteCount;
                
  while (start < array.length){
    result[cont] = array[start];
    cont++;
    start++;
  }

  array.length = from;
  
  return result;
 }