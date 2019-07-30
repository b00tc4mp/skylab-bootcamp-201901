const [,,dir,ext]= process.argv

var fs = require('fs')
var path = require('path')


    fs.readdir(dir, function (err, lista) {
      if (err) return console.error(err)

      lista.forEach(function (res) {

        if (path.extname(res) === '.' + ext) {
          console.log(res)
        }
      })
    })