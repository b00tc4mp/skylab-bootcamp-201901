let http = require("http");

let url = process.argv[2];

module.exports = url => {
  http
    .get(url, function(response) {
      response.setEncoding("utf8");
      response.on("data", function(chunk) {
        return chunk;
      });
    })
    .on("error", function(e) {
      return e;
    });
};
