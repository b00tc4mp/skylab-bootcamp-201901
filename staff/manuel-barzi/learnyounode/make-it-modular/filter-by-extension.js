const fs = require('fs')
const path = require('path')

function filterByExtension(dir, ext, cb) {
    fs.readdir(dir, (error, files) => {
        if (error) return cb(error)

        const filtered = files.filter(file => path.extname(file) === `.${ext}`)

        cb(null, filtered)
    })
}

module.exports = filterByExtension