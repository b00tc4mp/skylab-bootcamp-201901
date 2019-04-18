"use strict";

class SearchForm extends Component {
  constructor({ container, onSearch, literals, defaultLanguage }) {
    super(container);

    this.__literals__ = literals;
    this.language = defaultLanguage;
    this.onSearch = onSearch;
  }

  set onSearch(callback) {
    this.container.addEventListener("submit", event => {
      event.preventDefault();
      callback(this.container.elements.searchText.value);
    });
  }

  set language(language) {
    const literals = this.__literals__[language];
    this.getChild(".home__search-button").innerText = literals.buttonText;
    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }
}
