'use strict';

//#region (business) logic

function login(email, password, callback) {
    // TODO validate fields!
    debugger
    if(!(callback instanceof Function)) throw new TypeError('callback not a function')
    if(!(typeof email == 'string')) throw new TypeError('email not a string')
    if(!(typeof password == 'string')) throw new TypeError('password not a string')
    if(arguments.length !== 3) throw new Error('Incorrect number of parameters')

    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) throw Error('user ' + email + ' not found');

    if (user.password !== password) throw Error('wrong password');

    var loggedInUser = {
        name: user.name,
        surname: user.surname,
        email: user.email
    };

    callback(loggedInUser);
}

function register(name, surname, email, password, passwordConfirmation, callback) {
    if (typeof name !== 'string') throw TypeError(name + ' is not a string');

    if (!name.trim().length) throw Error('name cannot be empty');

    if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');

    if (!surname.trim().length) throw Error('surname cannot be empty');

    if (typeof email !== 'string') throw TypeError(email + ' is not a string');

    if (!email.trim().length) throw Error('email cannot be empty');

    if (typeof password !== 'string') throw TypeError(password + ' is not a string');

    if (!password.trim().length) throw Error('password cannot be empty');

    if (typeof passwordConfirmation !== 'string') throw TypeError(passwordConfirmation + ' is not a string');

    if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty');

    // TODO validate fields!

    var user = users.find(function (user) {
        return user.email === email;
    });

    if (user) throw Error('user ' + email + ' already exists');

    if (password !== passwordConfirmation) throw Error('passwords do not match');

    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password
    });

    callback();
}

//#endregion