/**
 * 
 * Abstraction of reverse.
 * 
 * Reverses the elements of an array (modifying it!).
 * 
 * @param {Array} arr 
 * 
 * @returns {Array}
 * 
 * @throws {Error} -If too many arguments
 * @throws {TypeError} - If arr is not an array
 */
function reverse(arr) {

    if (arguments.length > 1) throw Error ('too many arguments');
    if (!(arr instanceof Array)) throw TypeError (arr + 'should be an array');

    var res = Object.assign([], arr);;
    for (var i = arr.length; i > 0; i--) {
        arr[i-1] = res[arr.length-i];    
    }
    return arr;
};