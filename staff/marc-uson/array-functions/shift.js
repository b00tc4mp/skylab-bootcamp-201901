/**
 * deletes first element of the given array and returns it, this function modifies the array length
 * 
 * @param {Array} array 
 */

function shift(array){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var newArr = [];
    var element;
    for(var i = 1; i < array.length; i++)newArr[i-1] = array[i];
    element = array[0];
    array.length = newArr.length;

    for(var j = 0; j < newArr.length; j++){
        array[j]=newArr[j];
    }
    return element;
}