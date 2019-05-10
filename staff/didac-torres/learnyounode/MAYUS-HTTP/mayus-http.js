const [, , port] = process.argv
let http = require('http')
let fs = require('fs')
var map = require('through2-map')


let server = http.createServer(function (request, response) {

    if (request.method === 'POST') {
    request.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
    })).pipe(response)
}

})
server.listen(port)


