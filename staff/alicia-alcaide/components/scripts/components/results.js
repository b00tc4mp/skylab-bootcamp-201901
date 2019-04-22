'use strict';

class Results extends Component {

    constructor(ul, onDetail) {
        super(ul);
        this.__onDetail__ = onDetail;
    }

    set items(items) {
        this.container.innerHTML = '';

        items.forEach( item => { // id, title, image, price
            const li = document.createElement('li');
            const h3 = document.createElement('h3');
            h3.innerText = item.title;

            li.appendChild(h3);

            const img = document.createElement('img');
            img.src = item.image;
            li.appendChild(img);

            img.addEventListener('click', () => {
                this.__onDetail__(item.id);

            });

            const span = document.createElement('span');
            span.innerText = item.price;
            li.appendChild(span);

            this.container.appendChild(li);
        });
    }

}

