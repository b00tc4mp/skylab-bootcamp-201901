/**
 * modifies your array, takes out the first element and returns it
 * 
 * @param {Array} array The array to operate
 * 
 * @return {element} a new element
 */
function shift(array){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var stack = [];
    var element = array[0]
    for (var i = 0; i < array.length-1; i++){
        stack[i]=array[i+1];
    }
    array=stack;    
    return array;
}

