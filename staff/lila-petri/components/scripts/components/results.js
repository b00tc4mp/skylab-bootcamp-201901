"use strict";

class Results extends Component{
  constructor(ul, onDetail) {
    super(ul);
    this.onDetail = onDetail;
  }
  set items(items) {

    this.container.innerHTML = "";

    items.forEach(item => {
      // id, title, image, price
      const li = document.createElement("li");
      li.setAttribute("data-id", item.id);
      li.setAttribute('class', 'ducks__item');

      li.addEventListener("click", () => this.onDetail(item.id));

      const img = document.createElement("img");
      img.src = item.image;
      img.style.width = "200px";
      li.appendChild(img);

      const div= document.createElement("div")
      div.setAttribute('class', 'ducks__item-detail');

      const h3 = document.createElement("h3");
      h3.innerText = item.title;
      div.appendChild(h3)
     

      const span = document.createElement("span");
      span.innerText = item.price;
    
      div.appendChild(span)
      li.appendChild(div)


      this.container.appendChild(li);
    });
  }
}

