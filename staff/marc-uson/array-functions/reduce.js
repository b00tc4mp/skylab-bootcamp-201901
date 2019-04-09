/**
 * reduces the given array to a value aplying the operation in the callback function
 * 
 * @param {array} array 
 * @param {function} callback
 * @param {number} start 
 */

function reduce(array, callback, start){
    var x = 0;
    if (start === undefined){
        var result = array[0];
        x=1;
    }else {
        var result = start;
    } 
    for(var i= x; i < array.length; i++){
        result = callback(result, array[i], i, array);
    }
    return result;
}   