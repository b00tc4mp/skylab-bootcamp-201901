const fs = require('fs');
const path = require('path');
const [,, folder, ext] = process.argv;

fs.readdir(folder, (error, list) => {
  list.filter(filename => path.extname(filename) === '.' + ext)
    .forEach(filename => console.log(path.win32.basename(filename)));
})