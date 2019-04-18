"use strict";

class Feedback extends Component {
  constructor (container) {
    super(container);
  }

  set message (message) { this.container.innerText = message; }
}

// function Feedback(container) {
//   Component.call(this, container);
// }

// Feedback.prototype = Object.create(Component.prototype);
// Feedback.prototype.constructor = Feedback;

// Object.defineProperty(Feedback.prototype, "message", {
//   set: function(message) {
//     this.container.innerText = message;
//   }
// });
