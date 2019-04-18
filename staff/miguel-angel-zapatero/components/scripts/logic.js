'use strict';

var logic = {
    __validateEmail__: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(String(email).toLowerCase());
    },
    
    register: function (name, surname, email, password, confirmpassword) {
        if (typeof name !== 'string' || !name) {
            var error = Error('not a valid name');
            error.code = 2;
            throw error;
        }
            
        if (typeof surname !== 'string' || !surname) {
            var error = Error('not a valid surname');
            error.code = 3;
            throw error;
        }
        if (!logic.__validateEmail__(email)) {
            var error = Error('not a valid email');
            error.code = 4;
            throw error;
        }
        if (!password) {
            var error = Error('not a valid password');
            error.code = 5;
            throw error;
        }
        if (!confirmpassword) {
            var error = Error('not a valid password');
            error.code = 6;
            throw error;
        }
        if (password !== confirmpassword) {
            var error = Error('not the same password');
            error.code = 7;
            throw error;
        }

        var user = users.some(function(user) {return user.email === email});
        if(user) {
            var error = Error('user already exist');
            error.code = 8;
            throw error;
        } else {
            users.push({
                name: name,
                surname: surname,
                email: email,
                password: password
            });
        }
    },

    login: function (email, password) {
        // TODO validate input data

        var user = users.find(function(user) { return user.email === email });

        if (!user) {
            var error = Error('wrong credentials');
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
    searchDucks: function (query, callback) {
        // TODO validate inputs

        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText));
        });

        xhr.send();
    },

    retrieveDucklingDetail: function(id, callback) {
        // TODO validate inputs

        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText));
        });

        xhr.send();
    }
}
