'use strict';

var logic = {
    register: function (name, surname, email, password) {
        if ((typeof name !== 'string') || (name == 'undefined') || (name == '')) {
            var error = TypeError('is not a valid name')
            error.code = 2;
            throw error;
        };
        if ((typeof surname !== 'string') || (surname == 'undefined') || (surname == '')) {
            error = TypeError('is not a valid surname')
            error.code = 3;
            throw error;
        };
        if ((typeof email !== 'string') || (email == 'undefined') || (email == '')) {
            error = TypeError('is not a valid email')
            error.code = 4;
            throw error;
        };
        if ((typeof password !== 'string') || (password == 'undefined') || (password == '')) {
            error = TypeError('is not a valid password')
            error.code = 5;
            throw error;
        };
      
         if (users.email === email) {
            error = Error('this user already exists')
            error.code = 6;
            throw error;
         } 

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
    },

    logOut: function() {
        this.__userEmail__ = null;
        this.__accessTime__ = null;
    }
    
}
