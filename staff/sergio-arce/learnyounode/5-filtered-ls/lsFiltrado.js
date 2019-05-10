
var fs = require('fs')
var path = require('path')
var dirName = process.argv[2]
var extension = process.argv[3]
const fs = require('fs')
const path = require('path')

const { argv: [, , folder, ext] } = process

fs.readdir(folder, (error, files) => {
    if (error) throw error

    // const filtered = files.filter(file => path.extname(file) === `.${ext}`)

    // filtered.forEach(file => console.log(file))

    files.forEach(file => path.extname(file) === `.${ext}` && console.log(file))
})


//console.log(dirName)
// fs.readdir(dirName,function lsCB(error,elementos){
// 	if(!error){
// 		var numeroFicheros = 0

// 		elementos.forEach(function(file){
// 			if(path.extname(file) ==='.'+extension){
// 				console.log(file)
// 				numeroFicheros++
// 			}
// 		})
// 	}
// 	//console.log("Encontrados("+extension+")"+numeroFicheros+" de "+elementos.length)
// })

