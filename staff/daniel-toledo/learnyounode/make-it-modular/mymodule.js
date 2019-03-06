module.exports = (directory, extension, callback) => {
    const fs = require('fs')
    const path = require('path')
    let filteredList

    fs.readdir(directory, (error, list) => {
        if (error) return callback(error)
        else {
            filteredList = list.filter(file => (path.extname(file) === ('.' + extension)))
            return callback(null, filteredList)
        }
    })

}