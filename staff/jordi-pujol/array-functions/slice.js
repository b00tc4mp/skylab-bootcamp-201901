/**
 * 
 * Abstraction of slice
 * 
 * returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
 * 
 * @param {Array} arr 
 * @param {Number} beg 
 * @param {Number} end 
 * 
 * @throws {TypeError} should be an array
 * 
 * @returns {Array} should return an array
 */

function slice (arr, beg, end){

    if (!(arr instanceof Array)) throw TypeError (arr + 'should be an array');
    if (typeof beg !== "number" ) throw TypeError (beg + ' and ' + end + ' should be a number')

    if (typeof beg === undefined) beg = 0;
    if (beg > arr.length) return [];
    if (beg < 0) beg = arr.length + beg;
    if (end < 0) end = arr.length + end

    var a =[];

    for (var i = beg; i<end; i++ ){
        a[i-beg] = arr[i]
    }
    return a
}