


var fs = require('fs');

var bufferStringSplit

fs.readFile(process.argv[2],'utf8', function (err, data) {
    if(err) throw err;
    bufferStringSplit = data.split('\n'); 
    console.log(bufferStringSplit.length-1) //igual que el anterior pero con async y usando callbak
  });




  

