var http = require('http')

const {argv:[,,ip,host,message]} = process



var options = {
    host: ip,
    port: host,
    method: "POST",
    msg: message
};

var responseString =''


var req = http.request(options, function(res) {

    res.on("data", function (data) {
        responseString += data;  
    });
    res.on("end", function () {
        console.log(responseString); 
    });

   
})

req.write(options.msg)
req.end()
