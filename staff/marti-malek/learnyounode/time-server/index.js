var net = require('net')

var server = net.createServer(socket => {
    let date = new Date()
    let month = (date.getMonth() + '').split('').length === 1? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = (date.getDate() + '').split('').length === 1? '0' + (date.getDate()) : date.getDate()
    let hours = (date.getHours() + '').split('').length === 1? '0' + (date.getHours()) : date.getHours()
    let minutes = (date.getMinutes() + '').split('').length === 1? '0' + (date.getMinutes()) : date.getMinutes()
    let data = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes
    socket.end(`${data}\n`)
})
server.listen(process.argv[2])
