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
  var listDucks = new ListDucks(listDucksContainer);

  //form, onSearch, literals, defaultLanguage
  this.__searchForm__ = new SearchForm(
    searchFormTag,
    function(text) {
        logic.searchDucks (text, function (ducks) {
            listDucks.ducks = ducks;
        })
    },
    literals,
    initialLanguage
  );

}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, "language", {
  set: function(language) {
    this.__logOut__.language = language;
    this.__searchForm__.language = language;
  }
});
