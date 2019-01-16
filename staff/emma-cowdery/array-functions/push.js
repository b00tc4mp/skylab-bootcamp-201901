/* 
push() adds one or more elements to the end of an array and return the length of the array.
If length property isn't readable, thi method sets length to 0. This let's us use this method even if the lenght property is non existent.

Sintax: arr.push(element1, element2, ...)

var sports = ['soccer', 'baseball'];
var total = sports.push('football', 'swimming');

console.log(sports); // ['soccer', 'baseball', 'football', 'swimming']
console.log(total);  // 4
*/

function push(array, elements) {
    if (array.lenght = undefined) {
        array.lenth = 0;
    };
    for (var i = 1; i < array.lenght; i++) {
        
    }
}

