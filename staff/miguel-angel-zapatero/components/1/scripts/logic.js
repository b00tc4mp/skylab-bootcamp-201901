'use strict';

var logic = {
    register: function(name, surname, email, password) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a valid name');
        if (typeof surname !== 'string') throw TypeError(surname + ' is not a valid surname');
        if (typeof email !== 'string') throw TypeError(email + ' is not a valid email');
        if (typeof password !== 'string') throw TypeError(password + ' is not a valid password');

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        })
    }, 

    login: function(email, password) {
        console.log('register', email, password);
    }
}



