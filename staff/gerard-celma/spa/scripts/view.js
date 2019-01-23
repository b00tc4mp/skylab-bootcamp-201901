'use strict';

//#region panel

function Panel($element) {
    this.$element = $element;
}

Panel.prototype.hide = function() {
    this.$element.hide();
};

Panel.prototype.show = function() {
    this.$element.show();
};

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, $('<section class="login">'
    + '<h2>Login</h2>'
    + '<form class="login__form" >'
    + '<label for="email">E-mail:</label>'
    + '<input type="email" name="email" placeholder="email" required>'
    + '<label for="password">Password:</label>'
    + '<input type="password" name="password" placeholder="password" required>'
    + '<button type="submit">Login</button>'
    + '</form>'
    + '</section>'));

    var $container = this.$element;

    var $form = $container.children('form');
    this.__$form__ = $form;

    var $inputs = $form.children('input');

    this.__$emailInput__ = $($inputs[0]);

    this.__$passwordInput__ = $($inputs[1]);

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', { 
    set: function(callback) { 
        this.__$form__.on('submit', function (event) {
            event.preventDefault();
    
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
           
            callback(email, password);
        }.bind(this));
    } 
});

Object.defineProperty(LoginPanel.prototype, 'error', { 
    set: function(message) { 
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
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

    var titleDuckling = document.createElement('h2');
    titleDuckling.innerText = 'Duckling Search Engine 🐥🐣';
    container.appendChild(titleDuckling);

    var form = document.createElement('form');
    form.action = 'https://duckling-api.herokuapp.com/api/search';
    form.method = 'get';
    container.appendChild(form);

    var search = document.createElement('input');
    search.type = 'text';
    search.name = 'q';
    form.appendChild(search);

    var submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerText = 'Search';
    form.appendChild(submit);
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

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<section class="error"></section>'));
}

ErrorPanel.protoype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion