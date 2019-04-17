'use strict';

function LogOut(element, literals, onLogOut) {
    Component.call(this, element);    
    this.__literals__ = literals;
    element.addEventListener('click', function (event) {
      onLogOut();
  });
}

LogOut.prototype = Object.create(Component.prototype);
LogOut.prototype.constructor = LogOut;

Object.defineProperty(LogOut.prototype, 'message', {
    set: function(message) {
        this.container.innerText = message;
    }
});

Object.defineProperty(LogOut.prototype, 'language', {
    set: function (language) {
        this.container.innerText = this.__literals__[language].logout;
    }
});
