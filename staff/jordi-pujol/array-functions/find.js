/**
 *Abstractation of find
 *The find() method returns the value of the first element in the array that satisfies the provided testing function.
 *Otherwise undefined is returned.
 * 
 * @param {*} arr 
 * @param {*} func 
 */


function find(arr, val, func){
    var res;
    for (var i=0; i<arr.length; i++)
    if (arr[i] === val){
        res = i
    }
    return res
}

// start = start === undefined ? 0 : (start < 0 ? array.length + start : start);

var a = [1, 2, 3, 4, 5];

var res = find(a,function(v) { return v + 10});

console.log(res);