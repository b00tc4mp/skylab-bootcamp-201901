/**
 * Abstraction of push.
 * 
 * Removes the last element of an array and returns it
 * 
 * @param {Array} arr - The array to remove the last item.
 */
function push() {
    var newArr = [];
    for (var i = 0; i < arguments[0].length; i++) {
        newArr[i] = arguments[0][i];
    }
    for (var j = 1; j < arguments.length; j++) {
        newArr[j + 1] = arguments[j];
    }
    return newArr;
}

// use case

var a = ['soccer', 'baseball'];

console.log(push(a, 'football', 'swimming')); // output: ['soccer', 'baseball', 'football', 'swimming']


