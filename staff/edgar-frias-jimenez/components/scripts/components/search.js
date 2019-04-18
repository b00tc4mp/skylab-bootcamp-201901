'use strict';

function Search(container, onSearch) {
    Component.call(this, container);

    this.onSearch = onSearch;
}

Search.prototype = Object.create(Component.prototype);
Search.prototype.constructor = Search;

Object.defineProperty(Search.prototype, 'onSearch', {
    set: function(callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault();

            var query = this.query.value;

            callback(query);
        });
    }
});
