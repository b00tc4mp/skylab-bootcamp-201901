'use stric'

class RegisterOk extends Component {
    constructor(section, onNavigateToLogin) {
        super(section)
        const link = this.container.children[0]

        link.addEventListener('click', event => {
            event.preventDefault()

            onNavigateToLogin()
        })
    }
}
