"use strict";

class Home extends Component {
  constructor(container, literals, initialLanguage, onLogOut) {
    super(container);  
    
    this.__literals__ = literals;

    this.__logOut__ = new LogOut(this.getChild('.home__logout'), 
      literals, 
      () => onLogOut());
    this.__logOut__.language = initialLanguage;

    this.__listDucks__ = new List(this.getChild('.duck-list'), 
      CardDuck,       
      (duck) => { // onSelect
        this.__duckDetail__.showDuck(duck, () => {
          this.__duckDetail__.visible = true;
          this.__listDucks__.visible = false;
        })
      }
    );

    this.__searchForm__ = new SearchForm(
      this.getChild('.home__search'),
      (text) => {
          logic.searchDucks (text, 
            (ducks) => { this.__listDucks__.items = ducks; })
      }, literals,
      initialLanguage
    );

    this.__duckDetail__ = new DuckDetail(this.getChild('.duck-detail'), 
      () => { // onBack;
        this.__listDucks__.visible = true;
        this.__duckDetail__.visible = false;}, 
      () => { // onBuy
        console.log("buy");}, 
      literals, 
      initialLanguage);

    this.__duckDetail__.visible = false;
  }

  set language (language) {
      this.__logOut__.language = language;
      this.__searchForm__.language = language;
      this.__duckDetail__.language = language;
  }

  
}




// function Home(container, literals, initialLanguage, onLogOut) {
//   Component.call(this, container);
  
//   this.__literals__ = literals;
//   var self = this;

//   this.__logOut__ = new LogOut(this.getChild('.home__logout'), literals, function() {
//     onLogOut();
//   });
//   this.__logOut__.language = initialLanguage;

//   this.__listDucks__ = new List(this.getChild('.duck-list'), CardDuck, function(duck) {
//     // onSelect
//     self.__duckDetail__.showDuck(duck, function () {
//       // loading finish
//       self.__duckDetail__.visible = true;
//       self.__listDucks__.visible = false;
//     })
//   });

//   this.__searchForm__ = new SearchForm(
//     this.getChild('.home__search'),
//     function(text) {
//         logic.searchDucks (text, function (ducks) {
//             self.__listDucks__.items = ducks;
//         })
//     },
//     literals,
//     initialLanguage
//   );

//   this.__duckDetail__ = new DuckDetail(this.getChild('.duck-detail'), function() {
//     // onBack;
//     self.__listDucks__.visible = true;
//     self.__duckDetail__.visible = false;
//   }, function () {
//     // onBuy
//     console.log("buy");
//   }, literals, initialLanguage);
//   this.__duckDetail__.visible = false;
// }

// Home.prototype = Object.create(Component.prototype);
// Home.prototype.constructor = Home;

// Object.defineProperty(Home.prototype, "language", {
//   set: function(language) {
//     this.__logOut__.language = language;
//     this.__searchForm__.language = language;
//     this.__duckDetail__.language = language;
//   }
// });
