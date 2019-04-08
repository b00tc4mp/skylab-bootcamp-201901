/** Returns the last index in which a certain element
 *  can be found in the array, or -1 if the element can not be found
 * 
 * @param {Array} array 
 * @param {Element} searchElement 
 */
function lastIndexOf(array, searchElement) {
    var index=0;
    for (var i = 0; i < array.length; i++){
        if(array[i]===searchElement){
           index=i
        }
    }
    if(index==0){
        return -1
    }else{
    return index
    }
}

