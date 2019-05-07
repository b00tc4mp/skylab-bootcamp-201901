const fs = require('fs')
const path = require('path')

const { argv: [, , folder, ext] } = process

fs.readdir(folder, (error, files) => {
    if (error) throw error

    // const filtered = files.filter(file => path.extname(file) === `.${ext}`)

    // filtered.forEach(file => console.log(file))

    files.forEach(file => path.extname(file) === `.${ext}` && console.log(file))
})