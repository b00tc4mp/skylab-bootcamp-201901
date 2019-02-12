const net = require('net')

const { argv: [, , address, from, message] } = process

const [host, port] = address.split(':')

const conn = net.createConnection(port, host)

conn.write(`${from}: ${message}`)

conn.on('data', data => console.log(data.toString()))