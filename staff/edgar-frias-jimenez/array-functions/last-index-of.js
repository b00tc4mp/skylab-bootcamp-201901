/**
 *
 * Function that search an element inside an array and if its in it then returns its last position, otherwise it will returns -1.
 *
 * @param {Array} array The array where to find the passed element.
 * @param {element} element Any element you want to find inside an array.
 *
 * @returns {Number} It will returns the last position in which you find the given element.
 */
function lastIndexOf(array, element) {
  var helperVal = 0;

  for(var i = array.length-1; i >= 0; i--) {
    if(array[i] === element) {
      return helperVal > i ? helperVal : i;
    } else if (i === 0){
      return -1;
    }
  }
}