/**
 * 
 * Abstraction of shift
 * 
 * removes the first element from an array and returns that removed element. This method changes the length of the array.
 * 
 * @param {Array} arr
 * 
 * @throws {Error}
 * @throws {TypeError} - If array is not an array
 * 
 * @returns {*} returns the last element of the array 
 */

function shift (arr){

    if (arguments.length > 1) throw Error ('Should just introduce one parameter (an array)')
    if (!(arr instanceof Array)) throw TypeError (arr + 'The parameter should be an array')
    if (arr.length === 0) return undefined

    var re = arr[0]

    for (var i =0; i< arr.length -1; i++){
        arr[i] = arr[i+1]
    }
    arr.length --
    console.log(arr)
    return re
}


// var a = []
// var re = arr[0]

// for (var i=1; i< arr.length; i++){
//     a[i-1] = arr[i]
// }
// arr = a
// return re