"use strict";

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
  Panel.call(this, document.createElement("section"));

  var container = this.element;
  container.className = "login";

  var title = document.createElement("h2");
  title.innerText = "Login";
  container.appendChild(title);

  var form = document.createElement("form");
  form.className = "login__form";
  container.appendChild(form);
  this.__form__ = form;

  var emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.innerText = "E-mail:";
  form.appendChild(emailLabel);

  var emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "email";
  emailInput.required = true;
  form.appendChild(emailInput);
  this.__emailInput__ = emailInput;

  var passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.innerText = "Password:";
  form.appendChild(passwordLabel);

  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.required = true;
  form.appendChild(passwordInput);
  this.__passwordInput__ = passwordInput;

  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Login";
  form.appendChild(submitButton);

  var error = document.createElement("section");
  error.className = "login__error";
  container.appendChild(error);
  this.__error__ = error;

  var registerLink = document.createElement("a");
  registerLink.href = "#";
  registerLink.innerText = "Register";
  registerLink.className = "login__register-link";
  container.appendChild(registerLink);
  this.__registerLink__ = registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, "onLogin", {
  set: function(callback) {
    this.__form__.addEventListener(
      "submit",
      function(event) {
        event.preventDefault();

        var email = this.__emailInput__.value;
        var password = this.__passwordInput__.value;

        callback(email, password);
      }.bind(this)
    );
  }
});

Object.defineProperty(LoginPanel.prototype, "error", {
  set: function(message) {
    this.__error__.innerText = message;
    this.__error__.show();
  }
});

Object.defineProperty(LoginPanel.prototype, "onRegisterPanel", {
  set: function(callback) {
    this.__registerLink__.addEventListener("click", callback);
  }
});

LoginPanel.prototype.clear = function() {
  this.__emailInput__.value = "";
  this.__passwordInput__.value = "";
  this.__error__.innerText = "";
  this.__error__.hide();
};

//#endregion



//#region register panel

function RegisterPanel() {
  Panel.call(this, document.createElement("section"));

  var container = this.element;
  container.className = "register";

  var title = document.createElement("h2");
  container.appendChild(title);
  title.innerText = "Register";

  var form = document.createElement("form");
  container.appendChild(form);
  form.className = "register__form";
  this.__form__ = form;

  var labelName = document.createElement("label");
  labelName.setAttribute("for", "name");
  labelName.innerText = "Name:";
  form.appendChild(labelName);

  var inputName = document.createElement("input");
  inputName.type = "name";
  inputName.name = "name";
  inputName.placeholder = "name";
  inputName.required = true;
  form.appendChild(inputName);
  this.__inputName__ = inputName;

  var labelSurname = document.createElement("label");
  labelSurname.setAttribute("for", "surname");
  labelSurname.innerText = "Surname:";
  form.appendChild(labelSurname);

  var inputSurname = document.createElement("input");
  inputSurname.type = "surname";
  inputSurname.name = "surname";
  inputSurname.placeholder = "surname";
  inputSurname.required = true;
  form.appendChild(inputSurname);
  this.__inputSurname__ = inputSurname;

  var emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.innerText = "E-mail:";
  form.appendChild(emailLabel);

  var emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.name = "email";
  emailInput.placeholder = "email";
  emailInput.required = true;
  form.appendChild(emailInput);
  this.__emailInput__ = emailInput;

  var passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.innerText = "Password:";
  form.appendChild(passwordLabel);

  var passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.required = true;
  form.appendChild(passwordInput);
  this.__passwordInput__ = passwordInput;

  var passwordLabelConfirmation = document.createElement("label");
  passwordLabelConfirmation.setAttribute("for", "passwordConfirmation");
  passwordLabelConfirmation.innerText = "Password confirmation:";
  form.appendChild(passwordLabelConfirmation);

  var passwordInputConfirmation = document.createElement("input");
  passwordInputConfirmation.type = "passwordConfirmation";
  passwordInputConfirmation.name = "passwordConfirmation";
  passwordInputConfirmation.placeholder = "passwordConfirmation";
  passwordInputConfirmation.required = true;
  form.appendChild(passwordInputConfirmation);
  this.__passwordInputConfirmation__ = passwordInputConfirmation;

  var submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Register";
  form.appendChild(submitButton);

  var error = document.createElement("section");
  error.className = "register__error";
  container.appendChild(error);
  this.__error__ = error;

  var loginLink = document.createElement("a");
  loginLink.href = "#";
  loginLink.innerText = "Login";
  loginLink.className = "register__login-link";
  container.appendChild(loginLink);
  this.__loginLink__ = loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, "registration", {
  set: function(callback) {
    this.__form__.addEventListener(
      "submit",
      function(event) {
        event.preventDefault();

        var name = this.__inputName__.value;
        var surname = this.__inputSurname__.value;
        var email = this.__emailInput__.value;
        var password = this.__passwordInput__.value;
        var passwordConfirmation = this.__passwordInputConfirmation__.value;

        callback(name, surname, email, password, passwordConfirmation);
      }.bind(this)
    );
  }
});

Object.defineProperty(RegisterPanel.prototype, "error", {
  set: function(message) {
    this.__error__.innerText = message;
    this.__error__.show();
  }
});

Object.defineProperty(RegisterPanel.prototype, "onLoginPanel", {
  set: function(callback) {
    this.__loginLink__.addEventListener("click", callback);
  }
});

RegisterPanel.prototype.clear = function() {
  this.__inputName__.value = "";
  this.__inputSurname__.value = "";
  this.__emailInput__.value = "";
  this.__passwordInput__.value = "";
  this.__passwordInputConfirmation__.value = "";
  this.__error__.innerText = "";
  this.__error__.hide();
};

//#region welcome panel

function HomePanel() {
    Panel.call(this, document.createElement("section"));
  
    var container = this.element;
    container.className = "welcome";
  
    var title = document.createElement("h4");
    container.appendChild(title);
  
    var welcomeText = document.createTextNode("Welcome, ");
    title.appendChild(welcomeText);
  
    var userSpan = document.createElement("span");
    userSpan.className = "welcome__name";
    title.appendChild(userSpan);
    this.__userSpan__ = userSpan;
  
    var exclamationText = document.createTextNode("!");
    title.appendChild(exclamationText);
  
    var logoutButton = document.createElement("button");
    logoutButton.className = "welcome__logout";
    logoutButton.innerText = "Logout";
    container.appendChild(logoutButton);
    this.__logoutButton__ = logoutButton;
  }

    function SearchPanel() {

    Panel.call(this, document.createElement("section"));
    var container = this.element;
    container.className = 'duckling';
  
    var form = document.createElement('form');
    container.appendChild(form);
    this.__form__ = form;

    var queryInput = document.createElement('input');
    queryInput.type = 'text';
    queryInput.name = 'query';
    queryInput.placeholder = '...';
    form.appendChild(queryInput);
    this.__queryInput__ = queryInput; 

    var searchButton = document.createElement('button');
    searchButton.type = 'submit';
    searchButton.innerText = 'Search';
    form.appendChild(searchButton);

    var resultList = document.createElement('ul');
    container.appendChild(resultList);
    this.__resultList__ = resultList;
    }

    SearchPanel.prototype = Object.create(Panel.prototype)
    SearchPanel.prototype.constructor = SearchPanel;
    
    Object.defineProperty(SearchPanel.prototype, 'onSearch', {
        set: function(callback){
            this.__form__.addEventListener('submit', function(event){
                event.preventDefault();
        
                var query = this.__queryInput__.value;
        
                callback(query);
            }.bind(this));
        }
    });

    Object.defineProperty(SearchPanel.prototype, 'error', {
        set: function(message){
            this.__resultList__.innerHTML = '';

            var errorItem = document.createElement('li');
            errorItem.innerText = message;
            this.__resultList__.appendChild(errorItem);
        }
    });

    Object.defineProperty(SearchPanel.prototype, 'results', {
        set: function(results) {
            this.__resultList__.innerHTML = '';

            results.forEach(function(result){
                var item = document.createElement('li');
                this.__resultList__.appendChild(item);

                var text = document.createTextNode(result.text);
                item.appendChild(text);

                var image = document.createElement('img');
                image.src = result.image;
                image.style.width = '100px';
                item.appendChild(image);
            }).bind(this);
        }
    })

  HomePanel.prototype = Object.create(Panel.prototype);
  HomePanel.prototype.constructor = HomePanel;
  
  Object.defineProperty(HomePanel.prototype, "user", {
    set: function(user) {
      this.__userSpan__.innerText = user.name;
    }
  });
  
  Object.defineProperty(HomePanel.prototype, "onLogout", {
    set: function(callback) {
      this.__logoutButton__.addEventListener("click", callback);
    }
  });
  
  //#endregion

//#endregion