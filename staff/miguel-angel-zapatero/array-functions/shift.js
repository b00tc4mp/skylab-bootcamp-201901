'use strict';

/**
 * Removes the first element and return it.
 * 
 * @param {Array} arr The array to removes the first element.
 */
function shift(arr) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    var newArr = [];
    
    if (arr.length) {
        var result = arr[0];

        for (var i = 1; i < arr.length; i++) {
            newArr[newArr.length] = arr[i];
        }
        arr.length = 0;
        for (var i = 0; i < newArr.length; i++) {
            arr[arr.length] = newArr[i];
        }

        return result;
    }
}