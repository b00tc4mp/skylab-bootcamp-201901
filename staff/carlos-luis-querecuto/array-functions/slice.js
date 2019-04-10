/**
 * modifies your array, takes out elements with an up and down index and returns it
 * 
 * @param {Array} array The array to operate
 * @param {Array} up The array upper index to operate
 * @param {Array} bottom The array bottom index to operate * 
 * @return {element} a new element
 */
function slice(array,up,bottom){
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(up instanceof Number)) throw TypeError(up + ' is not a Number');
    if (!(bottom instanceof Number)) throw TypeError(bottom + ' is not a Number');
    var stack = []
    var element = array[0]
    for (var i = bottom; i < up; i++){
        stack[i]=array[bottom+i];
    }
    return stack;
}