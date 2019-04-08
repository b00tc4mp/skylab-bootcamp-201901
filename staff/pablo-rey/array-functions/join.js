/**
 * Concatenate all elements  in a string separated by the separator
 * 
 * @param {Array} array 
 * @param {string} separator Optional. Inserted between each element. Default: empty
 * 
 * @returns {string} All elements concatenated with the separator between
 */
function join (array, separator) {
  var result = array[0];
  var _separator = (typeof separator !== 'string') ? '' : separator;
  for (var i = 1; i < array.length; i++) {
    result = result + _separator + array[i];
  }
  return result;
}