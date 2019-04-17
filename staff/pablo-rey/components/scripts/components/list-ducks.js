'use strict';

function ListDucks (container) {
  Component.call(this, container);
  this.__ducks__ = null;
  this.refresh();
}

ListDucks.prototype = Object.create(Component.prototype);
ListDucks.prototype.constructor = ListDucks;

ListDucks.prototype.refresh = function () {
  if (!this.__ducks__ || this.__ducks__.length === 0) {
    this.container.innerHTML = "<p>No ducks to list</p>";
    return ;
  }
  // TODO: 
}

Object.defineProperty(ListDucks.prototype, "ducks", {
  set: function(ducks) {
    this.__ducks__ = ducks;
    this.container.innerHTML = "";
    for (var ii = 0, ll = ducks.length; ii < ll; ii++) {
      new CardDuck(this.container, ducks[ii]);      
    }
    this.refresh();
  }
});
