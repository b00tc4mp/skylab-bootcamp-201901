'use strict'
/**
 * Iterates a value and checks if its an array or not.
 * 
 * @param {Array} value value to be checked.
 * 
 * @returns {boolean} True if all value is an array, otherwise false.
 */

function isArray(value){
    return value instanceof Array;
}