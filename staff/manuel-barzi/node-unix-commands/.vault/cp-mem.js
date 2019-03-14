const fs = require('fs')

const { argv: [, , from, to] } = process

console.log(process.memoryUsage())

const content = fs.readFileSync(from)

fs.writeFileSync(to, content)

console.log(process.memoryUsage())