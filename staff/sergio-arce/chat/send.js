const http = require('http')

const { argv: [, , address, message] } = process

const [host, port] = address.split(':')

const request = http.request({ host, port, method: 'POST' })

request.end(message)