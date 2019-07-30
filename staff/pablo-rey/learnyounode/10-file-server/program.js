const http = require('http')
const fs = require('fs');

const port = parseInt(process.argv[2]);
const file = process.argv[3];

var server = http.createServer(function (req, res) {
  const readStream = fs.createReadStream(file);
  readStream.on('open', () => readStream.pipe(res))
})
server.listen(port)
