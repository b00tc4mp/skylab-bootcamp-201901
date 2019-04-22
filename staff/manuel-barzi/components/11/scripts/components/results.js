'use strict'

class Results extends Component {
    constructor(ul, onItem) {
        super(ul)

        this.__onItem__ = onItem
    }

    set items(items) {
        this.container.innerHTML = ''

        items.forEach(item => { // id, title, image, price
            var li = document.createElement('li')
            // li.setAttribute('data-id', item.id)

            var h3 = document.createElement('h3')
            h3.innerText = item.title
            li.appendChild(h3)

            var img = document.createElement('img')
            img.src = item.image
            li.appendChild(img)

            var span = document.createElement('span')
            span.innerText = item.price
            li.appendChild(span)

            this.container.appendChild(li)

            li.addEventListener('click', () => {
                this.__onItem__(item.id)
            })
        })
    }
}