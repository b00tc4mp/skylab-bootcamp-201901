"use strict";

function Home(container, literals, initialLanguage, onLogOut) {
  Component.call(this, container);
  this.__literals__ = literals;

  var logoutButton = container.children[0];
  this.__logOut__ = new LogOut(logoutButton, literals, function() {
    onLogOut();
  });
  this.__logOut__.language = initialLanguage;

  var searchFormTag = container.children[2];

  var listDucksContainer = container.children[3];
  var listDucks = new List(listDucksContainer, CardDuck, function(duck) {
    // onSelect
    duckDetail.duck = duck
    duckDetail.visible = true;
    listDucks.visible = false;
  });

  this.__searchForm__ = new SearchForm(
    searchFormTag,
    function(text) {
        logic.searchDucks (text, function (ducks) {
            listDucks.items = ducks;
        })
    },
    literals,
    initialLanguage
  );

  var duckDetailTag = container.children[4];
  var duckDetail = new DuckDetail(duckDetailTag, function() {
    // onBack;
    listDucks.visible = true;
    duckDetail.visible = false;
  }, function () {
    // onBuy
    console.log("buy");
  }, literals, initialLanguage);

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
