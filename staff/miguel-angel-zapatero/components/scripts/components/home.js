'use strict';

function Home(container, onSearch, onDetail, onLogout) {
    Component.call(this, container);

    var form = this.container.children[1];
    // new Search(form, onSearch);
    new Search(form, onSearch);

    var ul = this.container.children[2];
    var results = new Results(ul, onDetail);
    this.__results__ = results;

    var section = this.container.children[3];
    var detail = new Detail(section);
    this.__detail__ = detail;

    this.__detail__.visible = false;

    var links = this.container.children[4];
    links.addEventListener('click', function(event) {
        event.preventDefault();

        onLogout();
    });
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, 'results', {
    set: function(results) {
        this.__detail__.visible = false;
        this.__results__.items = results;
        this.__results__.visible = true;
    }
})

Object.defineProperty(Home.prototype, 'detail', {
    set: function(detail) {
        this.__results__.visible = false;
        this.__detail__.item = detail;
        this.__detail__.visible = true;
    }
})