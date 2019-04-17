'use strict';

function DuckDetail(form, onBack, onBuy, literals, defaultLanguage) {
  Component.call(this, form);

  this.__literals__ = literals;
  this.__backLink__ = this.getChild(".duck-detail__back");
  this.__buyLink__ = this.getChild(".duck-detail__buy");
  this.language = defaultLanguage;
  this.onBack = onBack;
  this.onBuy = onBuy;
}

DuckDetail.prototype = Object.create(Component.prototype);
DuckDetail.prototype.constructor = DuckDetail;

DuckDetail.prototype.showDuck = function (duck, done) {
    logic.retrieveDuckDetail(duck.id, function(duckDetail) {
      this.getChild(".duck-detail__title").innerText = duckDetail.title;
      this.getChild(".duck-detail__image").src = duckDetail.imageUrl;
      this.getChild(".duck-detail__price").innerText = duckDetail.price;
      this.getChild(".duck-detail__description").innerText = duckDetail.description;
      done();
    }.bind(this))
};

Object.defineProperty(DuckDetail.prototype, "onBack", {
  set: function(callback) {
    this.__backLink__.addEventListener("click", function(event) {
      event.preventDefault();
      callback();      
    });
  }
});

Object.defineProperty(DuckDetail.prototype, "onBuy", {
  set: function(callback) {
    this.__buyLink__.addEventListener("click", function(event) {
      event.preventDefault();
      callback();
    });
  }
});

Object.defineProperty(DuckDetail.prototype, "language", {
  set: function(language) {
    var literals = this.__literals__[language];

    //TODO: to implement literals
    // this.getChild(".duck-detail__back").innerText = literals.buttonText;
    // this.getChild(".duck-detail__buy").innerText = literals.buttonText;

    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }
});
