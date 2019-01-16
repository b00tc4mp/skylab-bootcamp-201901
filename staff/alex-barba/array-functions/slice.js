/**
 * Abstraction of slice.
 * 
 * Returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
 * 
 * @param {Array} array
 * @param {Number} start
 * @param {Number} end
 * 
 * @throws {TypeError} - If array is not an array
 * 
 * @returns {Array}
 * 
 */

 function slice(array, start, end){
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array');
    
    var res =[];
     
    start = start ? start : 0;

    end = end ? end : array.length;
    if (end > array.length){ end = array.length};

    for (var i = start; i < end; i++) {
        res[res.length]= array[i]
    }

    return res;
 };