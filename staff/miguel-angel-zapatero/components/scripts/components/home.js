'use strict'

class Home extends Component {
    constructor (container, onSearch, onDetail, onLogout) {
        super(container)

        const form = this.container.children[1]
        new Search(form, onSearch)

        const ul = this.container.children[2]
        const results = new Results(ul, onDetail)
        this.__results__ = results

        const section = this.container.children[3]
        const detail = new Detail(section)
        this.__detail__ = detail

        this.__detail__.visible = false

        const links = this.container.children[4]
        links.addEventListener('click', event => {
            event.preventDefault()

            onLogout()
        })
    }
    set results (results) {
        this.__detail__.visible = false
        this.__results__.items = results
        this.__results__.visible = true
    }
    set detail (detail) {
        this.__results__.visible = false
        this.__detail__.item = detail
        this.__detail__.visible = true
    }

    set name (name) {
        const h1 = this.container.children[0]

        h1.innerText = `Hello, ${name}!`
    }
}