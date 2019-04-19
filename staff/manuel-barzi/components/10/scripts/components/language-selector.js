'use strict'

class LanguageSelector extends Component {
    constructor(select, callback) {
        super(select)

        this.onChange = callback
    }

    set onChange(callback) {
        this.container.addEventListener('change', event => {
            callback(event.target.value)
        })
    }
}