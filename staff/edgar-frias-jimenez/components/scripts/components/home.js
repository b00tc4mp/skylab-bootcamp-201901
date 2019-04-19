'use strict';

class Home extends Component {
    constructor(container, onSearch, itemClick) {
        super(container);

        const form = this.container.children[1];
        new Search(form, onSearch);

        const ul = this.container.children[2];
        const results = new Results(ul, itemClick);
        this.__results__ = results;
        this.__results__.visible = false;

        const itemSection = this.container.children[3];
        const item = new Item(itemSection);
        this.__item__ = item;
        this.__item__.visible = false;
    }

    set results(results) {
        this.__results__.visible = false;
        this.__results__.items = results;
        this.__results__.visible = true;
    }

    set item(item) {
        this.__results__.visible = false;
        this.__item__.item = item;
        this.__item__.visible = true;
    }

    set name(name) {
        const h1 = this.container.children[0];
        h1.innerText = 'Hello, ' + name + '!';
    }
}
