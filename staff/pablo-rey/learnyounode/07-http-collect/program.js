const http = require('http');

const [,,...urls] = process.argv;

http.get(url, (stream) => {
  let result = '';
  stream.on('data', (data) =>  {
    result += data.toString();
  })
  stream.on('end', (error) => {
    console.log(result.length);
    console.log(result);
  });
})