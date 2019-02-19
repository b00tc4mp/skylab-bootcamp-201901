const net = require('net')

const { argv: [, , address, from, message] } = process
const [host,port] = address.split(':')

const connection= net.createConnection(port, host)

connection.write(`${from}: ${message}`)
connection.on('data', data => console.log(data.toString()))

