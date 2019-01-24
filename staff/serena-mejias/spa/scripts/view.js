"use strict";

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
  Panel.call(
    this,
    $(
      '<section class="container login col">' +
        '<div class="header row">' +
        '<h3 class="col-sm-5">Login</h3>' +
        "</div>" +
        '<form class="container login__form col">' +
        '<div class="form__email col-sm-5">' +
        '<label for="email">E-mail:</label>' +
        '<input type="email" name="email" placeholder="email" class="form-control" required>' +
        "</div>" +
        '<div class="form__password col-sm-5">' +
        '<label for="password">Password:</label>' +
        '<input type="password" name="password" placeholder="password" class="form-control" required>' +
        '<button type="submit" class="col-xs-2 btn btn-secondary btn-sm">Login</button>' +
        "</div>" +
        "</form>" +
        "</section>"
    )
  );

  var $container = this.$element;
  var $form = $container.find("form");
  this.__$form__ = $form;

  var $inputs = $form.find("input");
  this.__$emailInput__ = $($inputs[0]);
  this.__$passwordInput__ = $($inputs[1]);

  var errorPanel = new ErrorPanel();
  $container.append(errorPanel.$element);
  this.__errorPanel__ = errorPanel;

  var $registerLink = $(
    '<a href="#" class="login__register-link">Register</a>'
  );
  $container.append($registerLink);
  this.__$registerLink__ = $registerLink;
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
  this.__$emailInput__.val("");
  this.__$passwordInput__.val("");
  this.__errorPanel__.message = "";
  this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, "onRegisterPanel", {
  set: function(callback) {
    this.__$registerLink__.on("click", callback);
  }
});

//#endregion

//#region register panel

function RegisterPanel() {
  Panel.call(
    this,
    $(
      '<section class="register">' +
        "<h2>Register</h2>" +
        '<form class="register__form">' +
        '<label for="name">Name:</label>' +
        '<input type="name" name="name" placeholder="name" required>' +
        '<label for="surname">Surname:</label>' +
        '<input type="surname" name="surname" placeholder="surname" required>' +
        '<label for="email">E-mail:</label>' +
        '<input type="email" name="email" placeholder="email" required>' +
        '<label for="password">Password:</label>' +
        '<input type="password" name="password" placeholder="password" required>' +
        '<label for="password">Confirm Password:</label>' +
        '<input type="password" name="password-confirmation" placeholder="password" required>' +
        '<button type="submit">Register</button>' +
        "</form>" +
        '<section class="register__error"></section>'
    )
  );

  var $container = this.$element;

  var $form = $container.find("form");
  this.__$form__ = $form;

  var $inputs = $form.find("input");

  this.__$inputName__ = $($inputs[0]);

  this.__$inputSurname__ = $($inputs[1]);

  this.__$emailInput__ = $($inputs[2]);

  this.__$passwordInput__ = $($inputs[3]);

  this.__$passwordInputConfirmation__ = $($inputs[4]);

  var errorPanel = new ErrorPanel();
  $container.append(errorPanel.$element);
  this.__errorPanel__ = errorPanel;

  var $loginLink = $('<a href="#" class="register__login-link">Login</a>');
  $container.append($loginLink);
  this.__$loginLink__ = $loginLink;
}

RegisterPanel.prototype = Object.create(Panel.prototype);
RegisterPanel.prototype.constructor = RegisterPanel;

Object.defineProperty(RegisterPanel.prototype, "onRegister", {
  set: function(callback) {
    this.__$form__.on(
      "submit",
      function(event) {
        event.preventDefault();

        var name = this.__$inputName__.val();
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
  this.__$inputName__.val("");
  this.__$inputSurname__.val("");
  this.__$emailInput__.val("");
  this.__$passwordInput__.val("");
  this.__$passwordInputConfirmation__.val("");
  this.__errorPanel__.innerText = "";
  this.__errorPanel__.hide();
};

//#region welcome panel

function HomePanel() {
  Panel.call(
    this,
    $(
      '<section class="home">' +
        '<h4>Welcome,<span class = "home__name></span>!</h4>' +
        '<button class = "home__logout">Logout</button>'
    )
  );

  var $container = this.$element;

  var $userSpan = $container.find("h4").find("span");
  this.__$userSpan__ = $userSpan;

  var $logoutButton = $container.find("button");
  this.__$logoutButton__ = $logoutButton;
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, "user", {
  set: function(user) {
    this.__$userSpan__.innerText = user.name;
  }
});

Object.defineProperty(HomePanel.prototype, "onLogout", {
  set: function(callback) {
    this.__$logoutButton__.on("click", callback);
  }
});

function SearchPanel() {
  Panel.call(
    this,
    $(
      '<section class="search">' +
        "<form>" +
        '<label for="name">Name:</label>' +
        '<input type="text" name="query" placeholder="query">' +
        '<button type="submit">Search</button>' +
        "</form>" +
        "<ul></ul>" +
        '<button class = "home__logout">Logout</button>'
    )
  );

  var $container = this.$element;

  var $form = $container.find("form");
  this.__$form__ = $form;

  var $queryInput = $form.find("queryInput");
  this.__$queryInput__ = $queryInput;

  var $resultList = $container.find("resultList");
  this.__$resultList__ = $resultList;
}

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, "onSearch", {
  set: function(callback) {
    this.__$form__.on(
      "submit",
      function(event) {
        event.preventDefault();

        var query = this.__$queryInput__.val();

        callback(query);
      }.bind(this)
    );
  }
});

Object.defineProperty(SearchPanel.prototype, "error", {
  set: function(message) {
    this.__errorPanel__.message = message;
    this.__errorPanel__.show();
  }
});

Object.defineProperty(SearchPanel.prototype, "results", {
  set: function(results) {
    this.__$resultList__.html('');

    results
      .forEach(function(result) {
        var $item = $('<li>' + result.text + ' <img src="' + result.image + '" width="100px"></li>');
            this.__$resultList__.append($item);
      })
      .bind(this);
  }
});

SearchPanel.prototype = Object.create(Panel.prototype);
SearchPanel.prototype.constructor = SearchPanel;

Object.defineProperty(SearchPanel.prototype, "onSearch", {
  set: function(callback) {
    this.__$form__.on(
      "submit",
      function(event) {
        event.preventDefault();

        var query = this.__$queryInput__.val();

        callback(query);
      }.bind(this)
    );
  }
});

SearchPanel.prototype.clear = function () {
  this.clearResults();
  this.__$queryInput__.val('');
  this.__errorPanel__.message = '';
  this.__errorPanel__.hide();
};

SearchPanel.prototype.clearResults = function () {
  this.__$resultList__.html('');
};

function ErrorPanel() {
  Panel.call(this, $('<section class="error"></section>'));
}

ErrorPanel.prototype = Object.create(Panel.prototype);
ErrorPanel.prototype.constructor = ErrorPanel;

Object.defineProperty(ErrorPanel.prototype, "message", {
  set: function(message) {
    this.$element.text(message);
  }
});


//#endregion
