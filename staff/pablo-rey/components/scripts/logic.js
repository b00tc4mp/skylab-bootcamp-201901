'use strict';

var logic = {
    register: function (name, surname, email, password) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a valid name');
        // TODO add more validations

        // TODO verify user does not exists already, otherwise error 'user already exists'

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    },

    login: function (email, password) {
        email = email || String(email).trim();
        password = password || String(password).trim();
        if (!email) throw Error('no email provided');
        if (!password) throw Error('no password provided');

        var user = users.find(function(user) { return user.email === email });

        if (!user) throw Error('wrong credentials');
        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } else {
            throw Error('wrong credentials');
        }
    }
}
