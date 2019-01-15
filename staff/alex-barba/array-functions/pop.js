/**
 * Abstraction of pop.
 * 
 * Removes the last element of an Array.
 * 
 * @param {Array} arr - The array to remove the last element.
 * @param {Function} func - The expression to evaluate.
 */
function push(arr, func) {
    delete arr[arr.length-1]
    func(arr);
}

// use case 1

var a = [1, 2, 3, 4];

push( a, function (v) { console.log(v) }); // output: 1, 2, 3