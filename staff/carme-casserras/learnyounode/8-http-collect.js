const http = require('http')
const concatStream = require('concat-stream')

const {argv: [, , url]} = process

http.get(url, response => {

    response.pipe(concatStream(data => console.log(`${data.length}\n${data}`)))
    debugger
})