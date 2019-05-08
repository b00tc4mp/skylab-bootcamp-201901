'use strict';

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
    constructor(form, onLogin, literals, defaultLanguage, onLanguageChange) {
        super(form);
        this.__literals__ = literals;
        this.__onLanguageChange__ = onLanguageChange;

        const feedback = new Feedback(this.container.children[4]);
        feedback.visible = false;
        this.__feedback__ = feedback;

        this.language = defaultLanguage;

        this.onLogin = onLogin;
    }

    set onLogin(callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = this.email.value;
            const password = this.password.value;

            callback(email, password);
        });
    }

    set language(language) {
        const literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;

        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;

        this.container.children[3].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }

    set error(error) {
        this.__feedback__.message = error;
        this.__feedback__.visible = true;
    }
}
