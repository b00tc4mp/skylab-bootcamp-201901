/**
 * 
 * Abstraction of push.
 * 
 * Adds an element at the last position of an array.
 * 
 * @param {Array} arr 
 * @param {*} value 
 * 
 * @returns {Number} Length of the array
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If array is not an array
 */

function push(arr, value) {
    
    if(arguments.length > 2) throw Error ('too many arguments');
    if(!(arr instanceof Array)) throw TypeError ('arr is not an array')

    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length-1) {
            arr[i+1] = value;
            return arr.length;
        }
    }
};

