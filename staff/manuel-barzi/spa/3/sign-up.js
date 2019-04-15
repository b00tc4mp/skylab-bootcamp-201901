'use strict';

/**
 * 
 * @param {*} form 
 */
function SignUp(form) {
    this.__form__ = form;
}

SignUp.prototype.onSubmit = function(callback) {
    this.__form__.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = this.name.value;
        var surname = this.surname.value;
        var email = this.email.value;
        var password = this.password.value;

        callback(name, surname, email, password);
    });
};

Object.defineProperty(SignUp.prototype, 'title', {
    set: function(title) {
        this.__form__.children[0].innerText = title;
    }
});

Object.defineProperty(SignUp.prototype, 'name', {
    set: function(name) {
        this.__form__.name.placeholder = name;
    }
});

Object.defineProperty(SignUp.prototype, 'surname', {
    set: function(surname) {
        this.__form__.surname.placeholder = surname;
    }
});

Object.defineProperty(SignUp.prototype, 'email', {
    set: function(email) {
        this.__form__.email.placeholder = email;
    }
});

Object.defineProperty(SignUp.prototype, 'password', {
    set: function(password) {
        this.__form__.password.placeholder = password;
    }
});