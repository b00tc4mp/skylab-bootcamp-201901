const http = require('http');

const [,,...urls] = process.argv;

const results = [null, null, null];

function printResults() {
  debugger
  if (results.every(item => typeof item === 'string')) results.forEach(res => console.log(res));
}

for (let ii = 0, ll = urls.length; ii < ll; ii++) {
  http.get(urls[ii], (stream) => {
    let result = '';
    stream.on('data', (data) =>  {
      result += data.toString();
    })
    stream.on('end', (error) => {
      results[ii] = result;
      printResults();
    });
  })
}