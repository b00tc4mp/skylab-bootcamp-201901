const fs = require('fs')
const [, , path] = process.argv

const buf = fs.readFileSync(path); // const buf = fs.readFileSync(path, 'utf8'); with this utf8 you don't need .toString further more

console.log(buf.toString().split('\n').length -1)