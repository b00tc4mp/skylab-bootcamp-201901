'use strict'

/**
 * Login form.
 * 
 * @param {*} form 
 * @param {Function} onLogin The callback invoked on login.
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {Function} onLanguageChange The callback invoked on language change.
 */
class Login extends Component {
    constructor (form, onLogin, literals, defaultLanguage, onLanguageChange) {
        super(form)

        this.__literals__ = literals
        this.__onLanguageChange__ = onLanguageChange

        let feedback = new Feedback(this.container.children[3])
        feedback.visible = false
        this.__feedback__ = feedback

        this.language = defaultLanguage

        this.onLogin = onLogin
    }
    set onLogin (callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault()
    
            let email = this.email.value;
            let password = this.password.value
    
            callback(email, password)
        })
    }
    set language (language) {
        let literals = this.__literals__[language]
    
        this.container.children[0].innerText = literals.title
    
        this.container.email.placeholder = literals.email
        this.container.password.placeholder = literals.password
    
        this.container.children[2].innerText = literals.title
    
        if (this.__onLanguageChange__) this.__onLanguageChange__()
    }
    set error (error) {
        this.__feedback__.message = error
        this.__feedback__.visible = true
    }
}