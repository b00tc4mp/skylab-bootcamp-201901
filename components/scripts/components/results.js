'use strict'

class Results extends Component {
    constructor(ul, onDetail){
        super(ul)

        this.onDetail = onDetail
    }

    set items(items){
        this.container.innerHTML = '';
        items.forEach(item => {

            var li = document.createElement('li')

            var h2 = document.createElement('h2')
            h2.innerText = item.title
            li.appendChild(h2)

            var img = document.createElement('img')
            img.src = item.image
            li.appendChild(img)

            var span = document.createElement('span');
            span.innerText = item.price;
            li.appendChild(span)

            this.container.appendChild(li)         
            
            li.addEventListener('click', () => {
                this.onDetail(item.id)
            })
        })
    }
}
