/**
 * 
 * Abstraction of push.
 * 
 * Add an element/s to an array
 * 
 * 
 * @param {Array} arr 
 * @param {*} elem
 */

function push (arr, elem){

    for (let i= 1; i<arguments.length; i++)

    arr[arr.length]=arguments[i]

    return arr
}

var a = [1, 2, 3, 4, 5]

push(a, 10, 11, 12, 13, 14)

console.log(a)