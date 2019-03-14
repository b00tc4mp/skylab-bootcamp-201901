let fs = require('fs')
let path = require('path')

module.exports = function (directory, extension, callback) {

    fs.readdir(directory, function (err, list) {
        if (err) return callback(err)

        const res = list.filter(file => path.extname(file).includes(extension))
        
        callback(null, res)
    })
}