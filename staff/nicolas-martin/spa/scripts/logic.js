//#region (business) logic

function login(email, password, callback) {
    // TODO validate fields!
    
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
    callback(user);
}

function register(name, surname, email, password, passwordConfirmation, callback) {
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