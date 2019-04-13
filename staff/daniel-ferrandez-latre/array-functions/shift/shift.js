/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array Takes of the first position of the array and rearrenge it into current state
 * 
 */
function shift(array) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(' is not an array.');
    } else if( arguments.length > 1){
        throw new TypeError(' to many arguments passed');
    }
    var firstPossVal = array[0];
    var auxVal;
    
    for(var i = 0; i < array.length; i++) {
            auxVal = array[i + 1];
            array[i] = auxVal;
    }
    array.length = array.length - 1;
    return firstPossVal;
}

