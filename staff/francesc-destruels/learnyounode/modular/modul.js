const mymodule = require('./mymodule') // recivinos la funcion exportada
const filePath = process.argv[2] //Extraemos el path al archivo
const filtertype = process.argv[3] // extraemos el filto
mymodule(filePath, filtertype, (err, list) => { //ejecutamos la funcion exportada con sus 3 paramtros

    if (err) return console.error('There was something wrong:', err)

    for (i in  list) {
        console.log(list[i]) // pintamos tantas veces como objetos en la lista
    }

})