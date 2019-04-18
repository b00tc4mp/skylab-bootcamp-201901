"use strict";

class RegisterOk extends Component {
  constructor(section, onNavigateToLogin) {
    super(section);
    const link = this.container.children[0];

    link.addEventListener("click", event => {
      event.preventDefault();
      onNavigateToLogin();
    });
  }
}

// function RegisterOk(section, onNavigateToLogin) {
//     Component.call(this, section);

//     var link = this.container.children[0];

//     link.addEventListener('click', function(event) {
//         event.preventDefault();

//         onNavigateToLogin();
//     });
// }

// RegisterOk.prototype = Object.create(Component.prototype);
// RegisterOk.prototype.constructor = RegisterOk;
