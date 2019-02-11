var fs = require('fs')

let buf = fs.readFileSync(process.argv[2])

let str = buf.toString()

console.log((str.split('\n')).length -1)