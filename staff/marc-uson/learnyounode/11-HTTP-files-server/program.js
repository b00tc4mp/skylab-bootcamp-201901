var http = require('http')
let fs = require('fs')

const {argv:[, ,port, path]} = process

http.createServer(function (request, response) {
    response.writeHead(200, {'content-type' : 'text/plain' })

    fs.createReadStream(path).pipe(response)
}).listen(port)
