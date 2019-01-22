var person = {
    set name(value) {
        this._name = value;
    },

    get name() {
        return this._name.toUpperCase();
    }
};

person.name = 'tachi';

console.log(person.name); // TACHI

// dynamically create setter and getter

var person = {};

Object.defineProperty(person, 'name', {
    set: function(value) {
        this._name = value;
    },

    get: function() {
        return this._name.toUpperCase();
    }
});

person.name = 'tachi';

console.log(person.name); // TACHI


// Java-like

var person = {
    setName: function(value) {
        this.name = value;
    },

    getName: function() {
        return this.name.toUpperCase();
    }
};

person.setName('tachi');

console.log(person.getName()); // TACHI