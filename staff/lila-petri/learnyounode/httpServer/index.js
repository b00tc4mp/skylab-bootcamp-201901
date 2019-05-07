const http = require('http')  
const fs = require('fs') 
const { argv: [, , port, file] } = process

const server = http.createServer((request, response) =>{
    fs.createReadStream(file).pipe(response)
    
});
server.listen(port);