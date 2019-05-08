const net = require('net')

const port = process.argv[2] // Puerto que usara como request

function thisTime() {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1 )< 10 ? "0" + (date.getMonth() + 1) : date.getMonth()
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    return `${year}-${month}-${day} ${hour}:${minutes}`
}

const server = net.createServer(socket => {
    socket.end((`${thisTime()}\n`))
})

server.listen(port) // se llama a la funcion con el puerto que le llegue
