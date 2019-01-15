/**
 * Abstraction of indexOf()
 * 
 * Return the first index of 
 * 
 * @param {Array} array 
 * @param {*} searchValue
 * @param {number} index 
 * @param {number} from 
 *
 **/

function indexOf(array, searchValue, from){
    var j = (from !== undefined) ? from : 0;
    while (j < array.length){
        if (array[j] === searchValue){
            return j;
        }
        j++; 
    }
    return -1;
}