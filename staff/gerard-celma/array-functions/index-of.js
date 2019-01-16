/**
 * Abstraction of indexOf.
 * 
 * Returns the position in an array of the searched element.
 * 
 * @param {array} array
 * @param {*} value
 * @param {number} index
 * 
 * @throws {TypeError} - If array is not an array
 */

function indexOf(array,value,index) {
     if(!(array instanceof Array)) {
        throw TypeError ("The first parameter " + array + " is not an array");
     } else if(!index) {
        for (var i = 0; i<array.length; i++) {
            if(value === array[i]) {
                return i;
            }
        }
        return -1;
     } else if(index) {
         for (var i = index; i<array.length; i++) {
            if(value === array[i]) {
                return i;
            }
        }
        return -1;
    }
}

indexOf([1,2,3,4],1,0,8);