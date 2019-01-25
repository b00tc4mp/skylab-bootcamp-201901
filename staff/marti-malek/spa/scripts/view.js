'use strict';

//#region panel

class Panel {
    constructor($element) {
        this.$element = $element
    }

    hide() {
        this.$element.hide()
    }

    show() {
        this.$element.show()
    }
}

//#endregion

//#region login panel

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="login container-fluid">'
    <h2>Login</h2>
    <form class="login__form" >
      <div class="form-row">
          <div class="col-sm-12 input-group form-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">Email</div>
              </div>
              <input class="form-control" type="email" name="email" placeholder="something@example.com" required>
          </div>
          <div class="col-sm-12 input-group form-group">
              <div class="input-group-prepend">
                  <div class="input-group-text">Password</div>
              </div>
              <input class="form-control" type="password" name="password" placeholder="example" required>
          </div>
      </div>
      <div class="row">
          <div class="col-sm-12 form-group">
              <button class="btn btn-default" type="submit">Login</button>
          </div>
      </div>
    </form>
    </section>`));;

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    this.$div = $form.find('div');

    this.$div2 = this.$div.find('div');
 
    this.__$emailInput__ = $(this.$div).find('input[type=email]');

    this.__$passwordInput__ = $(this.$div).find('input[type=password]');

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link btn btn-primary">Register</a>');
    $container.append($registerLink);
    this.__$registerLink__ = $registerLink;
    }
    set onLogin(callback) {
        this.__$form__.on('submit', event => {
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
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
}

//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor() {
        super($(`<section class="register container-fluid" style="display: none;">'
    <h2>Register</h2>
    <form class="register__form">
       <div class="row">
           <div class="col-sm-12 col-lg-6 input-group form-group">
               <div class="input-group-prepend">
                   <div class="input-group-text">Name</div>
               </div>
               <input class="form-control" type="text" name="name" placeholder="John" required="">
           </div>
       <div class="col-sm-12 col-lg-6 form-group input-group">
           <div class="input-group-prepend">
                   <div class="input-group-text">Surname</div>
           </div>
           <input class="form-control" type="text" placeholder="Doe" required="">
       </div>
       <div class="col-sm-12 form-group input-group">
               <div class="input-group-prepend">
                   <div class="input-group-text">Email</div>
               </div>
           <input class="form-control" type="email" name="email" placeholder="something@example.com" required="">
       </div>
       <div class="col-sm-12 col-lg-6 form-group input-group">
           <div class="input-group-prepend">
              <div class="input-group-text">Password</div>
           </div>
           <input class="form-control" type="password" name="password" placeholder="example" required="">
       </div>
       <div class="col-sm-12 col-lg-6 form-group input-group">
           <div class="input-group-prepend">
              <div class="input-group-text">Confirm Password</div>
           </div>
           <input class="form-control" type="password" name="passwordConfirmation" placeholder="example" required="">
       </div>
       <div class="col-sm-12 form-group">
           <button class="btn btn-default" type="submit">Register</button>
       </div>
       </div>
    </form>
    <section class="error" style="display: none;"></section>
    </section>`));

        var $container = this.$element;

        this.__$form__ = $container.find('form');
        var $form = this.__$form__;

        var $inputs = $form.find('input');

        this.__$nameInput__ = $($inputs[0]);

        this.__$surnameInput__ = $($inputs[1]);

        this.__$emailInput__ = $($inputs[2]);

        this.__$passwordInput__ = $($inputs[3]);

        this.__$passwordConfirmationInput__ = $($inputs[4]);

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $loginLink = $('<a href="#" class="register__login-link btn btn-warning">Login</a>');
        $container.append($loginLink);
        this.__$loginLink__ = $loginLink;
    }
    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        });
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
    clear() {
        this.__$nameInput__.val('');
        this.__$surnameInput__.val('');
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__$passwordConfirmationInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }
}

//#endregion

//#region home panel

class HomePanel extends Panel {
    constructor() {
        super($(`<section class="home container-fluid">'
    <div class="row">
       <div class="col-6 sm-col-4 margin-top">
           <h3>Welcome, <span></span>!</h3>
       </div>
       <div class="col-4 sm-col-4 text-right">
           <button class="btn btn-xs margin-top margin-bottom">Logout</button>
       </div>
    </div>
    </section>`));

        var $container = this.$element;

        var $title = $container.find('h3');

        var $div = $container.children('div');

        var $userSpan = $title.find('span');
        this.__$userSpan__ = $userSpan;

        var $logoutButton = $container.find('button');
        $div.append($logoutButton);
        this.__$logoutButton__ = $logoutButton;
    }
    set user(user) {
        this.__$userSpan__.text(user.name);
    }
    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }
}

//#endregion

//#region search panel

class SearchPanel extends Panel {
    constructor() {
        super($(`<section>
    <form class="form-row margin-bottom">
       <input class="form-control col-11" type="text" name="query" placeholder="...">
       <button class="btn btn-basic col-1" type="submit">Search</button>
    </form>
    <div class="">
    <ul class="row" id="list"></ul>
    </div>
    </section>`))

    var $container = this.$element;

    var $form = $container.find('form');
    this.__$form__ = $form;

    var $queryInput = $form.find('input');
    this.__$queryInput__ = $queryInput;

    var errorPanel = new ErrorPanel;
    $container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $resultList = $container.find('ul');
    $container.append($resultList);
    this.__$resultList__ = $resultList;
    }
    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();
            var query = this.__$queryInput__.val();

            callback(query);
        });
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

/* Object.defineProperty(SearchPanel.prototype, 'results', {
    set: function (results) {
        this.__$resultList__.html('');
        this.__errorPanel__.hide();

        results.forEach(function (result) {
            var $item = $('<li class="col-12 card row" style="text-decoration:none;">'+'<p class="col-4" style="top:4rem;font-size:2vh">'+result.text+'</p>'+'<div class="text-right">'+'<img class="img-fluid rounded float-left center margin-top" style="margin-top:2rem" src="'+result.image+'" width="100px">'+'</div>'+'</li>');
            this.__$resultList__.append($item);
        }.bind(this));
    }
}); */
    clear() {
        this.clearResults();
        this.__$queryInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
    clearError() {
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    }
}

//#endregion

//#region results panel

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
        <ul class="row" id="list"></ul></section>`));

        var $container = this.$element;

        var $form = $container.find('form');
        this.__$form__ = $form;

        var $queryInput = $form.find('input');
        this.__$queryInput__ = $queryInput;

        var errorPanel = new ErrorPanel;
        $container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $resultList = $container.find('ul');
        $container.append($resultList);
        this.__$resultList__ = $resultList;
    }

    set results(results) {
        this.__$resultList__.html('');

        results.forEach(result => {
            var $item = $(`<li  data-id=${result.id} class="col-12 card row" style="text-decoration:none;"><p class="col-4" style="top:4rem;font-size:2vh">${result.text}</p><div class="text-right"><img class="img-fluid rounded float-left center margin-top" style="margin-top:2rem" src="${result.image}" width="100px"></div></li>`);

            $item.click(() => {
                const id = $item.data('id');

                this.__onItemSelectedCallback__(id)
            });

            this.__$resultList__.append($item);
        });
    }

    clear() {
        this.__$resultList__.html('');
    }

    set onItemSelected(callback) {
        this.__onItemSelectedCallback__ = callback;
    }
}

//#endregion

//#region detail panel

class DetailPanel extends Panel {
    constructor() {
        super($(`<section class="detail container">
        <div class="row">
            <div class="col">
                <img src="" width="150px">
            </div>
            <div class="col">
                <h3></h3>
            </div>
            <div class="col">
                <span class="price"></span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p></p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <a href="#" target="_blank" style="text-decoration:none; color: gray">Buy Now!</a>
            </div>
            <div class="col">
                <button>Go back</button>
            </div>
        </div>
    </section>`))
        const $container = this.$element

        const $image = $container.find('img')
        this.__$image__ = $image

        const $title = $container.find('h3')
        this.__$title__ = $title

        const $description = $container.find('p')
        this.__$description__ = $description

        const $price = $container.find('span')
        this.__$price__ = $price

        const $externalLink = $container.find('a')
        this.__$externalLink__ = $externalLink

        const $goBackButton = $container.find('button')
        this.__$goBackButton__ = $goBackButton
    }
    set item({ image, title, description, price, externalLink }) {
        this.__$image__.attr('src', image)
        this.__$title__.text(title)
        this.__$description__.text(description)
        this.__$price__.text(price)
        this.__$externalLink__.attr('href', externalLink)
    }
    set onGoBack(callback) {
        this.__$goBackButton__.click(callback)
    }
}

//#endregion

//#region error panel

class ErrorPanel extends Panel {
    constructor() {
        super($('<section class="error alert alert-danger"></section>'));
    }
    set message(message) {
        this.$element.text(message);
    }
}

//#endregion