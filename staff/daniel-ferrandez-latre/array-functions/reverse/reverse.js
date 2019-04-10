/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array The array to iterate and reverse the order of the elements into it.
 * 
 */
function reverse(array) {
    var j = array.length - 1;
    var auxValue;
    for(var i = 0; i < array.length / 2; i++) {
        auxValue = array[j];
        array[j] = array[i];
        array[i] = auxValue;
       j--;
    }
}

