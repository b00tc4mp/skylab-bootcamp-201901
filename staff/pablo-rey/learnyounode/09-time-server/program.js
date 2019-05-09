const net = require('net')

const port = parseInt(process.argv[2]);

const server = net.createServer(function (socket) {
  const date = new Date();
  let result = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
  result += ` ${(date.getHours()).toString().padStart(2, '0')}:${(date.getMinutes()).toString().padStart(2, '0')}\n`
  socket.write(result);
  socket.end();
})
server.listen(port)