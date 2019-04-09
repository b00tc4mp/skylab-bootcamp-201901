/**
 * Iterate an array and change the order, the first array's element becomes the last and the last array's element becomes the first.
 * 
 * @param {Array} arr The array to iterate. 
 * 
 * @returns {Array} The new array.
 */

function reverse(arr) {
    var newArr = [];
    
    for(var i = 0; i < arr.length; i++) {
        newArr[i] = arr[(arr.length-1) - i];
    }
    
    for(var i = 0; i < arr.length; i++) {
        newArr[i] = arr[(arr.length-1) - i];
    }
    
    return arr;
}