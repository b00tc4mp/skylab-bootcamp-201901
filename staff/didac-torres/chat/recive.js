var net = require('net')
const [,,port]= process.argv

let host = '192.168.0.29'

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        console.log('Mensaje:' + data);
    });
    socket.on('end', function() {
        console.log('BYE' );
    });
});

server.listen(port, host);
