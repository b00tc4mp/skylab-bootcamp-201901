/**
 * Abstraction of reduce.
 * 
 * The reduce() method executes a reducer function (that you provide)
 * on each member of the array resulting in a single output value.
 * 
 * @param {Array} array - array to be reduced
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Array} arr - a reference to the new array
 * 
 */

// [0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
//     return accumulator + currentValue;
//   });


function reduce(array, callback) {
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');
    if (!(callback instanceof Function))
        throw new TypeError(callback + ' is not a function');

    // startIndex = startIndex === undefined ? 0 : (startIndex < 0 ? arr.length + startIndex : startIndex);
    
    for (var i = 0 ; i<array.length ; i++) {
        if (callback(array[i])) return array[i];
    }
}
var array = [1,2,3,4,5,3];
console.log(array);
reduce(array);
console.log(array);
