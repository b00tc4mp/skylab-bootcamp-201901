const fs = require('fs') //llamamos para poder usar

function filter(filePath, filtertype, callback) { //creamos nuestra funcion filto con los 3 argumentos path, fitro y callback
    fs.readdir(filePath, (error, list) => { // llamamos a la lista 
        if (error) return callback(error) // si error devolemos error en la callback

        let filteredList = list.filter(function (element) { //filtramos
            return element.includes(`.${filtertype}`)
        })

       callback(null, filteredList)  // enviamos primer parametro de error nulo y el segundo la lista on lo que pasa el filtro
    })
}

module.exports = filter // exportamos la funcion a traves del modulo.

