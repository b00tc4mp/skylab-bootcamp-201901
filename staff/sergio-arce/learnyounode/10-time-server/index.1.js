const net = require('net')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date

    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes()

    socket.end(`${year}-${digits2(month)}-${digits2(day)} ${digits2(hour)}:${digits2(min)}\n`)
})

function digits2(num) {
    return num < 10? `0${num}` : `${num}`
}

server.listen(port) 