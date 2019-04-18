'use strict'

class Detail extends Component {
        constructor (container) {
        super(container)
    }
    set item (item) {
        let children = this.container.children
        
        let h2 = children[0]
        h2.innerText = item.title
    
        let img = children[1]
        img.src = item.image
    
        let p = children[2]
        p.innerText = item.description
    
        let span = children[3]
        span.innerText = item.price
    }
}