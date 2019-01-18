/**
 * Abstraction of splice
 * 
 * changes the contents of an array by removing or replacing existing elements and/or adding new elements.
 * 
 * @param {Array} arr 
 * @param {Number} start 
 * @param {Number} countDel 
 * @param {*} item
 * 
 * @throws {}
 * 
 * @returns {Array} An array containing the deleted elements.
 */

function splice(arr, start, countDel, item) {

    splice(arr, "1", "2", "3", "4")

    if (!(arr instanceof Array)) throw TypeError (arr + ' should be an array')
    if (typeof start !== "number"){
        for (var i = 1; i< arguments.length; i++){
            arguments[i] = arguments[i+1]
        }
    }


}