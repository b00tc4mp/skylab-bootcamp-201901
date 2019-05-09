const fs = require('fs')

const { argv: [, , path] } = process

// const content = fs.readFileSync(path)
const content = fs.readFileSync(path, 'utf8')

// const lines = content.toString().split('\n').length - 1
// const lines = content.split('\n').length - 1
const lines = content.match(/\n/g).length

console.log(lines)