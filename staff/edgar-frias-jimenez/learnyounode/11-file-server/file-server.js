const http = require('http')
const fs = require('fs')

const { argv: [, , port, folder] } = process

const fileServer = http.createServer((request, response) => {
  fs.createReadStream(folder).pipe(response)
})

fileServer.listen(port)
