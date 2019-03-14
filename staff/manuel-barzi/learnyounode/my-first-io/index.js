const fs = require('fs')

const { argv: [, , path] } = process

// const content = fs.readFileSync(path)
const content = fs.readFileSync(path, { encoding: 'utf-8' })

// console.log(content.toString())
// console.log(content)

// const numOfBreaks = content.split('\n').length - 1
// const numOfBreaks = content.match(/\n/g).length
const numOfBreaks = content.match(new RegExp('\n', 'g')).length

console.log(numOfBreaks)