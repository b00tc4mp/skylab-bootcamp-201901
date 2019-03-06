let fs = require('fs')

module.exports = (file, callback) => {

    fs.readFile(file, 'utf8' , (err, input) => {
        
        if (err) callback(err)

        return callback (null, input.match(/\n/g).length)})
    }