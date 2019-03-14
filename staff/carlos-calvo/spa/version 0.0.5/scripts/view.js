

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

//#region login panel y comportamiento de los login panel

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
    this.__registerLink__ = registerLink
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', { 
    set: function(callback) { //Call es del main function(email, password)
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();
    
            var email = this.__emailInput__.value;
            var password = this.__passwordInput__.value;
    
            callback(email, password);
        }.bind(this));
    } 

});

Object.defineProperty(LoginPanel.prototype, 'onRegister', {
    set: function(callback) {
        this.__registerLink__.addEventListener('click', function(event){
            event.preventDefault()
            callback();
        })
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

//#endregion

//#region welcome panel


///Comportamiento de los welcome panel

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

//#region register panel y comportamiento de los objetos panel
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////´
//////////////////////////////////////////////////////////////////////////


function RegisterPanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'register';

    var title = document.createElement('h2')
    title.innerText= 'Register'
    container.appendChild(title)

    var form = document.createElement('form')
    form.className= 'register__form'
    this.__form__=form

    var nameLabel = document.createElement('label')
    nameLabel.innerText = 'Name'
    nameLabel.setAttribute('for', 'name')
    form.appendChild(nameLabel)

    var inputname = document.createElement('input')
    inputname.setAttribute('type', 'name')
    inputname.setAttribute('name', 'name')
    inputname.setAttribute('placeholder', 'name')
    inputname.setAttribute('required', '')
    form.appendChild(inputname)
    this.__inputname__=inputname


    var surnameLabel = document.createElement('label')
    surnameLabel.innerText = 'Surname'
    surnameLabel.setAttribute('for', 'surname')
    form.appendChild(surnameLabel)

    var inputsurname = document.createElement('input')
    inputsurname.setAttribute('type', 'surname')
    inputsurname.setAttribute('name', 'surname')
    inputsurname.setAttribute('placeholder', 'surname')
    inputsurname.setAttribute('required', '')
    form.appendChild(inputsurname)
    this.__inputsurname__=inputsurname
 
    var emailLabel = document.createElement('label')
    emailLabel.innerText = 'email'
    emailLabel.setAttribute('for', 'email')
    form.appendChild(emailLabel)

    var inputemail = document.createElement('input')
    inputemail.setAttribute('type', 'email')
    inputemail.setAttribute('name', 'email')
    inputemail.setAttribute('placeholder', 'email')
    inputemail.setAttribute('required', '')
    form.appendChild(inputemail)
    this.__inputemail__=inputemail


    var passwordLabel = document.createElement('label')
    passwordLabel.innerText = 'password'
    passwordLabel.setAttribute('for', 'password')
    form.appendChild(passwordLabel)

    var inputpassword = document.createElement('input')
    inputpassword.setAttribute('type', 'password')
    inputpassword.setAttribute('name', 'password')
    inputpassword.setAttribute('placeholder', 'password')
    inputpassword.setAttribute('required', '')
    form.appendChild(inputpassword)
    this.__inputpassword__=inputpassword

    var passwordconfLabel = document.createElement('label')
    passwordconfLabel.innerText = 'Confirm Password'
    passwordconfLabel.setAttribute('for', 'passwordconf')
    form.appendChild(passwordconfLabel)


    var inputconfpassword = document.createElement('input')
    inputconfpassword.setAttribute('type', 'password')
    inputconfpassword.setAttribute('name', 'password-confirmation')
    inputconfpassword.setAttribute('placeholder', 'password')
    inputconfpassword.setAttribute('required', '')
    form.appendChild(inputconfpassword)
    this.__inputconfpassword__=inputconfpassword

    var boton = document.createElement('button')
    boton.setAttribute('type', 'submit')
    boton.innerText = 'Register'
    form.appendChild(boton)
    this.__boton__ = boton

    container.appendChild(form)

    var errorsection = document.createElement('section')
    errorsection.className= 'register__error'
    container.appendChild(errorsection)
    this.__errorsection__= errorsection;

    var backtologin = document.createElement('a')
    backtologin.setAttribute('href', '#')
    backtologin.className ='register__login-link'
    backtologin.innerText ='Back to Login'
    container.appendChild(backtologin)
    this.__backtologin__ = backtologin
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, 'backToLogin', {
    set: function (callback){
        this.__backtologin__.addEventListener('click',function(event){
            event.preventDefault();
            callback();
        })
    }
});

Object.defineProperty(RegisterPanel.prototype, 'error', { 
    set: function(message) { 
        this.__errorsection__.innerText = message;
        this.__errorsection__.show();
    } 
});

RegisterPanel.prototype.clear = function() {
    this.__inputname__.value = '';
    this.__inputsurname__.value = '';
    this.__inputemail__.value = '';
    this.__inputpassword__.value='';
    this.__inputconfpassword__.value='';
};

Object.defineProperty(RegisterPanel.prototype, 'tryRegister', {
    set: function (callback){
        this.__form__.addEventListener('submit',function(event){
            event.preventDefault();
            var name = this.__inputname__.value
            var surname = this.__inputsurname__.value
            var mail = this.__inputemail__.value
            var pass = this.__inputpassword__.value
            var passconf = this.__inputconfpassword__.value
            callback(name,surname, mail, pass, passconf );
        }.bind(this))
    }
});