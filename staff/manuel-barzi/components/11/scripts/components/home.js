'use strict'

class Home extends Component {
    constructor(container, onSearch, onDetail, onLogout) {
        super(container)

        const form = this.container.querySelector('form')
        new Search(form, onSearch)

        const ul = this.container.querySelector('ul')
        const results = new Results(ul, onDetail)
        this.__results__ = results
        this.__results__.visible = false

        const section = this.container.querySelector('section')
        const detail = new Detail(section)
        this.__detail__ = detail
        this.__detail__.visible = false

        const button = this.container.querySelector('button')
        button.onclick = onLogout
    }

    set results(results) {
        this.__detail__.visible = false
        this.__results__.items = results
        this.__results__.visible = true
    }

    set detail(detail) {
        this.__results__.visible = false
        this.__detail__.item = detail
        this.__detail__.visible = true
    }

    set name(name) {
        const h1 = this.container.children[0]

        h1.innerText = 'Hello, ' + name + '!'
    }
}