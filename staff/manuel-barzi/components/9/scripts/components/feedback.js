'use strict';

function Feedback(container) {
    Component.call(this, container);
}

Feedback.prototype = Object.create(Component.prototype);
Feedback.prototype.constructor = Feedback;

Object.defineProperty(Feedback.prototype, 'message', {
    set: function(message) {
        this.container.innerText = message;
    }
});