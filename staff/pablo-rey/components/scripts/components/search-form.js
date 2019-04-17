'use strict';

/**
 * 
 * @param {*} form 
 * @param {*} onSearch 
 * @param {*} literals 
 * @param {*} defaultLanguage 
 */
function SearchForm(form, onSearch, literals, defaultLanguage) {
  Component.call(this, form);

  this.__literals__ = literals;
  this.language = defaultLanguage;
  this.onSearch = onSearch;
}

SearchForm.prototype = Object.create(Component.prototype);
SearchForm.prototype.constructor = SearchForm;

Object.defineProperty(SearchForm.prototype, "onSearch", {
  set: function(callback) {
    this.container.addEventListener("submit", function(event) {
      event.preventDefault();

      callback(this[0].value);
    });
  }
});

Object.defineProperty(SearchForm.prototype, "language", {
  set: function(language) {
    var literals = this.__literals__[language];

    this.getChild('.home__search-button').innerText = literals.buttonText;

    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }
});
