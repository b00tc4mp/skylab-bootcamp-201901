'use strict'
/**
 * Iterates an array and checks if the search element is in the array or not.
 * If it is in the array it returns the index, if not it returns -1.
 * @param {any} searchElement element to be iterated in the array
 * @param {Array} arr array in which the searchElement will be checked if it exists or not.
 * 
 * @return {i}  True if all value is an array, otherwise false.
 */
 function indexOf(searchElement, arr){

    if(!(arr instanceof Array)) throw TypeError (arr+' is not an array');
    for(var i=0;i<arr.length;i++){
        if(searchElement===arr[i]){
            return i
        }
    }
    return -1
}

