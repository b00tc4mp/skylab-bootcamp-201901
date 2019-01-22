'use strict';

//#region panel

function Panel(element) {
    this.element = element;
};

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

Object.defineProperty(LoginPanel.prototype, 'signUp', { 
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

    var title2 = document.createElement('h2');
    title2.innerText = 'Register';
    container.appendChild(title2);

    var form = document.createElement('form');
    form.className = 'register__form';
    container.appendChild(form);
    this.__form__ = form


    var nameLabel = document.createElement('label');
    nameLabel.setAttribute('for' , 'name');
    nameLabel.innerText = 'Name:';
    form.appendChild(nameLabel);
    
    var nameInput = document.createElement('input');
    nameInput.type = 'name';
    nameInput.name = 'name';
    nameInput.placeholder = 'name';
    nameInput.required = true;
    form.appendChild(nameInput);
    this.__nameInput__ = nameInput

    

    var surnameLabel = document.createElement('label');
    surnameLabel.setAttribute('for' , 'surname');
    surnameLabel.innerText = 'Surname:';
    form.appendChild(surnameLabel);
    

    var surnameInput = document.createElement('input');
    surnameInput.type = 'surname';
    surnameInput.name = 'surname';
    surnameInput.placeholder = 'surname';
    surnameInput.required = true;
    form.appendChild(surnameInput);
    this.__surnameInput__ = surnameInput


    
    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for' , 'email');
    emailLabel.innerText = 'E-mail:';
    form.appendChild(emailLabel);
    

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'email';
    emailInput.required = true;
    form.appendChild(emailInput)
    this.__emailInput__ = emailInput

    
    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for' , 'Password');
    passwordLabel.innerText = 'Password:';
    form.appendChild(passwordLabel);
    

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    this.__passwordInput__ = passwordInput

    

    var confirmPasswordLabel = document.createElement('label');
    confirmPasswordLabel.setAttribute('for' , 'password');
    confirmPasswordLabel.innerText = 'Confirm Password:';
    form.appendChild(confirmPasswordLabel);
    

    var confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.name = 'password-confirmation';
    confirmPasswordInput.placeholder = 'password';
    confirmPasswordInput.required = true;
    form.appendChild(confirmPasswordInput);
    this.__confirmPasswordInput__ = confirmPasswordInput
    

    var buttonSubmit = document.createElement('button');
    buttonSubmit.type = 'submit';
    buttonSubmit.innerText = 'Register';
    form.appendChild(buttonSubmit)
    

    var error = document.createElement('section');
    error.className = 'register__error';
    container.appendChild(error);
    this.__error__ = error

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'register__login-link';
    link.innerText = 'Login';
    container.appendChild(link);
    this.__link__ = link


}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'signIn', { 
    set: function(callback) { 
        this.__link__.addEventListener('click', callback);
    } 
});

Object.defineProperty(RegisterPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show()
    } 
});

Object.defineProperty(RegisterPanel.prototype, 'onRegister', { 
    set: function(callback) { 
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();
            
            var name = this.__nameInput__.value
            var surname = this.__surnameInput__.value
            var email = this.__emailInput__.value;
            var password = this.__passwordInput__.value;
            var confirmPassword = this.__confirmPasswordInput__.value;
            
    
            callback(name,surname,email, password,confirmPassword);
        }.bind(this));
    } 
});


RegisterPanel.prototype.clear = function() {
    this.__nameInput__.value = '';
    this.__surnameInput__.value = '';
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__confirmPasswordInput__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};



//#endregion