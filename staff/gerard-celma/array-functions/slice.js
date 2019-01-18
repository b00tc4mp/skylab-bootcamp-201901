/**
 * Abstraction of slice.
 * 
 * The slice() method returns the selected elements in an array, as a new array object.
 * 
 * @param {Array, *} array + parameters you want to add
 * 
 * @throws {TypeError} - If array is not an array
 */

 function slice(array,start,end) {
     if(!(array instanceof Array)) throw TypeError('first parameter should be an array');

    var result = [];
    var loop = array.length - start;
    var j = 0;
    for(var i = start; i< loop; i++) {
        result[j] = array[i];
        j++;
    }
    return result;
 }