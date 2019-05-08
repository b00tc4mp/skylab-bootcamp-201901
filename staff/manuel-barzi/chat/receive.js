const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const ip = req.socket.remoteAddress || req.connection.remoteAddress

        console.log(`${ip}: ${content}\n`)

        res.end('ok')
    })
})

server.listen(port)