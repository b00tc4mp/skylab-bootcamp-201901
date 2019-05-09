const http = require('http')
const map = require('through2-map')

const { argv: [, , port] } = process
debugger
const server = http.createServer((req, res) => {
    if (req.method === 'POST')
        req.pipe(map(function (chunk) {
            return chunk.toString().toUpperCase()
        })).pipe(res)
    else res.end('i can only process POST calls')
})

server.listen(port)