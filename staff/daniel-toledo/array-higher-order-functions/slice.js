/**
 * 
 * Abstraction of SLICE.
 * 
 * eturns a shallow copy of a portion of an array into a new array object selected
 * from begin to end (end not included). 
 * The original array will not be modified.
 * 
 * @param {number} start - start value to cut.
 * @param {number} end - end value to cut
 * 
 * @return {Array} - cut array
 */

function slice(arr, start, end){
    if(!(arr instanceof Array)) throw TypeError(arr+' should be an array');

    start = start===undefined? 0 : start;
    end = end===undefined? arr.length : end;

    var res=[]
    for (var i=start; i<end; i++){
        res[res.length]=arr[i]
    }
    
    return res

}