/**
 * Abstraction of push.
 * 
 * The push() method adds one or more elements to the end of an array and returns
 * the new length of the array.
 * 
 * @param {*} arguments - different arguments to be added at the end of the array
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {number} length - length of the resulting array
 * 
 */

function push() {
    if (!(arguments[0] instanceof Array))
        throw new TypeError(arguments[0] + ' is not an array');
        console.log(arguments);
    
    var start = arguments[0].length;
    for (var i = 1; i<arguments.length; i++) {
        arguments[0][start] = arguments[i];
        start++;
    }
    return arguments[0].length;
}

var array = [1,2,3];
res = push(array,'a2','22asd3',123,123213,44);
console.log(array);
console.log(res);