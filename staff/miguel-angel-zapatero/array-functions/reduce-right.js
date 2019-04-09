/**
 * Iterate 
 * 
 * @param {Array} arr 
 * @param {Function} callback 
 * @param {any} value 
 */

function reduceRight(arr, callback, value) {
    var acc = value || arr[arr.length - 1];
    var index = arr.length - 2;
    
    if(value) index = arr.length - 1;

    for(var i = index; i >= 0; i--) {
        acc = callback(acc, arr[i]); 
    }
    return acc;
}