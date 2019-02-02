import React, { Component, Fragment } from "react";
import pokemonApi from "../../apipokemon";

class PokemonSearch extends Component {
  state = { pokemons: [], searchText: "" };

  componentDidMount() {
    pokemonApi.searchAllPokemons().then(pokemons => {
      this.setState({ pokemons })
    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <h2>Search Pokemon</h2>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Search you Pokemon"
        />
        <ul>
          {
            this.state.pokemons.map(pokemon => <li>{pokemon.name}</li>)
          }
        </ul>
      </Fragment>
    );
  }
}

export default PokemonSearch;
