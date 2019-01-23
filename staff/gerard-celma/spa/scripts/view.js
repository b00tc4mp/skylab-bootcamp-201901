'use strict';

//#region panel

function Panel(element) {
    this.element = element;
}

Panel.prototype.hide = function() {
    this.element.hide();
};

Panel.prototype.show = function() {
    this.element.show();
};

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'login';

    var title = document.createElement('h2');
    title.innerText = 'Login';
    container.appendChild(title);

    var form = document.createElement('form');
    form.className = 'login__form';
    container.appendChild(form);
    this.__form__ = form;

    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerText = 'E-mail:';
    form.appendChild(emailLabel);

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'email';
    emailInput.required = true;
    form.appendChild(emailInput);
    this.__emailInput__ = emailInput;

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password:';
    form.appendChild(passwordLabel);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    this.__passwordInput__ = passwordInput;

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Login';
    form.appendChild(submitButton);

    var error = document.createElement('section');
    error.className = 'login__error';
    container.appendChild(error);
    this.__error__ = error;

    var registerLink = document.createElement('a');
    registerLink.href = '#';
    registerLink.innerText = 'Register'
    registerLink.className = 'login__register-link';
    container.appendChild(registerLink);
    this.__registerLink__ = registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', { 
    set: function(callback) { 
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();
    
            var email = this.__emailInput__.value;
            var password = this.__passwordInput__.value;
    
            callback(email, password);
        }.bind(this));
    } 
});

Object.defineProperty(LoginPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});

Object.defineProperty(LoginPanel.prototype, 'clickRegister', {
    set: function(callback) {
        this.__registerLink__.addEventListener('click', callback);
    }
});

LoginPanel.prototype.clear = function() {
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};



//#endregion

//#region welcome panel

function WelcomePanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'welcome';

    var title = document.createElement('h2');
    container.appendChild(title);

    var welcomeText = document.createTextNode('Welcome, ');
    title.appendChild(welcomeText);

    var userSpan = document.createElement('span');
    userSpan.className = 'welcome__name';
    title.appendChild(userSpan);
    this.__userSpan__ = userSpan;

    var exclamationText = document.createTextNode('!');
    title.appendChild(exclamationText);

    var logoutButton = document.createElement('button');
    logoutButton.className = 'welcome__logout';
    logoutButton.innerText = 'Logout';
    container.appendChild(logoutButton);
    this.__logoutButton__ = logoutButton;
}

WelcomePanel.prototype = Object.create(Panel.prototype);
WelcomePanel.prototype.constructor = WelcomePanel;

Object.defineProperty(WelcomePanel.prototype, 'user', { 
    set: function(user) { 
        this.__userSpan__.innerText = user.name;
    } 
});

Object.defineProperty(WelcomePanel.prototype, 'onLogout', { 
    set: function(callback) { 
        this.__logoutButton__.addEventListener('click', callback);
    } 
});

//#endregion

//#region register panel

function RegisterPanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'register';

    var title = document.createElement('h2');
    title.innerText = 'Register';
    container.appendChild(title);

    var form = document.createElement('form');
    form.className = 'register__form';
    container.appendChild(form);
    this.__form__ = form;

        var registerName = document.createElement('label');
        registerName.setAttribute('for', 'name');
        registerName.innerText = 'Name:';
        form.appendChild(registerName);

        var addName = document.createElement('input');
        addName.type = 'name';
        addName.name = 'name';
        addName.placeholder = 'name';
        addName.required = true;
        form.appendChild(addName);
        this.__addName__ = addName;

        var registerSurname = document.createElement('label');
        registerSurname.setAttribute('for', 'surname');
        registerSurname.innerText = 'Surname:';
        form.appendChild(registerSurname);

        var addSurname = document.createElement('input');
        addSurname.type = 'surname';
        addSurname.name = 'surname';
        addSurname.placeholder = 'surname';
        addSurname.required = true;
        form.appendChild(addSurname);
        this.__addSurname__ = addSurname;

        var registerEmail = document.createElement('label');
        registerEmail.setAttribute('for', 'email');
        registerEmail.innerText = 'E-mail:';
        form.appendChild(registerEmail);

        var addEmail = document.createElement('input');
        addEmail.type = 'email';
        addEmail.name = 'email';
        addEmail.placeholder = 'email';
        addEmail.required = true;
        form.appendChild(addEmail);
        this.__addEmail__ = addEmail;

        var registerPassword = document.createElement('label');
        registerPassword.setAttribute('for', 'password');
        registerPassword.innerText = 'Password:';
        form.appendChild(registerPassword);

        var addPassword = document.createElement('input');
        addPassword.type = 'password';
        addPassword.name = 'password';
        addPassword.placeholder = 'password';
        addPassword.required = true;
        form.appendChild(addPassword);
        this.__addPassword__ = addPassword;

        var registerPasswordConf = document.createElement('label');
        registerPasswordConf.setAttribute('for', 'password');
        registerPasswordConf.innerText = 'Confirm Password:';
        form.appendChild(registerPasswordConf);

        var addPasswordConf = document.createElement('input');
        addPasswordConf.type = 'password';
        addPasswordConf.name = 'password-confirmation';
        addPasswordConf.placeholder = 'password';
        addPasswordConf.required = true;
        form.appendChild(addPasswordConf);
        this.__addPasswordConf__ = addPasswordConf;

        var registerButton = document.createElement('button');
        registerButton.type = 'submit';
        registerButton.innerText = 'Register';
        form.appendChild(registerButton);
        this.__registerButton__ = registerButton;

    var error = document.createElement('section');
    error.className = 'register__error';
    container.appendChild(error);
    this.__error__ = error;

    var loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.className = 'register__login-link';
    loginLink.innerText = 'Login';
    container.appendChild(loginLink);
    this.__loginLink__ = loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'clickLogin', {
    set: function(callback) {
        this.__loginLink__.addEventListener('click',callback);
    }
});

RegisterPanel.prototype.clear = function() {
    this.__addName__.value = '';
    this.__addSurname__.value = '';
    this.__addEmail__.value = '';
    this.__addPassword__.value = '';
    this.__addPasswordConf__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};

Object.defineProperty(RegisterPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function(callback) {
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.__addName__.value;
            var surname = this.__addSurname__.value;
            var email = this.__addEmail__.value;
            var password = this.__addPassword__.value;
            var passwordConf = this.__addPasswordConf__.value;

            callback(name,surname,email,password,passwordConf);
        }.bind(this));
    }
});



//#endregion

// TODO remove following old code when register panel already implemented

//#region view (presentation logic)

// (function () {
//     var registerSection = document.getElementsByClassName('register')[0];

//     var loginLink = document.getElementsByClassName('register__login-link')[0];

//     var registerForm = document.getElementsByClassName('register__form')[0];

//     loginLink.addEventListener('click', function (event) {
//         event.preventDefault();

//         registerSection.hide();
//         loginSection.show();
//     });

//     registerForm.addEventListener('submit', function (event) {
//         event.preventDefault();

//         var inputs = this.getElementsByTagName('input');

//         var nameInput = inputs[0];
//         var surnameInput = inputs[1];
//         var emailInput = inputs[2];
//         var passwordInput = inputs[3];
//         var passwordConfirmationInput = inputs[4];

//         var name = nameInput.value;
//         var surname = surnameInput.value;
//         var email = emailInput.value;
//         var password = passwordInput.value;
//         var passwordConfirmation = passwordConfirmationInput.value;

//         var errorPanel = document.getElementsByClassName('register__error')[0];

//         try {
//             register(name, surname, email, password, passwordConfirmation, function () {
//                 nameInput.value = '';
//                 surnameInput.value = '';
//                 emailInput.value = '';
//                 passwordInput.value = '';
//                 passwordConfirmationInput.value = '';

//                 errorPanel.style.display = 'none';
//                 errorPanel.innerText = '';

//                 registerSection.hide();
//                 loginSection.show();
//             });
//         } catch (err) {
//             errorPanel.show();
//             errorPanel.innerText = err.message;
//         }
//     });
// });//();

// //#endregion