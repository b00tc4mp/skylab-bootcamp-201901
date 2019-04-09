/**
 * Merges X arrays into a new array.
 * 
 * @param {Array} array2  The array to merge.
 * @param {Array} array1  The array to merge.
 * 
 * @returns {Array} The result of merging X arrays.
 */

function concat(...args) {
    var j = 0;
    var resultArray = [];
    for (var i = 0; i < args.length; i++) {
        for (var k = 0; k < args[i].length; k++) {
            resultArray[j] = args[i][k];
            j++
        }
    }
    return resultArray;
}