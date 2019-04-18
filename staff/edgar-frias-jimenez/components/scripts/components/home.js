'use strict';

function Home(container, onSearch, itemClick) {
    Component.call(this, container);

    var form = this.container.children[1];
    new Search(form, onSearch);

    var ul = this.container.children[2];
    var results = new Results(ul, itemClick);
    // this.__item__.visible = false;
    this.__results__ = results;
    this.__results__.visible = false;

    var itemSection = this.container.children[3];
    var item = new Item(itemSection);
    this.__item__ = item;
    this.__item__.visible = false;
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, 'results', {
    set: function(results) {
        this.__results__.visible = false;
        this.__results__.items = results;
        this.__results__.visible = true;
    }
});

Object.defineProperty(Home.prototype, 'item', {
    set: function(item) {
        this.__results__.visible = false;
        this.__item__.item = item;
        this.__item__.visible = true;
    }
});

Object.defineProperty(Home.prototype, 'name', {
    set: function (name) {
        var h1 = this.container.children[0];

        h1.innerText = 'Hello, ' + name + '!';
    }
});
