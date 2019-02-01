/**
 * 
 * @param {Array} array 
 *///Removes last element and returns it



function pop(array) {

    if(arguments.length !== 1) throw new Error('Too many arguments')
    if(!(array instanceof Array)) throw new TypeError(array + ' not an array')

    var lastelement = array[array.length-1]
    // var arraydestination = []

    // for (var i = 0; i < array.length - 1; i++ ){
    //     arraydestination[i] = array[i]
    // }

    // console.log('Arraydestination es' + arraydestination)
    array.length = array.length -1 //Cambiar la longitud es la manera más simple.
    return lastelement
}

//Aqui no se puede hacer:
/*
array = [] --> esto crea una nueva referencia en memoria (array = new Array())
Object.assign (array, arraydestination) --> Copia las propiedades de arraydestination sobre
                                            array, pero array conserva las que sean diferentes.
*/