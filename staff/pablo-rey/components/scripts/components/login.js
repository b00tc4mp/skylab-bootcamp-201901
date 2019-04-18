"use strict";
class Login extends Component {
  constructor({
    container,
    onLogin,
    literals,
    defaultLanguage,
    onLanguageChange,
  }) {
    super(container);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.__feedback__ = new Feedback(this.getChild(".login__error"));
    this.__feedback__.visible = false;

    this.language = defaultLanguage;
    this.onLogin = onLogin;
  }

  set onLogin(callback) {
    this.container.addEventListener("submit", event => {
      event.preventDefault();

      const email = this.container.email.value;
      const password = this.container.password.value;

      callback(email, password);
    });
  }

  set language(language) {
    const literals = this.__literals__[language];

    this.getChild(".login__title").innerText = literals.title;

    this.container.elements.email.placeholder = literals.email;
    this.container.elements.password.placeholder = literals.password;

    this.getChild(".login__button").innerText = literals.title;

    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }

  set error(error) {
    this.__feedback__.message = error;
    this.__feedback__.visible = true;
  }
}
