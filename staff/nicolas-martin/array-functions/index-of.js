/**
 * Abstraction of indexOf
 * 
 * Find the first ocurrence of searchValue in array starting from index
 * 
 * @param {Array} array 
 * @param {*} searchValue
 * @param {number} index 
 * @param {number} from
 *
 * @returns {number} - the index of the first ocurrence or -1 if not found 
 **/

function indexOf(array, searchValue, from){
    if (arguments.length > 3) throw Error('too many arguments');
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var j = (from !== undefined) ? from : 0;
    while (j < array.length){
        if (array[j] === searchValue) return j;
        j++; 
    }
    return -1;
}