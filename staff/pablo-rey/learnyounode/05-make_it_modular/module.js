const fs = require('fs');
const path = require('path');

module.exports = function(folder, ext, callback) {
  fs.readdir(folder, (error, list) => {
    if (error) callback(error);
    else callback(null, 
            list
              .filter(filename => path.extname(filename) === '.' + ext)
              .map(filename => path.win32.basename(filename)));
  });
};
