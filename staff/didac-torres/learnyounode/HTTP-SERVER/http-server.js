const [, , port, url] = process.argv
let http = require('http')
let fs = require('fs')


let server = http.createServer(function (request, response) {

    response.writeHead(200, { 'content-type': 'text/plain' });

    fs.createReadStream(url).pipe(response);
})
server.listen(port)

