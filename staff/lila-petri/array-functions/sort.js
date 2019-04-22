/**
 * Returns an arry ordered
 * @param {Array} array 
 * 
 * @returns {Array} Array ordered 
 */

function sort(array) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if(array.length===0) return []
    var done = false;
    while (!done) {
      done = true;
      for (var i = 1; i < array.length; i += 1) {
        if (array[i - 1] > array[i]) {
          done = false;
          var tmp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = tmp;
        }
      }
    }
  
    return array;
  }

 