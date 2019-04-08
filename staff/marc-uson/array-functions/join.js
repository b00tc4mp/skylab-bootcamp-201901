/**
 * Joins all the elements in the array using the element given as a separator. If no element is given, uses ','
 * 
 * @param {array} array 
 * @param {any} element 
 */

function join(array, element){
    var separator = element === undefined ? ',' : element;
    var string = '';
    for(var i = 0; i< array.length; i++) string += array[i]+separator;
    
    return string;
}