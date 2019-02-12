const net = require('net')

const { argv: [, , port] } = process

const server = net.createServer(socket => {
    const date = new Date

    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes()


    // socket.write(`${year}-${normalize2Digits(month)}-${normalize2Digits(day)} ${normalize2Digits(hour)}:${normalize2Digits(min)}\n`)
    // socket.end()

    socket.end(`${year}-${normalize2Digits(month)}-${normalize2Digits(day)} ${normalize2Digits(hour)}:${normalize2Digits(min)}\n`)
})

function normalize2Digits(num) {
    return num < 10 ? `0${num}` : `${num}`
}

server.listen(port)
