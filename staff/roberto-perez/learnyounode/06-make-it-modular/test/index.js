var fs = require("fs");
var path = require("path");

const byExtension = (folder, ext, callback) => {
  fs.readdir(folder, function(err, files) {
    if (err) return callback(err);
    files = files.filter(file => {
      return path.extname(file) === "." + ext;
    });
    callback(null, files);
  });
};

module.exports = byExtension;
