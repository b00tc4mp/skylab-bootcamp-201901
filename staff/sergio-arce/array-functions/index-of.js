/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */

// El método indexOf() retorna el primer índice en el que se puede encontrar 
// un elemento dado en el array, ó retorna -1 si el elemento no esta presente.

function indexof(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == elem){
            return i;
        }
    }
    return -1;
}
