const fs = require('fs')

const { argv: [, , from, to] } = process

console.log(process.memoryUsage())

const rs = fs.createReadStream(from)

const ws = fs.createWriteStream(to)

rs.pipe(ws)

rs.on('end', () => console.log(process.memoryUsage()))
