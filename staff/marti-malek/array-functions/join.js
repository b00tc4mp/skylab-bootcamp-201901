/**
 * Abstraction of join.
 * 
 * Joins the elements of an array with the desired param.
 * 
 * @param {Array} arr 
 * @param {*} elem
 * 
 * @throws {Error} - If too many arguments (> 2)
 * 
 */
function join(arr, elem) {
    var res = '';

    elem = elem === undefined ? ',' : elem;
    if (arguments.length > 2) throw Error('too many arguments');

    for (var i = 0; i < arr.length; i++) {
        res += arr[i];
        if (i == arr.length-1) return res;
        res += elem;
    }
    return res;
}