import React, { Component, Fragment } from "react";
import pokemonApi from "../../apipokemon";

class PokemonSearch extends Component {
  state = { pokemons: [], searchText: "", loading: true };

  componentDidMount() {
    pokemonApi.searchAllPokemons().then(pokemons => {
      this.setState({ pokemons, loading: false })
    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  renderList = () => (
    <ul>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.state.searchText))
          .map(pokemon => <li>{pokemon.name}</li>)
      }
    </ul>
  )

  render() {
    return (
      <Fragment>
        <h2>Search Pokemon</h2>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Search you Pokemon"
        />
        {
          this.state.loading && <h1>LOADING</h1>
        }
        {
          this.state.searchText !== "" && this.renderList()
        }
      </Fragment>
    );
  }
}

export default PokemonSearch;
