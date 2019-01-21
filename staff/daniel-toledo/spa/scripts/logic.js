//#region (business) logic

function login(email, password, callback) {
    if(!email || !password) throw Error('Fill all the gaps')
    
    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) throw Error('user ' + email + ' not found');

    if (user.password !== password) throw Error('wrong password');

    callback(user);
}

function register(name, surname, email, password, passwordConfirmation, callback) {
    if(!name || !surname || !email || !password|| !passwordConfirmation) throw Error('Fill all the gaps')

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