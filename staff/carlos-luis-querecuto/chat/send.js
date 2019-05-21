var http = require("http");
const {argv:[,,address,message]} = process
const  [host, port] = address.split(':')
var options = {
  host,
  port,
  localAddress: '192.168.0.44',
  method: 'POST',
  message
};

var request = http.request({
    host: 'code.jquery.com',
    path: 'https://code.jquery.com/jquery-3.4.1.js'
}, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        for(let i=0; i< 100;i++){
        var req = http.request(options);
        req.on('error', function(e) {
        console.log('problem with request:     ' + e.data);
        });
        // write data to request body
        req.write(data);
        req.end();
    }

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();