/**
 * Join all the elements of the array
 * @param {Array} array
 * @param {Element} separator
 */
function join(array, separator) {
  if (!(array instanceof Array)) throw TypeError(array + " is not an array");
  var value = "";
  if (array.length !== 0) {
    var i = 0;
    do {
      if (arguments.length < 2) {
        value += array[i] + ",";
      } else {
        value += array[i] + separator;
      }
      i++;
    } while (i < array.length - 1);
    value += array[i];
  }
  return value;
    
  
}
