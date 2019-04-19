"use strict";

class Home extends Component {
  constructor({ container, literals, initialLanguage }) {
    super(container);

    this.__literals__ = literals;

    this.__listDucks__ = new List({
      container: this.getChild(".duck-list"),
      itemComponentConstructor: CardDuck,
      onSelect: duck => {
        this.__duckDetail__.showDuck(duck, () => {
          this.__duckDetail__.visible = true;
          this.__listDucks__.visible = false;
        });
      },
    });

    this.__searchForm__ = new SearchForm({
      container: this.getChild(".home__search"),
      literals,
      defaultLanguage: initialLanguage,
      onSearch: text => {
        logic.searchDucks(text, ducks => {
          this.__listDucks__.items = ducks;
        });
      },
    });

    this.__duckDetail__ = new DuckDetail(
      this.getChild(".duck-detail"),
      () => {
        // onBack;
        this.__listDucks__.visible = true;
        this.__duckDetail__.visible = false;
      },
      () => {
        // onBuy
        console.log("buy");
      },
      literals,
      initialLanguage
    );

    this.__duckDetail__.visible = false;
  }

  set language(language) {
    this.__searchForm__.language = language;
    this.__duckDetail__.language = language;
  }

  set visible(isVisible) {
    super.visible = isVisible;
    this.getChild(".home__title").innerText = `Hello, ${logic.__userName__}`;
  }
}
