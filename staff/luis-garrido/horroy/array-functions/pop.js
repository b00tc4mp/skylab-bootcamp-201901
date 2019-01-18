/**
 * Abstraction of pop.
 * 
 * The pop() method removes the last element from an array and returns that element.
 * This method changes the length of the array.
 * 
 * @param {Array} arr - array from which you pop the last element
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {*} value - element deleted from array
 * 
 */

function pop(arr) {
    if (!(arr instanceof Array))
        throw new TypeError(arr + ' is not an array');
    
    var poped = arr[arr.length-1];
    arr.length-=1;
    
    return poped;
}

var array = [1,2,3];
res = pop(array);
console.log(array);
console.log(res);

