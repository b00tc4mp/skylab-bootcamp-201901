const http = require('http')
const map = require('through2-map')
const { argv: [, , port] } = process

const uppercase = http.createServer((request, response) => {
    request.pipe(map(chunk => {
      return chunk.toString().toUpperCase()
    })).pipe(response)
})

uppercase.listen(port)
