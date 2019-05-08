const http = require('http')

const { argv: [, , port] } = process

http.createServer((req, res) => {
    if(req.method === 'POST') {
        let content = ''
        
        req.setEncoding('utf8')
        
        req.on('data', chunk => content += chunk)

        req.on('end', () => res.end(content.toUpperCase()))
    } else res.end('Only response POST')
}).listen(port)