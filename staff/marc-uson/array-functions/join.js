/**
 * Joins all the elements in the array using the element given as a separator. If no element is given, uses ','
 * 
 * @param {array} array 
 * @param {any} element 
 */

function join(array, element){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    
    var separator = element === undefined ? ',' : element;
    var string = '';
    for(var i = 0; i< array.length-1; i++) string += array[i]+separator;

    string += array[array.length - 1];
    
    return string;
}