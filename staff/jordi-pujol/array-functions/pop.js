/**
 * 
 * Abstraction of pop
 * 
 * Removes the last element from an array and returns that element. This method changes the length of the array.
 * 
 * @param {Array} arr 
 * @param {*} elem 
 * 
 * @throws {Error}
 * @throws {TypeError} - If array is not an array
 */

function pop(arr){

    if (!(arr instanceof Array)) throw TypeError (arr + " is not an array")
	
	var length = arr.length
	var lastElem = arr[arr.length-1]
    arr.length = length-1

	return lastElem
}
