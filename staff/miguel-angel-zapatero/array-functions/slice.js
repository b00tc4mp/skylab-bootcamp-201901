'use strict';

/**
 * Returns a shallow copy of a portion of an array into a new array
 * 
 * @param {Array} arr The array to slice.
 * @param {Number} start The start index of the array.
 * @param {Number} end The final index of the array.
 * 
 * @returns {Array} New Array. Empty if start is greater than the length of the array.
 */
function slice(arr, start, end) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(typeof start !== 'number' && start !== undefined) throw TypeError(start + ' is not a number');
    if(typeof end !== 'number' && end !== undefined) throw TypeError(start + ' is not a number');

    var newArr = [];
    if (start === undefined) start = 0;
    if (end === undefined || end > arr.lenght) end = arr.length;
    if (start < 0) start = arr.length + start;
    if (end < 0) end = arr.length + end;
    if(start > arr.length) return newArr;
    for (var i = start; i < end; i++) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}