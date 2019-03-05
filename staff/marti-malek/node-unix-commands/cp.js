const fs = require('fs')

const { argv: [, , from, to] } = process

fs.copyFile(from, to, err => {
    if (err) console.error(err)
    else console.log(`${from} was copied to ${to}`)
})