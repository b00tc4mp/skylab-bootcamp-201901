
/**It will create a new array with an iteration of the original after passing for the callback fuction.
 * 
 * @param {array} array array to iterate
 * @param {function} callback function to proces each element.
 */

function map(array, callback){
    var i, newArray = [];

    for (i = 0; i < array.length; i++){
        newArray[i] = callback(array[i]);
    }

    return newArray;
}