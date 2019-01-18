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
var arr = [1, 2, 3];
var kickme = '4,5';


var expected = [4, 1, 2, 3]

function unshifter(array, data) {
    var result = [];

    if (!(array instanceof Array))
        throw new TypeError(ele + ' is not an array');

    for (var i = 0; i < data.length; i++) {
        result.push(data)
        console.log('data')
    }

    for (var y = 0; y < array.length; y++) {
        console.log('array')
        result.push(array)
    }

    return result

};

unshifter(arr, kickme)

