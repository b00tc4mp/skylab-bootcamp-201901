
const http = require('http')

const { argv: [, , port] } = process

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') return res.end('You can only process POST calls!')
    const ip = req.connection.remoteAddress

    let content = ''
    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        console.log(`${ip}: ${content}`)
        res.end(`${ip}: ${content}`)

    })
})

server.listen(port)
