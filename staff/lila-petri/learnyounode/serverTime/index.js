const net = require('net');
const strftime = require('strftime') 

const { argv: [, , port] } = process

net.createServer(function(socket) {
 
    let s= strftime('%F %R\n', new Date())
    socket.end(s)
}).listen(port)