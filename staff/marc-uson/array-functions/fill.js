/**
 * modifies all the element in the array object from a start index
 * 
 * @param {Array} array 
 * @param {Any} value 
 * @param {Number} from 
 * @param {Number} to 
 */

function fill(array, value,from ,to){
    var end = to === undefined ? array.length : to;
    var start = from === undefined ? 0 : from;

    for (var i = start; i < end; i++) array[i]= value;
    return array;
}