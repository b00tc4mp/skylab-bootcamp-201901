/**
 * Abstraction of indexOf.
 * 
 * 
 * 
 * 
 * @param {Array} arr
 * @param {resInterno} 
 * @param {respuesta} 
 * 
 * @throws {TypeError} - If array is not an array
 */


function indexio(arr, data) {
    var respuesta = [];

    for (var i = 0; i < arr.length; i++) {
        if (data === arr[i]) {

            respuesta[respuesta.length] = i

        }
    }
    return (respuesta.length) ? respuesta : -1

}




