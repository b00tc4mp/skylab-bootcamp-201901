'use strict';

// presentation logic

var form = document.getElementsByTagName('form')[1];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = this.name.value;
    var surname = this.surname.value;
    var email = this.email.value;
    var password = this.password.value;

    register(name, surname, email, password);
});

var form2 = document.getElementsByTagName('form')[2];

form2.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = this.name.value;
    var surname = this.surname.value;
    var email = this.email.value;
    var password = this.password.value;

    registerAdmin(name, surname, email, password);
});

// business logic

function register(name, surname, email, password) {
    console.log('register', name, surname, email, password);
}

function registerAdmin(name, surname, email, password) {
    console.log('register admin', name, surname, email, password);
}