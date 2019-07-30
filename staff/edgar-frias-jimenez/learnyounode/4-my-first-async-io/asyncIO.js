const fs = require('fs')
const [, , path] = process.argv

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err
  const buf = data
  console.log(buf.toString().split('\n').length-1)
});
