/*
Abstraction of find

Returns the first value of the first element in the array that satisfies the provided testing function.

*/

function find(array, function) {


    for (var i=0; i < Array.length; i++) {
        if (condition[i] === true) {
            return array[i];
        } 
    }

}
