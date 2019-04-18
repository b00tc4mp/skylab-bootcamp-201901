'use strict';

/**
 * 
 * @param {HTMLElement} select 
 * @param {Function} callback 
 */
function LanguageSelector(select, callback) {
    this.__select__ = select;

    this.onChange = callback;
}

Object.defineProperty(LanguageSelector.prototype, 'onChange', {
    set: function (callback) {
        this.__select__.addEventListener('change', function (event) {
            callback(event.target.value);
        });
    }
});