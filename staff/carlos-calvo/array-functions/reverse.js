/**
 * 
 * @param {Array} array 
 * 
 * return array reversed
 */

function reverse(array){

    if(!(array instanceof Array)) throw new Error ('Not an array')
    if(arguments.length !== 1) throw new Error ('Incorrect number of parameters')

    var arraydestination = []

    console.log('La cadena normal es ' + array)
    for (var i = 0; i < array.length; i++){
        arraydestination[i] = array[array.length-1 -i]
    }
    // for(var i = 0; i < array.length; i++){
    //     array[i] = arraydestination[i]
    // }
    Object.assign(array, arraydestination)
    console.log('La cadena invertida es' + array)
}

var array = [1,2,3,4,5]
reverse(array)
console.log('Fuera la cadena es' + array)
