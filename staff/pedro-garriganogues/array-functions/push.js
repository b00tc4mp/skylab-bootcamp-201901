/**
 * Abstraction of fill.
 * 
 * 
 * 
 * @param {Array} array
 * 
 * @throws {TypeError} - If array is not an array
 */

var arr = ['soccer', 'baseball'];
var pushme = ['football', 'swimming'];
var expected = ['soccer', 'baseball', 'football', 'swimming'];


function empujar(array, data) {
    var respuesta = []

    if (!(array instanceof Array))
    throw new TypeError(ele + ' is not an array');

    for (var i = 0; i < array.length; i++) {
        if (i > array.length) {
          
            respuesta[respuesta.length] = i
        }
    }
}



empujar(arr, pushme)
