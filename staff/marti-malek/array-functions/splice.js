/**
 * 
 * @param {Array} arr 
 * @param {number} start 
 * @param {number} deleteCount 
 * @param {*} item 
 * 
 * @returns {Array} - If deleted part of arr
 * 
 * @throws {Error} - If too few arguments
 * @throws {TypeError} - If arr is not an array
 */
function splice(arr, start, deleteCount, item) {

    if (arguments.length < 1) throw Error ('too few arguments');
    if (!(arr instanceof Array)) throw TypeError ('arr should be an array'); 

    var initial = [];
    var res = [];
    var final = [];
    var items = [];
    var def = [];

    if (arguments.length > 3) {
        for (var i = 3; i < arguments.length; i++) {
            items[items.length] = arguments[i];
        }
    }

    //Taking the pieces to build arr

    for (var i = 0; i < start; i++) {
        initial[initial.length] = arr[i];
    };
    for (var i = start; i < start+deleteCount; i++) {
        res[res.length] = arr[i];
    };
    for (var i = initial.length+res.length; i < arr.length; i++) {
        final[final.length] = arr[i];
    };

    //Building def

    for (var i = 0; i < initial.length; i++) {
        def[def.length] = initial[i];
    };
    for (var i = 0; i < items.length; i++) {
        def[def.length] = items[i];
    };
    for (var i = 0; i < final.length; i++) {
        def[def.length] = final[i];
    };

    //Copying def into arr
    arr.length = def.length;
    for (var i = 0; i < def.length; i++) {
        arr[i] = def[i];
    }

    return res;
};


