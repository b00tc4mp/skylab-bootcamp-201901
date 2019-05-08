'use strict'

class Register extends Component {
    constructor(form, onSignUp, literals, defaultLanguage, onLanguageChange) {
        super(form)

        this.__literals__ = literals
        this.__onLanguageChange__ = onLanguageChange

        const feedback = new Feedback(this.container.children[3])
        feedback.visible = false

        this.__feedback__ = feedback

        this.language = defaultLanguage

        this.onSignUp = onSignUp
    }

    set onSignUp(callback) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault()

            var name = this.name.value
            var surname = this.surname.value
            var email = this.email.value
            var password = this.password.value
            var confirmPassword = this.confirmpassword.value

            callback(name, surname, email, password, confirmPassword)
        })
    }

    set language(language) {
        const literals = this.__literals__[language]

        this.container.children[0].innerText = literals.title
        this.container.name.placeholder = literals.name
        this.container.surname.placeholder = literals.surname
        this.container.email.placeholder = literals.email
        this.container.password.placeholder = literals.password
        this.container.confirmpassword.placeholder = literals.confirmpassword

        this.container.children[2].innerText = literals.title

        if (this.__onLanguageChange__) this.__onLanguageChange__(language)
    }

    set error(error) {
        this.__feedback__.message = error
        this.__feedback__.visible = true
    }
}
