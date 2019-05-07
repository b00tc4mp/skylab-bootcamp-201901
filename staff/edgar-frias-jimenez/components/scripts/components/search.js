'use strict';

class Search extends Component {
    constructor(container, onSearch) {
        super(container);
        this.onSearch = onSearch;
    }

    set onSearch(callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault();

            const detail = document.getElementsByClassName('item-section')[0];
            detail.children[0].innerHTML = '';

            const query = this.query.value;

            callback(query);
        });
    }
}
