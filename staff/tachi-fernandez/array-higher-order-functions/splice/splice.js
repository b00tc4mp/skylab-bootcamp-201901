/**
 * Introduct with splyce
 * 
 * Indroduct elements to the position choose
 * 
 * @param {Array} array - The array to search an item in.
 * @param {number} index - The index where the element will be introduced.
 * @param {*} value - The element what do you want to introduce
 * 
 * @returns {*} - Array modificated
 */

function splice(array, index, value) {
    for (var i = 0; i < array.length; i++) {
        //var num = array[i]
        if (i === index) {
            array[i] = value
            //array[i+1] = num




        };
    };
    return array
};