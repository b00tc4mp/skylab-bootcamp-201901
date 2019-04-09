/**
 * Returns a new array with all elements of array1 and array2
 * 
 * @param {Array} array1 
 * @param {Array} array2
 * 
 * @return {Array} All elements of array1 and array2
 */

function concat (...arguments) {
  var result = [];
  for (var a = 0; a < arguments.length; a++) {
    var elem = arguments[a];
    if (elem instanceof Array) {
      for (var i = 0; i < elem.length; i++) {
        result[result.length] = elem[i];
      }    
    } else {
      result[result.length] = elem;
    }
  }
  return result;
}