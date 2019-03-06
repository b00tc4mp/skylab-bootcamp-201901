var fs = require('fs')
var path = require('path') // x analitzar el path dels fitxers


const {argv: [ , , path, ext] } = process

fs.readdir(dir, (error, files) =>{
    if (error) throw Error

    const filtered = files.filter(file => path.extname(file) ===`.${ext}`)
    filtered.forEach(file => console.log(file))
})

/*

fs.readdir(process.argv[2], (error, list) => {
    if (error) console.error(error)
    else {
        let filterList=list.filter(document => path.extname(document) === '.' + process.argv[3])
        filterList.forEach(filteredDocument=>console.log(filteredDocument))  
    }
})

ho podem testejar amb mocha and chai:  
en el teminral escriure: npm init --yes (a l'arrel de la carpeta)(crea un paquet json i poder crear node modules)
npm i -g mocha
npm i --save-dev chai (dependencies: instal.lar lliureries q depengui el num time de la meva app 
i a devDependencies les llibreries x fer testing)







*/

