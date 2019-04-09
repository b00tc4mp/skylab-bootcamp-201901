/**
 * modifies all the element in the array object from a start index
 * 
 * @param {Array} array 
 * @param {Any} value 
 * @param {Number} from 
 * @param {Number} to 
 */

function fill(array, value,from ,to){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if ((typeof from !== 'number') && (from !== undefined)) throw TypeError(from + ' is not a number');
    if ((typeof to !== 'number') && (to !== undefined)) throw TypeError(to + ' is not a number');

    var end = to === undefined ? array.length : to;
    var start = from === undefined ? 0 : from;

    for (var i = start; i < end; i++) array[i]= value;
    return array;
}