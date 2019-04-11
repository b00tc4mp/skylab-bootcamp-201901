'use static';

/**
 * method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * @param {*} array An array.
 * @param {*} searchElement Element to locate in the array.
 * 
 * @returns The first index of the element in the array; -1 if not found.
 * 
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

