/**
 * Abstraction of find.
 * 
 * Returns the value of the first element in an array that pass a test
 * 
 * @param {Function A} functionA - The test to pass.
 * @param {Array} arr - The array to pass the test.
 * @param {Function} func - The expression to evaluate.
 */
function find(functionA, arr, func) {
    var = results=[]
    for (var i in arr) functionA
        if (functionA === true)
            results += arr[i]
            func(results);
}

// use case 1

var a = [1, 2, 3, 4];

function checkNumber(i) {i > 2}

find(checkNumber, a, function (v) { console.log(v) }); // output: 4