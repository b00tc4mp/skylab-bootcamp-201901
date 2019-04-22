/**
 *removes the first element of the array and returns that element. 
 *This method modifies the length of the array.
 *
 * @param {Array} arr - The array to work
 * 
 * @returns {*} - removes the first element from an array and 
 * returns that removed element. This method changes the length of the array.
 */

function shift(arr) {  
    if (!(arr instanceof Array)) throw TypeError(`${arr} is not an array`)

    var result = arr[0];
    var tmpArr = [];
    var j = 0;
    for (var i = 1; i < arr.length; i++) {
        tmpArr[j] = arr[i];
        j++; 
    }
    arr.length = tmpArr.length;
    for (var i = 0; i < arr.length; i++) {
        arr[i] = tmpArr[i]; 
    } 
    return result; 
}


