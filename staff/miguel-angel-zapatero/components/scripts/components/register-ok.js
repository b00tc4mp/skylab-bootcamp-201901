'use strict'

class RegisterOk extends Component {
    constructor (section, onNavigateToLogin) {
        super(section);

        let link = this.container.children[0];

        link.addEventListener('click', event => {
            event.preventDefault()

            onNavigateToLogin()
        })
    }
}