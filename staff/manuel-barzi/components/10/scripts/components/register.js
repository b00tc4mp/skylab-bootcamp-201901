'use strict'

/**
 * Rgister
 */
class Register extends Component {
    constructor(form, onRegister, literals, defaultLanguage, onLanguageChange) {
        super(form)

        this.__literals__ = literals
        this.__onLanguageChange__ = onLanguageChange

        this.language = defaultLanguage

        this.onRegister = onRegister
    }

    set onRegister(callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault()

            const name = this.name.value
            const surname = this.surname.value
            const email = this.email.value
            const password = this.password.value

            callback(name, surname, email, password)
        })
    }

    set language(language) {
        const literals = this.__literals__[language]

        this.container.children[0].innerText = literals.title
        this.container.name.placeholder = literals.name
        this.container.surname.placeholder = literals.surname
        this.container.email.placeholder = literals.email
        this.container.password.placeholder = literals.password

        this.container.children[2].innerText = literals.title

        if (this.__onLanguageChange__) this.__onLanguageChange__(language)
    }
}