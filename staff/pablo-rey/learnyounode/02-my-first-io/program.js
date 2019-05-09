const fs = require('fs');

const filePath = process.argv[2];

const buffer = fs.readFileSync(filePath);

console.log(buffer.toString().split('\n').length -1);