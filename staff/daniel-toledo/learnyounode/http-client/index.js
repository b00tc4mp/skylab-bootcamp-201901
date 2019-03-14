const http = require('http')
const { argv: [, , url] } = process

http.get(url, response => response.setEncoding("utf8").on('data', data => console.log(data)))