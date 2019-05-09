var net = require('net');
const [,,host,port, message]= process.argv


var client = new net.Socket()
client.connect(port, host, function() {
    console.log('MENSAJE: ' + message)
    client.end(message.toString())

});