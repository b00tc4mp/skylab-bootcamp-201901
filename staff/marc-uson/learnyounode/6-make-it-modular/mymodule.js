
module.exports = (dir, extension, callback) => {
    let fs = require('fs')
    let path = require('path');
    let result = []
    fs.readdir(dir, function (err,dir) {
        if (err) return callback(err)
        dir.forEach((element) => {
            if (path.extname(element) === `.${extension}`) result.push(element)
        })
        return callback(null,result)
        })
}