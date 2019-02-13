const fs = require('fs')
const path = require('path')

const { argv: [, , dir, ext] } = process

fs.readdir(dir, (error, files) => {
    if (error) throw error

    const filtered = files.filter(file => path.extname(file) === `.${ext}`)

    filtered.forEach(file => console.log(file))
})