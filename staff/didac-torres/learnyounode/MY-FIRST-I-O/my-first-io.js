const [,,url]= process.argv
let fs = require('fs')

let file=fs.readFileSync(url)

var str = file.toString()

var count = str.split('\n')

console.log(count.length-1)