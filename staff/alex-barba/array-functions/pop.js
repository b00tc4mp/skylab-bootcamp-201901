/**
 * Abstraction of pop.
 * 
 * Removes the last element of an Array.
 * 
 * @param {Array} arr - The array to remove the last element.
 * @param {Function} func - The expression to evaluate.
 * 
 */
function pop(arr) {
    var last = arr[arr.length-1]
    arr.length = arr.length-1
    return last
}

// use case 1

var a = [1, 2, 3, 4];

pop(a); // output: 1, 2, 3
