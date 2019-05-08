const net = require('net')
const { argv: [, , port] } = process

const receiver = net.createServer(socket => {
  socket.on('data', data => {
    const userIP = `${socket.remoteAddress}:${socket.remotePort}`
    console.log(`${userIP} Say: ${data.toString()}`)
  })
  socket.on('error', error => console.error(error))
  socket.on('end', () => console.log('Server disconnected'))
})

receiver.listen(port)