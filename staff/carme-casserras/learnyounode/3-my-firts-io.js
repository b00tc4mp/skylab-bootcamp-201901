var fs = require('fs')

const buf = fs.readFileSync(process.argv[2]) 


const str = buf.toString().split('\n').length-1

console.log(str)


