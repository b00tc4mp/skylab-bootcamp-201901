const http = require('http');

const [,,url] = process.argv;

http.get(url, res => {
  res.setEncoding('utf8');
  res.on("error", (err) => { throw err });
  res.on("data", data => {
    console.log(data);
  })
})
