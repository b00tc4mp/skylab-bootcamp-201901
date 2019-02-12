const {argv} = process


const fs=require('fs')

let buffer=fs.readFileSync(argv[2])
let lines =buffer.toString().split('\n').length-1

console.log(lines)