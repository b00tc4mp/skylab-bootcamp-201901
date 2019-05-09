const fs = require('fs')

const filePath = process.argv[2]

const buf = fs.readFileSync(filePath)

const str = buf.toString()

const arr = str.split('\n')

const resp =  arr.length  -1 

console.log(resp)



// metodo mathch regex 