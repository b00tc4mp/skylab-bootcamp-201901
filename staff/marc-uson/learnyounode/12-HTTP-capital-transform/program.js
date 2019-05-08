var http = require('http')
var map = require('through2-map')

const {argv:[, ,port]} = process

http.createServer(function (request, response) {
    if(request.method === 'GET'){

      request.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(response)

    }

}).listen(port)

