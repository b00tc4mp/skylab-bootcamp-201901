const path = require('path')
const fs=require('fs')

module.exports = (dir, extension, callback) => fs.readdir(dir, (error, list) => {
    if (error) return callback(error)

    else return callback(null, list.filter(file => (path.extname(file) === (`.${extension}`))))
})