/**
 * Abstraction of splice.
 * 
 * Method changes the contents of an array by removing or replacing existing elements       and/or adding new elements.
 * 
 * @param {Array} array
 * @param {Number} start
 * @param {Number} deleteCount
 * @param {+} item
 * 
 * @throws {TypeError} - if array is not an array.
 * 
 * @returns {Array} 
 * 
 * 
 */

function splice(array, start, deleteCount, item) {
    if (deleteCount > (array.length-start) || deleteCount === undefined) { deleteCount = array.length-start};
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array');

    var original = [];
    var items = [];
    var initial = [];
    var end = [];
    var final = [];
    var res = [];

    if (arguments.length >3) {
        for (var i = 3; i<arguments.length; i++) {
            items[items.length] = arguments[i];
        }
    }
    
    for (let i = 0; i < start; i++) {
        initial[initial.length] = array[i]
    };

    for (let i = (start + deleteCount); i < array.length; i++) {
        end[end.length] = array[i]
    };

    for (let i = start; i < (start+deleteCount); i++){
        res[res.length] = array[i]
    };

    for (let i = 0; i < initial.length; i++) {
        final[final.length] = initial[i];
    }
    for (let i = 0; i < items.length; i++) {
        final[final.length] = items[i];
    }
    for (let i = 0; i < end.length; i++) {
        final[final.length] = end[i];
    }

    array.length = final.length;

    for (let i = 0; i < final.length; i++) {
        array[i] = final[i];
    }

    return res;
};