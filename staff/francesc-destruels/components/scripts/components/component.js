'use strict'

class Component {
    constructor(container){
        this.container = container
    }

    set visible(visible) {
        this.container.style.display = visible ? 'block' : 'none'
    }
}
