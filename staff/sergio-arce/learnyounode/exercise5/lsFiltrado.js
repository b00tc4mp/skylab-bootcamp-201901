
var fs = require('fs')
var path = require('path')
var dirName = process.argv[2]
var extension = process.argv[3]
//console.log(dirName)
fs.readdir(dirName,function lsCB(error,elementos){
	if(!error){
		var numeroFicheros=0

		elementos.forEach(function(file){
			if(path.extname(file) ==='.'+extension){
				console.log(file)
				numeroFicheros++
			}
		})
	}
	//console.log("Encontrados("+extension+")"+numeroFicheros+" de "+elementos.length)
})


// solucion oficial

// var fs = require('fs')
// var path = require('path')

// var folder = process.argv[2]
// var ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err)
//   files.forEach(function (file) {
//     if (path.extname(file) === ext) {
//       console.log(file)
//     }
//   })
// })
