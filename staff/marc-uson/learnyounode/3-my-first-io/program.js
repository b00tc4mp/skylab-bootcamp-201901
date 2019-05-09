let fs = require('fs')

const[,,path] = process.argv

const file = fs.readFileSync(path).toString()

console.log(file.split('\n').length -1)

