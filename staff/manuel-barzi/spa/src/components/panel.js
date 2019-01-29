'use strict'

class Panel {
    constructor($element) {
        this.$element = $element
    }

    hide() {
        this.$element.hide()
    }

    show() {
        this.$element.show()
    }
}