/**
 * This will reverse the elemets of a given array
 * 
 * @param {array} array array to iterate
 */

var reverse = function(array){
    var i, newArray = [], j = 0;

    for (i = array.length -1; i >= 0; i--){
        newArray[j] = array[i];
        j++;
    }

    array = newArray;

    return array;
}