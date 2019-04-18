"use strict";

class RegisterOk extends Component {
  constructor({ container, onNavigateToLogin }) {
    super(container);
    const link = this.container.children[0];

    link.addEventListener("click", event => {
      event.preventDefault();
      onNavigateToLogin();
    });
  }
}
