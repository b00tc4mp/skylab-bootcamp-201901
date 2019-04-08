/**
 * Modifies the array given to replace the values from start to end indexes
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start Index to start. Default 0
 * @param {number} end End index (not included). Default the length of arrayt
 */
function fill (array, value, start, end) {
  var i = start || 0;
  var _end = end || array.length;
  while (i < _end) {
    array[i] = value;
    i++;
  }
  return array;
}

