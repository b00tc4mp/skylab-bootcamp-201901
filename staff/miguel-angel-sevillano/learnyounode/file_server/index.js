var http = require('http')
var fs = require('fs');



var server = http.createServer(function (req, res) { //create a server
  
    
    fs.createReadStream(process.argv[3]).pipe(res) //for every conecton we recibed we send something to  then pipe as response

        res.writeHead(200,{'content-type': 'text/plain'});


})
server.listen(process.argv[2])
