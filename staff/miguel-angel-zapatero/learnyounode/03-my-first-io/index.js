const path = process.argv[2]
const fs = require('fs')
const buf = fs.readFileSync(path)

const result = buf.toString().split('\n').length - 1

console.log(result)