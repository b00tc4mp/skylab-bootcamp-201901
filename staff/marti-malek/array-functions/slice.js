/**
 * 
 * Abstraction of slice.
 * 
 * Returns a copy of a portion of an array.
 * 
 * @param {Array} arr 
 * @param {number} start 
 * @param {number} end 
 * 
 * @returns {Array}
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array
 */
function slice(arr, start, end) {

    if (arguments.length > 3) throw Error ('too many arguments');
    if (!(arr instanceof Array)) throw TypeError (arr + 'should be an array');

    var res = [];
    var j = 0;
    for (var i = start; i < end; i++) {
        if (j === res.length) {
            res[j] =  arr[i];
            j++;
        }
    }
    return res;
};

var a = [1,2,3,4,5];

slice(a,3,4);