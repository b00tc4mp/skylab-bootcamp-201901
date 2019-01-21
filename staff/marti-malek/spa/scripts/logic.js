//#region (business) logic

function login(email, password, callback) {

    if (!(email)) throw Error ('email is not defined'); 
    if (typeof email !== 'string') throw TypeError (email + ' is not a string'); 
    if (!(password)) throw Error ('password is not defined'); 
    if (typeof password !== 'string') throw TypeError (password + ' is not a string'); 
    
    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) throw Error('user ' + email + ' not found');

    if (user.password !== password) throw Error('wrong password');

    var testUser = {
        name: 'John',
        surname: 'Doe',
        email: 'johndoe@mail.com',
        password: '12345'
    }

    delete testUser.password;

    callback(testUser);
}

function register(name, surname, email, password, passwordConfirmation, callback) {

    if (!(name)) throw Error ('name is not defined');
    if (typeof name !== 'string') throw TypeError(name + ' is not a string');
    if (!(surname)) throw Error ('surname is not defined');
    if (typeof surname !== 'string') throw TypeError(surname + ' is not a string');
    if (!(email)) throw Error ('email is not defined');
    if (typeof email !== 'string') throw TypeError(email + ' is not a string');
    if (!(password)) throw Error ('password is not defined');
    if (typeof password !== 'string') throw TypeError(password + ' is not a string');
    if (!(passwordConfirmation)) throw Error ('passwordConfirmation is not defined');
    if (password.trim().length < 8) throw Error ('password is not strong enough');

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