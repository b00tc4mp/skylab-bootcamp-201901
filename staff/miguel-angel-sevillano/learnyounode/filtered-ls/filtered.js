

var fs = require('fs');
var path = require('path');


fs.readdir(process.argv[2], function(err, files){ //this read the content of a directory
   filesList = files.filter(function(e){
      if(path.extname(e)=== `.${process.argv[3]}`) console.log(e) //pass a filter metod that uses extname and if it the same shows trhoug console
    });
   
  });

