module.exports = function (dir, ext, callback) {

    var fs = require('fs')
    var path = require('path')
    var results = []

    fs.readdir(dir, function (err, lista) {
        if (err) return callback(err)

        lista.forEach(function (res) {

            if (path.extname(res) === '.' + ext) {
                results.push(res)
            }
        })
        return callback (null, results)
    })


}
