const mongoose = require('mongoose');
const Author = require('./author');


const url = 'mongodb://localhost/reset-api'

mongoose.connect(url, function (err) {

    if (err) throw err;

    console.log('Successfully connected');

    var jamieAuthor = new Author({
        firstName: 'Jamie',
        lastName: 'Munro'
    });

    jamieAuthor.save(function (err) {
        if (err) throw err;
        console.log('Author successfully saved.');
    })
})




