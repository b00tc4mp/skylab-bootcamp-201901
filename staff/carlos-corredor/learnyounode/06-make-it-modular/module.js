const fs = require('fs')
const path = require('path')

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, (error, file) => {
        if(error) return callback(error)
        const filtered = file.filter(word => path.extname(word) === `.${ext}`)
        callback(null, filtered)
        })
}