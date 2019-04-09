/**
 * This will reverse the elemets of a given array
 * 
 * @param {array} array array to iterate
 */

var reverse = (function(array){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var i, newArray = [], j = 0;

    for (i = array.length -1; i >= 0; i--){
        newArray[j] = array[i];
        j++;
    }

    for (i = array.length -1; i >= 0; i--){
        array[i] = newArray[i];
    }

    return array;
});