/**
 * 
 * Abstraction of shift.
 * 
 * Deletes the first element of an array and returns it (modifying the array).
 * 
 * @param {Array} arr 
 * 
 * @returns {*}
 * 
 * @throws {Error} - If too many arguments
 * @throws {TypeError} - If arr is not an array
 */
function shift(arr) {

    if (arguments.length > 1) throw Error ('too many arguments');
    if(!(arr instanceof Array)) throw TypeError (arr + 'should be an array');

    var res = arr[0];
    var arr2 = Object.assign(arr);
    for (var i = 0; i < arr.length; i++) {
        arr2[i] = arr2[i+1];
    };
    arr.length = arr.length-1;
    return res;
};