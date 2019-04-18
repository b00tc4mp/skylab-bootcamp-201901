'use strict'

class Home extends Component {
    constructor (container, onSearch, onDetail, onLogout) {
        super(container)

        let form = this.container.children[1]
        new Search(form, onSearch)

        let ul = this.container.children[2]
        let results = new Results(ul, onDetail)
        this.__results__ = results

        let section = this.container.children[3]
        let detail = new Detail(section)
        this.__detail__ = detail

        this.__detail__.visible = false

        let links = this.container.children[4]
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
}