/**It will introduce a new index with the value given
 * 
 * @param {array} array array tpo work on
 * @param {*} newElement element to add at the end of the array
 */


var push = (function(array,newElement){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    array[array.length] = newElement;
    return array;
});