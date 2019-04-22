'use strict';

/**
 * fills (modifies) all the elements of an array from a start index (default zero) to an end index (default array length) with a static value. It returns the modified array.
 * 
 * @param {Array} arr The array to be filled.
 * @param {*} value The static value to fill.
 * @param {[Number]} s The start point to fill.
 * @param {[Number]} e The end point to stop the fill.
 * 
 * @return {Array} the modified array.
 */

function fill(arr, value, s, e) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');

    var start;
    var end;

    if(s) {
        start = s;
    } else {
        start = 0;
    }

    if(e) {
        end = e;
        if (end > arr.length) {
            end = arr.length;
        }
    } else {
        end = arr.length;
    }

    for(var i = start; i < end; i++) {
        arr[i] = value;
    }

    return arr;
}