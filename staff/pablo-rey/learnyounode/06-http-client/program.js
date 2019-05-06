const http = require('http');
const concat = require('concat-stream');

const [,,url] = process.argv;

http.get(url, (res) => {
  res.setEncoding('utf8');
  res.pipe(concat((err, data) => {
    console.log(data.toString().length);
    console.log(data.toString());
  }))
})