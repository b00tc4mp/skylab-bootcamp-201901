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

    var welcomTitle = document.createElement('h2');
    welcomTitle.innerText = 'Al agua patos!!';
    title.appendChild(welcomTitle);

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

    var form = document.createElement('form');
    container.appendChild(form)
    this.__form__ = form

    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.name = 'query';
    title.appendChild(searchInput);
    this.__searchInput__ = searchInput

    var searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.innerText = 'Search';
    title.appendChild(searchButton)

    // var errorPanel = new ErrorPanel;
    // container.appendChild(errorPanel);
    // this.__errorPanel__ = errorPanel;

    var resultList = document.createElement('ul');
    title.appendChild(resultList);
    this.__resultList__ = resultList;
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

Object.defineProperty(WelcomePanel.prototype, 'onSearch', {
    set: function(callback) {
        this.__form__.addEventListener('submit', function(event) {
            event.preventDefault();

            var query = this.__searchInput__.value;

            callback(query);
        }.bind(this))
    }
} )

Object.defineProperty(WelcomePanel.prototype, 'error', {
    set: function(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

Object.defineProperty(WelcomePanel.prototype, 'results', {
    set: function (results) {
        this.__resultList__.innerHTML = '';
        this.__errorPanel__.hide();

        results.forEach(function(result){

            var item = document.createElement('li');
            this.__resultList__.appendChild(item);

            var text = document.createTextNode(result.text);
            item.appendChild(text);

            var image = document.createElement('img');
            image.src = result.image;
            image.style.width = '100px';
            item.appendChild(image);
        }.bind(this))
    }
})

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
    form.className = 'register_form';
    container.appendChild(form);
    this.__form__=form

    var registerName = document.createElement('label');
    registerName.setAttribute('for', 'name');
    registerName.innerText = 'Name:';
    form.appendChild(registerName);

    var inputName = document.createElement('input');
    inputName.type = 'name';
    inputName.name = 'name';
    inputName.placeholder = 'name';
    inputName.required = true;
    form.appendChild(inputName);
    this.__inputName__ = inputName;

    var registerSurname = document.createElement('label');
    registerSurname.setAttribute('for', 'surname');
    registerSurname.innerText = 'Surname:';
    form.appendChild(registerSurname);

    var inputSurname = document.createElement('input');
    inputSurname.type = 'surname';
    inputSurname.name = 'surname';
    inputSurname.placeholder = 'surname';
    inputSurname.required = true;
    form.appendChild(inputSurname);
    this.__inputSurname__ = inputSurname

    var registerEmail = document.createElement('label');
    registerEmail.setAttribute('for', 'email');
    registerEmail.innerText = 'E-mail:';
    form.appendChild(registerEmail);

    var inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.name = 'email';
    inputEmail.placeholder = 'email';
    inputEmail.required = true;
    form.appendChild(inputEmail);
    this.__inputEmail__ = inputEmail

    var registerPassword = document.createElement('label');
    registerPassword.setAttribute('for', 'password');
    registerPassword.innerText = 'Password:';
    form.appendChild(registerPassword);

    var inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.name = 'password';
    inputPassword.placeholder = 'password';
    inputPassword.required = true;
    form.appendChild(inputPassword);
    this.__inputPassword__ = inputPassword

    var registerConfirmPassword = document.createElement('label');
    registerConfirmPassword.setAttribute('for', 'password');
    registerConfirmPassword.innerText = 'Confirm Password:';
    form.appendChild(registerConfirmPassword);

    var inputConfirmPassword = document.createElement('input');
    inputConfirmPassword.type = 'password';
    inputConfirmPassword.name = 'password.confirmation';
    inputConfirmPassword.placeholder = 'password';
    inputConfirmPassword.required = true;
    form.appendChild(inputConfirmPassword);
    this.__inputConfirmPassword__ = inputConfirmPassword

    var registerButton = document.createElement('button');
    registerButton.type = 'submit';
    registerButton.innerText = 'Register';
    form.appendChild(registerButton);

    var error = document.createElement('section');
    error.className = 'register_error';
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
        this.__loginLink__.addEventListener('click', callback)
    }
});

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function(callback) {
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.__inputName__.value
            var surname = this.__inputSurname__.value
            var email = this.__inputEmail__.value
            var password = this.__inputPassword__.value
            var passwordConfirmation = this.__inputConfirmPassword__.value

            callback(name, surname, email, password, passwordConfirmation);
        }.bind(this))
    }
})

Object.defineProperty(RegisterPanel.prototype, 'error', {
    set: function(message) {
        this.__error__.innerText = message;
        this.__error__.show();
    }
})

RegisterPanel.prototype.clear = function() {
    this.__inputName__.value = '';
    this.__inputSurname__.value = '';
    this.__inputEmail__.value = '';
    this.__inputPassword__.value = '';
    this.__inputConfirmPassword__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
}

//#endregion

//#region error panel

function ErrorPanel() {
    Panel.call(this, $('<section class="error"></section>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$element.text(message);
    }
});

//#endregion
