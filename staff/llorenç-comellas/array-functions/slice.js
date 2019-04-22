'user strict';

/**
 * method returns a shallow copy of a portion of an array into a new array object 
 * @param {*} array array to iterate
 * @param {*} start index at which to begin extraction
 * @param {*} end index before which to end extraction
 */

function slice(array, start, end) {
    if(!(array instanceof Array)) throw TypeError (array + ' is not an array');
    var newArray = [];
    if(!(end)){
        end = array.length;
    }

    for (var i = start; i < end; i++) {
        newArray[newArray.length] = array[i];

    }
    return newArray;

}