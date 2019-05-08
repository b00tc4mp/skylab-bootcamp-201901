var fs = require('fs') 

const [ , , url]=process.argv

var file=fs.readFileSync(url).toString()
var array=file.split('\n')

console.log(array.length-1)

