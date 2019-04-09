
/**
 * It checks if a determinate value is an isntance of array or not
 * @param {any} value value to check;
 */


var isarray = (function (value){
    "use strict";
    if (value instanceof Array) return true;

    return false;
})