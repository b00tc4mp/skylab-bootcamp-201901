var filterFilesByExtension = require('./filter-files');

filterFilesByExtension(process.argv[2], process.argv[3], (err, result) => {
    if(err) console.log(err);
    result.forEach(fileName => {
        console.log(fileName);
    });
})