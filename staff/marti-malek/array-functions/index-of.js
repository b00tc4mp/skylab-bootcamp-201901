/**
 * 
 * @param {Array} arr 
 * @param {*} value 
 * @param {Number} start
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array
 */

function indexOf(arr, value, start) {
    if (arguments.length > 3) throw Error ('too many arguments')
    if (!(arr instanceof Array)) throw new TypeError(arr + ' is not an array');
    start = start? start : 0;
    for (var i = start; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
};


var a = [1,2,3,4];

var res = indexOf(a, 3, 0);

console.log(res);