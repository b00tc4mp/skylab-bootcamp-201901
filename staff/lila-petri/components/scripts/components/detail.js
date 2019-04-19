"use strict";

class Detail extends Component {
  constructor(section) {
    super(section);
  }
  set items(items) {
    while (this.container.firstElementChild)
    this.container.removeChild(this.container.firstElementChild);
    const h3 = document.createElement("h3");
    h3.innerText = items.title;
    this.container.appendChild(h3);

    const img = document.createElement("img");
    img.src = items.image;
    img.style.width = "200px";
    this.container.appendChild(img);

    const p = document.createElement("p");
    p.innerText = items.price;
    this.container.appendChild(p);

    const span = document.createElement("span");
    span.innerText = items.description;
    p.style.width="200px"
    this.container.appendChild(span);
    this.visible = true;
  }
}
