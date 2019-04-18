'use strict';

class DuckDetail extends Component {

  constructor (form, onBack, onBuy, literals, defaultLanguage) {
    super(form);

    this.__literals__ = literals;
    this.__backLink__ = this.getChild(".duck-detail__back");
    this.__buyLink__ = this.getChild(".duck-detail__buy");
    this.language = defaultLanguage;
    this.onBack = onBack;
    this.onBuy = onBuy;
  }

  showDuck (duck, done) {
    logic.retrieveDuckDetail(duck.id, duckDetail => {
      this.getChild(".duck-detail__title").innerText = duckDetail.title;
      this.getChild(".duck-detail__image").src = duckDetail.imageUrl;
      this.getChild(".duck-detail__price").innerText = duckDetail.price;
      this.getChild(".duck-detail__description").innerText = duckDetail.description;
      done();
    });
  }

  set onBack(callback) {
    this.__backLink__.addEventListener("click", function(event) {
      event.preventDefault();
      callback();      
    });
  }
  
  set onBuy(callback) {
    this.__buyLink__.addEventListener("click", function(event) {
      event.preventDefault();
      callback();
    });
  }

  set language(language) {
    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }

}