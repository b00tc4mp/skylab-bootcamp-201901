var fs = require('fs');

let fileToRead = fs.readFileSync(process.argv[2], 'utf8');

console.log(fileToRead.split('\n').length - 1);