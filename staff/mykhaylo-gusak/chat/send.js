// $ node send.js <host>:<port> "the message"/
// 192.168.0.15:8080
const http = require('http')

const {argv:[,,ip,name,message]} = process
const [host,port] = process.argv[2].split(':')

const options = {
    host: host,
    port: port,
    method: 'POST'
  };

const req = http.request(options);

  req.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
  req.end(JSON.stringify({ "name":name,"message":message}));