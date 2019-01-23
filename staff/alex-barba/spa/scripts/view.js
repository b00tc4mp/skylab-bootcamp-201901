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

LoginPanel.prototype.clear = function() {
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};

Object.defineProperty(LoginPanel.prototype, 'onRegister', {
    set: function(callback) {
        this.__registerLink__.addEventListener('click', callback);
    }
});

//#endregion

//#region home panel

function HomePanel() {
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

    var searchForm = document.createElement('form');
    container.appendChild(searchForm);
    this.__searchForm__ = searchForm;

    var formInput = document.createElement('input');
    formInput.type = 'text';
    formInput.name = 'q';
    searchForm.appendChild(formInput);
    this.__formInput__ = formInput;

    var buttonInput = document.createElement('button');
    buttonInput.type = 'submit';
    buttonInput.innerText = 'Search';
    searchForm.appendChild(buttonInput);

    var duckList = document.createElement('ul');
    container.appendChild(duckList);
    this.__duckList__= duckList;

    var error = document.createElement('section');
    error.className = 'register__error';
    container.appendChild(error);
    this.__error__ = error;

    var logoutButton = document.createElement('button');
    logoutButton.className = 'welcome__logout';
    logoutButton.innerText = 'Logout';
    container.appendChild(logoutButton);
    this.__logoutButton__ = logoutButton;
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', { 
    set: function(user) { 
        this.__userSpan__.innerText = user.name;
    } 
});

Object.defineProperty(HomePanel.prototype, 'onSearch', { 
    set: function(callback) { 
        this.__searchForm__.addEventListener('submit', function (event) {
            this.__duckList__.innerText= '';
            event.preventDefault();

            var query = this.__formInput__.value;
    
            callback(query);
        }.bind(this));
    } 
});

Object.defineProperty(HomePanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});

HomePanel.prototype.clear = function() {
        this.__error__.innerText = '';
        this.__error__.hide();
};

Object.defineProperty(HomePanel.prototype, 'onLogout', { 
    set: function(callback) { 
        this.__logoutButton__.addEventListener('click', callback);
    } 
});

//#endregion

//#region register panel

// Create HTML
function RegisterPanel() {
    // Created based on Panel and matching the section element with element
    Panel.call(this, document.createElement('section'));
    
    var container = this.element;
    container.className = 'register';

    var title = document.createElement('h2');
    title.innerText = 'Register'
    container.appendChild(title);

    var registerForm = document.createElement('form');
    registerForm.className = 'register__form';
    container.appendChild(registerForm)
    this.__registerForm__= registerForm;

    var nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.innerText = 'Name :';
    registerForm.appendChild(nameLabel);

    var nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'name';
    nameInput.required = true;
    registerForm.appendChild(nameInput);
    this.__nameInput__ = nameInput;

    var surnameLabel = document.createElement('label');
    surnameLabel.setAttribute('for', 'surname');
    surnameLabel.innerText = 'Surname :'
    registerForm.appendChild(surnameLabel);

    var surnameInput = document.createElement('input');
    surnameInput.type = 'text';
    surnameInput.name = 'surname';
    surnameInput.placeholder= 'surname';
    surnameInput.required = true;
    registerForm.appendChild(surnameInput);
    this.__surnameInput__= surnameInput;

    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerText = 'Email :'
    registerForm.appendChild(emailLabel);

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder= 'email';
    emailInput.required = true;
    registerForm.appendChild(emailInput);
    this.__emailInput__= emailInput;

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password :';
    registerForm.appendChild(passwordLabel);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.required = true;
    registerForm.appendChild(passwordInput);
    this.__passwordInput__= passwordInput;

    var passwordConfLabel = document.createElement('label');
    passwordConfLabel.setAttribute('for', 'passwordConf');
    passwordConfLabel.innerText = 'Confirm Password :';
    registerForm.appendChild(passwordConfLabel);

    var passwordConfInput = document.createElement('input');
    passwordConfInput.type = 'password';
    passwordConfInput.name = 'passwordConf';
    passwordConfInput.placeholder = 'password';
    passwordConfInput.required = true;
    registerForm.appendChild(passwordConfInput);
    this.__passwordConfInput__= passwordConfInput;

    var registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.innerText = 'Register';
    registerForm.appendChild(registerButton);

    var error = document.createElement('section');
    error.className = 'register__error';
    container.appendChild(error);
    this.__error__ = error;

    var loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.innerText = 'Login'
    loginLink.className = 'register__login-link';
    container.appendChild(loginLink);
    this.__loginLink__ = loginLink;
};

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

// On click on login link, triggers onLogin(Main)

Object.defineProperty(RegisterPanel.prototype, 'onLogin', { 
    set: function(callback) { 
        this.__loginLink__.addEventListener('click', callback);
    } 
});

// On click on submit, passes all these values to register(logic). If true, changes to Login and bank gps. If fasse, return errors.

Object.defineProperty(RegisterPanel.prototype, 'onRegister', { 
    set: function(callback) { 
        this.__registerForm__.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.__nameInput__.value;
            var surname = this.__surnameInput__.value;
            var email = this.__emailInput__.value;
            var password = this.__passwordInput__.value;
            var passwordConf = this.__passwordConfInput__.value;
    
            callback(name, surname, email, password, passwordConf);
        }.bind(this));
    } 
});

// If error is catched, displays error section with the message captured from the error.

Object.defineProperty(RegisterPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});

// Function to clear all gaps.

RegisterPanel.prototype.clear = function() {
    this.__nameInput__.value = '';
    this.__surnameInput__.value = '';
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__passwordConfInput__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};

//#endregion