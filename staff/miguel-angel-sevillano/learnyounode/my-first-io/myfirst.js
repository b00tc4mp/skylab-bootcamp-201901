
var fs= require('fs')



var buffer =fs.readFileSync(`${process.argv[2]}`)

var result = buffer.toString() //se lee el archivo que envian  y se convierte a string 

var final= result.split("\n") //se separa por saltos de linea 

console.log(final.length-1) // se muestra la longitud por consola 