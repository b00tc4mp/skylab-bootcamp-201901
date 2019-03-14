var fs = require("fs");
var path = require("path");

module.exports = (folder, ext, callback) => {
  fs.readdir(folder, function(err, files) {
    if (err) return callback(err);
    files = files.filter(file => {
      return path.extname(file) === "." + ext;
    });
    callback(null, files);
  });
};
