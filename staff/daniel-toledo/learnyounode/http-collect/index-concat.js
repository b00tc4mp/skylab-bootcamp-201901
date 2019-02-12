const { argv: [, , url] } = process

var http = require('http')
const cs = require('concat-stream')

http.get(url, response => {
    response.pipe(cs( content => console.log(`${content.length}\n${content}`)))

    response.on('error', error => {throw error}) //not necesary
})