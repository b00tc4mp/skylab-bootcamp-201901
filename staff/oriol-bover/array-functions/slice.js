/**
 * Abstraction of slice
 * 
 * Iterates an array and eturns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
 * 
 * @param {Array} array 
 * @param {Number} begin 
 * @param {Number} end 
 * 
 * @returns {Array} Shallow copy of a portioin of the original array
 */

function slice(array, begin, end) {
    if(!(array instanceof Array)) throw TypeError(array+' must be an Array');

    begin = typeof begin === 'undefined' ? 0 : (typeof begin === 'number' ? begin: 0);
    end = typeof end === 'undefined' ? array.length : end;
    var shallow_array = []; 

    for (var i = begin; i < end; i++) {
        var element = array[i];
        shallow_array[shallow_array.length] = element;
    }

    return shallow_array;
}