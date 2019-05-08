'use strict'

class Detail extends Component {
    constructor(container){
        super(container)
    }

    set items(items){
        var h2 = this.container.children[0];
        h2.innerText = items.title;

        var img = this.container.children[1];
        img.src = items.image;

        var span = this.container.children[2];
        span.innerText = items.price;

        var p = this.container.children[3];
        p.innerText = items.description;
    }
}