/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array The array to iterate and reverse the order of the elements into it.
 * 
 */
function reverse(array) {
    var j = 0;
    var auxValue;
    for(var i = array.length - 1; i > -1; i--) {
        auxValue = array[i];
        array[j] = auxValue;
        j++;
    }
}

