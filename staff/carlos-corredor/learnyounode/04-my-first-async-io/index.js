var fs = require('fs')
fs.readFile(process.argv[2], 'utf8', function(error, res){console.log(res.split('\n').length -1)})
