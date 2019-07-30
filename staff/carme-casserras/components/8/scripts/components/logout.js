'user strict'

function LogOut(container, onLogOut) {
  Component.call(this, container);

  this.onLogOut = onLogOut;
}

LogOut.prototype = Object.create(Component.prototype);
LogOut.prototype.constructor = LogOut;

Object.defineProperty(LogOut.prototype, 'onLogOut', {
  set: function (callback) {
    this.container.children[1].addEventListener('click', function () {

      callback();
    });
  }
});