let fs = require('fs')
let path = require('path')


module.exports = (extension, callback) => {

    fs.readdir(extension, function (err, list) {
        if (err) throw Error

        const res = (list.filter(file => path.extname(file) === `.${process.argv[3]}`))

        return res
    })
}