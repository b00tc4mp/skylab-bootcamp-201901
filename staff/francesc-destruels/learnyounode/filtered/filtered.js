const fs = require('fs')
const filePath = process.argv[2] //Extraemos el path al archivo
const filtertype = process.argv[3] //Extraemos el filtro

fs.readdir(filePath, (error, list) => { //Usamos esto para conseguir un aarray de todos los archivos en la carpeta
    if (error) throw Error("Something Wrong Happend")

    let filteredList = list.filter( element => element.includes(`.${filtertype}`))

    for (i in  filteredList) console.log(filteredList[i])
})




