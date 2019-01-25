"use strict";

//#region panel

class Panel {
  constructor($element) {
    this.$element = $element;
  }

  hide() {
    this.$element.hide();
  }

  show() {
    this.$element.show();
  }
}

//#endregion

//#region login panel

class LoginPanel extends Panel {
  constructor() {
    super(
      $(`<section class="login col"> 
        <div class="header row"> 
        <h3 class="col-sm-5">Login</h3> 
        "</div>" 
        <form class="container login__form col"> 
        <div class="form-group form__email col-sm-5"> 
        <label for="email">E-mail:</label> 
        <input type="email" name="email" placeholder="email" class="form-control" required> 
        "</div>" 
        <div class="form-group form__password col-sm-5"> 
        <label for="password">Password:</label> 
        <input type="password" name="password" placeholder="password" class="form-control" required> 
        <button type="submit" class="col-xs-2 btn btn-secondary btn-sm">Login</button> 
        "</div>" 
        "</form>" 
        "</section>"`)
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

  set onLogin(callback) {
    this.__$form__.on("submit", event => {
      event.preventDefault();

      var email = this.__$emailInput__.val();
      var password = this.__$passwordInput__.val();

      callback(email, password);
    });
  }

  set error(message) {
    this.__errorPanel__.message = message;
    this.__errorPanel__.show();
  }

  clear() {
    this.__$emailInput__.val("");
    this.__$passwordInput__.val("");
    this.__errorPanel__.message = "";
    this.__errorPanel__.hide();
  }

  set onRegisterPanel(callback) {
    this.__$registerLink__.on("click", callback);
  }
}

//#endregion

//#region register panel

class RegisterPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class="register"> 
        "<h2>Register</h2>" 
        <form class="register__form"> 
        <label for="name">Name:</label> 
        <input type="name" name="name" placeholder="name" required> 
        <label for="surname">Surname:</label> 
        <input type="surname" name="surname" placeholder="surname" required> 
        <label for="email">E-mail:</label> 
        <input type="email" name="email" placeholder="email" required> 
        <label for="password">Password:</label> 
        <input type="password" name="password" placeholder="password" required> 
        <label for="password">Confirm Password:</label> 
        <input type="password" name="password-confirmation" placeholder="password" required> 
        <button type="submit">Register</button> 
        "</form>" 
        <section class="register__error"></section>`
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

  set onRegister(callback) {
    this.__$form__.on("submit", event => {
      event.preventDefault();

      var name = this.__$inputName__.val();
      var surname = this.__$inputSurname__.val();
      var email = this.__$emailInput__.val();
      var password = this.__$passwordInput__.val();
      var passwordConfirmation = this.__$passwordInputConfirmation__.val();

      callback(name, surname, email, password, passwordConfirmation);
    });
  }

  set error(message) {
    this.__errorPanel__.message = message;
    this.__errorPanel__.show();
  }

  set onLoginPanel(callback) {
    this.__$loginLink__.on("click", callback);
  }

  clear() {
    this.__$inputName__.val("");
    this.__$inputSurname__.val("");
    this.__$emailInput__.val("");
    this.__$passwordInput__.val("");
    this.__$passwordInputConfirmation__.val("");
    this.__errorPanel__.innerText = "";
    this.__errorPanel__.hide();
  }
}

//#region welcome panel

class HomePanel extends Panel {
  constructor() {
    super(
      $(`<section class="home">
        <h4>Welcome,<span class = "home__name"></span>!</h4>
        <button class = "home__logout">Logout</button>`)
    );

    var $container = this.$element;

    var $userSpan = $container.find("h4").find("span");
    this.__$userSpan__ = $userSpan;

    var $logoutButton = $container.find("button");
    this.__$logoutButton__ = $logoutButton;
  }

  set user(user) {
    this.__$userSpan__.innerText = user.name;
  }

  set onLogout(callback) {
    this.__$logoutButton__.on("click", callback);
  }
}

class SearchPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class="search"> 
        <form>
        <label for="name">Name:</label> 
        <input id="queryInput" type="text" name="query" placeholder="query"> 
        <button type="submit">Search</button> 
        </form>
        </section>`
      )
    );

    var $container = this.$element;

    var $form = $container.find("form");
    this.__$form__ = $form;

    var $queryInput = $form.find("#queryInput");
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel();
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;
  }

  set onSearch(callback) {
    this.__$form__.on("submit", event => {
      event.preventDefault();

      var query = this.__$queryInput__.val();

      callback(query);
    });
  }

  set error(message) {
    this.__errorPanel__.message = message;
    this.__errorPanel__.show();
  }

  clear() {
    this.__$queryInput__.val("");
    this.clearError();
  }

  clearError() {
    this.__errorPanel__.message = "";
    this.__errorPanel__.hide();
  }
}

class ResultPanel extends Panel {
  constructor() {
    super(
      $(`<section class="results"> 
                <div id="resultsList">
                </div> 
              </section>`)
    );

    var $resultList = this.$element.find("#resultsList");
    this.__$resultList__ = $resultList;
  }

  set results(results) {
    this.__$resultList__.html("");

    results.forEach(result => {
      var $item = $(`<div id="resultsList" data-id=${result.id}>
        ${result.text}
        <img src="${result.image}" width="100px">
        </div>`);

      $item.click(function(event) {
        const id = $item.data("id");
        this.__onItemSelectedCallback__(id);
      });
      this.__$resultList__.append($item);
    });
  }
  clear() {
    this.__$resultList__.html("");
  }

  set onItemSelected(callback) {
    this.__onItemSelectedCallback__ = callback;
  }
}

class DetailPanel extends Panel {
  constructor() {
    super(
      $(
        `<section class = "detail container">
          <div class = "row">
            <div class = "col">
              <img src = "" width = "100px">
            </div>
            <div class = "col">
              <h3></h3>
            </div>
            <div class = "col">
              <span class = "price"></span>
            </div>
          </div>
          <div class = "row">
            <div class = "col">
              <p></p>
            </div>
          </div>
          <div class="row">
        <div class="col">
            <a href="#" target="_blank">External link</a>
        </div>
        <div class="col">
            <button>Go back</button>
        </div>
    </div>
</section>`
      )
    );

    const $container = this.$element;

    const $image = $container.find("img");
    this.__$image__ = $image;

    const $title = $container.find("h3");
    this.__$title__ = $title;

    const $description = $container.find("p");
    this.__$description__ = $description;

    const $price = $container.find("span");
    this.__$price__ = $price;

    const $externalLink = $container.find("a");
    this.__$externalLink__ = $externalLink;

    const $goBackButton = $container.find("button");
    this.__$goBackButton__ = $goBackButton;
  }
  set item({ image, title, description, price, externalLink }) {
    this.__$image__.attr("src", image);
    this.__$title__.text(title);
    this.__$description__.text(description);
    this.__$price__.text(price);
    this.__$externalLink__.attr("href", externalLink);
  }

  set onGoBack(callback) {
    this.__$goBackButton__.click(callback);
  }
}

class ErrorPanel extends Panel {
  constructor() {
    super(
      $(`<section class="alert alert-danger">
        </section>`)
    );
  }

  set message(message) {
    this.$element.text(message);
  }
}

//#endregion

//#region retrievePanel
