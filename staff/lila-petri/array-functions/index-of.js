
/** Given an array and a value, the function returns the index where is the value inside the array 
 * If the value is not on the array the function returns -1
 * 
 * @param {Array} array 
 * @param {Element} searchElement 
 */
function indexOf(array, searchElement) {
    for (var i = 0; i < array.length; i++){
        if(array[i]===searchElement){
           return i
        }
    }
    return -1
}

