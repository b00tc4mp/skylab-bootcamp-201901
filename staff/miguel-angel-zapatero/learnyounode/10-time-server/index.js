const net = require('net')
const strftime = require('strftime')
const {argv:[, , port]} =  process

const server = net.createServer(socket => {
    const date = new Date()

    socket.end(strftime('%F %R\n', date))
    // socket.end(strftime('%Y-%m-%d %H:%M\n'))
})
server.listen(port)