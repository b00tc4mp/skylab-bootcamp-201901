const fs = require('fs')

module.exports = function (file) {
    return function (req, res, next) {
        fs.readFile(file, 'utf-8', (err, content) => {
            if (err) throw err
            res.htmlBody = content
            next()
        })
    }
}