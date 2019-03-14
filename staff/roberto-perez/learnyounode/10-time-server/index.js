var net = require("net");

var server = net.createServer(socket => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const addZeros = element => {
    return ((element < 10) ? '0' : '') + element;
  }

  let fecha = `${year}-${addZeros(month + 1)}-${addZeros(day)} ${addZeros(hours)}:${addZeros(minutes)}`;

  socket.end(fecha + '\n');
});

server.listen(process.argv[2]);
