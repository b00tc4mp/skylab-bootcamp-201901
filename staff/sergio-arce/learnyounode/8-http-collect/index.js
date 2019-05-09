const http = require('http')
const cs = require('concat-stream')

const { argv: [, , url] } = process

http.get(url, res => {
    // res.setEncoding('utf8')

    res.pipe(cs(content => console.log(`${content.length}\n${content}`)))
})