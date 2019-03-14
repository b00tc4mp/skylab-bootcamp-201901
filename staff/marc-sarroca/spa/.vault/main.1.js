//#region view (presentation logic)

var loginForm = document.getElementsByTagName('form')[0];

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var inputs = document.getElementsByTagName('input');

    var emailInput = inputs[0];
    var passwordInput = inputs[1];

    var email = emailInput.value;
    var password = passwordInput.value;

    var errorPanel = document.getElementsByClassName('login__error')[0];

    try {
        login(email, password, function (user) {
            emailInput.value = '';
            passwordInput.value = '';

            errorPanel.style.display = 'none';
            errorPanel.innerText = '';

            document.getElementsByClassName('login')[0].style.display = 'none';
            document.getElementsByClassName('welcome')[0].style.display = 'block';
            document.getElementsByClassName('welcome__name')[0].innerText = user.name;
        });
    } catch (err) {
        errorPanel.style.display = 'block';
        errorPanel.innerText = err.message;
    }
});

var logoutButton = document.getElementsByClassName('welcome__logout')[0];

logoutButton.addEventListener('click', function () {
    document.getElementsByClassName('welcome')[0].style.display = 'none';
    document.getElementsByClassName('login')[0].style.display = 'block';
});

//#endregion

//#region (business) logic

function login(email, password, callback) {
    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) throw Error('user ' + email + ' not found');

    if (user.password !== password) throw Error('wrong password');

    callback(user);
}

//#endregion

//#region data

var users = [
    { name: 'Manuel', surname: 'Barzi', email: 'manuelbarzi@gmail.com', password: 'p' },
    { name: 'John', surname: 'Doe', email: 'johndoe@mail.com', password: '12345' },
    { name: 'Jane', surname: 'Doe', email: 'janedoe@mail.com', password: '54321' },
    { name: 'Cama', surname: 'Ron', email: 'camaron@mail.com', password: 'delaisla' },
    { name: 'Rain', surname: 'Bow', email: 'rainbow@mail.com', password: 'arcoiris' },
    { name: 'Hul', surname: 'Io', email: 'hulio@mail.com', password: 'vivaerbetih' }
]

//#endregion
