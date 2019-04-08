/**
 * deletes first element of the given array and returns it, this function modifies the array length
 * 
 * @param {Array} array 
 */

function shift(array){
    var newArr = [];
    var element;
    for(var i = 1; i < array.length; i++)newArr[i-1] = array[i];
    element = array[0];
    return [element, newArr];
}