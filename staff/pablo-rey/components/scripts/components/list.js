'use strict';

function List (container, itemComponentConstructor) {
  Component.call(this, container);
  this.__items__ = null;
  this.__itemComponentConstructor__ = itemComponentConstructor;
  this.refresh();
}

List.prototype = Object.create(Component.prototype);
List.prototype.constructor = List;

List.prototype.refresh = function () {
  if (!this.__items__ || this.__items__.length === 0) {
    this.container.innerHTML = "<p>No items to list</p>";
    return ;
  }
  this.container.innerHTML = "";
  var self = this;
  this.__items__.forEach(function (item) {
    new self.__itemComponentConstructor__(self.container, item);
  });
}

Object.defineProperty(List.prototype, "items", {
  set: function(items) {
    this.__items__ = items;
    this.refresh();
  }
});
