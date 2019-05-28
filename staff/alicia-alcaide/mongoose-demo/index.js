
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-test', { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Now yor are connected!!')   
});


let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    fav: Array
});

userSchema.methods.salute = function () {
    var hello = this.name + ' say hello'
    console.log(hello);
}

let User = mongoose.model('User', userSchema);


let peter = new User({
    name: 'Peter',
    surname: 'James',
    email: 'pj@mail.com',
    password: '123',
    fav: []
})
console.log('User created: ' + peter.name + peter.surname)

peter.save(function (err, peter) {
    if (err) return console.error(err)
    peter.salute()
})


