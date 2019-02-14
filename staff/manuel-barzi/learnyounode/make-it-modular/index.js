const { argv: [, , dir, ext] } = process

const filterByExtension = require('./filter-by-extension')

filterByExtension(dir, ext, (error, files) => {
    if (error) throw error

    files.forEach(file => console.log(file))
})
