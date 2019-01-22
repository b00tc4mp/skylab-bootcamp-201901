// var forEach = function (array, callback, count) {
//     count = typeof count === 'undefined' ? 0 : count;

//     if (count < array.length) {
//         callback(array[count++]);

//         forEach(array, callback, count);
//     }
// }

// equal to

function forEach(array, callback, count) {
    count = typeof count === 'undefined' ? 0 : count;

    if (count < array.length) {
        callback(array[count++]);

        forEach(array, callback, count);
    }
}