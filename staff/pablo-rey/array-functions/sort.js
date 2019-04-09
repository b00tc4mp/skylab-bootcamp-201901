/**
 * 
 * Sort in place the array. If no compare function, the default comparison is the standar comparison > not MDN documentation UTF16)
 * 
 * @param {Array} array 
 * @param {Function} comparefn function to compare (a,b) 
 */

function sort (array, comparefn) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");
	if (arguments.length > 1 && !(callbackfn instanceof Function)) throw new TypeError("undefined is not a function");

  var compare = comparefn || compareDefault;
  for (var i = array.length - 1; i >= 0; i--) {
    for (var j = 0; j < i; j++ ) {
      if (compare(array[j], array[j+1])) {
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
  return array;
}

function compareDefault(a, b) {
  return String(a) > String(b);
}