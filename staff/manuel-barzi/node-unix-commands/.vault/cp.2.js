const fs = require('fs')

const { argv: [, , from, to] } = process

fs.copyFileSync(from, to)