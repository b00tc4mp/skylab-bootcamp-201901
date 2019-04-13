/**
 * Return last index that certain element has into Array
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
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(array + ' first arguments is not an array');
    } else if (arguments.length > 2 && isNaN(arguments[2])){
        throw new TypeError(index + ' is not a number');
    }
    var starIndex = array.length - 1;
    if(index < 0) {
        return -1;
    } else {
        starIndex = index;
    }

    for(var i = starIndex; i < array.length; i--) {
        if(array[i] === element) {
            return i;
        }
    }
    return -1;
}