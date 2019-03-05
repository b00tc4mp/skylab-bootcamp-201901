var fs = require('fs')
var path = require('path')

module.exports = function (dName, fileExt, callback) {
    fs.readdir(dName, (err, list) => {
        if (!err) {
            let res = list.filter(file => path.extname(file) === ('.' + fileExt))
            callback(undefined, res)
        } else {
            callback(err)
        }
    })
}