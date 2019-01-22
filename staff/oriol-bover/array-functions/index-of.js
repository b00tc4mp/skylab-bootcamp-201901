/**
 * Abstraction of indexOf
 * 
 * Iterates the array and returns the first index at which a given element can be found in the array, or -1 if it is not present.
 * 
 * @param {array} array 
 * @param {*} searchElement - Element to locate into the array.
 * @param {number} fromIndex  - The index to start the search at.
 */


function indexOf(array, searchElement, fromIndex) {
    if(arguments.length > 3)
        throw Error('too many arguments');
    
    if (!(array instanceof Array))
        throw new TypeError(array + ' is not an array');

    fromIndex = fromIndex === undefined ? 0 : fromIndex;

    for (var i = fromIndex; i < array.length; i++) {
        var value = array[i];

        if(searchElement === value)
            return i;
    }

    return -1
}