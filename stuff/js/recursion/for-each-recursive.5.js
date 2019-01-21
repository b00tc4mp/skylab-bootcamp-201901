function forEach(array, callback) {
    forEach.count = typeof forEach.count === 'undefined' ? 0 : forEach.count;

    if (forEach.count < array.length) {
        callback(array[forEach.count++]);

        forEach(array, callback, forEach.count);
    } else forEach.count = 0;
}