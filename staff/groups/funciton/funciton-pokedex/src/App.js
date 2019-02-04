import React, { Component } from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";
import DetailedPokemonPanel from "./components/DetailPanel"
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

    this.setState({ pokemonVisible: null, searchText:this.state.searchText })

  }

  setSearchTextApp = (query) => {

    this.setState({ searchText:query })

  }

  render() {

    const {
      state: { pokemonVisible }
    } = this



    return (
      <div className="App">
        {!pokemonVisible && <PokemonSearch onPokemonDetail={this.handlePokemonDetail} setSearchTextApp={this.setSearchTextApp} searchText={this.state.searchText} />}
        {pokemonVisible && <DetailedPokemonPanel pokemonToShow={pokemonVisible} onBackButton={this.onBackButtonDetailedPokemon} />}
      </div>
    );
  }
}

export default App;
