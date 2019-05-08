// const fs = require('fs')

// const content = fs.readFileSync(process.argv[2]) //Gets buffer object with file content
// let lines = content.toString().split('\n').length-1
// console.log(lines)



const fs = require('fs')

const {argv: [,,path] } = process

const content = fs.readFileSync(path, 'utf8') //Gets buffer object with file content
let lines = content.split('\n').length-1
console.log(lines)



