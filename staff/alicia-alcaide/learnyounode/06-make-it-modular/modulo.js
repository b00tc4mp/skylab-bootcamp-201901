module.exports = function (pa, ext, callback) {

    const fs = require('fs')
    const path = require('path')
    let arr =[]

    fs.readdir(pa, function (err, lista) {
        if (err) return callback(err)
    
        lista.forEach(function(element) {
            if (path.extname(element) === `.${ext}`) {
                arr.push(element)
            }
        })
        return callback(null,arr)
      }
    )
    

}