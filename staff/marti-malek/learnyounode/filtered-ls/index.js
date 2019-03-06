var fs = require('fs')
var path = require('path')

fs.readdir(process.argv[2], function callback (err, list) {
    if (!err) {
        list.filter(file => path.extname(file) === ('.' + process.argv[3])).forEach(name => console.log(name))
    } else {
        throw err
    }
})