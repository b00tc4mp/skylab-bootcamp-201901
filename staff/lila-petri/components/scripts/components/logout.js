'use strict';
class LoginOut extends Component{
    constructor(main, onLogout) {
        super(main);

        this.onLogout = onLogout;
        
    }
    set onLogout (callback) {
        
        this.container.addEventListener('click', ()=> {
        callback();
        });
    }
}


