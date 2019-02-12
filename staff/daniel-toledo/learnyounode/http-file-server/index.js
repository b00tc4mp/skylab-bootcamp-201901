const http=require('http')
const fs=require('fs')
const {argv:[,,url]} = process

let server = http.createServer((request, response) => {
    fs.createReadStream()
  })
  server.listen(8000)