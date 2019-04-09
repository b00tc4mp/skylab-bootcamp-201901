/**
 * Method returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * @param {Array} array 
 * @param {any} searchElement 
 */
function indexOf(array,searchElement){
    for(var i =0; i < array.length; i++){
        if(array[i] === searchElement){
            return i;
        }
          
    }
    return -1;
}

