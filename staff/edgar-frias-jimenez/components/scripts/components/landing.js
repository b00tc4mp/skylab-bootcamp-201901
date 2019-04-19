'use strict';

class Landing extends Component {
    constructor(section, literals, onNavigateToRegister, onNavigateToLogin) {
        super(section, literals, onNavigateToRegister, onNavigateToLogin);

        this.__literals__ = literals;

        const links = this.container.children;

        links[0].addEventListener('click', event => {
            event.preventDefault();

            onNavigateToRegister();
        });

        links[2].addEventListener('click', event => {
            event.preventDefault();

            onNavigateToLogin();
        });
    }

    set language(language) {
        const literals = this.__literals__[language];

        const children = this.container.children;
        children[0].innerText = literals.register;
        children[1].innerText = literals.or;
        children[2].innerText = literals.login;
    }
}
