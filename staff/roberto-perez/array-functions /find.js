/**
 * Abstraction of find.
 * 
 * Returns the value of the first element of the array that fulfills the test function provided
 * 
 * @param {Array} arr - The array to fill.
 * @param {Function} callback - The expression to evaluate.
 */
function find(arr, callback) {
    for(var i = 0; i < arr.length; i++) if(func(arr[i])) return arr[i];
}

// use case

var a = [5, 12, 8, 130, 44];

var found = find(a, function (v) { return v > 10; });

console.log(found); // output: 12
