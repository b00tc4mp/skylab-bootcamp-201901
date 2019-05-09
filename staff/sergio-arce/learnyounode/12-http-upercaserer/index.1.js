const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    let content = ''
debugger
    req.setEncoding('utf8')

    req.on('data', chunk => content += chunk)

    req.on('end', () => res.end(content.toUpperCase()))
})


server.listen(port)