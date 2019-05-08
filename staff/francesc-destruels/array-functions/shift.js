
/**
 * Return an array with the first value of the original array hile modifing the original to erase the element.
 * 
 * @param {array} array 
 * @return {array} newArray 
 */


var shift = (function(array){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    var i, newArray= array[0]; copy=[];

    for (var i = 1; i < array.length; i++) {
        copy[copy.length] = array[i];
    }

    array.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        array[i] = copy[i];
    }

    return newArray;
});