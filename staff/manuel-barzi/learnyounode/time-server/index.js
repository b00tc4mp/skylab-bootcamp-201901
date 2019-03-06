const net = require('net')
const strftime = require('strftime')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date

    // yyyy-MM-dd HH:mm

    // const formattedDate = strftime('%Y-%m-%d %H:%M\n', date)
    const formattedDate = strftime('%F %R\n', date)

    socket.end(formattedDate)
})


server.listen(port)
