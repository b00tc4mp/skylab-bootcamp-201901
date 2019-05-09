const [,, port] = process.argv

const http = require('http')
var map = require("through2-map")

const server = http.createServer(function (request, response) {
   
    request.pipe(map(function(chunk) {
        return chunk.toString().toUpperCase()
    })).pipe(response)
    
})

server.listen(Number(port))
