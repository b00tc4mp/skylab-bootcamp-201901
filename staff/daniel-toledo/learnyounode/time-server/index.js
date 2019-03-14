const { argv: [,, port] } = process
const net = require('net')

fillZero = (number) => number.length > 1 ? number : '0' + number

let server = net.createServer(socket => {

    const date = new Date()

    const year = fillZero(date.getFullYear().toString())
    const month = fillZero((date.getMonth() + 1).toString())
    const day = fillZero(date.getDate().toString())
    const hours = fillZero(date.getHours().toString())
    const minute = fillZero(date.getMinutes().toString())

    const today = year + '-' + month + '-' + day + ' ' + hours + ':' + minute + '\n'

    socket.end(today)
})

server.listen(port)