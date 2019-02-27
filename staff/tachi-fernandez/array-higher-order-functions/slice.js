/**
 * 
 * Abstraction of SLICE.
 * 
 * eturns a shallow copy of a portion of an array into a new array object selected
 * from begin to end (end not included). 
 * The original array will not be modified.
 * 
 * @param {Array} arr - array to slice
 * @param {number} start - start value to cut.
 * @param {number} end - end value to cut
 * 
 * @throws {TypeError} - when array is not an Array
 * 
 * @return {Array} - cut array
 */

function slice(array, start, end){
    if(!(array instanceof Array)) throw TypeError(array+' should be an array');

    start = start===undefined? 0 : start;
    end = end===undefined? array.length : end;

    var res=[]
    for (var i=start; i<end; i++){
        res[res.length]=array[i]
    }
    
    return res

}