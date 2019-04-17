'use strict';

var logic = {
    register: function (name, surname, email, password) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a valid name');

        var exists = users.some(function(user) { return user.email === email });

        if(!exists) {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        } else throw Error('invalid registry');

        // TODO verify user does not exists already, otherwise error 'user already exists'
        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    },

    login: function (email, password) {
        // TODO validate input data

        var user = users.find(function(user) { return user.email === email });

        if (!user) {
            var error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };

        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } else {
            var error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };
    }
}
