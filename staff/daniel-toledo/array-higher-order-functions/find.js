/**
 * Abstraction of find.
 *
 * This metod return the value of the first element in the array that satisfies the provided testing function.
 * The result is back in a new array
 *
 * @param {Array} arr - The array to find.
 * @param {Function} func - testing funtion
 * 
 *
 */
function find(arr, func) {
    for (var i=0; i<arr.length; i++){
        if (func(arr[i])){
            return arr[i]
        }
    }
    
}