'use strict';

/**
 * 
 * @param {HTMLElement} select 
 * @param {Function} callback 
 */
class LanguageSelector extends Component {
    constructor(select, callback) {
        super(select);
        this.onChange = callback;
    }
    set onChange(callback) {
        this.container.addEventListener('change', function (event) {
            callback(event.target.value);
        });
    }
}
