const fs = require('fs')
const path = require('path')

module.exports = function (folder, ext, callback) {
    fs.readdir(folder, (error, data) => {
        if(error) return callback(error)
    
        const filtered = data.filter(file => path.extname(file) === `.${ext}`)
        
        callback(null, filtered)
    })
}
