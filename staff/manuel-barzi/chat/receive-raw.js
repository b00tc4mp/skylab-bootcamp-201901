const net = require('net')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    socket.on('data', data => {
        const ip = `${socket.remoteAddress}:${socket.remotePort}`

        console.log(`${ip}: ${data.toString()}\n`)
    })
})

server.listen(port)