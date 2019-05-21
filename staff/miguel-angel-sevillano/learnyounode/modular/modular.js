var fs = require('fs');
var path = require('path');
var results = []



module.exports = function files(route,extension,callback){ //esportamos la funcion para usarala fuera del archivo



fs.readdir(route, function(err, list){ //read directory to get de items

    if(err) return callback(err)
    
    list.forEach(function (res){ 

        if(path.extname(res) === '.' +extension){//for each item we check if have the same extension and push
            results.push(res)
        }
    })
 
     return callback(null, results) //we return the array of results by the callback

  });

}

