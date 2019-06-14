'use strict'
const dgram = require('dgram')
const PORT = 8889
const HOST = '192.168.10.1'

const socket = dgram.createSocket('udp4')
socket.bind(PORT)

socket.on('message', data => console.log(data.toString()))

socket.send('command', 0, 7, PORT, HOST, console.log)

debugger

socket.send('battery?', 0, 8, PORT, HOST, console.log)
socket.send('battery?', 0, 8, PORT, HOST, console.log)

