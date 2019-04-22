/**
 * Creates a new Array instance from a variable number of arguments, 
 * regardless of number or type of the arguments.
 * 
 * @param {*}    values Elements of which to create the array.
  * 
 * @returns {number} Index of last occurrence. -1 if not present
 */

'use strict';

function of() {
    var arr = [];
    for(var i = 0; i < arguments.length; i++)  {
        arr[i] = arguments[i];
    }
    return arr;  
}
  