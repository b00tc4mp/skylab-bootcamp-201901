//#region (business) logic

function login(email, password, callback) {
    // TODO validate fields!
    
    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) throw Error('user ' + email + ' not found');

    if (user.password !== password) throw Error('wrong password');

    callback(user);
}

function register(name, surname, email, password, passwordConfirmation, callback) {
    // TODO validate fields!
    if (!(name.trim())) throw new Error ('Name is mandatory');
    if (!(surname.trim())) throw new Error ('Surname is mandatory');
    if (!(email.trim())) throw new Error ('Email is mandatory');
    if (!(password.trim())) throw new Error ('Password is mandatory');
    if (!(passwordConfirmation.trim())) throw new Error ('Password confirmation is mandatory');

    var user = users.find(function (user) {
        return user.email === email;
    });
    
    if (user) throw Error('User ' + email + ' already exists');
    if (password.length < 8) throw Error('Minimum password length: 8 characters')
    if (password !== passwordConfirmation) throw Error('Passwords do not match');

    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password
    });

    callback();
}

//#endregion