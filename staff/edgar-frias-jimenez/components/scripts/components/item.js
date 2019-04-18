'use strict';

function Item(container) {
  Component.call(this, container);
}

Item.prototype = Object.create(Component.prototype);
Item.prototype.constructor = Item;

Object.defineProperty(Item.prototype, 'item', { // title, image, price, link, description, id
  set: function(item) {
    item.forEach(function(property) {
      var section = document.createElement('section');
      section.setAttribute('data-id', property.id);

      var title = document.createElement('h1');
      title.innerText = property.title;
      section.appendChild(title);

      var img = document.createElement('img');
      img.src = property.image;
      img.style.width = '500px';
      section.appendChild(img);

      var price = document.createElement('span');
      price.innerText = property.price;
      section.appendChild(price);

      var link = document.createElement('a');
      link.innerText = property.link;
      section.appendChild(link);

      var description = document.createElement('p');
      description.innerText = property.description;
      section.appendChild(description);

      this.container.appendChild(section);
    }.bind(this));
  }
});