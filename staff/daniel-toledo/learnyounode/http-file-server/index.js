const http = require('http')
const fs = require('fs')
const { argv: [, , port, file] } = process

http.createServer((request, response) => {
  const rs = fs.createReadStream(file)

  rs.on('open', () => rs.pipe(response))

}).listen(port)