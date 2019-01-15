/**
 * 
 * Abstraction of indexOf()
 * 
 * Return the first index of 
 * 
 * @param {Array} array 
 * @param {*} value
 * 
 */
function indexOf(array, value){
    var j = 0;
    while (j < array.length){
        if (array[j] === value){
            return j;
        } else {
            j++;
        }
    }
    return -1;
}
    
//use case 1
var arr = [1, 2, 3, 4, 5];
var res = indexOf(arr, 5);