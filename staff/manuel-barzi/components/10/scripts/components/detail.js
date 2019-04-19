'use strict'

class Detail extends Component {
    constructor(section) {
        super(section)
    }

    set item(item) {
        const h2 = this.container.children[0]
        h2.innerText = item.title

        const img = this.container.children[1]
        img.src = item.image

        const span = this.container.children[2]
        span.innerText = item.price

        const p = this.container.children[3]
        p.innerText = item.description
    }
}