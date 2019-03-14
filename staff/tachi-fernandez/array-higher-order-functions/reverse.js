/** 
 * Abstraction of reverse.
 *
 * This method reverses an array in place. The first array element becomes the last,
 * and the last array element becomes the first
 *
 * @param {Array} arr - The array to reverse.
 * 
 * @throws {TypeError} - when array is not an Array
 *
 *@return {Array} - Array revertida
 */
function reverse(array) {
    if(!(array instanceof Array)) throw TypeError(array+' should be an Array')

    var res=Object.assign([],array)

    for (var i=0; i<array.length; i++){
        array[i]=res[res.length-1-i]
    }

    return array
}