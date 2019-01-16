/**
 * Abstraction of fill.
 * 
 * Finds a word.
 * 
 * 
 * @param {Word} - word to find
 * @param {Array} array
 * 
 * @throws {TypeError} - If array is not an array
 */
var arr = [1, 2, 3, 4, 5];
var expected = []

function finder(array, callback) {
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return array[i];
        }

    }
};



