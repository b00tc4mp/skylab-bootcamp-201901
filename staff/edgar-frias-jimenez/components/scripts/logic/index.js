'use strict';

const logic = {
    register: function(name, surname, email, password) {
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

    login: function(email, password) {
        // TODO validate input data

        const user = users.find(function (user) { return user.email === email });

        if (!user) {
            const error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };

        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } else {
            const error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };
    },

    retrieveUser: function (email) {
        // TODO validate input

        const user = users.find(function (user) { return user.email === email });

        if (!user) {
            const error = Error('user not found with email ' + email)

            error.code = 2;

            throw error;
        }

        return {
            name: user.name,
            surname: user.surname,
            email: user.email
        };
    },

    searchDucks: function (query, callback) {
        duckApi.searchDucks(query, callback);
    },

    retrieveDuck: function (id, callback) {
        duckApi.retrieveDuck(id, callback);
    }
}
