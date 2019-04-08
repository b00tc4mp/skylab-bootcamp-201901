/**
 * Return a new array with the filtered results
 * 
 * @param {Array} array The array to iterate from end to start
 * 
 * @param {element} element Element to get the index.
 * 
 * 
 *  @param {index} Index Optional parameter, that you can star from that position of the array
 * 
 */
function lastIndexOf(array, element, index) {
    var starIndex = array.length - 1;
    if(index < 0) {
        return -1;
    } else {
        starIndex = index;
    }
    //debugger
    for(var i = starIndex; i < array.length; i--) {
        if(array[i] === element) {
            return i;
        }
    }
    return -1;
}