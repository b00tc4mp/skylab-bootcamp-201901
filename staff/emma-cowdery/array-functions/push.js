/**
 * push() adds one or more elements to the end of an array and returns the length of the array.
If length property isn't readable, the method sets length to 0. This let's us use this method even if the lenght property is non existent.

Sintax: arr.push(element1, element2, ...)

var sports = ['soccer', 'baseball'];
var total = sports.push('football', 'swimming');

console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']
console.log(total);  // 4
 * 
 * @param {Array} array
 * @param {Element} element
 * 
 */


function push(array, element) {
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array');
    array[array.length]=element;
    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            array[array.length] = arguments[i];
        };
    };
    return array.length;
};