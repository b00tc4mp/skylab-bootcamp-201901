'use strict'

class Landing extends Component {
    constructor(section, literals, onNavigateToRegister, onNavigateToLogin) {
        super(section)

        this.__literals__ = literals

        const links = this.container.children

        links[0].addEventListener('click', event => {
            event.preventDefault()

            onNavigateToRegister()
        })

        links[2].addEventListener('click', event => {
            event.preventDefault()

            onNavigateToLogin()
        })
    }

    set language(language) {
        var literals = this.__literals__[language]

        var children = this.container.children
        children[0].innerText = literals.register
        children[1].innerText = literals.or
        children[2].innerText = literals.login
    }
}
