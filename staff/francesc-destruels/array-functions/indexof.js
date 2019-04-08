
/**It will look for an element on an array, it will retur -1 if it is not present or the value of the last index presented.
 * 
 * @param {array} array array to iterate
 * @param {element} searchElement value to look for index
 * @param {number} index first value to start looking
 */

var indexof = function(array, searchElement, startingIndex){
    var i, j = -1;

        if (startingIndex === undefined){
            for (i = 0; i <array.length; i++){
                if (array[i] === searchElement){
                return i;
                }
            }
        } else {
            for (i = startingIndex; i <array.length; i++){
                if (array[i] === searchElement){
                return i;
                }
            }
        }
        return j;
}