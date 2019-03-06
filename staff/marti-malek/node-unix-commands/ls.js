const fs = require('fs')

const { argv: [, , filepath] } = process

fs.readdir(filepath, (err, list) => {
    if (!err) list.forEach(file => console.log(file))
    else console.error(err)
})