'use strict';

/**
 * Adds a value at the end of an array, incrementing its length by 1.
 * 
 * @param {Array} array The array to push the value in.
 * @param {*} value The value to push in the array.
 * 
 * @returns {number} The length of the array after adding the new value.
 */
function push(array, value) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    if (arguments.length > 1)
        for(var i = 1; i < arguments.length; i++)
            array[array.length] = arguments[i];

    return array.length;
}