import React, { Component } from "react";
import logic from '../../logic'
import './index.sass'
import ItemResult from "../ItemResult";


class PokemonSearch extends Component {
  state = { pokemons: [], searchText: this.props.searchText, loading: true };

  componentDidMount() {
    logic.retrieveAllPokemons().then(pokemons => {
      this.setState({ pokemons, loading: false })

    });
  }

  handleChange = event => {
    this.setState({
      searchText: event.target.value
    });
    this.props.setSearchText(event.target.value);

  };

  handlePokemonDetail = (name) => {
    logic.retrievePokemon(name)
      .then((pokemonVisible) => {
        this.props.setPokemonVisible(pokemonVisible)
        return this.setState({ pokemonVisible })
      })
  }

  setSearchTextApp = (query) => {
    this.setState({ searchText: query })

  }

  renderList = () => {
    
    return <ul className='pokemon__ul'>
      {
        this.state.pokemons
          .filter(pokemon => pokemon.name.includes(this.state.searchText))
          .map(pokemon => <ItemResult stringPokemonId = {pokemon.url} pokemonName={pokemon.name} onGoToDetails={this.handlePokemonDetail} />)
      }
    </ul>

    }

  render() {

    return (
      <div className='searchPanel'>
        {/* <img src={titleImage} alt="poke_title"></img> */}
        <img src={require('../../funcitons-pokedex-title.png')}></img>
        <h2 className='title__search'>Search Pokemon</h2>
        
          <input className="input__searchPokemon"
            onChange={this.handleChange}
            type="text"
            placeholder="Search your Pokemon"
            value={this.state.searchText}
          />
          {
            this.state.loading && <h1>LOADING</h1>
          }
          {
            this.state.searchText !== "" && this.renderList()
          }

      </div>
    );
  }
}

export default PokemonSearch;
