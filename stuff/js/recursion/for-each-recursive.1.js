var count = 0;

function forEach(array, callback) {
    if (count < array.length) {
        callback(array[count++]);
    
        forEach(array, callback);
    } else count = 0;
}