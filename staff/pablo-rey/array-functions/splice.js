/**
 * Chop the original array from start in deleteCount number of elements, Add in that hole item1, item2... 
 * 
 * @param {Array} array 
 * @param {number} start start of cutting
 * @param {number} deleteCount number of elements to delete
 * @param {any} item1, item2,... All items to add instead of chopped elements 
 * 
 * @returns {Array} Modified array
 */
function splice (array, start, deleteCount) {
	if (!(array instanceof Array)) throw new TypeError("array param is not an array");

  var result = [];
  for (var i = 0; i < Math.min(start, array.length); i++) {
    result[result.length] = array[i];
  }
  for (var i = 3; i < arguments.length; i++) {
    result[result.length] = arguments[i];
  }
  for (var i = start + deleteCount; i < array.length; i++) {
    result[result.length] = array[i]
  }
  array.length = result.length;
  for (var i = 0; i < array.length; i++) {
    array[i] = result[i]; 
  }
  return result;
}

