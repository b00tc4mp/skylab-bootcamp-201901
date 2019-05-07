const http = require('http')  
const fs = require('fs') 
const { argv: [, , port, file] } = process

var server = http.createServer(function(request, response) {
    fs.createReadStream(file).pipe(response)
    
});
server.listen(port);