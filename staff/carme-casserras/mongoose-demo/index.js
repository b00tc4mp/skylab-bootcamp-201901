var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carme', {useNewUrlParser: true})        


var db = mongoose.connection
db.on('error', console.error.bind(console, 'conection error:'))
db.once('open', function(){
    }) 
    
// defineixo l'schema, per definir els camps de la collection
var userSchema = mongoose.Schema({
    name : String,
    surname : String,
    email: String
})

let Users = mongoose.model('Users', userSchema)

Users.create({name: 'Alicia', surname: 'Alcaide'})

//************** SEGONA VERSIÓ **************//

// Complilem schema dins a model. Abans has d'afegir els methods
    var kittySchema = new mongoose.Schema({
    name: String
})

 // Afegeixo methods 
 kittySchema.methods.speak = function () {
    var greeting = this.name
    ? 'Hello' + this.name
    : 'Hello XXX';
    console.log(greeting) 
}   

// Model es una class constructora
var Kitten = mongoose.model('Kitten', kittySchema)

// Creo un document
    var hello = new Kitten({ name : 'Hello World'})
    console.log(hello.name)
   
// salvo
    hello.save(function(error, hello) {
        if (error) return console.error(error)
    })
        
        
