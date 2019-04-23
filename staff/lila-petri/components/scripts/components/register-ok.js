'use strict';
class RegisterOk extends Component{
    constructor(section, onNavigateToLogin) {
        super(section);

        const link = this.container.children[0];

        link.addEventListener('click', function (event) {
            event.preventDefault();

            onNavigateToLogin();
        });
    }
}