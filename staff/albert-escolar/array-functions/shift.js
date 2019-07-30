'use strict'
/**Removes the first element from an array and returns that removed element.
 * 
 * @param {array} array The array to iterate
 * 
 * @returns {extractedIndex} The extracted index of the array.
 */

function shift(array) {
    var extractedIndex = [];
    extractedIndex[0] = array[0];
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
    return extractedIndex
}
