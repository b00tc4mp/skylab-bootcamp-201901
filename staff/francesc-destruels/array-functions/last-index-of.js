
/**It will look for an element on an array, it will retur -1 if it is not present or the value of the last index presented.
 * 
 * @param {array} array array to iterate
 * @param {element} searchElement vale to look for index
 */

var lastindexof = (function(array, searchElement){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var i, j = -1;

        for (i = 0; i <array.length; i++){
            if (array[i] === searchElement){
                j = i;
            }
        }
    return j;
});