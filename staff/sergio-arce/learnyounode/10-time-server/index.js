const net = require('net')
const strftime = require('strftime')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date

    const formattedDate = strftime('%F %R\n', date)

    socket.end(formattedDate)
})

server.listen(port) 