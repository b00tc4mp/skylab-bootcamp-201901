/**
 * 
 * Abstraction of fill
 * 
 * Fills an array from start to end
 * 
 * @param {Array} array 
 * @param {*} value 
 * @param {number} start 
 * @param {number} end 
 * 
 */
function fill(array, value, start, end){
    end = (end === undefined) ? array.length : end;
    start = (start === undefined) ? 0 : end;
    for (var i = start; i < end; i++) array[i] = value;
    return array;
}

/*  Antes de ponerme a implementar la función
    planteo del caso de uso, ver ejercicio de Manu*/

var arr = [1, 2, 3, 4, 5];
var res = fill(arr, 0, 0, 2);