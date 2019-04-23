"use strict";

class Detail extends Component {
  constructor(section) {
    super(section);
  }
  set items(items) {
    const h2 = this.container.children[0];
    h2.innerText = items.title;

    const img = this.container.children[1];
    img.src = items.image;

    const span = this.container.children[2];
    span.innerText = items.price;

    const p = this.container.children[3];
    p.innerText = items.description;
  }
}
