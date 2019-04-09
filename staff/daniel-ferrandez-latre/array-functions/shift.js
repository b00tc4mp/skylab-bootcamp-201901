/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array Takes of the first position of the array and rearrenge it into current state
 * 
 */
function shift(array) {
    var firstPossVal = array[0];
    var auxVal;
    
    for(var i = 0; i < array.length; i++) {
            auxVal = array[i + 1];
            array[i] = auxVal;
    }
    array.length = array.length - 1;
    return firstPossVal;
}

