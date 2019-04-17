'use strict';

function CardDuck (parent, duck) {
  this.__parent__ = parent
  this.__duck__ = duck;
  var container = document.createElement("div");
  container.style.width ="25%";
  container.style.height = "300px"
  Component.call(this, container);
  this.__parent__.insertAdjacentElement('beforeend', this.container);
  this.refresh();
}

CardDuck.prototype = Object.create(Component.prototype);
CardDuck.prototype.constructor = CardDuck;

CardDuck.prototype.refresh = function () {
  if (!this.__duck__) {
    this.container.innerHTML = "<p>No duck</p>";
    return ;  
  }
  this.container.innerHTML = '<img style="width:100px; height:100px;" src="' + this.__duck__.imageUrl + '">' + "<p>" + this.__duck__.title + "</p>";
}

Object.defineProperty(CardDuck.prototype, "duck", {
  set: function(duck) {
    this.__duck__ = duck;
  }
});


