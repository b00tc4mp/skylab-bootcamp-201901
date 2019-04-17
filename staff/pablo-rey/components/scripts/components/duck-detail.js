'use strict';

function DuckDetail(form, onBack, onBuy, literals, defaultLanguage) {
  Component.call(this, form);

  this.__literals__ = literals;
  this.__backLink__ = form.children[4]
  this.__buyLink__ = form.children[5]
  this.language = defaultLanguage;
  this.onBack = onBack;
  this.onBuy = onBuy;
}

DuckDetail.prototype = Object.create(Component.prototype);
DuckDetail.prototype.constructor = DuckDetail;

Object.defineProperty(DuckDetail.prototype, "duck", {
  set: function(duck) {
    //TODO: retreive details
    this.container.children[0].innerText = duck.title;
    this.container.children[1].img = duck.imgUrl;
    this.container.children[2].innerText = duck.price;
    this.container.children[3].innerText = duck.description;
  }
});

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

    this.container.children[1].innerText = literals.buttonText;

    if (this.__onLanguageChange__) this.__onLanguageChange__(language);
  }
});
