'use strict';

/**
 * Method determines whether the passed value is an Array.
 * 
 * @param {Value} The value to be checked.
 * 
 * @returns {boolean} true if the value is an Array; otherwise, false.
 */

function isArray(array) {

    if (!(array instanceof Array)) throw TypeError(array + ' is not an array.');

    if (array instanceof Array) {
        return true
    } else {
        return false
    }

}
