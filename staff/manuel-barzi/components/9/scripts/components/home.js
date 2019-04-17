'use strict';

function Home(container, onSearch) {
    Component.call(this, container);

    var form = this.container.children[1];
    new Search(form, onSearch);

    var ul = this.container.children[2];
    var results = new Results(ul);
    this.__results__ = results;
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, 'results', {
    set: function(results) {
        this.__results__.items = results;
    }
})