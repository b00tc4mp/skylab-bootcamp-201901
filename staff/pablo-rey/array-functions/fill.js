/**
 * Modifies the array given to replace the values from start to end indexes
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start Index to start. Default 0
 * @param {number} end End index (not included). Default the length of array
 */
function fill (array, value, start, end) {
  if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var relativeStart = parseInt(start);
  if (isNaN(relativeStart)) {
    relativeStart = 0;
  } 
  var len = array.length;
  var k = (relativeStart < 0) ? Math.max(len + relativeStart,0) : Math.min(relativeStart, len);
  var relativeEnd = (typeof end === "undefined") ? len : parseInt(end);
  var final = (relativeEnd < 0) ? Math.max(len+relativeEnd,0) : Math.min(relativeEnd, len);

  while (k < final) {
    array[k] = value;
    k++;
  }
  return array;
}

