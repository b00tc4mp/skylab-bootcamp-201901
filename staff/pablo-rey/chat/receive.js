const http = require('http')

const port = parseInt(process.argv[2]);

const server = http.createServer(function (req, res) {
    req.on('data', chunk => {
      console.log(req.connection.remoteAddress, "=>", chunk.toString())
      res.end('OK');
    });
})
server.listen(port)