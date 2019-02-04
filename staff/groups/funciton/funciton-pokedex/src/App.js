import React, { Component } from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";
import DetailedPokemonPanel from "./components/DetailPanel"
import MainPanel from "./components/mainPanel"
import logic from "./logic";

class App extends Component {
  state = {
    pokemonVisible: null,
    searchText: null
  }
  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => this.setState({ pokemonVisible }))

  }

  onBackButtonDetailedPokemon = () => {

    this.setState({ pokemonVisible: null, searchText: this.state.searchText })

  }

  setSearchTextApp = (query) => {

    this.setState({ searchText: query })

  }

  render() {

    const {
      state: { pokemonVisible }
    } = this



    return (
      <div className="App">
      <MainPanel></MainPanel>
        {!pokemonVisible && <PokemonSearch onPokemonDetail={this.handlePokemonDetail} setSearchTextApp={this.setSearchTextApp} searchText={this.state.searchText} />}
        {pokemonVisible && <DetailedPokemonPanel pokemonToShow={pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon} />}
      </div>
    );
  }
}

export default App;



function bindEvent(e, eventName, callback) {
  if(e.addEventListener) // new browsers
      e.addEventListener(eventName, callback, false);
  else if(e.attachEvent) // IE
      e.attachEvent('on'+ eventName, callback);
};

bindEvent(document.body, 'scroll', function(e) {
  document.body.scrollLeft = 0;
});