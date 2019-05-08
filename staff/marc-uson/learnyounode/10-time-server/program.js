var net = require('net')
var strftime = require('strftime') 

const {argv:[, ,port]} = process

net.createServer(function (socket) {
    socket.write(strftime('%F %H:%M') + '\n')
    socket.end()

}).listen(port)