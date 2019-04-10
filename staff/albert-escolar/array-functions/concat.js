'use strict'
/**
 * Merges X arrays into a new array.
 * 
 * @param {Array} args  The array to merge.
 * 
 * @returns {Array} The result of merging X arrays.
 */

function concat(...args) {
    
    if (!args.length) throw TypeError('No arguments recieved');
    for (i = 0; i < args.length; i++) {
        if (!(args[i] instanceof Array)) throw TypeError(args[i] + ' is not an array');
    };
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