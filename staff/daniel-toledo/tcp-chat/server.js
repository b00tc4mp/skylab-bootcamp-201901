const { argv: [, , port] } = process

const net = require('net')

net.createServer(socket =>
    socket.setEncoding('utf8').on('data', message => {
        console.log(message)
        socket.end('OK')
    })
    
).listen(port)

