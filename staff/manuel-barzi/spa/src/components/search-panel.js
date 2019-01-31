'use strict'

class SearchPanel extends Panel {
    constructor() {
        super($(`<section class="search">
    <form>
        <input type="text" placeholder="..." name ="query">
        <button type="submit">Search</button>
    </form>
</section>`))

        const $container = this.$element

        const $form = $container.find('form')
        this.__$form__ = $form

        const $queryInput = $form.find('input')
        this.__$queryInput__ = $queryInput

        const errorPanel = new ErrorPanel
        errorPanel.hide()
        $container.append(errorPanel.$element)
        this.__errorPanel__ = errorPanel
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {

            event.preventDefault()

            const query = this.__$queryInput__.val()

            callback(query)
        })
    }

    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }

    clear() {
        this.__$queryInput__.val('')
        this.clearError()
    }

    clearError() {
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
    }
}