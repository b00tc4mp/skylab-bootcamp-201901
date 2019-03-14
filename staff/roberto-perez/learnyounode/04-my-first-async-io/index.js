var fs = require('fs');

let fileToread = fs.readFile(process.argv[2], 'utf8', (error, data) => {
    if(error) return console.log(error);
    console.log(data.split('\n').length - 1);
});
