const fs = require('fs')

const { argv: [, , from, to] } = process

const content = fs.readFileSync(from)

fs.writeFileSync(to, content)
