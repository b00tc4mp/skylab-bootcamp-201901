var fs = require('fs');
module.exports = file => {
    let fileToRead = fs.readFileSync(file, 'utf8');
    return fileToRead.split('\n').length - 1;
}