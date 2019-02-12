var http = require('http');
var fs = require('fs');

var server = http.createServer((req, res) => {
    res.write('Hello World!');
    res.end();
}).listen(80);
