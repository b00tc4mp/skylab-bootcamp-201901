const http = require('http')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if (req.method === 'POST') {
        let content = ''

        req.on('data', data => content += data)

        req.on('end', () => res.end(content.toUpperCase()))
    } else res.end('cannot accept other method than POST')
}).listen(port)