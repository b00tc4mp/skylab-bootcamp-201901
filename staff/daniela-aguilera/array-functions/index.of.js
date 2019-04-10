'use stric'
/**
 * 
 * @param {*} array 
 * @param {*} searchElement 
 * @returns the index of the element that you are looking for
 * The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 */

function indexOf(array, searchElement) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an Array.');
    if (!(typeof searchElement === 'number')) throw TypeError(searchElement + ' is not a number.'); 

    for (var i = 0; i < array.length; i++){
        if(array[i] == searchElement){
           return i;
        } 
    }
    return -1;
}


