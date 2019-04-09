/**
 * 
 * @param {Array} arr 
 * @param {any} elem 
 * @param {index} i
 * 
 * @returns {number} 
 */
function indexOf(arr, elem, i) {
    var index = i;
    if(!index) index = 0;
    for(var j = index; j < arr.length; j++) {
        if(elem === arr[j]) return j;
    }
    return -1;
}