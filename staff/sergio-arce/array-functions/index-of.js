/**
 * 
 * 
 * @param {Array} array The array to iterate.
 * @param {*} elem The expression to evaluate.
 * 
 * @returns {number} 
 */


// El método indexOf() retorna el primer índice en el que se puede encontrar 
// un elemento dado en el array, ó retorna -1 si el elemento no esta presente.

function indexOf(arr, elem) {
    if (!(arr instanceof Array)) throw TypeError(`${arr} is not an array`);

    // dudas 
    // if (typeof elem == )

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == elem){
            return i;
        }
    }
    return -1;
}
