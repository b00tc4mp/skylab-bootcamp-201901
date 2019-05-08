"use strict";

class LogOut extends Component {
  constructor( { element, literals, initialLanguage, onLogOut } ) {
    super(element);
    this.__literals__ = literals;
    this.language = initialLanguage;
    element.addEventListener("click", () => onLogOut());
  }

  set message(message) {
    this.container.innerText = message;
  }
  set language(language) {
    this.container.innerText = this.__literals__[language].logout;
  }
}
