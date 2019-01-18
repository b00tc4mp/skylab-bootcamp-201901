/**
 * 
 * @param {array} array 
 * @param {function} callback
 * 
 * some() executes the callback function once for each element present in the array until it finds one where callback returns a truthy value If such an element is found, some() immediately returns true. Otherwise, some() returns false.
 */

function some(array, callback) {
    callback(element)
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i]) === true) {
            return true;
            break;
        } else {
            return false;
        };
    };
};

some([1, 2, 3, 4, 5], element < 3);