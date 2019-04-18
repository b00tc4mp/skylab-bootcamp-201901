"use strict";

class Register extends Component {
  constructor(form, onRegister, literals, defaultLanguage, onLanguageChange) {
    super(form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.__feedback__ = new Feedback(this.getChild(".register__error"));
    this.__feedback__.visible = false;

    this.language = defaultLanguage;
    this.onRegister = onRegister;
  }

  set onRegister(callback) {
    this.container.addEventListener("submit", event => {
      event.preventDefault();

      const name = this.name.value;
      const surname = this.surname.value;
      const email = this.email.value;
      const password = this.password.value;

      callback(name, surname, email, password);
    });
  }

  set language(language) {
    const literals = this.__literals__[language];

    this.getChild(".register__title").innerText = literals.title;
    this.container.name.placeholder = literals.name;
    this.container.surname.placeholder = literals.surname;
    this.container.email.placeholder = literals.email;
    this.container.password.placeholder = literals.password;

    this.getChild(".register__button").innerText = literals.title;

    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }

  set error(error) {
    this.__feedback__.message = error;
    this.__feedback__.visible = true;
  }
}

// /**
//  * Register form.
//  *
//  * @param {*} form
//  * @param {Funcion} onRegister The callback invoked on register.
//  * @param {*} literals
//  * @param {*} defaultLanguage
//  * @param {*} onLanguageChange The callback invoked on language change.
//  */
// function Register(
//   form,
//   onRegister,
//   literals,
//   defaultLanguage,
//   onLanguageChange
// ) {
//   Component.call(this, form);

//   this.__literals__ = literals;
//   this.__onLanguageChange__ = onLanguageChange;

//   this.__feedback__ = new Feedback( this.getChild(".register__error"));
//   this.__feedback__.visible = false;

//   this.language = defaultLanguage;
//   this.onRegister = onRegister;
// }

// Register.prototype = Object.create(Component.prototype);
// Register.prototype.constructor = Register;

// Object.defineProperty(Register.prototype, "onRegister", {
//   set: function(callback) {
//     this.container.addEventListener("submit", function(event) {
//       event.preventDefault();

//       var name = this.name.value;
//       var surname = this.surname.value;
//       var email = this.email.value;
//       var password = this.password.value;

//       callback(name, surname, email, password);
//     });
//   }
// });

// Object.defineProperty(Register.prototype, "language", {
//   set: function(language) {
//     var literals = this.__literals__[language];

//     this.getChild(".register__title").innerText = literals.title;
//     this.container.name.placeholder = literals.name;
//     this.container.surname.placeholder = literals.surname;
//     this.container.email.placeholder = literals.email;
//     this.container.password.placeholder = literals.password;

//     this.getChild(".register__button").innerText = literals.title;

//     if (this.__onLanguageChange__) this.__onLanguageChange__(language);
//   }
// });

// Object.defineProperty(Register.prototype, "error", {
//   set: function(error) {
//     this.__feedback__.message = error;
//     this.__feedback__.visible = true;
//   }
// });
