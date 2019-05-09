const fs = require('fs') // Se saca el modulo de Node

const file = process.argv[2] // En este directorio está el archivo

const lines = fs.readFileSync(file) //Usamos el metodo de readFileSync psobre file para tener un buffer de datos

const results = lines.toString().split('\n').length - 1 // ese buffer lo pasamos a string y lo dividimos en cada espacio. como el ultimo no cuenta pues menos 1

console.log(results) // imprimimos resultados

