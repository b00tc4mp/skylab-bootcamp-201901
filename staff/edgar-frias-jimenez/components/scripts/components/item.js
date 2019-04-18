'use strict';

function Item(container) {
  Component.call(this, container);
}

Item.prototype = Object.create(Component.prototype);
Item.prototype.constructor = Item;

Object.defineProperty(Item.prototype, 'item', { // title, image, price, link, description, id
  set: function(item) {
    this.container.innerHTML = '';

    var section = document.createElement('section');
    section.setAttribute('data-id', item.id);

    var title = document.createElement('h1');
    title.innerText = item.title;
    section.appendChild(title);

    var img = document.createElement('img');
    img.src = item.image;
    img.style.width = '500px';
    section.appendChild(img);

    var price = document.createElement('span');
    price.innerText = item.price;
    section.appendChild(price);

    var link = document.createElement('a');
    link.innerText = item.link;
    section.appendChild(link);

    var description = document.createElement('p');
    description.innerText = item.description;
    section.appendChild(description);

    this.container.appendChild(section);
  }
});