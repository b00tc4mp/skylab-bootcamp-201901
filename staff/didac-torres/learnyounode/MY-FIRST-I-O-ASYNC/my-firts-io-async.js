const [,,url]= process.argv

let fs = require('fs')

fs.readFile(url, 'utf8', function(err,data){
     if(err) return

return console.log(data.split('\n').length-1)



})



