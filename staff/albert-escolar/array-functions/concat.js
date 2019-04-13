'use strict'
/**used to merge two or more arrays. 
 * This method does not change the existing arrays, but instead returns a new array.
 * 
 * @param  {...any} args The arguments to be iterated on.
 * @returns {resultArray} returns the new array with the resulting concatenation.
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