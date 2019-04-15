'use strict';

// presentation logic

var form = document.getElementsByTagName('form')[0];

form.addEventListener('submit', function(event) {
    event.preventDefault();

    var name = this.name.value;
    var surname = this.surname.value;
    var email = this.email.value;
    var password = this.password.value;

    register(name, surname, email, password);
});

// business logic

function register(name, surname, email, password) {
    console.log(name, surname, email, password);
}