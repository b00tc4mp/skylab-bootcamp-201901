const http = require('http')
const cs = require('concat-stream')

const { argv: [, , url] } = process

http.get(url, res => {
    res.pipe(cs(content => console.log(`${content.length}\n${content}`)))

    res.on('error', error => { throw error })
})