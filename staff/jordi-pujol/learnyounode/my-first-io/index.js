const fs = require('fs')

const { argv: [, , path] } = process

const content = fs.readFileSync(path, { encoding: 'utf-8' })

const numOfBreaks = content.match(/\n/g).length

console.log(numOfBreaks)