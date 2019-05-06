const http = require('http')
const map = require('through2-map');

const port = parseInt(process.argv[2]);

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    debugger
    let result = '';
    req.pipe(map((chunk) => chunk.toString().toUpperCase())).pipe(res);
  }
})
server.listen(port)
