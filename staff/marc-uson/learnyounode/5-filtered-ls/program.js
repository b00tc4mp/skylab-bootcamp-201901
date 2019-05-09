let fs = require('fs')
let path = require('path')

const[,,_path,extension] = process.argv

fs.readdir(_path, (error, files) =>  {
    if(error) throw MSMediaKeyError
    files.forEach((element) => {
        if (path.extname(element) === `.${extension}`) console.log(element)
    })
    })
