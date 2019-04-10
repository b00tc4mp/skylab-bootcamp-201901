/**
 * modifies your array, takes out elements with an up and down index and returns it
 * 
 * @param {Array} array The array to operate
 * 
 * @return {element} a new element
 */
function slice(array,up,out){
    var stack = [];

    var element = array[0]
    for (var i = 0; i < array.length-1; i++){
        stack[i]=array[i+1];
    }
    array=stack;    
    return array;
}

/**
 * modifies your array, takes out a section of the array and returns it
 * 
 * @param {Array} array The array to operate
 * @param {int} upindex beginning of the array to slice
 * @param {int} bottomindex end of the array to slice
 */
function shift(array,upindex,bottomindex){
    var stack = [];
    var element = array[0]
    for (var i = 0; i < array.length-1; i++){
        stack[i]=array[i+1];
    }
    array=stack;    
    return array;
}






























































