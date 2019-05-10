"use strict";

class Register extends Component {
  constructor({
    container,
    onRegister,
    literals,
    defaultLanguage,
    onLanguageChange,
  }) {
    super(container);

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

      const name = this.container.name.value;
      const surname = this.container.surname.value;
      const email = this.container.email.value;
      const password = this.container.password.value;

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
