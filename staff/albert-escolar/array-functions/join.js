/*The join() method creates and returns a new string by concatenating all of the elements in an array 
(or an array-like object), separated by commas or a specified separator string. If the array has only one item, 
then that item will be returned without using the separator.
*/



var arr = [1, "cat", 3];
var separator = "/";

function join(arr, separator) {
    var resultString = "";
    for (i = 0; i < arr.length; i++) {
        resultString += arr[i];
        if (i < arr.length - 1) {
            resultString += separator;
        }
    }
    return resultString;
}

console.log(join(arr, separator));