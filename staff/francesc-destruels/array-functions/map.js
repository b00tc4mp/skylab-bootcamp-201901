
/**It will create a new array with an iteration of the original after passing for the callback fuction.
 * 
 * @param {array} array array to iterate
 * @param {function} callback function to proces each element.
 */

 var map = (function(array, callback){
    "use strict";
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    var i, newArray = [];

    for (i = 0; i < array.length; i++){
        newArray[i] = callback(array[i]);
    }

    return newArray;
});