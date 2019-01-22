'use strict';

//#region Element polyfills

Element.prototype.show = function () {
    this.style.display = 'block';
};

Element.prototype.hide = function () {
    this.style.display = 'none';
};

//#endregion

//#region login panel

function LoginPanel() {
    var container = document.createElement('section');
    container.className = 'login';

    var title = document.createElement('h2');
    // var titleText = document.createTextNode('Login');
    // title.appendChild(titleText);
    title.innerText = 'Login';
    container.appendChild(title);

    var form = document.createElement('form');
    form.className = 'login__form';
    container.appendChild(form);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var inputs = form.getElementsByTagName('input');

        var emailInput = inputs[0];
        var passwordInput = inputs[1];

        var email = emailInput.value;
        var password = passwordInput.value;

        this.onLogin(email, password);

        // var errorPanel = document.getElementsByClassName('login__error')[0];

        // try {
        //     login(email, password, function (user) {
        //         emailInput.value = '';
        //         passwordInput.value = '';

        //         errorPanel.style.display = 'none';
        //         errorPanel.innerText = '';

        //         loginSection.hide();
        //         welcomeSection.show();
        //         welcomeName.innerText = user.name;
        //     });
        // } catch (err) {
        //     errorPanel.show();
        //     errorPanel.innerText = err.message;
        // }
    }.bind(this));

    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerText = 'E-mail:';
    form.appendChild(emailLabel);

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'email';
    form.appendChild(emailInput);

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password:';
    form.appendChild(passwordLabel);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    form.appendChild(passwordInput);

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Login';
    form.appendChild(submitButton);

    var error = document.createElement('section');
    error.className = 'login__error';
    container.appendChild(error);

    var registerLink = document.createElement('a');
    registerLink.href = '#';
    registerLink.innerText = 'Register'
    registerLink.className = 'login__register-link';
    container.appendChild(registerLink);

    this.element = container;
}

LoginPanel.prototype.onLogin = function () { };

LoginPanel.prototype.hide = function() {
    this.element.hide();
};

LoginPanel.prototype.show = function() {
    this.element.show();
};

//#endregion

//#region welcome panel

function WelcomePanel() {
    var container = document.createElement('section');
    container.className = 'welcome';

    var title = document.createElement('h2');
    container.appendChild(title);

    var welcomeText = document.createTextNode('Welcome, ');
    title.appendChild(welcomeText);

    var userSpan = document.createElement('span');
    userSpan.className = 'welcome__name';
    title.appendChild(userSpan);

    var exclamationText = document.createTextNode('!');
    title.appendChild(exclamationText);

    var logoutButton = document.createElement('button');
    logoutButton.className = 'welcome__logout';
    logoutButton.innerText = 'Logout';
    container.appendChild(logoutButton);

    this.element = container;
}

WelcomePanel.prototype.hide = function() {
    this.element.hide();
};

WelcomePanel.prototype.show = function() {
    this.element.show();
};

//#endregion

//#region view (presentation logic)

(function () {
    var loginSection = document.getElementsByClassName('login')[0];
    var registerSection = document.getElementsByClassName('register')[0];
    var welcomeSection = document.getElementsByClassName('welcome')[0];

    var welcomeName = document.getElementsByClassName('welcome__name')[0];
    var registerLink = document.getElementsByClassName('login__register-link')[0];
    var loginLink = document.getElementsByClassName('register__login-link')[0];

    var loginForm = document.getElementsByClassName('login__form')[0];
    var registerForm = document.getElementsByClassName('register__form')[0];

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();

        loginSection.hide();
        registerSection.show();
    });

    loginLink.addEventListener('click', function (event) {
        event.preventDefault();

        registerSection.hide();
        loginSection.show();
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // var inputs = document.getElementsByTagName('input'); // WARN other inputs in other sections would be included here

        // ALT 1

        // var children = registerForm.children;

        // var inputs = [];

        // for (var i = 0; i < children.length; i++) {
        //     var child = children[i];

        //     if (child instanceof HTMLInputElement)
        //         inputs.push(child);
        // }

        // ALT PRO

        var inputs = this.getElementsByTagName('input');

        var nameInput = inputs[0];
        var surnameInput = inputs[1];
        var emailInput = inputs[2];
        var passwordInput = inputs[3];
        var passwordConfirmationInput = inputs[4];

        var name = nameInput.value;
        var surname = surnameInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
        var passwordConfirmation = passwordConfirmationInput.value;

        var errorPanel = document.getElementsByClassName('register__error')[0];

        try {
            register(name, surname, email, password, passwordConfirmation, function () {
                nameInput.value = '';
                surnameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                passwordConfirmationInput.value = '';

                errorPanel.style.display = 'none';
                errorPanel.innerText = '';

                registerSection.hide();
                loginSection.show();
            });
        } catch (err) {
            errorPanel.show();
            errorPanel.innerText = err.message;
        }
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // var inputs = document.getElementsByTagName('input'); // WARN see register WARN
        var inputs = this.getElementsByTagName('input');

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

                loginSection.hide();
                welcomeSection.show();
                welcomeName.innerText = user.name;
            });
        } catch (err) {
            errorPanel.show();
            errorPanel.innerText = err.message;
        }
    });

    var logoutButton = document.getElementsByClassName('welcome__logout')[0];

    logoutButton.addEventListener('click', function () {
        welcomeSection.hide();
        loginSection.show();
    });
});//();

//#endregion