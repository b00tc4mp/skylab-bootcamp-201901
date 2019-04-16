'use strict';

function LogOut(element, liter onLogOut) {
    Component.call(this, element);    
    element.addEventListener('click', function (event) {
      onLogOut();
  });
}

LogOut.prototype = Object.create(Component.prototype);
LogOut.prototype.constructor = LogOut;

Object.defineProperty(LogOut.prototype, 'message', {
    set: function(message) {
        this.element.innerText = message;
    }
});