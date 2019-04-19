'use strict';

class Results extends Component {
  constructor(container, itemClick) {
    super(container);
    this.__itemClick__ = itemClick;
  }

  set items(items) {
    this.container.innerHTML = '';

    items.forEach(item => { // id, title, image, price
      var li = document.createElement('li');

      var h3 = document.createElement('h3');
      h3.innerText = item.title;
      li.appendChild(h3);

      var img = document.createElement('img');
      img.src = item.image;
      img.style.width = '200px';
      li.appendChild(img);

      var span = document.createElement('span');
      span.innerText = item.price;
      li.appendChild(span);

      this.container.appendChild(li);

      li.addEventListener('click', () => {
        this.__itemClick__(item.id);
      });
    });
  }
}
