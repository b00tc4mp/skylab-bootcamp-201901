/**
 * Abstraction of pop.
 * 
 * Removes the last element of an array and returns it
 * 
 * @param {Array} arr - The array to remove the last item.
 */
function pop(arr) {
    var lasItem = arr[arr.length-1];
    var newArr;
    for(var i = 0; i < (arr.length-2); i++) {
        newArr[i] = arr[i];
    }
    arr.splice(-1,1)

    return lasItem;
}

// use case

var a = ['angel', 'clown', 'mandarin', 'sturgeon'];

console.log(pop(a)); // output: ['sturgeon']

console.log('@', a);
