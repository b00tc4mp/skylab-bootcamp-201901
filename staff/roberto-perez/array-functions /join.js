/**
 * Abstraction of join.
 * 
 * Joins all the elements of a array
 * 
 * @param {Array} arr - The array to fill.
 * @param {String} separator - String used to separate each of the array elements
 */
function join(arr, separator) {
    var stringJoined = '';
    separator = separator || '';
    for (var i = 0; i < (arr.length - 1); i++) {
        stringJoined += (arr[i] + separator);
    }
    return stringJoined + arr[arr.length-1];
}

// use case

var a = ['Fire', 'Wind', 'Rain'];

console.log(join(a, '-')); // output: Fire-Wind-Rain
