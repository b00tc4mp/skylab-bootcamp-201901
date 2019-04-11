'use strict';
/**
 * 
 * removes the first element from an array and returns that removed element. This method changes the length of the array
 * @param {Array} array to iterate
 */

function shift(array) {
    if(!(array instanceof Array)) throw TypeError(array+ ' is not an array');
    var extractedIndex;
    extractedIndex = array[0];
    var temporalArray = [];
    var j = 0;
    for (var i = 1; i < array.length; i++){
        temporalArray[j] = array[i];
        j++;
    }
    array.length = temporalArray.length;
    for(var i =0; i<array.length;i++){
        array[i]=temporalArray[i];
    }
    return extractedIndex;
}
