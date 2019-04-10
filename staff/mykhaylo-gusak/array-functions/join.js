'use stric'

/**
 * method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
 * @param {array} An existing Array.
 * @param {separator}Specifies a string to separate each pair of adjacent elements of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma (","). If separator is an empty string, all elements are joined without any characters in between them.
 *
 *  @returns {Array} A string with all array elements joined. If arr.length is 0, the empty string is returned.
 */

function join(array, separator) {

  if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  if (typeof separator === 'function') throw new TypeError(separator + ' is a function');

  var newString = '';

  for (var i = 0; i < array.length; i++) {
    newString = newString + array[i] + separator
    
  }

  return newString

}
