/**
 * reduces the given array to a value aplying the operation in the callback function form right to left
 * 
 * @param {array} array 
 * @param {function} callback
 * @param {number} start 
 */

function reduceRight(array, callback, start){
    var x = array.length-1;
    if (start === undefined){
        var result = array[x];
        x -= 1;
    }else {
        var result = start;
    } 
    for(var i = x; i >= 0; i--){
        result = callback(result, array[i], i, array);
    }
    return result;
}