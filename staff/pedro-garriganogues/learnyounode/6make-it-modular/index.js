var fs = require('fs');
const path = require("path")

var dir = process.argv[2],
    ext = "." + process.argv[3];
function borer(callback) {
    fs.readdir(dir, function (err, list) {
        if (err) {
            console.log(err)
        } else {
            var row = list.filter((a) => {
                var regexp = new RegExp(ext + "$", "ig")
                if (a.search(regexp) > -1) {
                    callback(a)
                }
            })
        }
    })
}
function print(f) {
    console.log(f)
}

borer(print)