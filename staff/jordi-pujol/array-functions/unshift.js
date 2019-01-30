/**
 * 
 * Abstraction of unshift
 * 
 * adds one or more elements to the beginning of an array and returns the new length of the array.
 * 
 * @param {Array} arr 
 * @param {*} elem 
 *
 * @throws {TypeError} If the first parameter not an array
 *  
 * @returns {Number} returns the new length of the array
 */


function unshift (arr, elem){
    
    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')

    for (var i =0; i< arguments.length -1; i++){
        
        for (var k =0; k< arr.length; k ++){
            arr[arr.length-k] = arr[arr.length -1 -k]
        
        }
        arr[0] = (arguments[arguments.length-i-1])
    }
    return arr.length

}