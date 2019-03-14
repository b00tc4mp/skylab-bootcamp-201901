
'use strict';

const filteredLs = require('./filtered-ls');

if(process.argv.length < 4) {
    console.log('Please specify a path and a filter parameter');
    return;
}

filteredLs(process.argv[2], process.argv[3], (error, files) => {
    if(error) {
        console.error(error);
        return;
    }

    files.forEach((file) => {
        console.log(file);
    });
});



// const { argv } = process


// var fs = require('fs')  //require es com un import, però la manera antiga de fer import
// const buffer= fs.readFileSync(process.argv[2])
// var string = buffer.toString()
// var splitstring=string.split('\n')
// var result = (splitstring.length-1)

// console.log(result)

/*
var fs = require('fs')  //require es com un import, però la manera antiga de fer import
//node ja busca q treballem de manera a sincrona
const { argv: [,, path] } = process

// const content = fs.readFilsSync (path)
const content = fs.readFilsSync (path), {encoding: 'utf-8'}
// const numOfBreaks = content.match(/\n/g).length
const numOfBreaks = content.match(new RegEx ('\n', 'g')).length
console.log(numOfBreaks)

*/