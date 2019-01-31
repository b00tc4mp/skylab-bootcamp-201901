'use strict'

class ResultsPanel extends Panel {
    constructor() {
        super($(`<section class="results">
            <ul></ul>
        </section>`))

        const $resultList = this.$element.find('ul')
        this.__$resultList__ = $resultList
    }

    set results(results) {
        this.__$resultList__.html('')

        results.forEach(result => {
            const $item = $(`<li class="results__item" data-id=${result.id}>${result.text} <img src="${result.image}" width="100px"></li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelectedCallback__(id)                
            })

            this.__$resultList__.append($item)
        })
    }

    clear() {
        this.__$resultList__.html('')
    }

    set onItemSelected(callback) {
        this.__onItemSelectedCallback__ = callback
    }
}