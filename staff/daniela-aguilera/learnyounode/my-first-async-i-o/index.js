var fs = require('fs')  
var file = process.argv[2]  

//espera que trabajes de modo asyncrono. los return son syncronos
fs.readFile(file, 'utf8' ,function (err, data) { 
  var lines = data.split('\n').length - 1  
  console.log(lines)  
})

