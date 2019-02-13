var fs = require('fs');
module.exports = (file, callback) => {
  fs.readFile(file, 'utf8', (error, data) => {
    if(error) return callback(error);
    return callback(null, data.split('\n').length - 1);
  });
};
