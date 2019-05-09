const pa = process.argv[2]

const fs = require('fs')

const buf = fs.readFileSync(pa)

const str = buf.toString()

const arr = str.split('\n')

//console.log(str.match(/\n/g).length)

console.log(arr.length - 1)