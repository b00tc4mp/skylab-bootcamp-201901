/**
 * Abstraction of reverse.
 * 
 * The reverse() method reverses an array in place. The first array element
 * becomes the last, and the last array element becomes the first.
 * 
 * @param {Array} array - array to be reversed
 * 
 * @throws {Error} - TODO
 * @throws {TypeError} - TODO
 * 
 * @return {Array} array - a reference to the new array
 * 
 */

function reduce(array) {
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    var temp;
    count=0;

    for (var i = array.length-1; i>array.length/2-1; i--) {
        temp=array[count];
        array[count]=array[i];
        array[i]=temp;
        count++;
    }
    
    return array;

}

var array = [1,2,3,4,5,3,'a'];
console.log(array);
reduce(array);
console.log(array);
