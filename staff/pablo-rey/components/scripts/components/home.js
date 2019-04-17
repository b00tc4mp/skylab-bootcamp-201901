"use strict";

function Home(container, literals, initialLanguage, onLogOut) {
  Component.call(this, container);
  
  this.__literals__ = literals;

  this.__logOut__ = new LogOut(this.getChild('.home__logout'), literals, function() {
    onLogOut();
  });
  this.__logOut__.language = initialLanguage;

  this.__listDucks__ = new List(this.getChild('.duck-list'), CardDuck, function(duck) {
    // onSelect
    var self = this;
    this.__duckDetail__.showDuck(duck, function () {
      // loading finish
      self.__duckDetail__.visible = true;
      self.__listDucks__.visible = false;
    })
  }.bind(this));

  this.__searchForm__ = new SearchForm(
    this.getChild('.home__search'),
    function(text) {
        logic.searchDucks (text, function (ducks) {
            this.__listDucks__.items = ducks;
        }.bind(this))
    }.bind(this),
    literals,
    initialLanguage
  );

  this.__duckDetail__ = new DuckDetail(this.getChild('.duck-detail'), function() {
    // onBack;
    this.__listDucks__.visible = true;
    this.__duckDetail__.visible = false;
  }.bind(this), function () {
    // onBuy
    console.log("buy");
  }.bind(this), literals, initialLanguage);
  this.__duckDetail__.visible = false;
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, "language", {
  set: function(language) {
    this.__logOut__.language = language;
    this.__searchForm__.language = language;
    this.__duckDetail__.language = language;
  }
});
