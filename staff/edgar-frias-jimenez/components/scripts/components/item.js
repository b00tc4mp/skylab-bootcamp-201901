'use strict';

class Item extends Component {
  constructor(container) {
    super(container);
  }

  set item(item) {
    this.container.innerHTML = '';

    const section = document.createElement('section');
    section.setAttribute('data-id', item.id);

    const title = document.createElement('h1');
    title.innerText = item.title;
    section.appendChild(title);

    const img = document.createElement('img');
    img.src = item.image;
    img.style.width = '500px';
    section.appendChild(img);

    const price = document.createElement('span');
    price.innerText = item.price;
    section.appendChild(price);

    const link = document.createElement('a');
    link.innerText = item.link;
    section.appendChild(link);

    const description = document.createElement('p');
    description.innerText = item.description;
    section.appendChild(description);

    this.container.appendChild(section);
  }
}
