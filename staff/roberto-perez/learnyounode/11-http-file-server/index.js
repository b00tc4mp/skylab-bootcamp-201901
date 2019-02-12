var http = require("http");
var fs = require("fs");

const {
  argv: [, , port, file]
} = process;

http
  .createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    const readStrem = fs.createReadStream(file);
    readStrem.pipe(res);
  })
  .listen(8000);
