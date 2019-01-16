function Thing() {

}

//

function Being(species, age, type) {
    this.species = species;
    this.age = age;
    this.type = type;
}

Being.prototype = new Thing;
// Being.prototype = Object.create(Thing.prototype);
Being.prototype.constructor = Being;

Being.prototype.feed = function () { return 'sgfffhhhh'; };

Being.prototype.info = function () {
    return this.species + ', ' + this.age + ', ' + this.type;
};

//

function Vegetal(species, age, type) {
    Being.call(this, species, age, type);
}

// Vegetal.prototype = new Being;
Vegetal.prototype = Object.create(Being.prototype);
Vegetal.prototype.constructor = Vegetal;

//

function Animal(species, age, type) {
    Being.call(this, species, age, type);
}

// Animal.prototype = new Being;
Animal.prototype = Object.create(Being.prototype);
Animal.prototype.constructor = Animal;

Animal.prototype.eat = function () { return 'ñan ñam'; };

// 

function Pet(name, species, age, type) {
    this.name = name;

    Animal.call(this, species, age, type);
}

// Pet.prototype = new Animal;
Pet.prototype = Object.create(Animal.prototype);
Pet.prototype.constructor = Pet;

Pet.prototype.info = function() {
    return this.name + ', ' + Animal.prototype.info.call(this);
};

// demo

var symba = new Animal('lion', 15, 'carnivor');
var copito = new Animal('gorilla', 50, 'veggie');

console.log(symba.info());
console.log(copito.info());

console.log(symba instanceof Animal); // true
console.log(symba instanceof Being); // true
console.log(symba instanceof Thing); // true
console.log(symba instanceof Object); // true

console.log(symba.feed());

var et = new Being;

console.log(et instanceof Being); // true
console.log(et instanceof Thing); // true
console.log(et instanceof Object); // true
console.log(et instanceof Animal); // false

var lettuce = new Vegetal('greens', 0.0005, 'roman');

console.log(lettuce instanceof Vegetal); // true
console.log(lettuce instanceof Animal); // false
console.log(lettuce instanceof Being); // true
console.log(lettuce instanceof Thing); // true

console.log(lettuce.info());

var sultan = new Pet('Sultan', 'canin', 10, 'dogo argentino');

console.log(sultan.info());