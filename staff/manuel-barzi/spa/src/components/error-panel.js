'use strict'

class ErrorPanel extends Panel {
    constructor() {
        super($('<section class="error"></section>'))
    }

    set message(message) {
        this.$element.text(message)
    }
}