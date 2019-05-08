var fs = require('fs');

const filePath = process.argv[2];
function callback  (error, buffer) {
  if (error === null) console.log(buffer.toString().split('\n').length -1);
  else console.error(error);
}
fs.readFile(filePath, callback);
