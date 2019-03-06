const http = require('http')

const { argv: [, , url] } = process

// http.get(url, res => res.on('data', chunk => console.log(chunk.toString())))

// http.get(url, res => {
//     res.setEncoding('utf-8')

//     res.on('data', chunk => console.log(chunk))
// })

http.get(url, res => res.setEncoding('utf-8').on('data', chunk => console.log(chunk)))