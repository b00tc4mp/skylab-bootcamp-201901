const [,, folder, ext] = process.argv

const fs = require('fs')
const path = require('path')

fs.readdir(folder, function (err, lista) {
    if (err) console.log(err)
    
    lista.forEach(function(element) {
        if (path.extname(element) === `.${ext}`) {
            console.log(element)
        }
    })
    
  }
)