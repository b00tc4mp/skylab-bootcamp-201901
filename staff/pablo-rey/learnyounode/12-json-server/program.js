const http = require('http');
const map = require('through2-map');

const port = parseInt(process.argv[2]);

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url.startsWith('/api/parsetime')) {
    const date = new Date(req.url.split("=")[1]);
    const result = {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
    res.write(JSON.stringify(result));
    res.end();
  } else   if (req.method === 'GET' && req.url.startsWith('/api/unixtime')) {
    const date = new Date(req.url.split("=")[1]);
    const result = {
      unixtime: date.getTime(),
    };
    res.write(JSON.stringify(result));
    res.end();
  }
});
server.listen(port);
