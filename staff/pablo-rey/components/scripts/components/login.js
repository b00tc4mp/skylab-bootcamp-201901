"use strict";

class Login extends Component {
  constructor (form, onLogin, literals, defaultLanguage, onLanguageChange) {
    super(form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.__feedback__ = new Feedback( this.getChild('.login__error'));
    this.__feedback__.visible = false;

    this.language = defaultLanguage;
    this.onLogin = onLogin;
  }

  set onLogin (callback) {
    this.container.addEventListener("submit", 
      event => {
        event.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        callback(email, password);
      });
  }

  set language(language) {
    const literals = this.__literals__[language];

    this.getChild('.login__title').innerText = literals.title;

    this.container.elements.email.placeholder = literals.email;
    this.container.elements.password.placeholder = literals.password;

    this.getChild('.login__button').innerText = literals.title;

    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }

  set error (error) {
    this.__feedback__.message = error;
    this.__feedback__.visible = true;
  }
}


// /**
//  * 
//  * @param {*} form 
//  * @param {*} onLogin 
//  * @param {*} literals 
//  * @param {*} defaultLanguage 
//  * @param {*} onLanguageChange 
//  */
// function Login(form, onLogin, literals, defaultLanguage, onLanguageChange) {
//   Component.call(this, form);

//   this.__literals__ = literals;
//   this.__onLanguageChange__ = onLanguageChange;

//   this.__feedback__ = new Feedback( this.getChild('.login__error'));
//   this.__feedback__.visible = false;

//   this.language = defaultLanguage;
//   this.onLogin = onLogin;
// }

// Login.prototype = Object.create(Component.prototype);
// Login.prototype.constructor = Login;

// Object.defineProperty(Login.prototype, "onLogin", {
//   set: function(callback) {
//     this.container.addEventListener("submit", function(event) {
//       event.preventDefault();

//       var email = this.email.value;
//       var password = this.password.value;

//       callback(email, password);
//     });
//   }
// });

// Object.defineProperty(Login.prototype, "language", {
//   set: function(language) {
//     var literals = this.__literals__[language];

//     this.getChild('.login__title').innerText = literals.title;

//     this.container.elements.email.placeholder = literals.email;
//     this.container.elements.password.placeholder = literals.password;

//     this.getChild('.login__button').innerText = literals.title;

//     if (this.__onLanguageChange__) this.__onLanguageChange__(language);
//   }
// });

// Object.defineProperty(Login.prototype, "error", {
//   set: function(error) {
//     this.__feedback__.message = error;
//     this.__feedback__.visible = true;
//   }
// });
