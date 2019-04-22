/**
 * modifies your array to be inverted
 * 
 * @param {Array} array The array to operate
 * 
 * @return {element} a new element made with array and callback
 */
function reverse(array){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    var stack = [];
    for (var i = 0; i < array.length; i++){
        stack[i] = array[array.length-(i+1)];
    }
    array=stack;    
    return array;
}

