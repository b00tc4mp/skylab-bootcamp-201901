import React, { Component } from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";
import DetailedPokemonPanel from "./components/DetailPanel"
import logic from "./logic";

class App extends Component {
  state={
    pokemonVisible: null
  }
  handlePokemonDetail =  (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => this.setState({pokemonVisible}))
    
  }
  render() {

    const{
      state: {pokemonVisible}
    } = this



    return (
      <div className="App">
        {!pokemonVisible && <PokemonSearch onPokemonDetail = {this.handlePokemonDetail}/>}
        {pokemonVisible && <DetailedPokemonPanel pokemonToShow = {pokemonVisible} />}
      </div>
    );
  }
}

export default App;
