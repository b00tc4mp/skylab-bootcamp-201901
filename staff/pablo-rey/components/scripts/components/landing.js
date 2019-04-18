"use strict";
class Landing extends Component {
  constructor({
    container,
    literals,
    onNavigateToRegister,
    onNavigateToLogin,
  }) {
    super(container);
    this.__literals__ = literals;

    this.getChild(".landing__register").addEventListener("click", event => {
      event.preventDefault();
      onNavigateToRegister();
    });

    this.getChild(".landing__login").addEventListener("click", function(event) {
      event.preventDefault();
      onNavigateToLogin();
    });
  }

  set language(language) {
    const literals = this.__literals__[language];
    this.getChild(".landing__register").innerText = literals.register;
    this.getChild(".landing__middleText").innerText = literals.or;
    this.getChild(".landing__login").innerText = literals.login;
  }
}
