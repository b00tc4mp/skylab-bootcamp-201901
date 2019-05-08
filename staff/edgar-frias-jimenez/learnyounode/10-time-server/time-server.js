const net = require('net')
const { argv: [, , port] } = process

const now = new Date();

const nomalize = (num) => {
  return num < 10 ? `0${num}` : `${num}`
}

const date = `${now.getFullYear}-${normalize(now.getMonth()+1)}-${nomalize(now.getDate())}`
const time = `${nomalize(now.getHours())}:${nomalize(now.getMinutes())}`

const today = `${date} ${time}`

const timeServer = net.createServer(socket => {
  socket.end(today + '\n')
})

timeServer.listen(port)
