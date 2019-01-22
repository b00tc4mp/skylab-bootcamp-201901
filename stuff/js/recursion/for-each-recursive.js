function forEach(array, callback) {
    if (array.length) {
        callback(array[0]);

        forEach(array.slice(1), callback);
    }
}