'use strict';

class Home extends Component {
    constructor(container, onNavigateToLogin, onSearch, onDetail) {
        super(container);

        this.onNavigateToLogin = onNavigateToLogin;

        const form = this.container.children[2];
        new Search(form, onSearch);

        const ul = this.container.children[3];
        const results = new Results(ul, onDetail);
        this.__results__ = results;
        this.__results__.visible = false

        const section = this.container.children[4];
        const detail = new Detail(section);
        this.__detail__ = detail;
        this.__detail__.visible = false

        const feedback = new Feedback(this.container.children[5]);
        feedback.visible = false;
        this.__feedback__ = feedback;

    }

    set onNavigateToLogin(callback) {
        this.container.children[1].addEventListener('click', function (event) {
            event.preventDefault();
            callback();
        });
    }

    set results(results) {
        this.__results__.items = results
        this.__results__.visible = true
        this.__detail__.visible = false
    }

    set detail(detail) {
        this.__detail__.item = detail
        this.__results__.visible = false
        this.__detail__.visible = true
    }

    set name(name) {
        const h1 = this.container.children[0]
        h1.innerText = 'Hello, ' + name + '!'
    }

    set error(error) {
        this.__feedback__.message = error;
        this.__feedback__.visible = true;
    }    

}