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
  Panel.call(this, $('<section class="login">'
  +'<h2>Login</h2>'
  +'<form class="login__form" >'
  +'<label for="email">E-mail:</label>'
  +'<input type="email" name="email" placeholder="email" required>'
  +'<label for="password">Password:</label>'
  +'<input type="password" name="password" placeholder="password" required>'
  +'<button type="submit">Login</button>'
  +'</form>'
  +'</section>'));

  var $container = this.$element;

  var $form = $container.children('form');
  this.__$form__ = $form;

  var $inputs = $form.children('input');
  this.__$emailInput__ = $($inputs[0]);
  this.__$passwordInput__ = $($inputs[1]);


  var errorPanel = new errorPanel;
  $container.append(errorPanel.$element);
  this.__errorPanel__ = errorPanel;

  var registerLink = $('<a href="#" class="login__register-link"></a>');
  $container.append($registerLink);
  this.__registerLink__ = $registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, "onLogin", {
  set: function(callback) {
    this.__$form__.on(
      "submit",
      function(event) {
        event.preventDefault();

        var email = this.__$emailInput__.val();
        var password = this.__$passwordInput__.val();

        callback(email, password);
      }.bind(this)
    );
  }
});

Object.defineProperty(LoginPanel.prototype, "error", {
  set: function(message) {
    this.__errorPanel__.message = message;
    this.__errorPanel__.show();
  }
});

LoginPanel.prototype.clear = function() {
  this.__$emailInput__.value = "";
  this.__$passwordInput__.value = "";
  this.__errorPanel__.message = "";
  this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, "onRegisterPanel", {
  set: function(callback) {
    this.__$registerLink__.addEventListener("click", callback);
  }
});


//#endregion



//#region register panel

function RegisterPanel() {
  Panel.call(this, '<section class="register">'
  +'<h2>Register</h2>'
   +'<form class="register__form">' 
       +'<label for="name">Name:</label>' 
       +'<input type="name" name="name" placeholder="name" required>' 
       +'<label for="surname">Surname:</label>' 
       +'<input type="surname" name="surname" placeholder="surname" required>' 
       +'<label for="email">E-mail:</label>' 
       +'<input type="email" name="email" placeholder="email" required>' 
       +'<label for="password">Password:</label>' 
       +'<input type="password" name="password" placeholder="password" required>' 
       +'<label for="password">Confirm Password:</label>'
       +'<input type="password" name="password-confirmation" placeholder="password" required>' 
       +'<button type="submit">Register</button>' 
   +'</form>'
  +'<section class="register__error"></section>'
  /*+*/);

  var $container = this.$element;

  var $form = $container.children('form');
  this.__$form__ = $form;

  var $inputs = $form.children('input');

  this.__$inputName__ = $inputs[0];

  this.__$inputSurname__ = $inputs[1];

  this.__$emailInput__ = $inputs[2];

  this.__$passwordInput__ = inputs[3];

  this.__$passwordInputConfirmation__ = $inputs[4];

  var errorPanel = new errorPanel;
  $container.append(errorPanel.$element);
  this.__errorPanel__ = errorPanel;

  var loginLink = $('<a href="#" class="register__login-link">Login</a>');
  $container.append($registerLink);
  this.__$loginLink__ = $loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, "registration", {
  set: function(callback) {
    this.__$form__.on(
      "submit",
      function(event) {
        event.preventDefault();

        var name = this.__$inputName__.value;
        var surname = this.__$inputSurname__.val();
        var email = this.__$emailInput__.val();
        var password = this.__$passwordInput__.val();
        var passwordConfirmation = this.__$passwordInputConfirmation__.val();

        callback(name, surname, email, password, passwordConfirmation);
      }.bind(this)
    );
  }
});

Object.defineProperty(RegisterPanel.prototype, "error", {
  set: function(message) {
    this.__error__.message = message;
    this.__error__.show();
  }
});

Object.defineProperty(RegisterPanel.prototype, "onLoginPanel", {
  set: function(callback) {
    this.__$loginLink__.on("click", callback);
  }
});

RegisterPanel.prototype.clear = function() {
  this.__$inputName__.val() = "";
  this.__$inputSurname__.val() = "";
  this.__$emailInput__.val() = "";
  this.__$passwordInput__.val() = "";
  this.__$passwordInputConfirmation__.val() = "";
  this.__error__.innerText = "";
  this.__error__.hide();
};

//#region welcome panel

function HomePanel() {
    Panel.call(this, '<section class="home">'
    +'<h4>Welcome,<span class = "home__name></span>!</h4>'
    +''
    +'<button class = "home__logout">Logout</button>'
    );
  
    var $container = this.$element;
  
    this.__$userSpan__ = $userSpan;
    
    this.__$logoutButton__ = $logoutButton;
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