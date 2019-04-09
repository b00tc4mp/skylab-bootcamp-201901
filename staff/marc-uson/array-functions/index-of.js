/**
 * returns the first index in wich you can find the given element or -1 if it's not present
 * 
 * @param {Array} array 
 * @param {any} element 
 * @param {Number} fromIndex 
 */

<<<<<<< HEAD
function IndexOf(array,element, fromIndex){
=======
function IndexOf(array, element, fromIndex){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if((typeof fromIndex !== 'number')&&(fromIndex !== undefined)) throw TypeError(index + ' is not a number');

>>>>>>> develop
    var i = fromIndex === undefined ? 0 : fromIndex;
    for(var j = i; j < array.length; j++)
        if (element === array[j]) return j;
    return -1;
}