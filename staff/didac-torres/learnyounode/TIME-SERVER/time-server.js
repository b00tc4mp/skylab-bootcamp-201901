const [, , port] = process.argv
let net = require('net')


//formato: “YYYY-MM-DD hh:mm”



let server = net.createServer(function (socket) {
    socket.end(Data() + '\n');
})
server.listen(port)


function Data() {
    let date = new Date();
    return [ date.getFullYear(),
    addZero(date.getMonth() + 1),
    addZero(date.getDate()) ].join('-')
    + ' ' +
    [ addZero(date.getHours()),
    addZero(date.getMinutes()) ].join(':');
   }

   function addZero(num) {
    return num < 10 ? '0' + num : num;
   }