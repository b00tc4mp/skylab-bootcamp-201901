function reduce(array, callback, accumulator) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');
    if((arguments.length < 1)||(arguments.length > 3)) throw new Error ('Incorrect number of arguments')

    var i = 0;

    if (arguments.length == 2) {
        accumulator = array[0];
        i++
    }

    for (i; i < array.length; i++) {
        var item = array[i];

        accumulator = callback(accumulator, item);
    }
    return accumulator;
}; 