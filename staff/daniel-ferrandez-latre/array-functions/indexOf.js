/**
 * Return a new array with the filtered results
 * 
 * @param {Array} array The array to iterate.
 * 
 * @param {element} element Element to get the index.
 * 
 * 
 *  @param {index} Index Optional parameter, that you can star from that position of the array
 * 
 */
function indexOf(array, element, index) {
    var starIndex = 0;
    if(index >= array.length) {
        return -1;
    } else {
        starIndex = index;
    }
    for(var i = starIndex; i < array.length; i++) {
        if(array[i] === element) {
            return i;
        }
    }
    return -1;
    
}