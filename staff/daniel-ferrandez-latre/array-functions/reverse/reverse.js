/**
 * Return a new array mapped by callback fuction instuctions
 * 
 * @param {Array} array The array to iterate and reverse the order of the elements into it.
 * 
 */
function reverse(array) {
    if(arguments.length === 0) {
        throw TypeError(' no arguments are passed.');
    } else if(!(arguments[0] instanceof Array)) {
        throw TypeError(' is not an array.');
    } else if( arguments.length > 1){
        throw new TypeError(' to many arguments passed');
    }
    var j = array.length - 1;
    var auxValue;
    for(var i = 0; i < array.length / 2; i++) {
        auxValue = array[j];
        array[j] = array[i];
        array[i] = auxValue;
       j--;
    }
}

