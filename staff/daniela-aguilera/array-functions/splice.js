'use strict';
/**
 * method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
 * @param {*} array An array to iterates.
 * @param {*} inicio Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1, meaning -n is the index of the nth last element and is therefore equivalent to the index of array.length - n) and will be set to 0 if absolute value is greater than the length of the array.
 * @param {*} eliminar An integer indicating the number of old array elements to remove.
 * @param {*} agregar1 The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
 * @param {*} agregar2 The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
 * 
 * @return An array containing the deleted elements. If only one element is removed, an array of one element is returned. If no elements are removed, an empty array is returned.
 */
function splice(array, inicio, eliminar, agregar1, agregar2) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(typeof inicio === 'number')) throw TypeError(inicio + ' is not a number');
    var newArray = [];
    var n = 0;
    var elim = eliminar;
    for (var i = 0; i < array.length; i++) {
        if (i < inicio) {
            newArray[n] = array[i];
            n++;
        } else if (elim > 1) {
            elim -= 1;
        } else if (elim > 1 || agregar1 != 0 || agregar2 != 0) {
            if (elim > 1) {
                elim -= 1;
            }
            for (var j = 0; j < 2; j++) {
                if (agregar1 != 0) {
                    newArray[n] = agregar1;
                    n++;
                    agregar1 = 0;
                } else if (agregar2 != 0) {
                    newArray[n] = agregar2;
                    n++;
                    agregar2 = 0;
                }
            }
        } else if (array.length > inicio + eliminar) {
            newArray[n] = array[i];
            n++;
        }
    }
    return newArray;
}