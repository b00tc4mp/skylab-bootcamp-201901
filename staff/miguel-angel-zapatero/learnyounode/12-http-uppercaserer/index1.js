const http = require('http')
const map = require("through2-map")

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if(req.method === 'POST') {
        req.pipe(map(chunk => {
            return chunk.toString().toUpperCase()
        })).pipe(res)
    } else res.end('Only response POST calls')
}).listen(port)