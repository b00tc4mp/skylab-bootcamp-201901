let fs = require('fs')

const[,,path] = process.argv

const file = fs.readFile(path, 'utf8', (error,data) =>  {
    if(error == null) console.log(data.split('\n').length -1)
    })
