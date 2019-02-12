var fs = require("fs");
var path = require("path");

module.exports = (folder, ext, callback) => {
  fs.readdir(folder, function(error, files) {
    if (error) throw Error(error);
    files = files.filter(file => {
      return path.extname(file) === '.' + ext;
    });
    return callback(null, files);
  });
};
