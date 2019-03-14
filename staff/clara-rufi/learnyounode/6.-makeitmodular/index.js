'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(directory, fileExtension, callback) {
    fs.readdir(directory, (error, fileList) => {
        if(error) {
            return callback(error);
        }

        const filteredFiles = fileList.filter((file) => {
            return path.extname(file) === '.' + fileExtension;
        });

        callback(null, filteredFiles);
    });
};



// var fs = require('fs')
// var path = require('path')
// var module = require('./module.js')

// module.export= 
// fs.readdir(process.argv[2], (error, list) => {
//     if (error) console.error(error)
//     else {
//         let filterList=list.filter(document => path.extname(document) === '.' + process.argv[3])
//         filterList.forEach(filteredDocument=>console.log(filteredDocument)) 
       
//     }
// })
